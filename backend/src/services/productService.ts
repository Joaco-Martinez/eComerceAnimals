import { prisma } from '../db/db';

export const getAllProducts = async () => {
  return await prisma.product.findMany();
};

export const getProductById = async (id: number) => {
  return await prisma.product.findUnique({ where: { id } });
};

export const createProduct = async (data: {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number; // Use categoryId to connect to existing category
}) => {
  const { categoryId, ...productData } = data;
  return await prisma.product.create({
    data: {
      ...productData,
      category: {
        connect: { id: categoryId }
      }
    }
  });
};

export const updateProduct = async (id: number, data: Partial<{
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}>) => {
  return await prisma.product.update({ where: { id }, data });
};

export const deleteProduct = async (id: number) => {
  return await prisma.product.delete({ where: { id } });
};
