"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController = __importStar(require("../controllers/products.Controller"));
const upload_1 = __importDefault(require("../middlewares/upload"));
const isAdmin_1 = require("../middlewares/isAdmin");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const router = (0, express_1.Router)();
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
 * /products/images/{imageId}:
 *   delete:
 *     summary: Eliminar una imagen de un producto
 *     description: Elimina una imagen por su ID y también la borra de Cloudinary si corresponde.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: imageId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la imagen a eliminar
 *     responses:
 *       200:
 *         description: Imagen eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Imagen eliminada
 *                 image:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     url:
 *                       type: string
 *                     productId:
 *                       type: string
 *       400:
 *         description: Error al eliminar la imagen
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Imagen no encontrada
 */
router.delete('/images/:imageId', authMiddlewares_1.authMiddleware, isAdmin_1.isAdmin, productController.deleteProductImageController);
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
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
router.post('/', authMiddlewares_1.authMiddleware, isAdmin_1.isAdmin, upload_1.default, productController.create);
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del producto a actualizar
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
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 */
router.put('/:id', authMiddlewares_1.authMiddleware, isAdmin_1.isAdmin, upload_1.default, productController.update);
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Producto eliminado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 */
router.delete('/:id', authMiddlewares_1.authMiddleware, isAdmin_1.isAdmin, productController.remove);
exports.default = router;
