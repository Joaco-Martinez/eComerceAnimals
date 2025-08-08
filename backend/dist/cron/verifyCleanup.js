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
const node_cron_1 = __importDefault(require("node-cron"));
const deleteUnverifiedUsers_1 = require("../scripts/deleteUnverifiedUsers");
const cancelOldPendingOrders_1 = require("../scripts/cancelOldPendingOrders");
// Ejecutar todos los días a las 3 AM
node_cron_1.default.schedule('0 3 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, deleteUnverifiedUsers_1.deleteUnverifiedUsers)();
}));
node_cron_1.default.schedule('5 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, cancelOldPendingOrders_1.cancelOldPendingOrders)();
}));
