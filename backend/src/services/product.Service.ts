import { prisma } from '../db/db';
import cloudinary from '../utils/cloudinary';
export const getAllProducts = () => prisma.product.findMany({
  include: { category: true, images: true }
});

export const getProductById = (id: number) => prisma.product.findUnique({
  where: { id },
  include: { category: true, images: true }
});

export const getFilteredProducts = async (filters: {
  petType?: 'dog' | 'cat' | 'both';
  categoryId?: number;
}) => {
  const { petType, categoryId } = filters;

  const where: any = {};

  if (petType) {
    where.petType = petType;
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  return prisma.product.findMany({
    where,
    include: {
      category: true,
      images: true,
    },
  });
};

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
  images?: Express.Multer.File[]; // ahora son archivos multer
  petType: 'dog' | 'cat' | 'both';
}) => {
  const { images = [], ...productData } = data;

  // Subir imágenes a Cloudinary
  const uploadedImagesUrls: string[] = [];
  for (const file of images) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "products",
    });
    uploadedImagesUrls.push(result.secure_url);
  }

  // Crear producto con URLs de Cloudinary
  return prisma.product.create({
    data: {
      ...productData,
      images: {
        create: uploadedImagesUrls.map(url => ({ url })),
      },
    },
    include: {
      category: true,
      images: true,
    },
  });
};
export const updateProduct = (id: number, data: Partial<{
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  weight?: number;
  size?: string;
  color?: string;
  categoryId?: number;
  sku?: string;
  isActive?: boolean;
  petType: 'dog' | 'cat' | 'both';
}>) => prisma.product.update({ where: { id }, data });

export const deleteProduct = (id: number) => prisma.product.delete({ where: { id } });
