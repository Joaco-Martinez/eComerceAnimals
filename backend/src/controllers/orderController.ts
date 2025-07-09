import { Request, Response } from 'express';
import * as orderService from '../services/orderService';
import { AuthRequest } from '../middlewares/authMiddlewares';

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { addressId, couponCode } = req.body;
    const order = await orderService.createOrderFromCart(req.userId!, addressId, couponCode);
    res.status(201).json(order);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || 'Error al crear la orden' });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await orderService.getUserOrders(req.userId!);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener órdenes' });
  }
};
