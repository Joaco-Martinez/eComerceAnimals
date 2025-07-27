import { Request, Response } from 'express';
import * as wishlistService from '../services/wishlist.Service';
import { AuthRequest } from '../middlewares/authMiddlewares';

export const getUserWishlist = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: 'No autenticado' });
  }
  
  const wishlist = await wishlistService.getWishlist(userId);
  return res.status(200).json({ content: wishlist });
};

export const toggleWishlistItem = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  const { productId } = req.body;
    if (!userId) {
    return res.status(401).json({ message: 'No autenticado' });
  }

  if (!productId) {
    return res.status(400).json({ error: 'Falta el productId' });
  }

  const exists = await wishlistService.isInWishlist(userId, productId);
  if (exists) {
    await wishlistService.removeFromWishlist(userId, productId);
    return res.status(200).json({ message: 'Producto eliminado de la wishlist' });
  } else {
    await wishlistService.addToWishlist(userId, productId);
    return res.status(200).json({ message: 'Producto agregado a la wishlist' });
  }
};
