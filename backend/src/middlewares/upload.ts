// middleware/upload.ts
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: 'productos',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    public_id: `${Date.now()}-${file.originalname}`, // nombre único por si suben con mismo nombre
  }),
})

// exportás un middleware que acepta varias imágenes en el campo `images`
export const uploadProductImages = multer({ storage }).array('images', 6) // hasta 6 imágenes

export const uploadCategoryImage = multer({ storage }).single('image')

export default uploadProductImages
