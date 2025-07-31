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
exports.clearAnonCart = exports.removeFromAnonCart = exports.updateAnonCartItem = exports.addToAnonCart = exports.createAnonCart = exports.getAnonCart = void 0;
const db_1 = require("../db/db");
const uuid_1 = require("uuid");
const getAnonCart = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.prisma.anonCart.findUnique({
        where: { id: cartId },
        include: {
            items: {
                include: {
                    product: {
                        include: {
                            images: true, // 
                        },
                    },
                },
            },
        },
    });
});
exports.getAnonCart = getAnonCart;
const createAnonCart = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.prisma.anonCart.create({
        data: { id: (0, uuid_1.v4)() },
    });
});
exports.createAnonCart = createAnonCart;
const addToAnonCart = (AnonCartId, productId, quantity, color, size) => __awaiter(void 0, void 0, void 0, function* () {
    let cart = yield db_1.prisma.anonCart.findUnique({ where: { id: AnonCartId } });
    if (!cart) {
        cart = yield db_1.prisma.anonCart.create({ data: { id: AnonCartId } });
    }
    const existingItem = yield db_1.prisma.anonCartItem.findFirst({
        where: { cartId: cart.id, productId, color, size },
    });
    if (existingItem) {
        return yield db_1.prisma.anonCartItem.update({
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + quantity },
        });
    }
    return yield db_1.prisma.anonCartItem.create({
        data: {
            cartId: cart.id,
            productId,
            quantity,
            color,
            size,
        },
    });
});
exports.addToAnonCart = addToAnonCart;
const updateAnonCartItem = (cartId, productId, quantity, color, size) => __awaiter(void 0, void 0, void 0, function* () {
    const existingItem = yield db_1.prisma.anonCartItem.findFirst({
        where: { cartId, productId, color, size },
    });
    if (!existingItem) {
        throw new Error("Producto no encontrado en el carrito");
    }
    if (quantity <= 0) {
        return yield db_1.prisma.anonCartItem.delete({
            where: { id: existingItem.id },
        });
    }
    return yield db_1.prisma.anonCartItem.update({
        where: { id: existingItem.id },
        data: { quantity },
    });
});
exports.updateAnonCartItem = updateAnonCartItem;
const removeFromAnonCart = (cartId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.prisma.anonCartItem.deleteMany({
        where: { cartId, productId },
    });
});
exports.removeFromAnonCart = removeFromAnonCart;
const clearAnonCart = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.prisma.anonCartItem.deleteMany({
        where: { cartId },
    });
});
exports.clearAnonCart = clearAnonCart;
