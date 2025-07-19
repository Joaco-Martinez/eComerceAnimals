import { Request, Response } from 'express';
import * as cartService from '../services/cart.Service';
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
    const { productId, quantity, color, size } = req.body;
    const item = await cartService.addToCart(req.userId!, productId, quantity, color, size);
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
    const productId = (req.params.productId);
    await cartService.removeFromCart(req.userId!, productId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar del carrito' });
  }
};

export const mergeAnonCart = async (req: AuthRequest, res: Response) => {
  try {
    const { anonCartId } = req.body;
    await cartService.mergeAnonCartToUserCart(req.userId!, anonCartId);
    res.status(200).json({ message: "Carrito fusionado con éxito" });
  } catch (error) {
    console.error("Error fusionando carrito:", error);
    res.status(500).json({ message: "Error al fusionar carritos" });
  }
};
