import { Request, Response } from 'express';
import * as anonCartService from '../services/anonCart.Service';

export const getCart = async (req: Request, res: Response) => {
  const AnonCartId = req.query.cartId as string;


  if (!AnonCartId) return res.status(400).json({ message: 'Falta AnonCartId' });

  try {
    const cart = await anonCartService.getAnonCart(AnonCartId);

    res.json(cart ?? { id: AnonCartId, items: [] });
  } catch (error) {
    console.error("❌ Error al obtener carrito anónimo", error);
    res.status(500).json({ message: 'Error al obtener carrito anónimo' });
  }
};

export const addItem = async (req: Request, res: Response) => {
  let { AnonCartId, productId, quantity, color, size } = req.body;

  if (!productId || !quantity || !color || !size)
    return res.status(400).json({ message: 'Faltan datos obligatorios' });

  try {
    
    if (!AnonCartId) {
      const newCart = await anonCartService.createAnonCart();
      AnonCartId = newCart.id;

      // Setear cookie con el ID del nuevo carrito
      res.cookie("AnonCart_id", AnonCartId, {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
        sameSite: "lax",
        secure: false, // poné true si estás en producción con HTTPS
      });
    }

    const item = await anonCartService.addToAnonCart(
      AnonCartId,
      productId,
      quantity,
      color,
      size
    );

    res.status(201).json(item);
  } catch (error) {
    console.error("❌ Error al agregar al carrito anónimo", error);
    res.status(500).json({ message: 'Error al agregar al carrito', error });
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


export const UpdateItem = async (req: Request, res: Response) => {
  const { productId, quantity, color, size, cartId } = req.body;
  console.log("Actualizando carrito anónimo:", cartId);

  if (!cartId || !productId || !color || !size) {
    return res.status(400).json({ message: "Faltan datos necesarios." });
  }

  try {
    const updatedItem = await anonCartService.updateAnonCartItem(cartId, productId, quantity, color, size);
    return res.status(200).json({ message: "Carrito actualizado", content: updatedItem });
  } catch (error) {
    console.error("Error al actualizar ítem del carrito anónimo:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};