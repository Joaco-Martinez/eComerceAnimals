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
exports.createCouponService = exports.deleteCoupon = exports.applyCoupon = exports.getAllCoupons = void 0;
// services/coupon.service.ts
const db_1 = require("../db/db");
const getAllCoupons = () => __awaiter(void 0, void 0, void 0, function* () { return db_1.prisma.coupon.findMany(); });
exports.getAllCoupons = getAllCoupons;
const applyCoupon = (userId, code) => __awaiter(void 0, void 0, void 0, function* () {
    const coupon = yield db_1.prisma.coupon.findUnique({ where: { code } });
    console.log("couponnnnn", coupon);
    if (!coupon)
        throw new Error('Cupón no encontrado');
    if (!coupon.active || (coupon.expirationDate && new Date() > coupon.expirationDate)) {
        throw new Error('Este cupón ha expirado o está inactivo');
    }
    if (coupon.usedCount >= coupon.maxUses) {
        throw new Error('Este cupón ya alcanzó el límite de usos');
    }
    const alreadyUsed = yield db_1.prisma.userCoupon.findFirst({
        where: { userId, couponId: coupon.id },
    });
    if (alreadyUsed) {
        throw new Error('Ya utilizaste este cupón');
    }
    // Registrar uso
    yield db_1.prisma.$transaction([
        db_1.prisma.userCoupon.create({
            data: {
                userId,
                couponId: coupon.id,
                usedAt: new Date(),
            },
        }),
        db_1.prisma.coupon.update({
            where: { id: coupon.id },
            data: {
                usedCount: { increment: 1 },
            },
        }),
    ]);
    return {
        type: coupon.discountType,
        value: coupon.value,
        description: coupon.description,
        id: coupon.id,
    };
});
exports.applyCoupon = applyCoupon;
const deleteCoupon = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingOrders = yield db_1.prisma.order.findMany({
        where: { couponId: id },
        select: { id: true },
    });
    if (existingOrders.length > 0) {
        throw new Error('No se puede eliminar: el cupón está siendo usado en órdenes existentes.');
    }
    return yield db_1.prisma.coupon.delete({ where: { id } });
});
exports.deleteCoupon = deleteCoupon;
const createCouponService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, description, discountType, value, maxUses, userLimit, expirationDate, } = data;
    const existing = yield db_1.prisma.coupon.findUnique({
        where: { code },
    });
    if (existing) {
        throw new Error(`Ya existe un cupón con el código "${code}"`);
    }
    return db_1.prisma.coupon.create({
        data: {
            code,
            description,
            discountType,
            value,
            maxUses,
            userLimit,
            expirationDate: expirationDate ? new Date(expirationDate) : null,
        },
    });
});
exports.createCouponService = createCouponService;
