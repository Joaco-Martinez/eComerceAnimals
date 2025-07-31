"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCategoryImage = exports.uploadProductImages = void 0;
// middleware/upload.ts
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: (req, file) => ({
        folder: 'productos',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        public_id: `${Date.now()}-${file.originalname}`, // nombre único por si suben con mismo nombre
    }),
});
// exportás un middleware que acepta varias imágenes en el campo `images`
exports.uploadProductImages = (0, multer_1.default)({ storage }).array('images', 6); // hasta 6 imágenes
exports.uploadCategoryImage = (0, multer_1.default)({ storage }).single('image');
exports.default = exports.uploadProductImages;
