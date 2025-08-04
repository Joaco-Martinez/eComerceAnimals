import { prisma } from '../db/db';
import cloudinary from '../utils/cloudinary';
import { StockNotificationService } from './stockNotification.Service';
import sendEmail from '../utils/sendEmail'; 
import { generateBackInStockEmailTemplate } from '../utils/generateBackInStockTemplate'; // si tenés template
import mjml2html from 'mjml';
export const getAllProducts = () => prisma.product.findMany({
  where: { isActive: true },
  include: { category: true, images: true }
});

export const getAllProductsAdmin = () => prisma.product.findMany({
  include: { category: true, images: true }
})
export const getProductById = (id: string) => prisma.product.findUnique({
  where: { id, isActive: true },
  include: { category: true, images: true }
});

export const searchProductsService = async (query: string) => {
  return await prisma.product.findMany({
    where: {
      isActive: true,
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
    include: {
      images: true,
      category: true,
    },
  });
};

export const getFilteredProducts = async (filters: {
  petType?: 'dog' | 'cat' | 'both';
  categoryId?: string;
  sortBy?: 'priceAsc' | 'priceDesc' | 'relevance';
}) => {
  const { petType, categoryId, sortBy } = filters;

  const where: any = {
    isActive: true, 
  };

  if (petType === "dog" || petType === "cat") {
    where.petType = { in: [petType, "both"] };
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  const orderBy =
    sortBy === "priceAsc"
      ? { price: "asc" as const }
      : sortBy === "priceDesc"
      ? { price: "desc" as const }
      : undefined;

  return prisma.product.findMany({
    where,
    orderBy,
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
  size?: string[]; // <-- array
  color?: string[]; // <-- array
  categoryId: string;
  sku?: string;
  images?: Express.Multer.File[];
  petType: 'dog' | 'cat' | 'both';
}) => {
  const { images = [], ...productData } = data;

  const uploadedImagesUrls: string[] = [];
  for (const file of images) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "products",
    });
    uploadedImagesUrls.push(result.secure_url);
  }

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



export const updateProduct = async (
  id: string,
  data: Partial<{
    name: string;
    description: string;
    price: number;
    stock: number;
    weight: number;
    size: string[];
    color: string[];
    categoryId: string;
    sku: string;
    isActive: boolean;
    petType: 'dog' | 'cat' | 'both';
  }>
) => {
  const existingProduct = await prisma.product.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!existingProduct) throw new Error('Producto no encontrado');

  
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined)
  );

  // 🔐 Validaciones manuales
  if ('stock' in filteredData && typeof filteredData.stock === 'number' && filteredData.stock < 0) {
    throw new Error('El stock no puede ser menor a 0');
  }

  if ('price' in filteredData && typeof filteredData.price === 'number' && filteredData.price < 0) {
    throw new Error('El precio no puede ser menor a 0');
  }

  if ('weight' in filteredData && typeof filteredData.weight === 'number' && filteredData.weight < 0) {
    throw new Error('El peso no puede ser menor a 0');
  }

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: filteredData,
    include: { images: true },
  });

  // 📦 Notificación si volvió al stock
  const wasOutOfStock = existingProduct.stock === 0;
  const isNowInStock = typeof updatedProduct.stock === 'number' && updatedProduct.stock > 0;

  if (wasOutOfStock && isNowInStock) {
    const subscribers = await StockNotificationService.getUnnotifiedSubscribers(id);
    const productImage = updatedProduct.images?.[0]?.url || 'https://via.placeholder.com/600x400';

    for (const sub of subscribers) {
      const emailHtml = mjml2html(
        generateBackInStockEmailTemplate({
          name: updatedProduct.name,
          image: productImage,
          productUrl: `https://punkypet.com.ar/productos/${updatedProduct.id}`,
        })
      ).html;

      await sendEmail({
        to: sub.email,
        subject: `¡${updatedProduct.name} está de nuevo en stock!`,
        html: emailHtml,
      });
    }

    await StockNotificationService.markAsNotified(subscribers.map((s) => s.id));
  }

  return updatedProduct;
};

export const deleteProduct = async (id: string) => {
  try {
    // 0. Si el producto tiene compras, lo desactivamos en vez de borrarlo
    const orderItemCount = await prisma.orderItem.count({
      where: { productId: id }
    });

    if (orderItemCount > 0) {
      return await prisma.product.update({
        where: { id },
        data: { isActive: false },
      });
    }

    // 1. Eliminar de carritos (logueados y anónimos)
    await prisma.cartItem.deleteMany({ where: { productId: id } });
    await prisma.anonCartItem.deleteMany({ where: { productId: id } });

    // 2. Eliminar imágenes
    await prisma.image.deleteMany({ where: { productId: id } });

    // 3. Eliminar vistas
    await prisma.productView.deleteMany({ where: { productId: id } });

    // 4. Eliminar producto
    return await prisma.product.delete({ where: { id } });

  } catch (error: any) {
    console.error('Error al eliminar el producto:', error);
    throw new Error('No se pudo eliminar el producto');
  }
};


export const deleteProductImage = async (imageId: string) => {
  const image = await prisma.image.findUnique({
    where: { id: imageId },
  });

  if (!image) {
    throw new Error("Imagen no encontrada");
  }

  // Eliminar de Cloudinary (opcional)
  try {
    const publicId = extractCloudinaryPublicId(image.url);
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.warn("No se pudo eliminar de Cloudinary:", err);
  }

  // Eliminar de base de datos
  return await prisma.image.delete({
    where: { id: imageId },
  });
};

// util para Cloudinary
const extractCloudinaryPublicId = (url: string) => {
  const parts = url.split('/')
  const filename = parts[parts.length - 1]
  return `products/${filename.split('.')[0]}`
}