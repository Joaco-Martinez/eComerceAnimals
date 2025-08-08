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
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getAllCategoriesAdmin = exports.getAllCategories = exports.createCategory = void 0;
const db_1 = require("../db/db");
const createCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.category.create({ data });
});
exports.createCategory = createCategory;
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.prisma.category.findMany({
        where: {
            isActive: true,
        },
        orderBy: {
            name: 'asc',
        },
    });
});
exports.getAllCategories = getAllCategories;
const getAllCategoriesAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.prisma.category.findMany();
});
exports.getAllCategoriesAdmin = getAllCategoriesAdmin;
const getCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.category.findUnique({ where: { id } });
});
exports.getCategoryById = getCategoryById;
const updateCategory = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.category.update({ where: { id }, data });
});
exports.updateCategory = updateCategory;
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productCount = yield db_1.prisma.product.count({
            where: { categoryId: id }
        });
        if (productCount > 0) {
            // Si hay productos, se desactiva
            return yield db_1.prisma.category.update({
                where: { id },
                data: { isActive: false },
            });
        }
        // Si no hay productos, se elimina
        return yield db_1.prisma.category.delete({
            where: { id },
        });
    }
    catch (error) {
        console.error('Error al eliminar categoría:', error);
        throw new Error('No se pudo eliminar la categoría');
    }
});
exports.deleteCategory = deleteCategory;
