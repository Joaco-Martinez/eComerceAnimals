import { Router } from 'express';
import * as productController from '../controllers/products.Controller';
import upload from '../middlewares/upload';

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
 *     summary: Obtener productos filtrados por tipo de mascota
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: petType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [dog, cat, both]
 *         description: Tipo de mascota
 *     responses:
 *       200:
 *         description: Lista de productos filtrados por petType
 *       400:
 *         description: petType inválido
 */
router.get('/pet/:petType', productController.getByPetType);

/**
 * @swagger
 * /products/category/{id}:
 *   get:
 *     summary: Obtener productos filtrados por categoría
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Lista de productos filtrados por categoría
 *       400:
 *         description: ID de categoría inválido
 */
router.get('/category/:id', productController.getByCategory);

/**
 * @swagger
 * /products/filter:
 *   get:
 *     summary: Obtener productos filtrados por tipo de mascota y categoría (query params)
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: petType
 *         schema:
 *           type: string
 *           enum: [dog, cat, both]
 *         description: Tipo de mascota (opcional)
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: ID de categoría (opcional)
 *     responses:
 *       200:
 *         description: Lista de productos filtrados
 *       400:
 *         description: Parámetros inválidos
 */
router.get('/filter', productController.getByPetAndCategory);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', productController.getById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un nuevo producto (con imágenes)
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
 *                 type: integer
 *               petType:
 *                 type: string
 *                 enum: [dog, cat, both]
 *                 description: Tipo de mascota (dog, cat, both)
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Producto creado
 */
router.post('/', upload.array('images'), productController.create);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar un producto (puede incluir nuevas imágenes)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
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
 *                 type: integer
 *               petType:
 *                 type: string
 *                 enum: [dog, cat, both]
 *                 description: Tipo de mascota (dog, cat, both)
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       400:
 *         description: petType inválido
 *       404:
 *         description: Producto no encontrado
 */
router.put('/:id', upload.array('images'), productController.update);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       204:
 *         description: Producto eliminado correctamente
 *       404:
 *         description: Producto no encontrado
 */
router.delete('/:id', productController.remove);

export default router;
