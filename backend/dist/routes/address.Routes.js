"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const address_Controller_1 = require("../controllers/address.Controller");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   - name: Addresses
 *     description: Gestión de direcciones del usuario
 */
/**
 * @swagger
 * /addresses:
 *   get:
 *     summary: Obtener direcciones del usuario
 *     tags: [Addresses]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de direcciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 */
router.get('/', authMiddlewares_1.authMiddleware, address_Controller_1.AddressController.getByUser);
/**
 * @swagger
 * /addresses:
 *   post:
 *     summary: Crear nueva dirección
 *     tags: [Addresses]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddressInput'
 *     responses:
 *       201:
 *         description: Dirección creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       400:
 *         description: Límite alcanzado o datos inválidos
 */
router.post('/', authMiddlewares_1.authMiddleware, address_Controller_1.AddressController.create);
/**
 * @swagger
 * /addresses/{id}:
 *   delete:
 *     summary: Eliminar dirección por ID
 *     tags: [Addresses]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la dirección
 *     responses:
 *       204:
 *         description: Dirección eliminada
 *       404:
 *         description: Dirección no encontrada
 */
router.delete('/:id', authMiddlewares_1.authMiddleware, address_Controller_1.AddressController.delete);
exports.default = router;
