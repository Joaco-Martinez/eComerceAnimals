import { prisma } from '../db/db';

export const createCategory = async (data: {
  name: string;
  description?: string;
  image?: string;
}) => {
  return prisma.category.create({
    data,
  });
};

export const getAllCategories = async () => {
  return prisma.category.findMany();
};

export const getCategoryById = async (id: string) => {
  return prisma.category.findUnique({
    where: { id },
  });
};

export const updateCategory = async (
  id: string,
  data: Partial<{ name: string; description: string; image: string }>
) => {
  return prisma.category.update({
    where: { id },
    data,
  });
};

export const deleteCategory = async (id: string) => {
  return prisma.category.delete({
    where: { id },
  });
};
