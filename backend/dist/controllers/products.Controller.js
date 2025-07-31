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
exports.remove = exports.searchProducts = exports.deleteProductImageController = exports.update = exports.create = exports.getById = exports.getByPetAndCategory = exports.getByCategory = exports.getByPetType = exports.getAll = void 0;
const productService = __importStar(require("../services/product.Service"));
const validPetTypes = ['dog', 'cat', 'both'];
const validSortBy = ['relevance', 'priceAsc', 'priceDesc'];
const db_1 = require("../db/db");
const getAll = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productService.getFilteredProducts({});
    res.json(products);
});
exports.getAll = getAll;
const getByPetType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { petType } = req.params;
    if (!validPetTypes.includes(petType)) {
        return res.status(400).json({ error: `petType inválido. Debe ser uno de: ${validPetTypes.join(', ')}` });
    }
    const products = yield productService.getFilteredProducts({ petType: petType });
    res.json(products);
});
exports.getByPetType = getByPetType;
const getByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    if (!categoryId) {
        return res.status(400).json({ error: 'categoryId inválido' });
    }
    const products = yield productService.getFilteredProducts({ categoryId });
    res.json(products);
});
exports.getByCategory = getByCategory;
const getByPetAndCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { petType, categoryId, sortBy } = req.query;
    if (petType && !validPetTypes.includes(petType)) {
        return res.status(400).json({ error: `petType inválido. Debe ser uno de: ${validPetTypes.join(', ')}` });
    }
    if (sortBy && !validSortBy.includes(sortBy)) {
        return res.status(400).json({ error: `sortBy inválido. Debe ser uno de: ${validSortBy.join(', ')}` });
    }
    const filters = {
        petType: petType,
        categoryId: categoryId ? String(categoryId) : undefined,
        sortBy: sortBy,
    };
    const products = yield productService.getFilteredProducts(filters);
    res.json(products);
});
exports.getByPetAndCategory = getByPetAndCategory;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const product = yield productService.getProductById(id);
    if (!product)
        return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
});
exports.getById = getById;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, stock, weight, size, color, categoryId, sku, petType } = req.body;
        if (!petType || !validPetTypes.includes(petType)) {
            return res.status(400).json({ error: `petType debe ser uno de: ${validPetTypes.join(', ')}` });
        }
        const files = req.files;
        const newProduct = yield productService.createProduct({
            name,
            description,
            price: parseFloat(price),
            stock: parseInt(stock),
            weight: weight ? parseFloat(weight) : undefined,
            size: size ? JSON.parse(size) : [],
            color: color ? JSON.parse(color) : [],
            categoryId,
            sku,
            images: files || [],
            petType,
        });
        res.status(201).json(newProduct);
    }
    catch (error) {
        console.error('Error creando producto:', error);
        res.status(500).json({ error: 'Error interno creando producto' });
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { name, description, price, stock, weight, size, color, categoryId, sku, petType } = req.body;
        if (petType && !validPetTypes.includes(petType)) {
            return res.status(400).json({ error: `petType debe ser uno de: ${validPetTypes.join(', ')}` });
        }
        const updatedProduct = yield productService.updateProduct(id, {
            name,
            description,
            price: price !== undefined ? parseFloat(price) : undefined,
            stock: stock !== undefined ? parseInt(stock) : undefined,
            weight: weight !== undefined ? parseFloat(weight) : undefined,
            size: typeof size === 'string' ? size.split(',') : size,
            color: typeof color === 'string' ? color.split(',') : color,
            categoryId: categoryId || undefined,
            sku,
            petType,
        });
        res.json(updatedProduct);
    }
    catch (error) {
        console.error('Error actualizando producto:', error);
        res.status(500).json({ error: 'Error interno actualizando producto' });
    }
});
exports.update = update;
const deleteProductImageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { imageId } = req.params;
    try {
        const deleted = yield productService.deleteProductImage(imageId);
        return res.status(200).json({ message: 'Imagen eliminada', image: deleted });
    }
    catch (error) {
        return res.status(400).json({ error: error.message || 'Error al eliminar imagen' });
    }
});
exports.deleteProductImageController = deleteProductImageController;
const searchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { q } = req.query;
    console.log("Query recibida:", q);
    // TEST MANUAL para ver si hay productos con "ajustable"
    const test = yield db_1.prisma.product.findMany({
        where: {
            OR: [
                { name: { contains: "ajustable", mode: "insensitive" } },
                { description: { contains: "ajustable", mode: "insensitive" } },
            ],
        },
    });
    console.log("Resultados test:", test);
    if (typeof q !== "string" || q.trim() === "") {
        return res.status(400).json({ message: "Query inválida" });
    }
    try {
        const results = yield productService.searchProductsService(q.trim());
        return res.status(200).json({ content: results });
    }
    catch (error) {
        console.error("Error al buscar productos:", error);
        return res.status(500).json({ message: "Error al buscar productos" });
    }
});
exports.searchProducts = searchProducts;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield productService.deleteProduct(id);
    res.status(204).send();
});
exports.remove = remove;
