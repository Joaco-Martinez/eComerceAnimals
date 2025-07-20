import { prisma } from '../db/db';
import { z } from 'zod';
import { addressSchema } from '../controllers/address.Controller';

type NewAddressInput = z.infer<typeof addressSchema>;

export const AddressService = {
  async getByUser(userId: string) {
    return prisma.address.findMany({ where: { userId } });
  },

  async create(data: NewAddressInput, userId: string) {
    const count = await prisma.address.count({ where: { userId } });

    if (count >= 3) {
      throw new Error('Máximo 3 direcciones permitidas.');
    }

    return prisma.address.create({
      data: {
        ...data,
        userId,
      },
    });
  },

  async delete(id: string, userId: string) {
    const address = await prisma.address.findUnique({ where: { id } });

    if (!address || address.userId !== userId) {
      throw new Error('No autorizado');
    }

    return prisma.address.delete({ where: { id } });
  },
};
