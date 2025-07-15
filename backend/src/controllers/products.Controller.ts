import { Request, Response } from 'express';
import * as productService from '../services/product.Service';

const validPetTypes = ['dog', 'cat', 'both'] as const;

export const getAll = async (req: Request, res: Response) => {
  const products = await productService.getFilteredProducts({});
  res.json(products);
};

export const getByPetType = async (req: Request, res: Response) => {
  const { petType } = req.params;
  if (!validPetTypes.includes(petType as "dog" | "cat" | "both")) {
    return res.status(400).json({ error: `petType inválido. Debe ser uno de: ${validPetTypes.join(', ')}` });
  }
  const products = await productService.getFilteredProducts({ petType: petType as 'dog' | 'cat' | 'both' });
  res.json(products);
};

export const getByCategory = async (req: Request, res: Response) => {
  const categoryId = Number(req.params.id);
  if (isNaN(categoryId)) {
    return res.status(400).json({ error: 'categoryId inválido' });
  }
  const products = await productService.getFilteredProducts({ categoryId });
  res.json(products);
};

export const getByPetAndCategory = async (req: Request, res: Response) => {
  const { petType, categoryId } = req.query;
  if (petType && !validPetTypes.includes(petType as "dog" | "cat" | "both")) {
    return res.status(400).json({ error: `petType inválido. Debe ser uno de: ${validPetTypes.join(', ')}` });
  }
  const filters = {
    petType: petType as 'dog' | 'cat' | 'both' | undefined,
    categoryId: categoryId ? Number(categoryId) : undefined,
  };
  const products = await productService.getFilteredProducts(filters);
  res.json(products);
};

export const getById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = await productService.getProductById(id);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(product);
};

export const create = async (req: Request, res: Response) => {
  try {
    const {
      name, description, price, stock, weight, size, color, categoryId, sku, petType
    } = req.body;

    if (!petType || !validPetTypes.includes(petType)) {
      return res.status(400).json({ error: `petType debe ser uno de: ${validPetTypes.join(', ')}` });
    }

    const files = req.files as Express.Multer.File[] | undefined;

    const newProduct = await productService.createProduct({
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      weight: weight ? parseFloat(weight) : undefined,
      size,
      color,
      categoryId: parseInt(categoryId),
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
    const id = parseInt(req.params.id);
    const data = req.body;

    if (data.petType && !validPetTypes.includes(data.petType)) {
      return res.status(400).json({ error: `petType debe ser uno de: ${validPetTypes.join(', ')}` });
    }

    // Si vienen imágenes nuevas por multer, manejalas aparte (opcional)
    // Aquí se asume que imágenes se actualizan por otro endpoint o no se manejan ahora

    const updatedProduct = await productService.updateProduct(id, data);
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error actualizando producto:', error);
    res.status(500).json({ error: 'Error interno actualizando producto' });
  }
};

export const remove = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await productService.deleteProduct(id);
  res.status(204).send();
};
