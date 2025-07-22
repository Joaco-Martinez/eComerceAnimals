import { Request, Response } from 'express';
import * as productService from '../services/product.Service';
const validPetTypes = ['dog', 'cat', 'both'] as const;
const validSortBy = ['relevance', 'priceAsc', 'priceDesc'] as const;
import { prisma } from "../db/db";

export const getAll = async (_req: Request, res: Response) => {
  const products = await productService.getFilteredProducts({});
  res.json(products);
};

export const getByPetType = async (req: Request, res: Response) => {
  const { petType } = req.params;
  if (!validPetTypes.includes(petType as any)) {
    return res.status(400).json({ error: `petType inválido. Debe ser uno de: ${validPetTypes.join(', ')}` });
  }
  const products = await productService.getFilteredProducts({ petType: petType as typeof validPetTypes[number] });
  res.json(products);
};

export const getByCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  if (!categoryId) {
    return res.status(400).json({ error: 'categoryId inválido' });
  }
  const products = await productService.getFilteredProducts({ categoryId });
  res.json(products);
};

export const getByPetAndCategory = async (req: Request, res: Response) => {
  const { petType, categoryId, sortBy } = req.query;

  if (petType && !validPetTypes.includes(petType as any)) {
    return res.status(400).json({ error: `petType inválido. Debe ser uno de: ${validPetTypes.join(', ')}` });
  }

  if (sortBy && !validSortBy.includes(sortBy as any)) {
    return res.status(400).json({ error: `sortBy inválido. Debe ser uno de: ${validSortBy.join(', ')}` });
  }

  const filters = {
    petType: petType as typeof validPetTypes[number] | undefined,
    categoryId: categoryId ? String(categoryId) : undefined,
    sortBy: sortBy as typeof validSortBy[number] | undefined,
  };

  const products = await productService.getFilteredProducts(filters);
  res.json(products);
};

export const getById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const product = await productService.getProductById(id);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(product);
};

export const create = async (req: Request, res: Response) => {
  try {
    const {
      name, description, price, stock, weight, size, color, categoryId, sku, petType
    } = req.body;

    if (!petType || !validPetTypes.includes(petType as any)) {
      return res.status(400).json({ error: `petType debe ser uno de: ${validPetTypes.join(', ')}` });
    }

    const files = req.files as Express.Multer.File[] | undefined;

    const newProduct = await productService.createProduct({
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      weight: weight ? parseFloat(weight) : undefined,
      size: size ? JSON.parse(size) : [],
      color: color ? JSON.parse(color) : [],
      categoryId,
      sku,
      images: files || [],
      petType,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creando producto:', error);
    res.status(500).json({ error: 'Error interno creando producto' });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const {
      name, description, price, stock, weight, size, color, categoryId, sku, petType
    } = req.body;

    if (petType && !validPetTypes.includes(petType as any)) {
      return res.status(400).json({ error: `petType debe ser uno de: ${validPetTypes.join(', ')}` });
    }

    const updatedProduct = await productService.updateProduct(id, {
      name,
      description,
      price: price ? parseFloat(price) : undefined,
      stock: stock ? parseInt(stock) : undefined,
      weight: weight ? parseFloat(weight) : undefined,
      size: size ? JSON.parse(size) : undefined,
      color: color ? JSON.parse(color) : undefined,
      categoryId: categoryId || undefined,
      sku,
      petType,
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error actualizando producto:', error);
    res.status(500).json({ error: 'Error interno actualizando producto' });
  }
};

export const searchProducts = async (req: Request, res: Response) => {
  const { q } = req.query;

  console.log("Query recibida:", q);

  // TEST MANUAL para ver si hay productos con "ajustable"
  const test = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: "ajustable", mode: "insensitive" } },
        { description: { contains: "ajustable", mode: "insensitive" } },
      ],
    },
  });
  console.log("Resultados test:", test);

  if (typeof q !== "string" || q.trim() === "") {
    return res.status(400).json({ message: "Query inválida" });
  }

  try {
    const results = await productService.searchProductsService(q.trim());
    return res.status(200).json({ content: results });
  } catch (error) {
    console.error("Error al buscar productos:", error);
    return res.status(500).json({ message: "Error al buscar productos" });
  }
};
export const remove = async (req: Request, res: Response) => {
  const id = req.params.id;
  await productService.deleteProduct(id);
  res.status(204).send();
};
