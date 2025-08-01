import { Router } from "express";
import { mercadoPagoController } from "../controllers/mercadoPago.controller";

const router = Router();

/**
 * @swagger
 * /mercadopago/submit:
 *   post:
 *     summary: Crear preferencia de pago con Mercado Pago
 *     description: Crea una preferencia de pago a partir de un carrito de productos y devuelve la URL del Checkout Pro.
 *     tags:
 *       - MercadoPago
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "prod-1"
 *                     title:
 *                       type: string
 *                       example: "Collar para perro"
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *                     unit_price:
 *                       type: number
 *                       format: float
 *                       example: 1500.00
 *               metadata:
 *                 type: object
 *                 additionalProperties: true
 *                 example:
 *                   userId: 42
 *                   nota: "Entrega urgente"
 *     responses:
 *       200:
 *         description: URL del Checkout Pro generada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 init_point:
 *                   type: string
 *                   format: uri
 *                   example: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=1234567890"
 *       400:
 *         description: Error en los datos enviados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Debes enviar al menos un producto en 'items'"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al crear preferencia"
 */
router.post("/submit", mercadoPagoController.submit);

export default router;
