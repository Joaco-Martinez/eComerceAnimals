// src/routes/category.routes.ts
import { Router } from "express";
import * as categoryController from "../controllers/category.Controller";
import {uploadProductImages, uploadCategoryImage}  from "../middlewares/upload";
const router = Router();
import { isAdmin } from '../middlewares/isAdmin'
import { authMiddleware } from '../middlewares/authMiddlewares';

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Operaciones sobre categorías
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Crear una nueva categoría con imagen y tipo de mascota
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - petType
 *             properties:
 *               name:
 *                 type: string
 *                 example: Accesorios para perros
 *               description:
 *                 type: string
 *               petType:
 *                 type: string
 *                 enum: [dog, cat, both]
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */


router.post("/",   authMiddleware, isAdmin, uploadCategoryImage, categoryController.createCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", categoryController.getAllCategories);

/**
 * @swagger
 * /categories/admin:
 *   get:
 *     summary: Obtener todas las categorías (requiere admin)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/admin", authMiddleware, isAdmin, categoryController.getAllCategoriesAdmin);


/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Obtener categoría por ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", categoryController.getCategoryById);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Actualizar categoría
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Smartphones Actualizados
 *               description:
 *                 type: string
 *                 example: Descripción actualizada
 *               image:
 *                 type: string
 *                 example: https://miweb.com/images/new-smartphones.jpg
 *     responses:
 *       200:
 *         description: Categoría actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */
router.put("/:id", authMiddleware, categoryController.updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Eliminar categoría
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       204:
 *         description: Categoría eliminada correctamente
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:id", authMiddleware, isAdmin, categoryController.deleteCategory);



export default router;
