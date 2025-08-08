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
exports.updateOrderTrackingNumber = void 0;
exports.sendResetCodeEmail = sendResetCodeEmail;
exports.sendNotificationEmail = sendNotificationEmail;
// notificacion.service.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const emailTemplates_1 = require("../utils/emailTemplates");
const db_1 = require("../db/db");
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
function sendResetCodeEmail(email, code) {
    return __awaiter(this, void 0, void 0, function* () {
        const mailOptions = {
            from: `"Punky Pet" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Código para restablecer tu contraseña',
            text: `Tu código de recuperación es: ${code}`,
            html: `<p>Tu código de recuperación es: <b>${code}</b></p>`,
        };
        try {
            yield transporter.sendMail(mailOptions);
            console.log(`Código de recuperación enviado a ${email}`);
        }
        catch (error) {
            console.error('Error al enviar código:', error);
            throw error;
        }
    });
}
function sendNotificationEmail(to, subject, text, html) {
    return __awaiter(this, void 0, void 0, function* () {
        const mailOptions = {
            from: `Punky Pet <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
            html, // 📧 opcional
        };
        try {
            yield transporter.sendMail(mailOptions);
            console.log(`Email enviado a: ${to}`);
        }
        catch (error) {
            console.error('Error enviando email:', error);
            throw error;
        }
    });
}
const updateOrderTrackingNumber = (orderId, trackingNumber) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const updatedOrder = yield db_1.prisma.order.update({
        where: { id: orderId },
        data: { trackingNumber },
        include: {
            user: true,
            address: true,
            items: {
                include: { product: true },
            },
        },
    });
    if ((_a = updatedOrder.user) === null || _a === void 0 ? void 0 : _a.email) {
        const html = (0, emailTemplates_1.sendTrackingEmailTemplate)(updatedOrder);
        yield sendNotificationEmail(updatedOrder.user.email, `Tu pedido #${updatedOrder.orderNumber} fue despachado`, `Seguimiento disponible: ${trackingNumber}`, html);
    }
    return updatedOrder;
});
exports.updateOrderTrackingNumber = updateOrderTrackingNumber;
