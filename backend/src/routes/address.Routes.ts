import { Router } from 'express';
import { AddressController } from '../controllers/address.Controller';
import { authMiddleware } from '../middlewares/authMiddlewares';

const router = Router();

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
router.get('/', authMiddleware, AddressController.getByUser);

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
router.post('/', authMiddleware, AddressController.create);

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
router.delete('/:id', authMiddleware, AddressController.delete);

export default router;
