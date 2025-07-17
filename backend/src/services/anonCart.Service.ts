import { prisma } from '../db/db';

export const getAnonCart = async (cartId: string) => {
  return await prisma.anonCart.findUnique({
    where: { id: cartId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const addToAnonCart = async (cartId: string, productId: string, quantity: number) => {
  let cart = await prisma.anonCart.findUnique({ where: { id: cartId } });

  if (!cart) {
    cart = await prisma.anonCart.create({ data: { id: cartId } });
  }

  const existingItem = await prisma.anonCartItem.findFirst({
    where: { cartId: cart.id, productId },
  });

  if (existingItem) {
    return await prisma.anonCartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
  }

  return await prisma.anonCartItem.create({
    data: {
      cartId: cart.id,
      productId,
      quantity,
    },
  });
};

export const removeFromAnonCart = async (cartId: string, productId: string) => {
  return await prisma.anonCartItem.deleteMany({
    where: { cartId, productId },
  });
};

export const clearAnonCart = async (cartId: string) => {
  return await prisma.anonCartItem.deleteMany({
    where: { cartId },
  });
};
