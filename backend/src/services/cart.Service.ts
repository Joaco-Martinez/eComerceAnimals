import { prisma } from '../db/db';
import { getAnonCart } from './anonCart.Service';

export const getUserCart = async (userId: string) => {
  return await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: { images: true },
          },
        },
      },
    },
  });
};

export const mergeAnonCartToUserCart = async (userId: string, cartId: string) => {
  const anonCart = await getAnonCart(cartId);
  if (!anonCart) throw new Error("AnonCart no encontrado");

  let userCart = await prisma.cart.findUnique({ where: { userId } });
  if (!userCart) {
    userCart = await prisma.cart.create({ data: { userId } });
  }

  for (const item of anonCart.items) {
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productId: item.productId,
        color: item.color,
        size: item.size,
      },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + item.quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productId: item.productId,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        },
      });
    }
  }

  // Borrar primero los ítems del carrito anónimo
  await prisma.anonCartItem.deleteMany({
    where: { cartId: cartId },
  });

  // Luego borrar el carrito anónimo
  await prisma.anonCart.delete({
    where: { id: cartId },
  });
};

export const addToCart = async (
  userId: string,
  productId: string,
  quantity: number,
  color: string,
  size: string
) => {
  let cart = await prisma.cart.findUnique({ where: { userId } });

  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } });
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId, color, size },
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
      color,
      size,
    },
  });
};

export const updateCartItem = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) throw new Error("Carrito no encontrado");

  return await prisma.cartItem.updateMany({
    where: { cartId: cart.id, productId },
    data: { quantity },
  });
};

export const removeFromCart = async (userId: string, productId: string) => {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) throw new Error("Carrito no encontrado");

  return await prisma.cartItem.deleteMany({
    where: { cartId: cart.id, productId },
  });
};