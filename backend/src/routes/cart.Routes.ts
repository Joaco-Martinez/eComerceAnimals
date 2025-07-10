import { Router } from 'express';
import * as cartController from '../controllers/cart.Controller';
import { authMiddleware } from '../middlewares/authMiddlewares';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Gestión del carrito de compras
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Obtener el carrito del usuario autenticado
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: No autorizado
 */
router.get('/', authMiddleware, cartController.getCart);

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Agregar un producto al carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItemInput'
 *     responses:
 *       200:
 *         description: Producto agregado al carrito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post('/add', authMiddleware, cartController.addItem);

/**
 * @swagger
 * /cart/update:
 *   put:
 *     summary: Actualizar cantidad de un producto en el carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItemInput'
 *     responses:
 *       200:
 *         description: Carrito actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.put('/update', authMiddleware, cartController.updateItem);

/**
 * @swagger
 * /cart/remove/{productId}:
 *   delete:
 *     summary: Eliminar un producto del carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a eliminar
 *     responses:
 *       204:
 *         description: Producto eliminado del carrito
 *       401:
 *         description: No autorizado
 */
router.delete('/remove/:productId', authMiddleware, cartController.removeItem);

export default router;
