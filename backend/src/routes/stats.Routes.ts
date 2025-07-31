import { Router } from 'express';
import { getOverview, getPetTypeSales, getTopCategories, getTopColors, getTopSizes, getPaymentMethods, getTopProducts, getOrdersByStatus, getEarningsByYearController,getUnconvertedProducts, registerProductView, getEarningsByMonthController  } from '../controllers/stats.Controller';
import { isAdmin } from '../middlewares/isAdmin';
import { authMiddleware } from '../middlewares/authMiddlewares';

const router = Router();

/**
 * @swagger
 * /admin/stats/overview:
 *   get:
 *     summary: Obtiene estadísticas generales del sistema
 *     tags:
 *       - Admin / Estadísticas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas generales del eCommerce
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: object
 *                   properties:
 *                     totalRevenue:
 *                       type: number
 *                       example: 254000
 *                     totalOrders:
 *                       type: integer
 *                       example: 63
 *                     avgTicket:
 *                       type: number
 *                       example: 4031.75
 *                     avgProductsPerOrder:
 *                       type: number
 *                       example: 2.57
 *       401:
 *         description: No autorizado (token inválido o sin permisos de admin)
 *       500:
 *         description: Error interno del servidor
 */
router.get('/overview', authMiddleware, isAdmin,  getOverview);

/**
 * @swagger
 * /admin/stats/pet-type-sales:
 *   get:
 *     summary: Obtiene ventas agrupadas por tipo de mascota
 *     tags:
 *       - Admin / Estadísticas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Ventas por tipo de mascota
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: object
 *                   example:
 *                     dog: 120
 *                     cat: 80
 *                     both: 35
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */
router.get('/pet-type-sales', authMiddleware, isAdmin,  getPetTypeSales);
/**
 * @swagger
 * /admin/stats/top-categories:
 *   get:
 *     summary: Obtiene las categorías más vendidas
 *     tags:
 *       - Admin / Estadísticas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorías más vendidas con cantidad total
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       categoryId:
 *                         type: string
 *                       name:
 *                         type: string
 *                       quantity:
 *                         type: number
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */
router.get('/top-categories', authMiddleware, isAdmin,  getTopCategories);

/**
 * @swagger
 * /admin/stats/top-colors:
 *   get:
 *     summary: Obtiene los colores más vendidos
 *     tags:
 *       - Admin / Estadísticas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de colores con mayor cantidad vendida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       color:
 *                         type: string
 *                       quantity:
 *                         type: number
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */
router.get('/top-colors', authMiddleware, isAdmin,  getTopColors);


/**
 * @swagger
 * /admin/stats/top-sizes:
 *   get:
 *     summary: Obtiene los talles más vendidos
 *     tags:
 *       - Admin / Estadísticas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de talles con mayor cantidad vendida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       size:
 *                         type: string
 *                       quantity:
 *                         type: number
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */
router.get('/top-sizes', authMiddleware, isAdmin,  getTopSizes);

/**
 * @swagger
 * /admin/stats/payment-methods:
 *   get:
 *     summary: Obtiene el uso de métodos de pago (transferencia o mercado pago)
 *     tags:
 *       - Admin / Estadísticas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista con cantidad de pagos por método
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       method:
 *                         type: string
 *                         example: "transferencia"
 *                       count:
 *                         type: number
 *                         example: 18
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */

router.get('/payment-methods', authMiddleware, isAdmin,  getPaymentMethods);

/**
 * @swagger
 * /admin/stats/top-products:
 *   get:
 *     summary: Obtiene los productos más vendidos
 *     tags:
 *       - Admin / Estadísticas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos más vendidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: string
 *                       name:
 *                         type: string
 *                       quantity:
 *                         type: number
 *                       imageUrl:
 *                         type: string
 *                         nullable: true
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */

router.get('/top-products', authMiddleware, isAdmin,  getTopProducts);

/**
 * @swagger
 * /admin/stats/orders-by-status:
 *   get:
 *     summary: Obtiene cantidad de órdenes agrupadas por estado
 *     tags:
 *       - Admin / Estadísticas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cantidad de órdenes por estado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       status:
 *                         type: string
 *                         enum: [pending, paid, processing, shipped, delivered, cancelled]
 *                       count:
 *                         type: number
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */

router.get('/orders-by-status', authMiddleware, isAdmin, getOrdersByStatus);


/**
 * @swagger
 * /admin/stats/products/{id}/view:
 *   post:
 *     summary: Registrar vista de un producto
 *     tags:
 *       - Admin / Estadísticas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto (UUID)
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *     responses:
 *       204:
 *         description: Vista registrada correctamente
 *       500:
 *         description: Error interno del servidor
 */

router.post('/products/:id/view', registerProductView);

/**
 * @swagger
 * /admin/stats/unconverted-products:
 *   get:
 *     summary: Obtener productos visualizados pero no vendidos
 *     tags:
 *       - Admin / Estadísticas
 *     responses:
 *       200:
 *         description: Lista de productos con vistas y sin ventas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: string
 *                       name:
 *                         type: string
 *                       views:
 *                         type: integer
 *                       imageUrl:
 *                         type: string
 *                         nullable: true
 *       500:
 *         description: Error interno del servidor
 */

router.get('/unconverted-products', authMiddleware, isAdmin, getUnconvertedProducts);


/**
 * @swagger
 * /admin/stats/earnings/year/{year}:
 *   get:
 *     summary: Obtener ingresos por mes en un año dado
 *     tags:
 *       - Admin / Estadísticas
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Año (por ejemplo, 2024)
 *     responses:
 *       200:
 *         description: Lista de ingresos por mes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   mes:
 *                     type: integer
 *                     example: 3
 *                   total:
 *                     type: number
 *                     format: float
 *                     example: 15000.5
 *       400:
 *         description: Año inválido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/earnings/year/:year', authMiddleware, isAdmin, getEarningsByYearController);

/**
 * @swagger
 * /admin/stats/earnings/month/{year}/{month}:
 *   get:
 *     summary: Obtener ingresos diarios de un mes específico
 *     tags:
 *       - Admin / Estadísticas
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Año (por ejemplo, 2024)
 *       - in: path
 *         name: month
 *         schema:
 *           type: integer
 *         required: true
 *         description: Mes (1 = enero, 12 = diciembre)
 *     responses:
 *       200:
 *         description: Lista de ingresos por día del mes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   dia:
 *                     type: integer
 *                     example: 15
 *                   total:
 *                     type: number
 *                     format: float
 *                     example: 2000
 *       400:
 *         description: Parámetros inválidos
 *       500:
 *         description: Error interno del servidor
 */

router.get('/earnings/month/:year/:month', authMiddleware, isAdmin, getEarningsByMonthController);
export default router;