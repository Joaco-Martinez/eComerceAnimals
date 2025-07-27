import { prisma } from '../db/db';
import { customAlphabet } from 'nanoid';
import sendEmail from '../utils/sendEmail';
import mjml2html from 'mjml';
import {
  generateOrderEmailTemplate,
  generateTransferEmailTemplate,
  generateLowStockAlertEmailTemplate,
} from '../utils/emailTemplates';
import { ShippingMethod } from '@prisma/client';

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
    }[];
    shippingMethod: 'domicilio' | 'sucursal';
    addressId: string;
    paymentMethod: 'transferencia' | 'mercadopago';
    couponId?: string;
  }
) => {
  const totalAmount = data.cartItems.reduce((acc, item) => {
    if (typeof item.price !== 'number' || isNaN(item.price)) {
      throw new Error(`Precio inválido en item con producto ${item.productId}`);
    }
    return acc + item.price * item.quantity;
  }, 0);

  const orderNumber = `ORD-${new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, '')}-${nanoid()}`;

  const lowStockAlerts: {
    id: string;
    name: string;
    sku: string;
    newStock: number;
  }[] = [];

  const order = await prisma.$transaction(async (tx) => {
    // Verificación de stock
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
        data: {
          stock: { decrement: item.quantity },
        },
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

    // Crear orden
    return await tx.order.create({
      data: {
        userId,
        addressId: data.addressId,
        shippingMethod: data.shippingMethod,
        orderNumber,
        totalAmount,
        couponId: data.couponId,
        status: data.paymentMethod === 'transferencia' ? 'pending' : 'paid',
        items: {
          create: data.cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.price,
            color: item.color,
            size: item.size,
          })),
        },
        payment: {
          create: {
            method: data.paymentMethod,
            status: data.paymentMethod === 'transferencia' ? 'pending' : 'paid',
            amount: totalAmount,
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
          select: {
            calle: true,
            localidad: true,
            provincia: true,
            postalCode: true,
          },
        },
        items: {
          select: {
            productId: true,
            quantity: true,
            unitPrice: true,
            color: true,
            size: true,
            product: { select: { name: true } },
          },
        },
      },
    });
  });

  const orderForEmail = {
    orderNumber: order.orderNumber,
    totalAmount: order.totalAmount,
    shippingMethod: order.shippingMethod,
    user: {
      name: order.user.name,
      email: order.user.email,
    },
    items: order.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      color: item.color,
      size: item.size,
      product: { name: item.product.name },
    })),
    address: {
      calle: order.address.calle,
      localidad: order.address.localidad,
      provincia: order.address.provincia,
      postalCode: order.address.postalCode,
    },
  };

  await sendEmail({
    to: order.user.email,
    subject: 'Punky Pet - Orden creada',
    html:
      data.paymentMethod === 'transferencia'
        ? generateTransferEmailTemplate(orderForEmail)
        : generateOrderEmailTemplate(orderForEmail),
  });

  await Promise.all(
    lowStockAlerts.map((product) =>
      sendEmail({
        to: 'mascotiendavgbpets@gmail.com',
        subject: `⚠️ Stock bajo: ${product.name}`,
        html: mjml2html(
          generateLowStockAlertEmailTemplate(product.name, product.sku, product.id, product.newStock)
        ).html,
      })
    )
  );

  return order;
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
