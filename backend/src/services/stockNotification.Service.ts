// src/services/stockNotification.service.ts
import { prisma } from '../db/db';


export const StockNotificationService = {
  checkIfSubscribed: async (email: string, productId: number) => {
    return await prisma.stockNotification.findFirst({
      where: {
        email,
        productId,
        notified: false,
      },
    });
  },

  createSubscription: async (email: string, productId: number) => {
    return await prisma.stockNotification.create({
      data: {
        email,
        productId,
      },
    });
  },

  getUnnotifiedSubscribers: async (productId: number) => {
    return await prisma.stockNotification.findMany({
      where: {
        productId,
        notified: false,
      },
    });
  },

  markAsNotified: async (ids: number[]) => {
    return await prisma.stockNotification.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        notified: true,
      },
    });
  },
};
