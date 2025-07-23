'use client'

import Image from 'next/image'
import { useEffect } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  imageUrl?: string
}

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, imageUrl }: Props) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <h2 className="text-lg font-semibold mb-2">Estás por eliminar esta imagen</h2>
        <p className="text-sm text-gray-600 mb-4">¿Estás seguro? Esta acción no se puede deshacer.</p>

        {imageUrl && (
          <div className="mb-4 rounded overflow-hidden border w-full aspect-video">
            <Image 
            src={imageUrl} alt="Imagen a eliminar" className="object-cover w-full h-full"
            width={100} height={100} />
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="px-4 py-1.5 rounded bg-red-600 text-white hover:bg-red-700 text-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
