import { prisma } from '../db/db';
import { v4 as uuidv4 } from 'uuid';

export const getAnonCart = async (cartId: string) => {
  return await prisma.anonCart.findUnique({
    where: { id: cartId },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: true, // 
            },
          },
        },
      },
    },
  });
};

export const createAnonCart = async () => {
  return await prisma.anonCart.create({
    data: { id: uuidv4() },
  });
};

export const addToAnonCart = async (
  AnonCartId: string,
  productId: string,
  quantity: number,
  color: string,
  size: string
) => {
  let cart = await prisma.anonCart.findUnique({ where: { id: AnonCartId } });

  if (!cart) {
    cart = await prisma.anonCart.create({ data: { id: AnonCartId } });
  }

  const existingItem = await prisma.anonCartItem.findFirst({
    where: { cartId: cart.id, productId, color, size },
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
      color,
      size,
    },
  });
};

export const updateAnonCartItem = async (
  cartId: string,
  productId: string,
  quantity: number,
  color: string,
  size: string
) => {
  const existingItem = await prisma.anonCartItem.findFirst({
    where: { cartId, productId, color, size },
  });

  if (!existingItem) {
    throw new Error("Producto no encontrado en el carrito");
  }

  if (quantity <= 0) {
    return await prisma.anonCartItem.delete({
      where: { id: existingItem.id },
    });
  }

  return await prisma.anonCartItem.update({
    where: { id: existingItem.id },
    data: { quantity },
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
