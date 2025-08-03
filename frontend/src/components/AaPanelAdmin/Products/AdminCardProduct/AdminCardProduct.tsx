'use client'

import { useState } from 'react'
import { BadgeCheck, XCircle } from 'lucide-react'
import Image from 'next/image'
import { deleteProduct } from '@/service/productService'
import toast from 'react-hot-toast'

export interface ProductImage {
  id: string
  url: string
  productId?: string
}

export interface Product {
  name: string
  id: string
  description: string
  price: number
  images: ProductImage[]
  stock: number
  weight: number
  size: string[]
  color: string[]
  sku: string
  petType: 'dog' | 'cat' | 'both'
  category: {
    id: string
    name: string
    image?: string
    description?: string
  }
  isActive: boolean
}

export interface Props {
  product: Product
  onEdit?: () => void
  onDelete?: () => void
}

export default function AdminProductCard({ product, onEdit, onDelete }: Props) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    try {
      setDeleting(true)
      await deleteProduct(product.id)
      setShowConfirm(false)
      onDelete?.()
    } catch (err) {
      toast.error('Error al eliminar producto')
      console.error(err)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      {/* Card del producto */}
      <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col md:flex-col gap-4 border border-[#e5e7eb] max-w-5xl mx-auto w-full">
        {/* Imagen */}
        <div className="w-full md:w-40 h-40 flex-shrink-0 overflow-hidden rounded-xl border">
          <Image
            src={product.images[0]?.url || '/placeholder.png'}
            alt={product.name}
            width={160}
            height={160}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-[#2C4B4D]">{product.name}</h3>
            <p className="text-sm text-gray-600">SKU: {product.sku}</p>
            <p className="text-sm text-gray-500 mt-1">
              Categoría: <span className="font-medium">{product.category.name}</span> — Tipo:{' '}
              <span className="capitalize">{product.petType}</span>
            </p>
            <p className="text-sm mt-1 text-gray-700">
              Precio:{' '}
              <span className="font-medium text-[#2C4B4D]">${product.price.toLocaleString()}</span> • Stock:{' '}
              <span className={product.stock === 0 ? 'text-red-600 font-bold' : 'font-medium'}>
                {product.stock}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-3 items-center">
            {product.size.map((size) => (
              <span
                key={size}
                className="text-xs border rounded px-2 py-0.5 bg-gray-100 text-gray-800"
              >
                {size}
              </span>
            ))}
            {product.color.map((color, i) => (
              <span
                key={i}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-col justify-between items-end">
          <div className="flex items-center gap-1 text-sm">
            {product.isActive ? (
              <BadgeCheck className="text-green-600 w-4 h-4" />
            ) : (
              <XCircle className="text-red-600 w-4 h-4" />
            )}
            <span className={product.isActive ? 'text-green-600' : 'text-red-600'}>
              {product.isActive ? 'Activo' : 'Suspendido'}
            </span>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={onEdit}
              className="text-sm text-[#2C4B4D] font-semibold hover:underline"
            >
              Editar
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              className="text-sm text-red-600 font-semibold hover:underline"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              ¿Estás seguro que querés eliminar el producto?
            </h2>
            <p className="text-sm text-gray-600">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm border rounded text-gray-700 hover:bg-gray-100"
                disabled={deleting}
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                disabled={deleting}
              >
                {deleting ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
