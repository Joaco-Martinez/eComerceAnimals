import { Router } from 'express';
import * as productController from '../controllers/products.Controller';
import uploadProductImages from '../middlewares/upload';
import { isAdmin } from '../middlewares/isAdmin'
import { authMiddleware } from '../middlewares/authMiddlewares';
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operaciones sobre productos
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de todos los productos
 */
router.get('/', productController.getAll);

/**
 * @swagger
 * /products/pet/{petType}:
 *   get:
 *     summary: Obtener productos por tipo de mascota
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: petType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [dog, cat, both]
 *         description: Tipo de mascota
 */
router.get('/pet/:petType', productController.getByPetType);

/**
 * @swagger
 * /products/category/{id}:
 *   get:
 *     summary: Obtener productos por categoría
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la categoría
 */
router.get('/category/:id', productController.getByCategory);

/**
 * @swagger
 * /products/filter:
 *   get:
 *     summary: Filtrar productos por tipo de mascota, categoría y orden
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: petType
 *         required: false
 *         schema:
 *           type: string
 *           enum: [dog, cat, both]
 *         description: Tipo de mascota
 *       - in: query
 *         name: categoryId
 *         required: false
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la categoría
 *       - in: query
 *         name: sortBy
 *         required: false
 *         schema:
 *           type: string
 *           enum: [relevance, priceAsc, priceDesc]
 *           default: relevance
 *         description: Orden de los productos (por relevancia, precio ascendente o descendente)
 *     responses:
 *       200:
 *         description: Lista de productos filtrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/filter', productController.getByPetAndCategory);


/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Buscar productos por nombre o descripción
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Término de búsqueda (nombre o descripción)
 *     responses:
 *       200:
 *         description: Lista de productos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       400:
 *         description: Query inválida
 *       500:
 *         description: Error interno del servidor
 */
router.get('/search', productController.searchProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 */
router.get('/:id', productController.getById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - stock
 *               - categoryId
 *               - petType
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               weight:
 *                 type: number
 *               size:
 *                 type: string
 *               color:
 *                 type: string
 *               sku:
 *                 type: string
 *               categoryId:
 *                 type: string
 *                 format: uuid
 *               petType:
 *                 type: string
 *                 enum: [dog, cat, both]
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 */
router.post('/',  authMiddleware, isAdmin, uploadProductImages, productController.create);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 */
router.put('/:id', authMiddleware, isAdmin, uploadProductImages, productController.update);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 */
router.delete('/:id', authMiddleware, isAdmin, productController.remove);

export default router;
