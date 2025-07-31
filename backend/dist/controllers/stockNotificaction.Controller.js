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
exports.subscribeToStock = void 0;
const stockNotification_Service_1 = require("../services/stockNotification.Service");
const subscribeToStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, productId } = req.body;
    console.log(email, productId);
    if (!email || !productId) {
        return res.status(400).json({ error: "Email y productId son requeridos" });
    }
    try {
        const alreadyExists = yield stockNotification_Service_1.StockNotificationService.checkIfSubscribed(email, productId);
        if (alreadyExists) {
            res.status(400).json({ message: 'Ya estás suscripto para este producto' });
            return;
        }
        const subscription = yield stockNotification_Service_1.StockNotificationService.createSubscription(email, productId);
        res.status(201).json(subscription);
    }
    catch (error) {
        console.error("Error al suscribirse:", error);
        res.status(500).json({ error: "Error al procesar la suscripción" });
    }
});
exports.subscribeToStock = subscribeToStock;
