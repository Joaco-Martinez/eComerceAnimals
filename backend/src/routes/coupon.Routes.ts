// routes/coupon.routes.ts
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddlewares';
import { isAdmin } from '../middlewares/isAdmin';
import * as couponController from '../controllers/coupon.Controller';

const router = Router();


/**
 * @swagger
 * /coupons:
 *   post:
 *     summary: Crear un nuevo cupón
 *     tags: [Coupons]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - discountType
 *               - value
 *               - maxUses
 *               - userLimit
 *             properties:
 *               code:
 *                 type: string
 *               description:
 *                 type: string
 *               discountType:
 *                 type: string
 *                 enum: [percentage, fixed, free_shipping]
 *               value:
 *                 type: number
 *               maxUses:
 *                 type: integer
 *               userLimit:
 *                 type: integer
 *               expirationDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Cupón creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno
 */
router.post('/',  couponController.createCoupon);

/**
 * @swagger
 * /coupons/apply:
 *   post:
 *     summary: Aplicar y validar un cupón
 *     tags: [Coupons]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "DESCUENTO10"
 *               totalAmount:
 *                 type: number
 *                 example: 1200
 *     responses:
 *       200:
 *         description: Cupón válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                 value:
 *                   type: number
 *                 discountAmount:
 *                   type: number
 *                 description:
 *                   type: string
 *       400:
 *         description: Cupón inválido
 */

router.post('/apply', authMiddleware, couponController.applyCouponController);

/**
 * @swagger
 * /coupons:
 *   get:
 *     summary: Obtener todos los cupones (requiere admin)
 *     tags: [Coupons]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de cupones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coupon'
 */
router.get('/', authMiddleware, isAdmin, couponController.getAllCouponsController);

/**
 * @swagger
 * /coupons/{id}:
 *   delete:
 *     summary: Eliminar un cupón
 *     tags: [Coupons]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cupón eliminado correctamente
 *       400:
 *         description: Error al eliminar el cupón
 */
router.delete('/:id', authMiddleware, isAdmin, couponController.deleteCouponController);



export default router;
