import { prisma } from '../db/db';
import { customAlphabet } from 'nanoid';
import sendEmail from '../utils/sendEmail';
import {
  generateOrderEmailTemplate,
  generateTransferEmailTemplate,
} from '../utils/emailTemplates';
import { ShippingMethod } from '@prisma/client';

const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);

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

  const order = await prisma.order.create({
    data: {
      userId,
      addressId: data.addressId,
      shippingMethod: data.shippingMethod,
      orderNumber,
      totalAmount,
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
      user: {
        select: {
          email: true,
          name: true,
        },
      },
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
          product: {
            select: {
              name: true,
            },
          },
        },
      },
    },
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
      product: {
        name: item.product.name,
      },
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

  return order;
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
