import { Router } from 'express';
import * as anonCartController from '../controllers/anonCart.Controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: AnonymousCart
 *   description: Carrito sin login (usando cookie cart_id)
 */

/**
 * @swagger
 * /anon-cart:
 *   get:
 *     summary: Obtener carrito anónimo por cartId
 *     tags: [AnonymousCart]
 *     parameters:
 *       - in: query
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID del carrito
 *     responses:
 *       200:
 *         description: Carrito encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: cartId faltante
 */
router.get('/', anonCartController.getCart);

/**
 * @swagger
 * /anon-cart/add:
 *   post:
 *     summary: Agregar producto al carrito anónimo
 *     tags: [AnonymousCart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cartId
 *               - productId
 *               - quantity
 *             properties:
 *               cartId:
 *                 type: string
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Producto agregado
 *       400:
 *         description: Datos faltantes
 */
router.post('/add', anonCartController.addItem);

/**
 * @swagger
 * /anon-cart/remove:
 *   post:
 *     summary: Eliminar un producto del carrito anónimo
 *     tags: [AnonymousCart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cartId
 *               - productId
 *             properties:
 *               cartId:
 *                 type: string
 *               productId:
 *                 type: string
 *     responses:
 *       204:
 *         description: Producto eliminado
 *       400:
 *         description: Datos faltantes
 */
router.post('/remove', anonCartController.removeItem);

/**
 * @swagger
 * /anon-cart/clear:
  *   post:
 *     summary: Vaciar carrito anónimo
 *     tags: [AnonymousCart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cartId
 *             properties:
 *               cartId:
 *                 type: string
 *     responses:
 *       204:
 *         description: Carrito vaciado
 *       400:
 *         description: cartId faltante
 */
router.post('/clear', anonCartController.clearCart);

export default router;
