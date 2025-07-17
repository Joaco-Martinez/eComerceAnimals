import { Request, Response } from 'express';
import * as anonCartService from '../services/anonCart.Service';

export const getCart = async (req: Request, res: Response) => {
  const cartId = req.query.cartId as string;
  if (!cartId) return res.status(400).json({ message: 'Falta cartId' });

  try {
    const cart = await anonCartService.getAnonCart(cartId);
    res.json(cart ?? { id: cartId, items: [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener carrito anónimo' });
  }
};

export const addItem = async (req: Request, res: Response) => {
  const { cartId, productId, quantity } = req.body;

  if (!cartId || !productId || !quantity)
    return res.status(400).json({ message: 'Faltan datos' });

  try {
    const item = await anonCartService.addToAnonCart(cartId, productId, quantity);
    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar al carrito' });
  }
};

export const removeItem = async (req: Request, res: Response) => {
  const { cartId, productId } = req.body;

  if (!cartId || !productId)
    return res.status(400).json({ message: 'Faltan datos' });

  try {
    await anonCartService.removeFromAnonCart(cartId, productId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar del carrito' });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  const { cartId } = req.body;
  if (!cartId) return res.status(400).json({ message: 'Falta cartId' });

  try {
    await anonCartService.clearAnonCart(cartId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al limpiar el carrito' });
  }
};
