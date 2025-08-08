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
exports.getOrdersByUserController = exports.getAllOrdersController = exports.getOrderByIdController = exports.updateOrderStatusController = exports.confirmPaymentController = exports.createOrderController = void 0;
const order_Service_1 = require("../services/order.Service");
const createOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId)
            return res.status(401).json({ message: 'No autenticado' });
        console.log(req.body);
        const order = yield (0, order_Service_1.createOrder)(userId, req.body);
        res.status(201).json({ success: true, content: order });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'No se pudo crear la orden' });
    }
});
exports.createOrderController = createOrderController;
const confirmPaymentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, token } = req.body;
    if (!orderId || !token) {
        return res.status(400).json({ error: 'Faltan datos: orderId o token' });
    }
    try {
        const order = yield (0, order_Service_1.confirmPaymentService)(orderId, token);
        return res.status(200).json(order);
    }
    catch (error) {
        console.error('Error al confirmar pago:', error.message);
        return res.status(400).json({ error: error.message });
    }
});
exports.confirmPaymentController = confirmPaymentController;
const updateOrderStatusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const updated = yield (0, order_Service_1.updateOrderStatus)(orderId, status);
        res.json({ success: true, content: updated, message: 'Estado actualizado' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'No se pudo actualizar el estado' });
    }
});
exports.updateOrderStatusController = updateOrderStatusController;
const getOrderByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const order = yield (0, order_Service_1.getOrderById)(orderId);
        res.json({ success: true, content: order });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'No se pudo obtener la orden' });
    }
});
exports.getOrderByIdController = getOrderByIdController;
const getAllOrdersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield (0, order_Service_1.getAllOrders)();
        res.status(200).json({ success: true, content: orders });
    }
    catch (error) {
        console.error("Error al obtener pedidos:", error);
        res.status(500).json({ success: false, message: "Error al obtener pedidos" });
    }
});
exports.getAllOrdersController = getAllOrdersController;
const getOrdersByUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId)
            return res.status(401).json({ message: 'No autenticado' });
        const orders = yield (0, order_Service_1.getOrdersByUser)(userId);
        res.status(200).json({ success: true, content: orders });
    }
    catch (error) {
        console.error("Error al obtener pedidos del usuario:", error);
        res.status(500).json({ success: false, message: "Error al obtener pedidos" });
    }
});
exports.getOrdersByUserController = getOrdersByUserController;
