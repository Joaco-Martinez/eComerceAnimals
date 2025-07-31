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
exports.isInWishlist = exports.removeFromWishlist = exports.addToWishlist = exports.getWishlist = void 0;
const db_1 = require("../db/db");
const getWishlist = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.wishlistItem.findMany({
        where: { userId },
        include: {
            product: {
                include: {
                    images: true,
                    category: true,
                },
            },
        },
    });
});
exports.getWishlist = getWishlist;
const addToWishlist = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.wishlistItem.create({
        data: { userId, productId },
    });
});
exports.addToWishlist = addToWishlist;
const removeFromWishlist = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.wishlistItem.delete({
        where: {
            userId_productId: {
                userId,
                productId,
            },
        },
    });
});
exports.removeFromWishlist = removeFromWishlist;
const isInWishlist = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.wishlistItem.findUnique({
        where: {
            userId_productId: {
                userId,
                productId,
            },
        },
    });
});
exports.isInWishlist = isInWishlist;
