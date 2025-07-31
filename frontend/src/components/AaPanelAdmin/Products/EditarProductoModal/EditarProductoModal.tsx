"use client"

import { useEffect, useState, MouseEvent } from "react"
import { X } from "lucide-react"
import SubirImagenModal from "../SubirImagenesModal/SubirImagenesModal"
import ConfirmDeleteModal from "./ConfirmDeleteModal"
import { deleteProductImage, updateProduct } from "@/service/productService"
import Image from "next/image"
import toast from "react-hot-toast"
import { Product } from "../EditarProductos"

// Usamos directamente el tipo global Product

type Props = {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onSave: (updated: Product) => void
  categories: { id: string; name: string }[]
}

export default function EditarProductoModal({
  product,
  isOpen,
  onClose,
  onSave,
  categories,
}: Props) {
  const [form, setForm] = useState<Product | null>(null)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [imageToDelete, setImageToDelete] = useState<{ id: string; url: string } | null>(null)

  useEffect(() => {
    if (product) {
      const fixedImages = product.images.map((img) => ({
        ...img,
        productId: product.id,
      }))
      setForm({ ...product, images: fixedImages })
    }
  }, [product])

  const handleChange = (
    field: keyof Product,
    value: string | number | boolean | string[]
  ) => {
    if (!form) return
    setForm({ ...form, [field]: value })
  }

  const handleDeleteImage = async () => {
    if (!imageToDelete || !form) return
    try {
      await deleteProductImage(imageToDelete.id)
      setForm({
        ...form,
        images: form.images.filter((img) => img.id !== imageToDelete.id),
      })
      toast.success("Imagen eliminada")
    } catch (err) {
      console.error("Error al eliminar imagen:", err)
      toast.error("Error al eliminar imagen")
    }
    setImageToDelete(null)
    setIsConfirmOpen(false)
  }

  const handleBorrarImage = (
    e: MouseEvent<HTMLButtonElement>,
    img: { id: string; url: string }
  ) => {
    e.preventDefault()
    setImageToDelete(img)
    setIsConfirmOpen(true)
  }

  const handleSubmit = async () => {
    if (!form) return
    try {
      const data = {
  name: form.name,
  sku: form.sku,
  price: form.price,
  stock: form.stock,
  weight: form.weight,
  size: form.size,
  color: form.color,
  petType: form.petType,
  description: form.description,
  categoryId: form.category.id,
  isActive: form.isActive,
};
      const updated = await updateProduct(form.id, data)
      onSave({ ...form, ...updated })
      toast.success("Producto actualizado correctamente")
      onClose()
    } catch (err) {
      toast.error("Error al actualizar producto")
      console.error(err)
    }
  }

  if (!isOpen || !form) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-2xl p-6 shadow-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="text-gray-500 hover:text-black" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold">Editar Producto</h2>
          <p className="text-sm text-gray-600 mt-1">
            <strong>Nombre:</strong> {form.name} • <strong>SKU:</strong> {form.sku}
          </p>
        </div>

        <form
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Nombre:</label>
            <input className="border rounded p-2" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold">SKU:</label>
            <input className="border rounded p-2" value={form.sku} onChange={(e) => handleChange("sku", e.target.value)} />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Precio:</label>
            <input className="border rounded p-2" type="number" value={form.price} onChange={(e) => handleChange("price", Number(e.target.value))} />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Stock:</label>
            <input className="border rounded p-2" type="number" value={form.stock} onChange={(e) => handleChange("stock", Number(e.target.value))} />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Peso (kg):</label>
            <input className="border rounded p-2" type="number" value={form.weight} onChange={(e) => handleChange("weight", Number(e.target.value))} />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Tamaño:</label>
            <input className="border rounded p-2" value={form.size.join(',')} onChange={(e) => handleChange("size", e.target.value.split(','))} />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Colores (HEX):</label>
            <input className="border rounded p-2" value={form.color.join(',')} onChange={(e) => handleChange("color", e.target.value.split(','))} />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Tipo de mascota:</label>
            <select className="border rounded p-2" value={form.petType} onChange={(e) => handleChange("petType", e.target.value)}>
              <option value="dog">Perro</option>
              <option value="cat">Gato</option>
              <option value="both">Ambos</option>
            </select>
          </div>
          <div className="flex flex-col col-span-full">
            <label className="text-sm font-semibold">Descripción:</label>
            <textarea className="border rounded p-2" value={form.description} onChange={(e) => handleChange("description", e.target.value)} />
          </div>

          <div className="flex flex-col col-span-full">
            <label className="text-sm font-semibold mb-2">Imágenes:</label>
            <div className="flex flex-wrap gap-3 mb-3">
              {form.images.map((img) => (
                <div key={img.id} className="relative w-24 h-24 border rounded overflow-hidden">
                  <Image src={img.url} alt="product-img" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={(e) => handleBorrarImage(e, img)}
                    className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-bl"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(true)}
              className="text-sm text-[#2C4B4D] underline"
            >
              + Subir imagen nueva
            </button>
          </div>

          <div className="flex flex-col col-span-full">
            <label className="text-sm font-medium mb-1">Categoría</label>
            <select
              className="border rounded p-2"
              value={form.category.id}
              onChange={(e) => {
                const updated = {
                  ...form.category,
                  id: e.target.value,
                  name: categories.find(cat => cat.id === e.target.value)?.name || ''
                }
                setForm({ ...form, category: updated })
              }}
            >
              <option value="" disabled>Seleccionar categoría</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="col-span-full bg-[#2C4B4D] text-white py-2 rounded hover:bg-[#223637] transition">Guardar Cambios</button>
        </form>

        <SubirImagenModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onUpload={(file) => console.log("Imagen seleccionada:", file)}
        />
        <ConfirmDeleteModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleDeleteImage}
          imageUrl={imageToDelete?.url}
        />
      </div>
    </div>
  )
}
