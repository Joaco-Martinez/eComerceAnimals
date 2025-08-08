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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mercadoPagoService = exports.handleMercadoPagoWebhook = void 0;
const mercadopago_1 = require("mercadopago");
const db_1 = require("../db/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const mercadopago = new mercadopago_1.MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
});
const handleMercadoPagoWebhook = (paymentId) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
        throw new Error('Mercado Pago access token no configurado');
    }
    // Consultar el pago a MP
    const response = yield axios_1.default.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const payment = response.data;
    if (payment.status !== 'approved')
        return;
    const orderId = payment.external_reference;
    if (!orderId)
        throw new Error('external_reference no encontrado');
    // Actualizar estado de la orden
    yield db_1.prisma.order.update({
        where: { id: orderId },
        data: { status: 'paid' },
    });
    return true;
});
exports.handleMercadoPagoWebhook = handleMercadoPagoWebhook;
exports.mercadoPagoService = {
    createPreference(_a) {
        return __awaiter(this, arguments, void 0, function* ({ items, orderId, }) {
            const tokenmp = jsonwebtoken_1.default.sign({ orderId }, process.env.JWT_SECRET, { expiresIn: '10m' });
            console.log("orderId", orderId);
            const preference = yield new mercadopago_1.Preference(mercadopago).create({
                body: {
                    items,
                    external_reference: orderId,
                    back_urls: {
                        success: `${process.env.URLSUCCESSMP}?orderId=${orderId}&token=${encodeURIComponent(tokenmp)}`,
                        failure: process.env.URLFAILEDMP,
                        pending: process.env.URLPENDINGMP,
                    },
                    auto_return: "approved",
                },
            });
            if (!preference.init_point)
                throw new Error("No se pudo generar init_point");
            return preference.init_point;
        });
    },
};
