import { Request, Response } from 'express';
import { prisma } from '../db/db';
import { sendNotificationEmail } from '../services/notificacion.service';

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
