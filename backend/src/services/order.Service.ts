import { prisma } from '../db/db';
import { customAlphabet } from 'nanoid';
import sendEmail from '../utils/sendEmail';
import jwt from 'jsonwebtoken';
import mjml2html from 'mjml';
import {
  generateOrderEmailTemplate,
  generateTransferEmailTemplate,
  generateLowStockAlertEmailTemplate,
} from '../utils/emailTemplates';
import { generateOrderEmailForSellerTemplate,  generateTransferEmailForSellerTemplate } from '../utils/generateSellerOrderTemplate';
import { calculateOrderTotals } from '../utils/calculateOrderTotals';
import { buildVisualItems } from '../utils/buildVisualItems';


const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);


export const getAllOrders = async () => {
  return prisma.order.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true, // si querés mostrarlo
        },
      },
      address: true,
      items: {
        select: {
          product: true,
          quantity: true,
          color: true,
          size: true,
        }
      }
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const confirmPaymentService = async (orderId: string, tokenmp: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('Falta la variable JWT_SECRET');

  let decoded: any;
  
  try {
    decoded = jwt.verify(tokenmp, secret);
  } catch (err) {
    throw new Error('Token inválido o expirado');
  }

  if (decoded.orderId !== orderId) {
    throw new Error('Token no coincide con la orden');
  }

  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: { status: 'paid' },
  });

  return updatedOrder;
};

export const getOrderById = async (id: string) => prisma.order.findUnique({
       where: { id },  
  include: {
      user: {
        select: {
          name: true,
          email: true, 
        },
      },
      address: true,
      items: {
        select: {
          product: true,
          quantity: true,
          color: true,
          size: true,
        }
      }
    },
  });
