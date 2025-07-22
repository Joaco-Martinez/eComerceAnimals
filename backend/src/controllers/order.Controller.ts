import { Request, Response } from 'express';
import { createOrder, updateOrderStatus } from '../services/order.Service';
import { AuthRequest } from '../middlewares/authMiddlewares';
export const createOrderController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if(!userId) return res.status(401).json({ message: 'No autenticado' });
    const order = await createOrder(userId, req.body);
    res.status(201).json({ success: true, content: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'No se pudo crear la orden' });
  }
};

export const updateOrderStatusController = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updated = await updateOrderStatus(orderId, status);
    res.json({ success: true, content: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'No se pudo actualizar el estado' });
  }
};
