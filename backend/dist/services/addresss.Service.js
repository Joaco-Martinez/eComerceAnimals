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
exports.AddressService = void 0;
const db_1 = require("../db/db");
exports.AddressService = {
    getByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prisma.address.findMany({ where: { userId } });
        });
    },
    create(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield db_1.prisma.address.count({ where: { userId } });
            if (count >= 3) {
                throw new Error('Máximo 3 direcciones permitidas.');
            }
            return db_1.prisma.address.create({
                data: Object.assign(Object.assign({}, data), { userId }),
            });
        });
    },
    delete(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield db_1.prisma.address.findUnique({ where: { id } });
            if (!address || address.userId !== userId) {
                throw new Error('No autorizado');
            }
            return db_1.prisma.address.delete({ where: { id } });
        });
    },
};
