import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-hot-toast'
import { getAllCategories } from '@/service/categorieService'
import { postProduct } from '@/service/productService'
import { Category } from './types'
import { productSchema } from './formSchema'
import { InferType } from 'yup'

type ProductFormValues = InferType<typeof productSchema>

export function useCrearProducto() {
  const [categories, setCategories] = useState<Category[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      petType: 'both',
      sizes: ['M'],
      colors: ['000000'],
    },
  })

  useEffect(() => {
    getAllCategories().then(setCategories)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files)
      setImageFiles(prev => [...prev, ...fileArray])
    }
  }

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: ProductFormValues) => {
    if (imageFiles.length === 0) {
      toast.error('Debés subir al menos una imagen del producto')
      return
    }

    const { sizes, colors, ...rest } = data
    const formData = new FormData()

    formData.append('size', JSON.stringify(sizes))
    formData.append('color', JSON.stringify(colors))

    Object.entries(rest).forEach(([key, value]) => {
      formData.append(key, String(value))
    })

    imageFiles.forEach(file => formData.append('images', file))

    try {
      setLoading(true)
      await postProduct(formData)
      toast.success('Producto creado con éxito')
      reset({ petType: 'both', sizes: ['M'], colors: ['000000'] })
      setImageFiles([])
    } catch (err) {
      console.error('Error creando producto:', err)
      toast.error('Error al crear el producto')
    } finally {
      setLoading(false)
    }
  }

  return {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    errors, 
    categories,
    imageFiles,
    loading,
    handleFileChange,
    removeImage,
    onSubmit,
  }
}
