import { Router } from 'express';
import { createOrderController, updateOrderStatusController } from '../controllers/order.Controller';
import { authMiddleware } from '../middlewares/authMiddlewares';

const router = Router();

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crea una nueva orden (requiere login)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartItems:
 *                 type: array
 *                 items:
 *                   type: object
 *               addressId:
 *                 type: string
 *               shippingMethod:
 *                 type: string
 *                 enum: [domicilio, sucursal]
 *               paymentMethod:
 *                 type: string
 *                 enum: [transferencia, mercadopago]
 *     responses:
 *       201:
 *         description: Orden creada correctamente
 */
router.post('/', authMiddleware, createOrderController);

/**
 * @swagger
 * /orders/{orderId}/status:
 *   patch:
 *     summary: Cambiar el estado de una orden
 *     tags: [Orders]
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, paid, processing, shipped, delivered, cancelled]
 *     responses:
 *       200:
 *         description: Estado actualizado
 */
router.patch('/:orderId/status', authMiddleware, updateOrderStatusController);

export default router;
