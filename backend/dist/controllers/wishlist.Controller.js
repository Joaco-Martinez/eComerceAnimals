"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.toggleWishlistItem = exports.getUserWishlist = void 0;
const wishlistService = __importStar(require("../services/wishlist.Service"));
const getUserWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ message: 'No autenticado' });
    }
    const wishlist = yield wishlistService.getWishlist(userId);
    return res.status(200).json({ content: wishlist });
});
exports.getUserWishlist = getUserWishlist;
const toggleWishlistItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { productId } = req.body;
    if (!userId) {
        return res.status(401).json({ message: 'No autenticado' });
    }
    if (!productId) {
        return res.status(400).json({ error: 'Falta el productId' });
    }
    const exists = yield wishlistService.isInWishlist(userId, productId);
    if (exists) {
        yield wishlistService.removeFromWishlist(userId, productId);
        return res.status(200).json({ message: 'Producto eliminado de la wishlist' });
    }
    else {
        yield wishlistService.addToWishlist(userId, productId);
        return res.status(200).json({ message: 'Producto agregado a la wishlist' });
    }
});
exports.toggleWishlistItem = toggleWishlistItem;
