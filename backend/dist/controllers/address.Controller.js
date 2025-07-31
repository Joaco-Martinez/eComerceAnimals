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
exports.AddressController = exports.addressSchema = void 0;
const addresss_Service_1 = require("../services/addresss.Service");
const zod_1 = require("zod");
exports.addressSchema = zod_1.z.object({
    postalCode: zod_1.z.string().min(1),
    nombre: zod_1.z.string().min(1),
    apellido: zod_1.z.string().min(1),
    telefono: zod_1.z.string().min(1),
    dni: zod_1.z.string().min(1),
    provincia: zod_1.z.string().min(1),
    localidad: zod_1.z.string().min(1),
    calle: zod_1.z.string().min(1),
    piso: zod_1.z.string().optional(),
});
exports.AddressController = {
    getByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                if (!userId)
                    return res.status(401).json({ message: 'No autenticado' });
                const addresses = yield addresss_Service_1.AddressService.getByUser(userId);
                res.json(addresses);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error al obtener direcciones' });
            }
        });
    },
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.userId) {
                return res.status(401).json({ message: 'No autenticado' });
            }
            try {
                const parsedData = exports.addressSchema.parse(req.body);
                const newAddress = yield addresss_Service_1.AddressService.create(parsedData, req.userId);
                res.status(201).json(newAddress);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Error desconocido';
                res.status(400).json({ error: message });
            }
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.userId) {
                return res.status(401).json({ message: 'No autenticado' });
            }
            try {
                yield addresss_Service_1.AddressService.delete(req.params.id, req.userId);
                res.status(204).end();
            }
            catch (error) {
                res.status(404).json({ message: 'No se pudo eliminar la dirección' });
            }
        });
    },
};
