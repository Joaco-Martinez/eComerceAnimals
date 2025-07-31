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
exports.getEarningsByMonthController = exports.getEarningsByYearController = exports.getUnconvertedProducts = exports.registerProductView = exports.getOrdersByStatus = exports.getTopProducts = exports.getPaymentMethods = exports.getTopSizes = exports.getTopColors = exports.getTopCategories = exports.getPetTypeSales = exports.getOverview = void 0;
const stats_Service_1 = require("../services/stats.Service");
const getOverview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, stats_Service_1.getOverviewStatsService)();
    return res.status(200).json({ content: data });
});
exports.getOverview = getOverview;
const getPetTypeSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, stats_Service_1.getPetTypeSalesService)(); // rename si querés
    res.status(200).json({ content: data });
});
exports.getPetTypeSales = getPetTypeSales;
const getTopCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, stats_Service_1.getTopCategoriesSalesService)();
    res.status(200).json({ content: data });
});
exports.getTopCategories = getTopCategories;
const getTopColors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, stats_Service_1.getTopColorsSalesService)();
    res.status(200).json({ content: data });
});
exports.getTopColors = getTopColors;
const getTopSizes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, stats_Service_1.getTopSizesSalesService)();
    res.status(200).json({ content: data });
});
exports.getTopSizes = getTopSizes;
const getPaymentMethods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, stats_Service_1.getPaymentMethodsStatsService)();
    res.status(200).json({ content: data });
});
exports.getPaymentMethods = getPaymentMethods;
const getTopProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, stats_Service_1.getTopProductsSalesService)();
    res.status(200).json({ content: data });
});
exports.getTopProducts = getTopProducts;
const getOrdersByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, stats_Service_1.getOrdersByStatusService)();
    res.status(200).json({ content: data });
});
exports.getOrdersByStatus = getOrdersByStatus;
const registerProductView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const productId = req.params.id;
        const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null;
        yield (0, stats_Service_1.registerProductViewService)(productId, userId);
        res.sendStatus(204);
    }
    catch (error) {
        console.error('Error registrando vista', error);
        res.status(500).json({ error: 'Error al registrar vista' });
    }
});
exports.registerProductView = registerProductView;
const getUnconvertedProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, stats_Service_1.getUnconvertedProductsSerrvice)();
        res.status(200).json({ content: data });
    }
    catch (error) {
        console.error('Error al obtener productos no convertidos:', error);
        res.status(500).json({ error: 'Error al obtener productos no convertidos' });
    }
});
exports.getUnconvertedProducts = getUnconvertedProducts;
const getEarningsByYearController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const year = parseInt(req.params.year);
    if (isNaN(year))
        return res.status(400).json({ error: 'Año inválido' });
    try {
        const data = yield (0, stats_Service_1.getEarningsByYearService)(year);
        res.json(data);
    }
    catch (error) {
        console.error('Error al obtener ingresos por año:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.getEarningsByYearController = getEarningsByYearController;
const getEarningsByMonthController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);
    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
        return res.status(400).json({ error: 'Año o mes inválido' });
    }
    try {
        const data = yield (0, stats_Service_1.getEarningsByMonthService)(year, month);
        res.json(data);
    }
    catch (error) {
        console.error('Error al obtener ingresos por mes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.getEarningsByMonthController = getEarningsByMonthController;
