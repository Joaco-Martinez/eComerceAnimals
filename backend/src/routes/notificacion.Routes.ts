import { Router } from 'express';
import * as notificationController from '../controllers/notificacion.Controller';
import { authMiddleware } from '../middlewares/authMiddlewares';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Endpoints para gestionar notificaciones
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: integer
 *         title:
 *           type: string
 *         message:
 *           type: string
 *         type:
 *           type: string
 *           enum: [order, promo, payment, system]
 *         isRead:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     NotificationInput:
 *       type: object
 *       required:
 *         - userId
 *         - title
 *         - message
 *         - type
 *       properties:
 *         userId:
 *           type: integer
 *         title:
 *           type: string
 *         message:
 *           type: string
 *         type:
 *           type: string
 *           enum: [order, promo, payment, system]
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Obtener todas las notificaciones del usuario autenticado
 *     tags: [Notifications]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de notificaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       401:
 *         description: No autenticado
 *
 *   post:
 *     summary: Crear una nueva notificación y enviar email
 *     tags: [Notifications]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotificationInput'
 *     responses:
 *       201:
 *         description: Notificación creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 */

router.post('/', authMiddleware, notificationController.createNotification);
router.get('/', authMiddleware, notificationController.getNotifications);

export default router;
