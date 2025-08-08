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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductImage = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getFilteredProducts = exports.searchProductsService = exports.getProductById = exports.getAllProductsAdmin = exports.getAllProducts = void 0;
const db_1 = require("../db/db");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const stockNotification_Service_1 = require("./stockNotification.Service");
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const generateBackInStockTemplate_1 = require("../utils/generateBackInStockTemplate"); // si tenés template
const mjml_1 = __importDefault(require("mjml"));
const getAllProducts = () => db_1.prisma.product.findMany({
    where: { isActive: true },
    include: { category: true, images: true }
});
exports.getAllProducts = getAllProducts;
const getAllProductsAdmin = () => db_1.prisma.product.findMany({
    include: { category: true, images: true }
});
exports.getAllProductsAdmin = getAllProductsAdmin;
const getProductById = (id) => db_1.prisma.product.findUnique({
    where: { id, isActive: true },
    include: { category: true, images: true }
});
exports.getProductById = getProductById;
const searchProductsService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.prisma.product.findMany({
        where: {
            isActive: true,
            OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
            ],
        },
        include: {
            images: true,
            category: true,
        },
    });
});
exports.searchProductsService = searchProductsService;
const getFilteredProducts = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { petType, categoryId, sortBy } = filters;
    const where = {
        isActive: true,
    };
    if (petType === "dog" || petType === "cat") {
        where.petType = { in: [petType, "both"] };
    }
    if (categoryId) {
        where.categoryId = categoryId;
    }
    const orderBy = sortBy === "priceAsc"
        ? { price: "asc" }
        : sortBy === "priceDesc"
            ? { price: "desc" }
            : undefined;
    return db_1.prisma.product.findMany({
        where,
        orderBy,
        include: {
            category: true,
            images: true,
        },
    });
});
exports.getFilteredProducts = getFilteredProducts;
const createProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { images = [] } = data, productData = __rest(data, ["images"]);
    const uploadedImagesUrls = [];
    for (const file of images) {
        const result = yield cloudinary_1.default.uploader.upload(file.path, {
            folder: "products",
        });
        uploadedImagesUrls.push(result.secure_url);
    }
    return db_1.prisma.product.create({
        data: Object.assign(Object.assign({}, productData), { images: {
                create: uploadedImagesUrls.map(url => ({ url })),
            } }),
        include: {
            category: true,
            images: true,
        },
    });
});
exports.createProduct = createProduct;
const updateProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const existingProduct = yield db_1.prisma.product.findUnique({
        where: { id },
        include: { images: true },
    });
    if (!existingProduct)
        throw new Error('Producto no encontrado');
    const filteredData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));
    // 🔐 Validaciones manuales
    if ('stock' in filteredData && typeof filteredData.stock === 'number' && filteredData.stock < 0) {
        throw new Error('El stock no puede ser menor a 0');
    }
    if ('price' in filteredData && typeof filteredData.price === 'number' && filteredData.price < 0) {
        throw new Error('El precio no puede ser menor a 0');
    }
    if ('weight' in filteredData && typeof filteredData.weight === 'number' && filteredData.weight < 0) {
        throw new Error('El peso no puede ser menor a 0');
    }
    const updatedProduct = yield db_1.prisma.product.update({
        where: { id },
        data: filteredData,
        include: { images: true },
    });
    // 📦 Notificación si volvió al stock
    const wasOutOfStock = existingProduct.stock === 0;
    const isNowInStock = typeof updatedProduct.stock === 'number' && updatedProduct.stock > 0;
    if (wasOutOfStock && isNowInStock) {
        const subscribers = yield stockNotification_Service_1.StockNotificationService.getUnnotifiedSubscribers(id);
        const productImage = ((_b = (_a = updatedProduct.images) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url) || 'https://via.placeholder.com/600x400';
        for (const sub of subscribers) {
            const emailHtml = (0, mjml_1.default)((0, generateBackInStockTemplate_1.generateBackInStockEmailTemplate)({
                name: updatedProduct.name,
                image: productImage,
                productUrl: `https://punkypet.com.ar/productos/${updatedProduct.id}`,
            })).html;
            yield (0, sendEmail_1.default)({
                to: sub.email,
                subject: `¡${updatedProduct.name} está de nuevo en stock!`,
                html: emailHtml,
            });
        }
        yield stockNotification_Service_1.StockNotificationService.markAsNotified(subscribers.map((s) => s.id));
    }
    return updatedProduct;
});
exports.updateProduct = updateProduct;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 0. Si el producto tiene compras, lo desactivamos en vez de borrarlo
        const orderItemCount = yield db_1.prisma.orderItem.count({
            where: { productId: id }
        });
        if (orderItemCount > 0) {
            return yield db_1.prisma.product.update({
                where: { id },
                data: { isActive: false },
            });
        }
        // 1. Eliminar de carritos (logueados y anónimos)
        yield db_1.prisma.cartItem.deleteMany({ where: { productId: id } });
        yield db_1.prisma.anonCartItem.deleteMany({ where: { productId: id } });
        // 2. Eliminar imágenes
        yield db_1.prisma.image.deleteMany({ where: { productId: id } });
        // 3. Eliminar vistas
        yield db_1.prisma.productView.deleteMany({ where: { productId: id } });
        // 4. Eliminar producto
        return yield db_1.prisma.product.delete({ where: { id } });
    }
    catch (error) {
        console.error('Error al eliminar el producto:', error);
        throw new Error('No se pudo eliminar el producto');
    }
});
exports.deleteProduct = deleteProduct;
const deleteProductImage = (imageId) => __awaiter(void 0, void 0, void 0, function* () {
    const image = yield db_1.prisma.image.findUnique({
        where: { id: imageId },
    });
    if (!image) {
        throw new Error("Imagen no encontrada");
    }
    // Eliminar de Cloudinary (opcional)
    try {
        const publicId = extractCloudinaryPublicId(image.url);
        yield cloudinary_1.default.uploader.destroy(publicId);
    }
    catch (err) {
        console.warn("No se pudo eliminar de Cloudinary:", err);
    }
    // Eliminar de base de datos
    return yield db_1.prisma.image.delete({
        where: { id: imageId },
    });
});
exports.deleteProductImage = deleteProductImage;
// util para Cloudinary
const extractCloudinaryPublicId = (url) => {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return `products/${filename.split('.')[0]}`;
};
