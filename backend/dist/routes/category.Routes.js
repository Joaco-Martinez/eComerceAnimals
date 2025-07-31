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
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/category.routes.ts
const express_1 = require("express");
const categoryController = __importStar(require("../controllers/category.Controller"));
const upload_1 = require("../middlewares/upload");
const router = (0, express_1.Router)();
const isAdmin_1 = require("../middlewares/isAdmin");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
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
router.post("/", authMiddlewares_1.authMiddleware, isAdmin_1.isAdmin, upload_1.uploadCategoryImage, categoryController.createCategory);
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
router.put("/:id", authMiddlewares_1.authMiddleware, categoryController.updateCategory);
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
router.delete("/:id", authMiddlewares_1.authMiddleware, isAdmin_1.isAdmin, categoryController.deleteCategory);
exports.default = router;
