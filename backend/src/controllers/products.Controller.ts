import { Request, Response } from 'express';
import * as productService from '../services/product.Service';

export const getAll = async (req: Request, res: Response) => {
  const products = await productService.getAllProducts();
  res.json(products);
};

export const getById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = await productService.getProductById(id);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(product);
};

export const create = async (req: Request, res: Response) => {
  const {
    name, description, price, stock, weight, size, color, categoryId, sku
  } = req.body;

  const files = req.files as Express.Multer.File[] | undefined;
  const imageUrls = files?.map(file => file.path) || [];

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
    images: imageUrls,
  });

  res.status(201).json(newProduct);
};

export const update = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updatedProduct = await productService.updateProduct(id, req.body);
  res.json(updatedProduct);
};

export const remove = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await productService.deleteProduct(id);
  res.status(204).send();
};
