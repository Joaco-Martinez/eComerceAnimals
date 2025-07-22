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


/**
 * @swagger
 * /cart/merge:
 *   post:
 *     summary: Fusionar carrito an nimo con el carrito de usuario
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - anonCartId
 *             properties:
 *               anonCartId:
 *                 type: string
 *                 description: ID del carrito anonimo a fusionar
 *     responses:
 *       200:
 *         description: Carrito fusionado con xito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Carrito fusionado con exito"
 *       400:
 *         description: Datos invalidos
 *       401:
 *         description: No autorizado
 */
router.post("/merge", authMiddleware, cartController.mergeAnonCart);

/**
 * @swagger
 * /cart/clean:
 *   delete:
 *     summary: Vaciar por completo el carrito del usuario
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito vaciado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Carrito vaciado correctamente"
 *       401:
 *         description: No autorizado
 */
router.delete('/clean', authMiddleware, cartController.cleanCart);

export default router;
