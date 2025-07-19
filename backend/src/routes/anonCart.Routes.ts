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
 *               - AnonCartId
 *               - productId
 *               - quantity
 *               - color
 *               - size
 *             properties:
 *               AnonCartId:
 *                 type: string
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               color:
 *                 type: string
 *               size:
 *                 type: string
 *     responses:
 *       201:
 *         description: Producto agregado
 *       400:
 *         description: Datos faltantes
 */
router.post('/add', anonCartController.addItem);

/**
 * @swagger
 * /anon-cart/update:
 *   put:
 *     summary: Actualizar cantidad de un producto en el carrito anónimo
 *     tags: [AnonymousCart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *               - color
 *               - size
 *             properties:
 *               productId:
 *                 type: string
 *                 format: uuid
 *                 example: "a1b2c3d4-e5f6-7890-abcd-1234567890ef"
 *               quantity:
 *                 type: integer
 *                 example: 2
 *               color:
 *                 type: string
 *                 example: "#ffffff"
 *               size:
 *                 type: string
 *                 example: "M"
 *     responses:
 *       200:
 *         description: Ítem actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Carrito actualizado
 *                 content:
 *                   type: object
 *       400:
 *         description: Faltan datos necesarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Faltan datos necesarios.
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 */
router.put("/update", anonCartController.UpdateItem);

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
