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
exports.resetPassword = exports.forgotPassword = exports.deleteUser = exports.updateUserPassword = exports.getUserById = exports.getUsers = void 0;
const userService = __importStar(require("../services/user.Service"));
const notificacion_service_1 = require("../services/notificacion.service");
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService.getAllUsers();
        res.json(users);
    }
    catch (_a) {
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = String(req.params.id);
        const user = yield userService.getUserById(id);
        res.json(user);
    }
    catch (_a) {
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
});
exports.getUserById = getUserById;
const updateUserPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = String(req.params.id);
        const { password } = req.body;
        if (!password)
            return res.status(400).json({ message: 'La contraseña es requerida' });
        const updatedUser = yield userService.updateUserPassword(id, password);
        res.json({ message: 'Contraseña actualizada correctamente', userId: updatedUser.id });
    }
    catch (_a) {
        res.status(500).json({ message: 'Error al actualizar contraseña' });
    }
});
exports.updateUserPassword = updateUserPassword;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = String(req.params.id);
        yield userService.deleteUser(id);
        res.status(204).send();
    }
    catch (_a) {
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
});
exports.deleteUser = deleteUser;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(400).json({ message: 'Email requerido' });
        const { code } = yield userService.generateResetCode(email);
        yield (0, notificacion_service_1.sendResetCodeEmail)(email, code);
        res.json({ message: 'Código enviado al correo electrónico' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, code, newPassword } = req.body;
        if (!email || !code || !newPassword) {
            return res.status(400).json({ message: 'Faltan datos' });
        }
        yield userService.resetPasswordWithCode(email, code, newPassword);
        res.json({ message: 'Contraseña actualizada correctamente' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.resetPassword = resetPassword;
