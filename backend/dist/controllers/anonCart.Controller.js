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
exports.UpdateItem = exports.clearCart = exports.removeItem = exports.addItem = exports.getCart = void 0;
const anonCartService = __importStar(require("../services/anonCart.Service"));
const cookieOptions_1 = require("../utils/cookieOptions");
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const AnonCartId = req.query.cartId;
    if (!AnonCartId)
        return res.status(400).json({ message: 'Falta AnonCartId' });
    try {
        const cart = yield anonCartService.getAnonCart(AnonCartId);
        res.json(cart !== null && cart !== void 0 ? cart : { id: AnonCartId, items: [] });
    }
    catch (error) {
        console.error("❌ Error al obtener carrito anónimo", error);
        res.status(500).json({ message: 'Error al obtener carrito anónimo' });
    }
});
exports.getCart = getCart;
const addItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { AnonCartId, productId, quantity, color, size } = req.body;
    if (!productId || !quantity || !color || !size)
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    try {
        if (!AnonCartId) {
            const newCart = yield anonCartService.createAnonCart();
            AnonCartId = newCart.id;
            // Setear cookie con el ID del nuevo carrito
            res.cookie("AnonCart_id", AnonCartId, (0, cookieOptions_1.getCookieOptionsHttpOnlyFalse)());
        }
        const item = yield anonCartService.addToAnonCart(AnonCartId, productId, quantity, color, size);
        res.status(201).json(item);
    }
    catch (error) {
        console.error("❌ Error al agregar al carrito anónimo", error);
        res.status(500).json({ message: 'Error al agregar al carrito', error });
    }
});
exports.addItem = addItem;
const removeItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartId, productId } = req.body;
    if (!cartId || !productId)
        return res.status(400).json({ message: 'Faltan datos' });
    try {
        yield anonCartService.removeFromAnonCart(cartId, productId);
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar del carrito' });
    }
});
exports.removeItem = removeItem;
const clearCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartId } = req.body;
    if (!cartId)
        return res.status(400).json({ message: 'Falta cartId' });
    try {
        yield anonCartService.clearAnonCart(cartId);
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al limpiar el carrito' });
    }
});
exports.clearCart = clearCart;
const UpdateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, quantity, color, size, cartId } = req.body;
    console.log("Actualizando carrito anónimo:", cartId);
    if (!cartId || !productId || !color || !size) {
        return res.status(400).json({ message: "Faltan datos necesarios." });
    }
    try {
        const updatedItem = yield anonCartService.updateAnonCartItem(cartId, productId, quantity, color, size);
        return res.status(200).json({ message: "Carrito actualizado", content: updatedItem });
    }
    catch (error) {
        console.error("Error al actualizar ítem del carrito anónimo:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.UpdateItem = UpdateItem;
