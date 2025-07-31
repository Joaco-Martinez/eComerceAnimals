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
exports.updateOrderStatus = exports.getOrdersByUser = exports.createOrder = exports.getOrderById = exports.getAllOrders = void 0;
const db_1 = require("../db/db");
const nanoid_1 = require("nanoid");
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const mjml_1 = __importDefault(require("mjml"));
const emailTemplates_1 = require("../utils/emailTemplates");
const generateSellerOrderTemplate_1 = require("../utils/generateSellerOrderTemplate");
const calculateOrderTotals_1 = require("../utils/calculateOrderTotals");
const buildVisualItems_1 = require("../utils/buildVisualItems");
const nanoid = (0, nanoid_1.customAlphabet)('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.order.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    email: true, // si querés mostrarlo
                },
            },
            address: true,
            items: {
                select: {
                    product: true,
                    quantity: true,
                    color: true,
                    size: true,
                }
            }
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
});
exports.getAllOrders = getAllOrders;
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.order.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                },
            },
            address: true,
            items: {
                select: {
                    product: true,
                    quantity: true,
                    color: true,
                    size: true,
                }
            }
        },
    });
});
exports.getOrderById = getOrderById;
const createOrder = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const coupon = data.couponId
        ? yield db_1.prisma.coupon.findUnique({ where: { id: data.couponId } })
        : null;
    const { productSubtotal, transferenciaDiscount, transferDiscountValue, couponDiscountValue, shippingCost, totalAmount, } = (0, calculateOrderTotals_1.calculateOrderTotals)({
        cartItems: data.cartItems,
        paymentMethod: data.paymentMethod,
        coupon,
    });
    const orderNumber = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${nanoid()}`;
    const lowStockAlerts = [];
    const order = yield db_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        for (const item of data.cartItems) {
            const product = yield tx.product.findUnique({
                where: { id: item.productId },
                select: { stock: true, name: true, sku: true, id: true },
            });
            if (!product)
                throw new Error(`Producto no encontrado: ${item.productId}`);
            if (product.stock < item.quantity) {
                throw new Error(`Stock insuficiente para ${product.name}`);
            }
            const updated = yield tx.product.update({
                where: { id: item.productId },
                data: {
                    stock: { decrement: item.quantity },
                },
                select: { stock: true },
            });
            if (updated.stock <= 3) {
                lowStockAlerts.push({
                    id: product.id,
                    name: product.name,
                    sku: (_a = product.sku) !== null && _a !== void 0 ? _a : 'SIN SKU',
                    newStock: updated.stock,
                });
            }
        }
        const priceDetail = {
            subtotal: productSubtotal,
            shippingCost,
            discountTransfer: {
                applied: transferenciaDiscount > 0,
                percentage: transferenciaDiscount,
                value: transferDiscountValue,
            },
            discountCoupon: coupon
                ? {
                    applied: true,
                    type: coupon.discountType,
                    value: coupon.value,
                    amount: couponDiscountValue,
                }
                : { applied: false },
            total: totalAmount,
        };
        return yield tx.order.create({
            data: {
                userId,
                addressId: data.addressId,
                shippingMethod: data.shippingMethod,
                orderNumber,
                totalAmount,
                couponId: data.couponId,
                status: data.paymentMethod === 'transferencia' ? 'pending' : 'paid',
                priceDetail,
                items: {
                    create: data.cartItems.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        unitPrice: item.price,
                        color: item.color,
                        size: item.size,
                    })),
                },
                payment: {
                    create: {
                        method: data.paymentMethod,
                        status: data.paymentMethod === 'transferencia' ? 'pending' : 'paid',
                        amount: totalAmount,
                    },
                },
            },
            select: {
                id: true,
                orderNumber: true,
                totalAmount: true,
                shippingMethod: true,
                status: true,
                user: { select: { email: true, name: true } },
                address: {
                    select: {
                        calle: true,
                        localidad: true,
                        provincia: true,
                        postalCode: true,
                    },
                },
                items: {
                    select: {
                        productId: true,
                        quantity: true,
                        unitPrice: true,
                        color: true,
                        size: true,
                        product: { select: { name: true } },
                    },
                },
            },
        });
    }));
    const visualItems = (0, buildVisualItems_1.buildVisualItems)(order.items, {
        shippingCost,
        coupon,
        couponDiscountValue,
        transferDiscountValue,
    });
    const orderForEmail = {
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        shippingMethod: order.shippingMethod,
        user: {
            name: order.user.name,
            email: order.user.email,
        },
        address: order.address,
        items: visualItems,
    };
    yield (0, sendEmail_1.default)({
        to: order.user.email,
        subject: 'Punky Pet - Orden creada',
        html: data.paymentMethod === 'transferencia'
            ? (0, emailTemplates_1.generateTransferEmailTemplate)(orderForEmail)
            : (0, emailTemplates_1.generateOrderEmailTemplate)(orderForEmail),
    });
    yield (0, sendEmail_1.default)({
        to: "mascotiendavgbpets@gmail.com",
        subject: `🛍️ Nueva orden #${order.orderNumber}`,
        html: data.paymentMethod === 'transferencia'
            ? (0, generateSellerOrderTemplate_1.generateTransferEmailForSellerTemplate)(orderForEmail)
            : (0, generateSellerOrderTemplate_1.generateOrderEmailForSellerTemplate)(orderForEmail)
    });
    yield Promise.all(lowStockAlerts.map((product) => (0, sendEmail_1.default)({
        to: 'mascotiendavgbpets@gmail.com',
        subject: `⚠️ Stock bajo: ${product.name}`,
        html: (0, mjml_1.default)((0, emailTemplates_1.generateLowStockAlertEmailTemplate)(product.name, product.sku, product.id, product.newStock)).html,
    })));
    return order;
});
exports.createOrder = createOrder;
const getOrdersByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield db_1.prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            orderNumber: true,
            totalAmount: true,
            status: true,
            createdAt: true,
        },
    });
    return orders;
});
exports.getOrdersByUser = getOrdersByUser;
const updateOrderStatus = (orderId, status) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.prisma.order.update({
        where: { id: orderId },
        data: { status },
    });
});
exports.updateOrderStatus = updateOrderStatus;
