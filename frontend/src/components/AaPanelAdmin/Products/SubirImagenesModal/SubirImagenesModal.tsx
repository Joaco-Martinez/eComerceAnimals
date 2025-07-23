'use client'

import { Dialog } from '@headlessui/react'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  onUpload: (file: File) => void
}

export default function SubirImagenModal({ isOpen, onClose, onUpload }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected && selected.type.startsWith('image/')) {
      setFile(selected)
      setPreview(URL.createObjectURL(selected))
    } else {
      setFile(null)
      setPreview(null)
    }
  }

  const handleUpload = () => {
    if (file) {
      onUpload(file)
      setFile(null)
      setPreview(null)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl relative">
          <button onClick={onClose} className="absolute top-4 right-4">
            <X className="text-gray-500 hover:text-black" />
          </button>

          <Dialog.Title className="text-xl font-bold mb-4">Subir Imagen</Dialog.Title>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4"
          />

          {preview && (
            <Image
              src={preview}
              alt="Preview"
              className="w-full h-auto rounded border mb-4"
              width={200}
              height={200}
            />
          )}

          <button
            disabled={!file}
            onClick={handleUpload}
            className="w-full bg-[#2C4B4D] text-white py-2 rounded hover:bg-[#223637] transition disabled:opacity-50"
          >
            Subir Imagen
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
