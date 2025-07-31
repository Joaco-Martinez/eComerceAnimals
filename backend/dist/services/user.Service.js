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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordWithCode = exports.generateResetCode = exports.deleteUser = exports.updateUserPassword = exports.getUserById = exports.getAllUsers = void 0;
const db_1 = require("../db/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () { return db_1.prisma.user.findMany(); });
exports.getAllUsers = getAllUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () { return db_1.prisma.user.findUnique({ where: { id } }); });
exports.getUserById = getUserById;
const updateUserPassword = (id, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
    return db_1.prisma.user.update({
        where: { id },
        data: {
            password: hashedPassword,
            resetPasswordCode: null,
            resetPasswordExpiresAt: null,
        },
    });
});
exports.updateUserPassword = updateUserPassword;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () { return db_1.prisma.user.delete({ where: { id } }); });
exports.deleteUser = deleteUser;
const generateResetCode = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.prisma.user.findUnique({ where: { email } });
    if (!user)
        throw new Error('Usuario no encontrado');
    const code = crypto_1.default.randomInt(100000, 999999).toString(); // código de 6 dígitos
    const expiration = new Date(Date.now() + 1000 * 60 * 10); // 10 min
    yield db_1.prisma.user.update({
        where: { email },
        data: {
            resetPasswordCode: code,
            resetPasswordExpiresAt: expiration,
        },
    });
    return { code, email };
});
exports.generateResetCode = generateResetCode;
const resetPasswordWithCode = (email, code, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.prisma.user.findUnique({ where: { email } });
    if (!user || user.resetPasswordCode !== code || !user.resetPasswordExpiresAt)
        throw new Error('Código inválido');
    if (user.resetPasswordExpiresAt < new Date())
        throw new Error('Código expirado');
    const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
    return db_1.prisma.user.update({
        where: { email },
        data: {
            password: hashedPassword,
            resetPasswordCode: null,
            resetPasswordExpiresAt: null,
        },
    });
});
exports.resetPasswordWithCode = resetPasswordWithCode;
