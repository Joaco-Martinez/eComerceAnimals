import { Request, Response } from 'express';
import * as productService from '../services/product.Service';

export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const product = await productService.getProductById(id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener producto' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, image, categoryId } = req.body;
    const newProduct = await productService.createProduct({ name, description, price, stock, image, categoryId });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear producto' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const updated = await productService.updateProduct(id, data);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar producto' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await productService.deleteProduct(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
};