"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/stockNotification.routes.ts
const express_1 = require("express");
const stockNotificaction_Controller_1 = require("../controllers/stockNotificaction.Controller");
const router = (0, express_1.Router)();
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
router.post("/", stockNotificaction_Controller_1.subscribeToStock);
exports.default = router;
