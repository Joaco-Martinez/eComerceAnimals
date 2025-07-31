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
exports.mercadoPagoService = void 0;
const mercadopago_1 = require("mercadopago");
const mercadopago = new mercadopago_1.MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
});
exports.mercadoPagoService = {
    createPreference(items, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            const preference = yield new mercadopago_1.Preference(mercadopago).create({
                body: {
                    items,
                    metadata,
                    back_urls: {
                        success: process.env.URLFAILEDMP,
                        failure: process.env.URLSUCCESSMP,
                        pending: process.env.URLPENDINGMP,
                    },
                    auto_return: "approved",
                },
            });
            if (!preference.init_point)
                throw new Error("No se pudo generar init_point");
            return preference.init_point;
        });
    },
};
