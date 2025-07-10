import { prisma } from '../db/db';

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({ where: { id } });
};

export const createUser = async (data: { name: string; email: string; password: string }) => {
  return await prisma.user.create({ data });
};

export const updateUser = async (id: number, data: Partial<{ name: string; email: string; password: string }>) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({ where: { id } });
};
