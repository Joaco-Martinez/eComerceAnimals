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
exports.isAdmin = void 0;
const client_1 = require("@prisma/client");
const user_Service_1 = require("../services/user.Service");
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: 'No autenticado' });
        }
        const user = yield (0, user_Service_1.getUserById)(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        if (user.role !== client_1.Role.admin) {
            return res.status(403).json({ error: 'Acceso denegado: se requiere rol admin' });
        }
        next();
    }
    catch (err) {
        console.error('Error en isAdmin middleware:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.isAdmin = isAdmin;
