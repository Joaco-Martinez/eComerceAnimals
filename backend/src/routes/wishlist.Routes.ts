import { Router } from 'express';
import { getUserWishlist, toggleWishlistItem } from '../controllers/wishlist.Controller';
import { authMiddleware } from '../middlewares/authMiddlewares';

const router = Router();

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Obtener la lista de deseos del usuario autenticado
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de deseos obtenida
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       401:
 *         description: No autorizado
 */
router.get('/', authMiddleware, getUserWishlist);

/**
 * @swagger
 * /wishlist/toggle:
 *   post:
 *     summary: Agregar o quitar un producto de la lista de deseos
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto agregado o removido de la lista de deseos
 *       401:
 *         description: No autorizado
 */
router.post('/toggle', authMiddleware, toggleWishlistItem);

export default router;
