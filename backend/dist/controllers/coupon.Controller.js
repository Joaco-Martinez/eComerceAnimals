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
exports.createCoupon = exports.deleteCouponController = exports.applyCouponController = exports.getAllCouponsController = void 0;
const coupon_Service_1 = require("../services/coupon.Service");
const getAllCouponsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coupons = yield (0, coupon_Service_1.getAllCoupons)();
        res.status(200).json(coupons);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los cupones' });
    }
});
exports.getAllCouponsController = getAllCouponsController;
const applyCouponController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ message: 'No autenticado' });
    }
    try {
        const result = yield (0, coupon_Service_1.applyCoupon)(userId, code);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.applyCouponController = applyCouponController;
const deleteCouponController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }
    try {
        yield (0, coupon_Service_1.deleteCoupon)(id);
        res.status(200).json({ message: 'Cupón eliminado correctamente' });
    }
    catch (error) {
        res.status(400).json({ message: 'Error al eliminar el cupón' });
    }
});
exports.deleteCouponController = deleteCouponController;
const createCoupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, description, discountType, value, maxUses, userLimit, expirationDate, } = req.body;
        if (!code || !discountType || !value || !maxUses || !userLimit) {
            return res.status(400).json({ message: 'Faltan campos obligatorios' });
        }
        const coupon = yield (0, coupon_Service_1.createCouponService)({
            code,
            description,
            discountType,
            value,
            maxUses,
            userLimit,
            expirationDate,
        });
        res.status(201).json(coupon);
    }
    catch (error) {
        console.error('Error al crear cupón:', error);
        res.status(500).json({ message: 'Error al crear cupón' });
    }
});
exports.createCoupon = createCoupon;
