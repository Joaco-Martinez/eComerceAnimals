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
exports.removeFromCart = exports.updateCartItem = exports.addToCart = exports.mergeAnonCartToUserCart = exports.cleanUserCart = exports.getUserCart = void 0;
const db_1 = require("../db/db");
const anonCart_Service_1 = require("./anonCart.Service");
const getUserCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.prisma.cart.findUnique({
        where: { userId },
        include: {
            items: {
                include: {
                    product: {
                        include: { images: true },
                    },
                },
            },
        },
    });
});
exports.getUserCart = getUserCart;
const cleanUserCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield db_1.prisma.cart.findUnique({ where: { userId } });
    if (!cart)
        return false;
    yield db_1.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    return true;
});
exports.cleanUserCart = cleanUserCart;
const mergeAnonCartToUserCart = (userId, cartId) => __awaiter(void 0, void 0, void 0, function* () {
    const anonCart = yield (0, anonCart_Service_1.getAnonCart)(cartId);
    if (!anonCart)
        throw new Error("AnonCart no encontrado");
    let userCart = yield db_1.prisma.cart.findUnique({ where: { userId } });
    if (!userCart) {
        userCart = yield db_1.prisma.cart.create({ data: { userId } });
    }
    for (const item of anonCart.items) {
        const existingItem = yield db_1.prisma.cartItem.findFirst({
            where: {
                cartId: userCart.id,
                productId: item.productId,
                color: item.color,
                size: item.size,
            },
        });
        if (existingItem) {
            yield db_1.prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + item.quantity },
            });
        }
        else {
            yield db_1.prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    color: item.color,
                    size: item.size,
                },
            });
        }
    }
    // Borrar primero los ítems del carrito anónimo
    yield db_1.prisma.anonCartItem.deleteMany({
        where: { cartId: cartId },
    });
    // Luego borrar el carrito anónimo
    yield db_1.prisma.anonCart.delete({
        where: { id: cartId },
    });
});
exports.mergeAnonCartToUserCart = mergeAnonCartToUserCart;
const addToCart = (userId, productId, quantity, color, size) => __awaiter(void 0, void 0, void 0, function* () {
    let cart = yield db_1.prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
        cart = yield db_1.prisma.cart.create({ data: { userId } });
    }
    const existingItem = yield db_1.prisma.cartItem.findFirst({
        where: { cartId: cart.id, productId, color, size },
    });
    if (existingItem) {
        return yield db_1.prisma.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + quantity },
        });
    }
    return yield db_1.prisma.cartItem.create({
        data: {
            cartId: cart.id,
            productId,
            quantity,
            color,
            size,
        },
    });
});
exports.addToCart = addToCart;
const updateCartItem = (userId, productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield db_1.prisma.cart.findUnique({ where: { userId } });
    if (!cart)
        throw new Error("Carrito no encontrado");
    return yield db_1.prisma.cartItem.updateMany({
        where: { cartId: cart.id, productId },
        data: { quantity },
    });
});
exports.updateCartItem = updateCartItem;
const removeFromCart = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield db_1.prisma.cart.findUnique({ where: { userId } });
    if (!cart)
        throw new Error("Carrito no encontrado");
    return yield db_1.prisma.cartItem.deleteMany({
        where: { cartId: cart.id, productId },
    });
});
exports.removeFromCart = removeFromCart;
