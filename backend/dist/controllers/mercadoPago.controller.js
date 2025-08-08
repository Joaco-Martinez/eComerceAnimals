"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mercadoPagoController = void 0;
const mercadoPago_service_1 = require("../services/mercadoPago.service");
const mercadoPago_service_2 = require("../services/mercadoPago.service");
exports.mercadoPagoController = {
    // 🎯 POST /api/mercadopago/submit
    submit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { items, orderId } = req.body;
            if (!Array.isArray(items) || items.length === 0) {
                return res.status(400).json({ error: "Debes enviar al menos un producto en 'items'" });
            }
            if (!orderId) {
                return res.status(400).json({ error: "Falta el 'orderId'" });
            }
            try {
                const initPoint = yield mercadoPago_service_2.mercadoPagoService.createPreference({ items, orderId });
                res.json({ init_point: initPoint });
            }
            catch (error) {
                console.error("Error al crear preferencia:", error);
                res.status(500).json({ error: error.message || "Error al crear preferencia" });
            }
        });
    },
    // 🎯 POST /api/mercadopago/webhook
    webhook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type, data } = req.body;
                if (type === 'payment' && (data === null || data === void 0 ? void 0 : data.id)) {
                    yield (0, mercadoPago_service_1.handleMercadoPagoWebhook)(data.id);
                }
                res.sendStatus(200);
            }
            catch (error) {
                console.error('Error en webhook de Mercado Pago:', error);
                res.sendStatus(500);
            }
        });
    }
};
