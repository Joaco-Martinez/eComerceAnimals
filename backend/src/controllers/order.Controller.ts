import { Request, Response } from 'express';
import { createOrder, updateOrderStatus, getOrdersByUser, getAllOrders, getOrderById } from '../services/order.Service';
import { AuthRequest } from '../middlewares/authMiddlewares';
import { me } from './auth.Controller';
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
    res.json({ success: true, content: updated, message: 'Estado actualizado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'No se pudo actualizar el estado' });
  }
};

export const getOrderByIdController = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await getOrderById(orderId);
    res.json({ success: true, content: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'No se pudo obtener la orden' });
  }
}

export const getAllOrdersController = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json({ success: true, content: orders });
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({ success: false, message: "Error al obtener pedidos" });
  }
}


export const getOrdersByUserController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId; 
    if(!userId) return res.status(401).json({ message: 'No autenticado' });
    const orders = await getOrdersByUser(userId);
    res.status(200).json({ success: true, content: orders });
  } catch (error) {
    console.error("Error al obtener pedidos del usuario:", error);
    res.status(500).json({ success: false, message: "Error al obtener pedidos" });
  }
};