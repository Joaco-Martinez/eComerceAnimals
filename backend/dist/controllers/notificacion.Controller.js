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
exports.getNotifications = exports.updateTrackingController = exports.createNotification = void 0;
const db_1 = require("../db/db");
const notificacion_service_1 = require("../services/notificacion.service");
const createNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, title, message, type } = req.body;
        // Crear notificación en la DB
        const notification = yield db_1.prisma.notification.create({
            data: { userId, title, message, type },
        });
        // Obtener email del usuario para enviar notificación por mail
        const user = yield db_1.prisma.user.findUnique({ where: { id: userId } });
        if (user === null || user === void 0 ? void 0 : user.email) {
            yield (0, notificacion_service_1.sendNotificationEmail)(user.email, title, message);
        }
        res.status(201).json(notification);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creando notificación' });
    }
});
exports.createNotification = createNotification;
const updateTrackingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { trackingNumber } = req.body;
    console.log("ERRORRRRR ACA", id, trackingNumber);
    if (!trackingNumber) {
        return res.status(400).json({ message: 'trackingNumber es requerido' });
    }
    try {
        const updatedOrder = yield (0, notificacion_service_1.updateOrderTrackingNumber)(id, trackingNumber);
        res.status(200).json({ message: 'Código de seguimiento actualizado y email enviado', order: updatedOrder });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error actualizando número de seguimiento' });
    }
});
exports.updateTrackingController = updateTrackingController;
const getNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId; // ahora sí compila bien
        const notifications = yield db_1.prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
        res.json(notifications);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error obteniendo notificaciones' });
    }
});
exports.getNotifications = getNotifications;
