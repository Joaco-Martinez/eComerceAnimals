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
exports.authMiddleware = void 0;
const auth_1 = require("../utils/auth");
const db_1 = require("../db/db");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token)
        return res.status(401).json({ message: 'No autenticado' });
    const payload = (0, auth_1.verifyToken)(token);
    // ⚠️ Si no viene sessionId, el token no sirve
    if (!payload || !payload.sessionId || !payload.userId) {
        res.clearCookie('token');
        return res.status(401).json({ message: 'Token inválido' });
    }
    // // 🧾 opcional: log para debug
    // console.log("🔍 Token:", token);
    // console.log("🔍 Payload:", payload);
    const session = yield db_1.prisma.session.findUnique({
        where: { id: payload.sessionId },
    });
    if (!session ||
        session.isRevoked ||
        session.expiresAt < new Date() ||
        session.token !== token ||
        session.userId !== payload.userId) {
        res.clearCookie('token');
        return res.status(401).json({ message: 'Sesión inválida o expirada' });
    }
    req.userId = payload.userId;
    next();
});
exports.authMiddleware = authMiddleware;
