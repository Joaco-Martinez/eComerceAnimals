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
exports.getEarningsByMonthService = exports.getEarningsByYearService = exports.registerProductViewService = exports.getUnconvertedProductsSerrvice = exports.getOrdersByStatusService = exports.getTopProductsSalesService = exports.getPaymentMethodsStatsService = exports.getTopSizesSalesService = exports.getTopColorsSalesService = exports.getTopCategoriesSalesService = exports.getPetTypeSalesService = exports.getOverviewStatsService = void 0;
const db_1 = require("../db/db");
const date_fns_1 = require("date-fns");
const getOverviewStatsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const paidOrders = yield db_1.prisma.order.findMany({
        where: {
            status: { in: ['paid', 'shipped', 'delivered'] },
        },
        include: {
            items: true,
        },
    });
    const totalRevenue = paidOrders.reduce((acc, o) => acc + o.totalAmount, 0);
    const totalOrders = paidOrders.length;
    const totalUnits = paidOrders.reduce((acc, o) => acc + o.items.reduce((sum, item) => sum + item.quantity, 0), 0);
    return {
        totalRevenue,
        totalOrders,
        avgTicket: totalOrders > 0 ? +(totalRevenue / totalOrders).toFixed(2) : 0,
        avgProductsPerOrder: totalOrders > 0 ? +(totalUnits / totalOrders).toFixed(2) : 0,
    };
});
exports.getOverviewStatsService = getOverviewStatsService;
const getPetTypeSalesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.orderItem.findMany({
        include: {
            product: {
                select: {
                    petType: true,
                },
            },
            order: {
                select: { status: true },
            },
        },
    });
    const filtered = result.filter((item) => ['paid', 'shipped', 'delivered'].includes(item.order.status));
    const petTypeCount = {};
    for (const item of filtered) {
        const type = item.product.petType;
        petTypeCount[type] = (petTypeCount[type] || 0) + item.quantity;
    }
    // ✅ Convertimos el objeto en array
    const formatted = Object.entries(petTypeCount).map(([petType, cantidad]) => ({
        petType,
        cantidad,
    }));
    return formatted;
});
exports.getPetTypeSalesService = getPetTypeSalesService;
const getTopCategoriesSalesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const orderItems = yield db_1.prisma.orderItem.findMany({
        include: {
            product: {
                select: {
                    category: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
            order: {
                select: {
                    status: true,
                },
            },
        },
    });
    const filtered = orderItems.filter((item) => ['paid', 'shipped', 'delivered'].includes(item.order.status));
    const categoryCount = {};
    for (const item of filtered) {
        const categoryId = item.product.category.id;
        const categoryName = item.product.category.name;
        if (!categoryCount[categoryId]) {
            categoryCount[categoryId] = { name: categoryName, quantity: 0 };
        }
        categoryCount[categoryId].quantity += item.quantity;
    }
    // Convertir en array ordenado
    return Object.entries(categoryCount)
        .map(([id, data]) => (Object.assign({ categoryId: id }, data)))
        .sort((a, b) => b.quantity - a.quantity);
});
exports.getTopCategoriesSalesService = getTopCategoriesSalesService;
const getTopColorsSalesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield db_1.prisma.orderItem.findMany({
        include: {
            order: {
                select: { status: true },
            },
        },
    });
    const filtered = items.filter((item) => ['paid', 'shipped', 'delivered'].includes(item.order.status));
    const colorCount = {};
    for (const item of filtered) {
        const color = item.color;
        colorCount[color] = (colorCount[color] || 0) + item.quantity;
    }
    return Object.entries(colorCount)
        .map(([color, quantity]) => ({ color, quantity }))
        .sort((a, b) => b.quantity - a.quantity);
});
exports.getTopColorsSalesService = getTopColorsSalesService;
const getTopSizesSalesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield db_1.prisma.orderItem.findMany({
        include: {
            order: {
                select: { status: true },
            },
        },
    });
    const filtered = items.filter((item) => ['paid', 'shipped', 'delivered'].includes(item.order.status));
    const sizeCount = {};
    for (const item of filtered) {
        const size = item.size;
        sizeCount[size] = (sizeCount[size] || 0) + item.quantity;
    }
    return Object.entries(sizeCount)
        .map(([size, quantity]) => ({ size, quantity }))
        .sort((a, b) => b.quantity - a.quantity);
});
exports.getTopSizesSalesService = getTopSizesSalesService;
const getPaymentMethodsStatsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const pagos = yield db_1.prisma.payment.findMany({
        where: { status: 'paid' },
    });
    const metodoCount = {};
    for (const pago of pagos) {
        const metodo = pago.method;
        metodoCount[metodo] = (metodoCount[metodo] || 0) + 1;
    }
    return Object.entries(metodoCount).map(([method, count]) => ({
        method,
        count,
    }));
});
exports.getPaymentMethodsStatsService = getPaymentMethodsStatsService;
const getTopProductsSalesService = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const items = yield db_1.prisma.orderItem.findMany({
        include: {
            order: {
                select: { status: true },
            },
            product: {
                select: {
                    id: true,
                    name: true,
                    images: { take: 1 },
                },
            },
        },
    });
    const filtered = items.filter((item) => ['paid', 'shipped', 'delivered'].includes(item.order.status));
    const productCount = {};
    for (const item of filtered) {
        const { id, name, images } = item.product;
        if (!productCount[id]) {
            productCount[id] = {
                name,
                quantity: 0,
                imageUrl: (_b = (_a = images[0]) === null || _a === void 0 ? void 0 : _a.url) !== null && _b !== void 0 ? _b : null,
            };
        }
        productCount[id].quantity += item.quantity;
    }
    return Object.entries(productCount)
        .map(([productId, data]) => (Object.assign({ productId }, data)))
        .sort((a, b) => b.quantity - a.quantity);
});
exports.getTopProductsSalesService = getTopProductsSalesService;
const getOrdersByStatusService = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield db_1.prisma.order.groupBy({
        by: ['status'],
        _count: {
            status: true,
        },
    });
    return orders.map((o) => ({
        status: o.status,
        count: o._count.status,
    }));
});
exports.getOrdersByStatusService = getOrdersByStatusService;
const getUnconvertedProductsSerrvice = () => __awaiter(void 0, void 0, void 0, function* () {
    const views = yield db_1.prisma.productView.groupBy({
        by: ['productId'],
        _count: { productId: true },
    });
    const ventas = yield db_1.prisma.orderItem.groupBy({
        by: ['productId'],
        _sum: { quantity: true },
    });
    const ventasMap = new Map(ventas.map((v) => { var _a; return [v.productId, (_a = v._sum.quantity) !== null && _a !== void 0 ? _a : 0]; }));
    // Filtrar productos sin ventas y ordenar por vistas descendente
    const unconverted = views
        .filter((v) => { var _a; return ((_a = ventasMap.get(v.productId)) !== null && _a !== void 0 ? _a : 0) === 0; })
        .sort((a, b) => b._count.productId - a._count.productId);
    const result = yield db_1.prisma.product.findMany({
        where: {
            id: { in: unconverted.map((u) => u.productId) },
        },
        select: {
            id: true,
            name: true,
            images: { take: 1 },
        },
    });
    return unconverted.map((u) => {
        var _a, _b, _c, _d;
        const prod = result.find((p) => p.id === u.productId);
        return {
            productId: (_a = prod === null || prod === void 0 ? void 0 : prod.id) !== null && _a !== void 0 ? _a : u.productId,
            name: (_b = prod === null || prod === void 0 ? void 0 : prod.name) !== null && _b !== void 0 ? _b : 'Producto desconocido',
            views: u._count.productId,
            imageUrl: (_d = (_c = prod === null || prod === void 0 ? void 0 : prod.images[0]) === null || _c === void 0 ? void 0 : _c.url) !== null && _d !== void 0 ? _d : null,
        };
    });
});
exports.getUnconvertedProductsSerrvice = getUnconvertedProductsSerrvice;
const registerProductViewService = (productId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.prisma.productView.create({
        data: {
            productId,
            userId: userId !== null && userId !== void 0 ? userId : null,
        },
    });
});
exports.registerProductViewService = registerProductViewService;
const getEarningsByYearService = (year) => __awaiter(void 0, void 0, void 0, function* () {
    const months = Array.from({ length: 12 }, (_, i) => i); // 0 (enero) a 11 (diciembre)
    const earnings = yield Promise.all(months.map((month) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const start = new Date(year, month, 1);
        const end = (0, date_fns_1.endOfMonth)(start);
        const result = yield db_1.prisma.order.aggregate({
            where: {
                status: 'paid',
                createdAt: {
                    gte: start,
                    lte: end,
                },
            },
            _sum: { totalAmount: true },
        });
        return {
            mes: month + 1, // Para mostrar como "1 = enero"
            total: (_a = result._sum.totalAmount) !== null && _a !== void 0 ? _a : 0,
        };
    })));
    return earnings;
});
exports.getEarningsByYearService = getEarningsByYearService;
const getEarningsByMonthService = (year, month) => __awaiter(void 0, void 0, void 0, function* () {
    const days = Array.from({ length: (0, date_fns_1.getDaysInMonth)(new Date(year, month - 1)) }, (_, i) => i + 1);
    const earnings = yield Promise.all(days.map((day) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const start = new Date(year, month - 1, day, 0, 0, 0);
        const end = (0, date_fns_1.endOfDay)(start);
        const result = yield db_1.prisma.order.aggregate({
            where: {
                status: 'paid',
                createdAt: {
                    gte: start,
                    lte: end,
                },
            },
            _sum: { totalAmount: true },
        });
        return {
            dia: day,
            total: (_a = result._sum.totalAmount) !== null && _a !== void 0 ? _a : 0,
        };
    })));
    return earnings;
});
exports.getEarningsByMonthService = getEarningsByMonthService;
