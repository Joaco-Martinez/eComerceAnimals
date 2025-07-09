import { Request, Response } from 'express';
import * as cartService from '../services/cartService';
import { AuthRequest } from '../middlewares/authMiddlewares';

export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await cartService.getUserCart(req.userId!);
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el carrito' });
  }
};

export const addItem = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const item = await cartService.addToCart(req.userId!, productId, quantity);
    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar al carrito' });
  }
};

export const updateItem = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const item = await cartService.updateCartItem(req.userId!, productId, quantity);
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el carrito' });
  }
};

export const removeItem = async (req: AuthRequest, res: Response) => {
  try {
    const productId = Number(req.params.productId);
    await cartService.removeFromCart(req.userId!, productId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar del carrito' });
  }
};
