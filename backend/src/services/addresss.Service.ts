import { prisma } from '../db/db';
import { Address } from '../types/types';

export const AddressService = {
  async getByUser(userId: string) {
    return await prisma.address.findMany({ where: { userId } });
  },

  async create(addressData: Omit<Address, 'userId'>, userId: string) {
    const count = await prisma.address.count({ where: { userId } });
    if (count >= 3) {
      throw new Error('Máximo 3 direcciones permitidas.');
    }

    return await prisma.address.create({
      data: {
        ...addressData,
        userId,
      },
    });
  },

  async delete(id: string, userId: string) {
    return await prisma.address.delete({
      where: {
        id,
        userId,
      },
    });
  },
};
