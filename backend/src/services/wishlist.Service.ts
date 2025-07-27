import { prisma } from '../db/db';

export const getWishlist = async (userId: string) => {
  return prisma.wishlistItem.findMany({
    where: { userId },
    include: {
      product: {
        include: {
          images: true,
          category: true,
        },
      },
    },
  });
};

export const addToWishlist = async (userId: string, productId: string) => {
  return prisma.wishlistItem.create({
    data: { userId, productId },
  });
};

export const removeFromWishlist = async (userId: string, productId: string) => {
  return prisma.wishlistItem.delete({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });
};

export const isInWishlist = async (userId: string, productId: string) => {
  return prisma.wishlistItem.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });
};
