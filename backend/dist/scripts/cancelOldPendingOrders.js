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
exports.cancelOldPendingOrders = void 0;
const db_1 = require("../db/db");
const date_fns_1 = require("date-fns");
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const mjml_1 = __importDefault(require("mjml"));
const generateClientORderCancelledTemplate_1 = require("../utils/generateClientORderCancelledTemplate");
const generateInnternalOrderCancelledNotification_1 = require("../utils/generateInnternalOrderCancelledNotification");
const cancelOldPendingOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const expiredOrders = yield db_1.prisma.order.findMany({
        where: {
            status: 'pending',
            createdAt: {
                lt: (0, date_fns_1.subHours)(new Date(), 12),
            },
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
            user: true,
        },
    });
    for (const order of expiredOrders) {
        yield db_1.prisma.$transaction([
            db_1.prisma.order.update({
                where: { id: order.id },
                data: { status: 'cancelled' },
            }),
            ...order.items.map((item) => db_1.prisma.product.update({
                where: { id: item.productId },
                data: {
                    stock: { increment: item.quantity },
                },
            })),
        ]);
        // 📩 Email al cliente
        const mjmlCliente = (0, generateClientORderCancelledTemplate_1.generateClientOrderCancelledMjmlTemplate)({
            orderNumber: order.orderNumber,
            userName: order.user.name,
        });
        const { html: htmlCliente } = (0, mjml_1.default)(mjmlCliente);
        yield (0, sendEmail_1.default)({
            to: order.user.email,
            subject: `Tu pedido #${order.orderNumber} fue cancelado automáticamente`,
            html: htmlCliente,
        });
        // 📩 Email interno a la tienda
        const mjmlInterno = (0, generateInnternalOrderCancelledNotification_1.generateInternalOrderCancelledNotification)({
            userName: order.user.name,
            userEmail: order.user.email,
            orderNumber: order.orderNumber,
        });
        const { html: htmlInterno } = (0, mjml_1.default)(mjmlInterno);
        yield (0, sendEmail_1.default)({
            to: 'mascotiendavgbpets@gmail.com',
            subject: `Cancelación automática de pedido #${order.orderNumber}`,
            html: htmlInterno,
        });
    }
    console.log(`[CANCELADOR] ${expiredOrders.length} pedidos cancelados automáticamente.`);
});
exports.cancelOldPendingOrders = cancelOldPendingOrders;
