import { prisma } from '../db/db';

export const getAllProducts = () => prisma.product.findMany({
  include: { category: true, images: true }
});

export const getProductById = (id: number) => prisma.product.findUnique({
  where: { id },
  include: { category: true, images: true }
});

export const createProduct = async (data: {
  name: string;
  description: string;
  price: number;
  stock: number;
  weight?: number;
  size?: string;
  color?: string;
  categoryId: number;
  sku?: string;
  images?: string[];
}) => {
  const { images = [], ...productData } = data;

  return prisma.product.create({
    data: {
      ...productData,
      images: {
        create: images.map(url => ({ url })),
      },
    },
    include: {
      category: true,
      images: true,
    },
  });
};

export const updateProduct = (id: number, data: Partial<{
  name: string;
  description: string;
  price: number;
  stock: number;
  weight: number;
  size: string;
  color: string;
  categoryId: number;
  sku: string;
  isActive: boolean;
}>) => prisma.product.update({ where: { id }, data });

export const deleteProduct = (id: number) => prisma.product.delete({ where: { id } });
