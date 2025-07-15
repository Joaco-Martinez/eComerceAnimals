// src/routes/stockNotification.routes.ts
import { Router } from "express";
import { subscribeToStock } from "../controllers/stockNotificaction.Controller";

const router = Router();

/**
 * @swagger
 * /stock-notifications:
 *   post:
 *     summary: Suscribirse a notificación de stock
 *     tags: [StockNotifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - productId
 *             properties:
 *               email:
 *                 type: string
 *                 example: cliente@example.com
 *               productId:
 *                 type: integer
 *                 example: 12
 *     responses:
 *       201:
 *         description: Suscripción registrada correctamente
 *       400:
 *         description: Ya estás suscripto para este producto
 *       500:
 *         description: Error interno del servidor
 */

router.post("/", subscribeToStock);

export default router;
