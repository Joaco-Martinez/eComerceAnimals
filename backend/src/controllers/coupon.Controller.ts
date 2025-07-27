// controllers/coupon.controller.ts
import { Request, Response } from 'express';
import { createCouponService, applyCoupon, deleteCoupon } from '../services/coupon.Service';

interface AuthRequest extends Request {
  userId?: string;
}

export const applyCouponController = async (req: AuthRequest, res: Response) => {
  const { code } = req.body;
  const userId = req.userId; 
  if (!userId) {
    return res.status(401).json({ message: 'No autenticado' });
  }
  console.log("CODIGOOOOOOOOO",code)
  try {
    const result = await applyCoupon(userId, code);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const deleteCouponController = async (req: Request, res: Response) => {
  const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }
  try {
    await deleteCoupon(id);
    res.status(200).json({ message: 'Cupón eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar el cupón' });
  }
};

export const createCoupon = async (req: Request, res: Response) => {
  try {
    const {
      code,
      description,
      discountType,
      value,
      maxUses,
      userLimit,
      expirationDate,
    } = req.body;

    if (!code || !discountType || !value || !maxUses || !userLimit) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const coupon = await createCouponService({
      code,
      description,
      discountType,
      value,
      maxUses,
      userLimit,
      expirationDate,
    });

    res.status(201).json(coupon);
  } catch (error) {
    console.error('Error al crear cupón:', error);
    res.status(500).json({ message: 'Error al crear cupón' });
  }
};
