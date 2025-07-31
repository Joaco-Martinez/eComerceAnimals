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
exports.mergeAnonCart = exports.removeItem = exports.updateItem = exports.addItem = exports.cleanCart = exports.getCart = void 0;
const cartService = __importStar(require("../services/cart.Service"));
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId)
        return res.status(401).json({ message: 'No autorizado' });
    try {
        const cart = yield cartService.getUserCart(req.userId);
        res.json(cart);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el carrito' });
    }
});
exports.getCart = getCart;
const cleanCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId)
        return res.status(401).json({ message: 'No autorizado' });
    const cleaned = yield cartService.cleanUserCart(userId);
    if (!cleaned)
        return res.status(200).json({ message: 'Carrito ya está vacío' });
    return res.status(200).json({ message: 'Carrito vaciado correctamente' });
});
exports.cleanCart = cleanCart;
const addItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId)
        return res.status(401).json({ message: 'No autorizado' });
    try {
        const { productId, quantity, color, size } = req.body;
        const item = yield cartService.addToCart(req.userId, productId, quantity, color, size);
        res.status(201).json(item);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar al carrito' });
    }
});
exports.addItem = addItem;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId)
        return res.status(401).json({ message: 'No autorizado' });
    try {
        const { productId, quantity } = req.body;
        const item = yield cartService.updateCartItem(req.userId, productId, quantity);
        res.json(item);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el carrito' });
    }
});
exports.updateItem = updateItem;
const removeItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId)
        return res.status(401).json({ message: 'No autorizado' });
    try {
        const productId = (req.params.productId);
        yield cartService.removeFromCart(req.userId, productId);
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar del carrito' });
    }
});
exports.removeItem = removeItem;
const mergeAnonCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId)
        return res.status(401).json({ message: 'No autorizado' });
    try {
        const { anonCartId } = req.body;
        yield cartService.mergeAnonCartToUserCart(req.userId, anonCartId);
        res.status(200).json({ message: "Carrito fusionado con éxito" });
    }
    catch (error) {
        console.error("Error fusionando carrito:", error);
        res.status(500).json({ message: "Error al fusionar carritos" });
    }
});
exports.mergeAnonCart = mergeAnonCart;
