import { Request, Response } from 'express';
import { prisma } from '../db/db';
import { sendNotificationEmail, updateOrderTrackingNumber } from '../services/notificacion.service';

// Define AuthRequest interface if not already defined elsewhere
interface AuthRequest extends Request {
  userId?: string;
}

export const createNotification = async (req: Request, res: Response) => {
  try {
    const { userId, title, message, type } = req.body;

    // Crear notificación en la DB
    const notification = await prisma.notification.create({
      data: { userId, title, message, type },
    });

    // Obtener email del usuario para enviar notificación por mail
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user?.email) {
      await sendNotificationEmail(user.email, title, message);
    }

    res.status(201).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creando notificación' });
  }
};

export const updateTrackingController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { trackingNumber } = req.body;
  console.log("ERRORRRRR ACA",id, trackingNumber);
  if (!trackingNumber) {
    return res.status(400).json({ message: 'trackingNumber es requerido' });
  }

  try {
    const updatedOrder = await updateOrderTrackingNumber(id, trackingNumber);
    res.status(200).json({ message: 'Código de seguimiento actualizado y email enviado', order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error actualizando número de seguimiento' });
  }
};



export const getNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!; // ahora sí compila bien

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo notificaciones' });
  }
};
