"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const products_Routes_1 = __importDefault(require("./routes/products.Routes"));
const user_Routes_1 = __importDefault(require("./routes/user.Routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Auth_Routes_1 = __importDefault(require("./routes/Auth.Routes"));
const cart_Routes_1 = __importDefault(require("./routes/cart.Routes"));
const order_Routes_1 = __importDefault(require("./routes/order.Routes"));
const category_Routes_1 = __importDefault(require("./routes/category.Routes"));
const address_Routes_1 = __importDefault(require("./routes/address.Routes"));
const pagos_Routes_1 = __importDefault(require("./routes/pagos.Routes"));
const swaggerConfig_1 = require("./swaggerConfig");
const stockNotification_Routes_1 = __importDefault(require("./routes/stockNotification.Routes"));
const anonCart_Routes_1 = __importDefault(require("./routes/anonCart.Routes"));
const notificacion_Routes_1 = __importDefault(require("./routes/notificacion.Routes"));
const coupon_Routes_1 = __importDefault(require("./routes/coupon.Routes"));
const wishlist_Routes_1 = __importDefault(require("./routes/wishlist.Routes"));
const stats_Routes_1 = __importDefault(require("./routes/stats.Routes"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        const allowedOrigins = ['https://www.punkypet.com.ar', 'https://punkypet.com.ar', "http://localhost:3001"];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
exports.app.use(express_1.default.json());
exports.app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});
exports.app.use((0, morgan_1.default)("dev"));
exports.app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
    });
    next();
});
exports.app.get('/healthz', (req, res) => {
    res.status(200).send('OK');
});
exports.app.get('/', (_req, res) => {
    res.send('E-Commerce Backend funcionando!');
});
exports.app.use('/api', swaggerConfig_1.swaggerUiHandler, swaggerConfig_1.swaggerUiSetup);
exports.app.use('/auth', Auth_Routes_1.default);
exports.app.use('/users', user_Routes_1.default);
exports.app.use('/products', products_Routes_1.default);
exports.app.use('/cart', cart_Routes_1.default);
exports.app.use('/orders', order_Routes_1.default);
exports.app.use('/anon-cart', anonCart_Routes_1.default);
exports.app.use('/coupons', coupon_Routes_1.default);
exports.app.use("/mercadopago", pagos_Routes_1.default);
exports.app.use('/wishlist', wishlist_Routes_1.default);
exports.app.use("/categories", category_Routes_1.default);
exports.app.use("/stock-notifications", stockNotification_Routes_1.default);
exports.app.use("/notifications", notificacion_Routes_1.default);
exports.app.use('/addresses', address_Routes_1.default);
exports.app.use('/admin/stats', stats_Routes_1.default);
const PORT = parseInt(process.env.PORT || '3000', 10);
exports.app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});
