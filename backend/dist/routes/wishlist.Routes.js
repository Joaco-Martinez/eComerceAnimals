"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wishlist_Controller_1 = require("../controllers/wishlist.Controller");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const router = (0, express_1.Router)();
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
router.get('/', authMiddlewares_1.authMiddleware, wishlist_Controller_1.getUserWishlist);
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
router.post('/toggle', authMiddlewares_1.authMiddleware, wishlist_Controller_1.toggleWishlistItem);
exports.default = router;
