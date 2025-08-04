import { prisma } from "../db/db";

export const createCategory = async (data: {
  name: string;
  description?: string;
  image?: string;
  petType: "dog" | "cat" | "both";
}) => {
  return prisma.category.create({ data });
};

export const getAllCategories = async () => {
  return await prisma.category.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
};

export const getAllCategoriesAdmin = async () => {
  return await prisma.category.findMany();
}

export const getCategoryById = async (id: string) => {
  return prisma.category.findUnique({ where: { id } });
};

export const updateCategory = async (
  id: string,
  data: Partial<{ name: string; description: string; image: string; petType: "dog" | "cat" | "both" }>
) => {
  return prisma.category.update({ where: { id }, data });
};

export const deleteCategory = async (id: string) => {
  try {
    const productCount = await prisma.product.count({
      where: { categoryId: id }
    });

    if (productCount > 0) {
      // Si hay productos, se desactiva
      return await prisma.category.update({
        where: { id },
        data: { isActive: false },
      });
    }

    // Si no hay productos, se elimina
    return await prisma.category.delete({
      where: { id },
    });

  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    throw new Error('No se pudo eliminar la categoría');
  }
};