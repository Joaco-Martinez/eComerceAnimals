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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const CategoryService = __importStar(require("../services/category.Service"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const validPetTypes = ["dog", "cat", "both"];
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, petType } = req.body;
    const file = req.file;
    if (!name || !petType || !validPetTypes.includes(petType)) {
        return res.status(400).json({ error: "Nombre o petType inválido" });
    }
    try {
        let imageUrl = undefined;
        if (file) {
            const result = yield cloudinary_1.default.uploader.upload(file.path, {
                folder: "categories",
            });
            imageUrl = result.secure_url;
        }
        const newCategory = yield CategoryService.createCategory({
            name,
            description,
            image: imageUrl,
            petType,
        });
        res.status(201).json(newCategory);
    }
    catch (error) {
        console.error("Error al crear categoría:", error);
        res.status(500).json({ error: "Error al crear la categoría" });
    }
});
exports.createCategory = createCategory;
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield CategoryService.getAllCategories();
        res.json(categories);
    }
    catch (error) {
        console.error("Error al obtener categorías:", error);
        res.status(500).json({ error: "Error al obtener categorías" });
    }
});
exports.getAllCategories = getAllCategories;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = String(req.params.id);
    if (!id)
        return res.status(400).json({ error: "ID inválido" });
    try {
        const category = yield CategoryService.getCategoryById(id);
        if (!category)
            return res.status(404).json({ error: "Categoría no encontrada" });
        res.json(category);
    }
    catch (error) {
        console.error("Error al obtener categoría:", error);
        res.status(500).json({ error: "Error al obtener la categoría" });
    }
});
exports.getCategoryById = getCategoryById;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = String(req.params.id);
    if (!id)
        return res.status(400).json({ error: "ID inválido" });
    const { petType } = req.body;
    if (petType && !validPetTypes.includes(petType)) {
        return res.status(400).json({ error: "petType inválido" });
    }
    try {
        const updatedCategory = yield CategoryService.updateCategory(id, req.body);
        res.json(updatedCategory);
    }
    catch (error) {
        console.error("Error al actualizar categoría:", error);
        res.status(500).json({ error: "Error al actualizar la categoría" });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = String(req.params.id);
    if (!id)
        return res.status(400).json({ error: "ID inválido" });
    try {
        yield CategoryService.deleteCategory(id);
        res.status(204).send();
    }
    catch (error) {
        console.error("Error al eliminar categoría:", error);
        res.status(500).json({ error: "Error al eliminar la categoría" });
    }
});
exports.deleteCategory = deleteCategory;
