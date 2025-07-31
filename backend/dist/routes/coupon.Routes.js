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
// routes/coupon.routes.ts
const express_1 = require("express");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const isAdmin_1 = require("../middlewares/isAdmin");
const couponController = __importStar(require("../controllers/coupon.Controller"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * /coupons:
 *   post:
 *     summary: Crear un nuevo cupón
 *     tags: [Coupons]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - discountType
 *               - value
 *               - maxUses
 *               - userLimit
 *             properties:
 *               code:
 *                 type: string
 *               description:
 *                 type: string
 *               discountType:
 *                 type: string
 *                 enum: [percentage, fixed, free_shipping]
 *               value:
 *                 type: number
 *               maxUses:
 *                 type: integer
 *               userLimit:
 *                 type: integer
 *               expirationDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Cupón creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno
 */
router.post('/', couponController.createCoupon);
/**
 * @swagger
 * /coupons/apply:
 *   post:
 *     summary: Aplicar y validar un cupón
 *     tags: [Coupons]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "DESCUENTO10"
 *               totalAmount:
 *                 type: number
 *                 example: 1200
 *     responses:
 *       200:
 *         description: Cupón válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                 value:
 *                   type: number
 *                 discountAmount:
 *                   type: number
 *                 description:
 *                   type: string
 *       400:
 *         description: Cupón inválido
 */
router.post('/apply', authMiddlewares_1.authMiddleware, couponController.applyCouponController);
/**
 * @swagger
 * /coupons:
 *   get:
 *     summary: Obtener todos los cupones (requiere admin)
 *     tags: [Coupons]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de cupones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coupon'
 */
router.get('/', authMiddlewares_1.authMiddleware, isAdmin_1.isAdmin, couponController.getAllCouponsController);
/**
 * @swagger
 * /coupons/{id}:
 *   delete:
 *     summary: Eliminar un cupón
 *     tags: [Coupons]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cupón eliminado correctamente
 *       400:
 *         description: Error al eliminar el cupón
 */
router.delete('/:id', authMiddlewares_1.authMiddleware, isAdmin_1.isAdmin, couponController.deleteCouponController);
exports.default = router;
