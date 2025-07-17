import { prisma } from '../db/db';
import bcrypt from 'bcryptjs';

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const updateUserPassword = async (id: number, newPassword: string) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return await prisma.user.update({
    where: { id },
    data: { password: hashedPassword },
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({ where: { id } });
};
