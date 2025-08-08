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
exports.getUserFromToken = exports.loginUser = exports.verifyEmailCode = exports.registerUser = void 0;
const user_Service_1 = require("./user.Service");
const db_1 = require("../db/db");
const auth_1 = require("../utils/auth");
const notificacion_service_1 = require("./notificacion.service");
const registerUser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield db_1.prisma.user.findUnique({ where: { email } });
    if (existingUser)
        throw new Error('Email ya registrado');
    const hashedPassword = yield (0, auth_1.hashPassword)(password);
    // 🔐 Código de verificación (15 min)
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const codeExpires = new Date(Date.now() + 1000 * 60 * 15);
    const user = yield db_1.prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            emailVerificationCode: code,
            emailVerificationExpires: codeExpires,
            cart: { create: {} },
        },
        include: { cart: true },
    });
    yield (0, notificacion_service_1.sendNotificationEmail)(email, 'Verificá tu correo', `Tu código de verificación es: ${code}`, `<p>Hola ${name},</p><p>Tu código de verificación es:</p><h2>${code}</h2><p>Este código vence en 24 horas, de lo contrario tu cuenta será eliminada</p>`);
    // No se crea sesión todavía. Solo se devuelve el token si querés auto-login
    return { user, token: null };
});
exports.registerUser = registerUser;
const verifyEmailCode = (email, code) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.prisma.user.findUnique({ where: { email } });
    if (!user || user.isEmailVerified)
        throw new Error('Usuario no encontrado o ya verificado');
    if (user.emailVerificationCode !== code)
        throw new Error('Código incorrecto');
    if (user.emailVerificationExpires &&
        user.emailVerificationExpires < new Date()) {
        yield db_1.prisma.user.delete({ where: { id: user.id } });
        throw new Error('El código expiró. Registrate de nuevo.');
    }
    const updatedUser = yield db_1.prisma.user.update({
        where: { email },
        data: {
            isEmailVerified: true,
            emailVerificationCode: null,
            emailVerificationExpires: null,
        },
    });
    // Crear sesión como parte de la verificación
    const session = yield db_1.prisma.session.create({
        data: {
            userId: updatedUser.id,
            token: '',
            expiresAt: new Date(Date.now() + 1000 * 60 * 60), // 1h
        },
    });
    const User = yield (0, user_Service_1.getUserById)(updatedUser.id);
    if (!User)
        throw new Error('Usuario no encontrado');
    const token = (0, auth_1.generateToken)(updatedUser.id, session.id, User.role);
    yield db_1.prisma.session.update({
        where: { id: session.id },
        data: { token },
    });
    return { user: updatedUser, token, message: 'Correo verificado con éxito' };
});
exports.verifyEmailCode = verifyEmailCode;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.prisma.user.findUnique({ where: { email } });
    if (!user)
        throw new Error('Credenciales inválidas');
    const validPassword = yield (0, auth_1.comparePassword)(password, user.password);
    if (!validPassword)
        throw new Error('Credenciales inválidas');
    const User = yield (0, user_Service_1.getUserById)(user.id);
    if (!User)
        throw new Error('Usuario no encontrado');
    // ✅ Primero generamos la sesión sin token para obtener el ID
    const session = yield db_1.prisma.session.create({
        data: {
            userId: user.id,
            token: '', // temporal
            expiresAt: new Date(Date.now() + 1000 * 60 * 60),
        },
    });
    // ✅ Generamos el token usando el session.id
    const token = (0, auth_1.generateToken)(user.id, session.id, User.role);
    // ✅ Actualizamos la sesión con el token real
    yield db_1.prisma.session.update({
        where: { id: session.id },
        data: { token },
    });
    console.log(session);
    return { user, token };
});
exports.loginUser = loginUser;
const getUserFromToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = (0, auth_1.verifyToken)(token);
    if (!payload)
        throw new Error('Token inválido');
    // Validar sesión
    const session = yield db_1.prisma.session.findUnique({
        where: { id: payload.sessionId },
    });
    if (!session ||
        session.isRevoked ||
        session.token !== token ||
        session.expiresAt < new Date()) {
        throw new Error('Sesión inválida o expirada');
    }
    const user = yield db_1.prisma.user.findUnique({
        where: { id: payload.userId },
        include: {
            cart: {
                include: {
                    items: { include: { product: true } },
                },
            },
        },
    });
    if (!user)
        throw new Error('Usuario no encontrado');
    return user;
});
exports.getUserFromToken = getUserFromToken;