export const createOrder = async (
  userId: string,
  data: {
    cartItems: {
      productId: string;
      quantity: number;
      price: number;
      color: string;
      size: string;
      // puede venir en product o en raíz (por seguridad soportamos ambos)
      product: { name: string; shippingCost?: number | string };
      shippingCost?: number | string;
    }[];
    shippingMethod: 'domicilio' | 'sucursal';
    addressId: string;
    paymentMethod: 'transferencia' | 'mercadopago';
    couponId?: string;
  }
) => {
  const coupon = data.couponId
    ? await prisma.coupon.findUnique({ where: { id: data.couponId } })
    : null;

  // Helpers chicos
  const toNumber = (v: unknown, def = 0) => {
    const n = typeof v === 'number' ? v : parseFloat(String(v ?? ''));
    return Number.isFinite(n) ? n : def;
  };
  const getItemShipping = (it: (typeof data.cartItems)[number]) =>
    toNumber(it.product?.shippingCost ?? it.shippingCost ?? 0, 0);

  // 1) Shipping = máximo entre ítems (salvo free_shipping)
  const isFreeShipping = coupon?.discountType === 'free_shipping';
  const maxShippingCost = isFreeShipping
    ? 0
    : data.cartItems.reduce((max, it) => Math.max(max, getItemShipping(it)), 0);

  // 2) Usamos tu calculateOrderTotals SOLO para subtotal y descuentos
  const {
    productSubtotal,
    transferenciaDiscount,
    transferDiscountValue,
    couponDiscountValue,
  } = calculateOrderTotals({
    cartItems: data.cartItems as any, // usa price/quantity; el shipping lo definimos nosotros
    paymentMethod: data.paymentMethod,
    coupon,
  });

  // 3) Total con el shipping máximo
  const shippingCost = maxShippingCost;
  const totalAmount =
    productSubtotal - transferDiscountValue - couponDiscountValue + shippingCost;

  const orderNumber = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${nanoid()}`;
  const lowStockAlerts: { id: string; name: string; sku: string; newStock: number }[] = [];

  const order = await prisma.$transaction(async (tx) => {
    // Control de stock
    for (const item of data.cartItems) {
      const product = await tx.product.findUnique({
        where: { id: item.productId },
        select: { stock: true, name: true, sku: true, id: true },
      });

      if (!product) throw new Error(`Producto no encontrado: ${item.productId}`);
      if (product.stock < item.quantity) {
        throw new Error(`Stock insuficiente para ${product.name}`);
      }

      const updated = await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
        select: { stock: true },
      });

      if (updated.stock <= 3) {
        lowStockAlerts.push({
          id: product.id,
          name: product.name,
          sku: product.sku ?? 'SIN SKU',
          newStock: updated.stock,
        });
      }
    }

    // Detalle de precios consistente
    const priceDetail = {
      subtotal: productSubtotal,
      shippingCost, // 👈 máximo
      discountTransfer: {
        applied: transferenciaDiscount > 0,
        percentage: transferenciaDiscount,
        value: transferDiscountValue,
      },
      discountCoupon: coupon
        ? {
            applied: true,
            type: coupon.discountType,
            value: coupon.value,
            amount: couponDiscountValue,
          }
        : { applied: false },
      total: totalAmount,
    };

    // Crear orden
    return await tx.order.create({
      data: {
        userId,
        addressId: data.addressId,
        shippingMethod: data.shippingMethod,
        orderNumber,
        totalAmount,              // 👈 usa total ya recalculado
        couponId: data.couponId,
        status: 'pending',
        priceDetail,
        items: {
          create: data.cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.price,
            color: item.color,
            size: item.size,
            // Si querés “congelar” shipping por ítem, agregá OrderItem.shippingCost aquí
          })),
        },
        payment: {
          create: {
            method: data.paymentMethod,
            status: 'pending',
            amount: totalAmount,   // 👈 consistente con la orden
          },
        },
      },
      select: {
        id: true,
        orderNumber: true,
        totalAmount: true,
        shippingMethod: true,
        status: true,
        user: { select: { email: true, name: true } },
        address: {
          select: { calle: true, localidad: true, provincia: true, postalCode: true },
        },
        items: {
          select: {
            productId: true,
            quantity: true,
            unitPrice: true,
            color: true,
            size: true,
            product: { select: { name: true, shippingCost: true } }, // 👈 útil para MP (máximo ya decidido)
          },
        },
      },
    });
  });

  const visualItems = buildVisualItems(order.items, {
    shippingCost,              // 👈 el que definimos arriba
    coupon,
    couponDiscountValue,
    transferDiscountValue,
  });

  const orderForEmail = {
    orderNumber: order.orderNumber,
    totalAmount: order.totalAmount,
    shippingMethod: order.shippingMethod,
    user: { name: order.user.name, email: order.user.email },
    address: order.address,
    items: visualItems,
  };

  await sendEmail({
    to: order.user.email,
    subject: 'Punky Pet - Orden creada',
    html:
      data.paymentMethod === 'transferencia'
        ? generateTransferEmailTemplate(orderForEmail)
        : generateOrderEmailTemplate(orderForEmail),
  });

  await sendEmail({
    to: 'mascotiendavgbpets@gmail.com',
    subject: `🛍️ Nueva orden #${order.orderNumber}`,
    html:
      data.paymentMethod === 'transferencia'
        ? generateTransferEmailForSellerTemplate(orderForEmail)
        : generateOrderEmailForSellerTemplate(orderForEmail),
  });

  await Promise.all(
    lowStockAlerts.map((product) =>
      sendEmail({
        to: 'mascotiendavgbpets@gmail.com',
        subject: `⚠️ Stock bajo: ${product.name}`,
        html: mjml2html(
          generateLowStockAlertEmailTemplate(
            product.name,
            product.sku,
            product.id,
            product.newStock
          )
        ).html,
      })
    )
  );

  const tokenmp = jwt.sign({ orderId: order.id }, process.env.JWT_SECRET!, { expiresIn: '15m' });

  return { ...order, tokenmp };
};





export const getOrdersByUser = async (userId: string) => {
  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      orderNumber: true,
      totalAmount: true,
      status: true,
      createdAt: true,
    },
  });

  return orders;

};

export const updateOrderStatus = async (
  orderId: string,
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
) => {
  return await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
};
