import { prisma } from '../db/db';

export const getUserCart = async (userId: string) => {
  return await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const addToCart = async (userId: string, productId: string, quantity: number) => {
  let cart = await prisma.cart.findUnique({ where: { userId } });

  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } });
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId },
  });

  if (existingItem) {
    return await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
  }

  return await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      quantity,
    },
  });
};

export const updateCartItem = async (userId: string, productId: string, quantity: number) => {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) throw new Error('Carrito no encontrado');

  return await prisma.cartItem.updateMany({
    where: { cartId: cart.id, productId },
    data: { quantity },
  });
};

export const removeFromCart = async (userId: string, productId: string) => {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) throw new Error('Carrito no encontrado');

  return await prisma.cartItem.deleteMany({
    where: { cartId: cart.id, productId },
  });
};
