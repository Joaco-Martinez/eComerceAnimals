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
exports.me = exports.logout = exports.login = exports.verifyEmailCode = exports.register = void 0;
const authService = __importStar(require("../services/auth.Service"));
const db_1 = require("../db/db");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const { user, token } = yield authService.registerUser(name, email, password);
        res
            .cookie('token', token, {
            httpOnly: true,
            secure: false, // ⚠️ en desarrollo, NO puede ser true
            sameSite: 'lax', // 🔥 importante para que la cookie cruce entre localhost:3000 y 4000
        })
            .status(200)
            .json({ id: user.id, name: user.name, email: user.email });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.register = register;
const verifyEmailCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, code } = req.body;
        const { user, token, message } = yield authService.verifyEmailCode(email, code);
        res
            .cookie('token', token, {
            httpOnly: true,
            secure: false, // ⚠️ en desarrollo, NO puede ser true
            sameSite: 'lax', // 🔥 importante para que la cookie cruce entre localhost:3000 y 4000
        })
            .status(200)
            .json({
            message,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.verifyEmailCode = verifyEmailCode;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { user, token } = yield authService.loginUser(email, password);
        res
            .cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // ✅ true solo en producción con HTTPS
            sameSite: 'lax', // 🔥 permite cookies entre dominios en dev
            maxAge: 7 * 24 * 60 * 60 * 1000, // ✅ 7 días en milisegundos
        })
            .json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (token) {
        const session = yield db_1.prisma.session.findFirst({ where: { token } });
        if (session) {
            yield db_1.prisma.session.update({
                where: { id: session.id },
                data: { isRevoked: true },
            });
        }
    }
    res.clearCookie('token').json({ message: 'Sesión cerrada' });
});
exports.logout = logout;
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token)
            return res.status(401).json({ message: 'No autenticado' });
        const user = yield authService.getUserFromToken(token);
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            cart: user.cart,
            role: user.role,
        });
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
});
exports.me = me;
