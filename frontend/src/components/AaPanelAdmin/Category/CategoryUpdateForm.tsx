'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import { updateCategory } from '@/service/categorieService'

interface Props {
  category: {
    id: string
    name: string
    description: string
    petType: 'dog' | 'cat' | 'both'
    image: string
  }
}

export default function CategoryUpdateForm({ category }: Props) {
  const [form, setForm] = useState({
    name: category.name,
    description: category.description,
    petType: category.petType,
    imageFile: null as File | null,
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('description', form.description)
    formData.append('petType', form.petType)
    if (form.imageFile) formData.append('image', form.imageFile)

    try {
      setLoading(true)
      await updateCategory(category.id, formData)
      toast.success('Categoría actualizada')
    } catch (err) {
      console.error(err)
      toast.error('Error al actualizar categoría')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 flex flex-col gap-4 transition-all duration-300"
    >
      <h2 className="text-lg font-bold text-[#2C4B4D]">Editar categoría</h2>

      <div>
        <label className="text-sm font-medium text-gray-700">Nombre</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#2C4B4D] focus:border-[#2C4B4D] text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#2C4B4D] focus:border-[#2C4B4D] text-sm resize-none"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Tipo de mascota</label>
        <select
          name="petType"
          value={form.petType}
          onChange={handleChange}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#2C4B4D] focus:border-[#2C4B4D] text-sm"
        >
          <option value="dog">Perro</option>
          <option value="cat">Gato</option>
          <option value="both">Ambos</option>
        </select>
      </div>



      <div>
        <p className="text-sm font-medium text-gray-700 mb-1">Imagen actual:</p>
        <Image
          src={category.image}
          alt="Actual"
          width={160}
          height={160}
          className="rounded-lg border object-contain max-h-40 w-auto"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 bg-[#2C4B4D] hover:bg-[#1e3435] text-white text-sm font-semibold py-2 px-4 rounded-md transition-colors"
      >
        {loading ? 'Actualizando...' : 'Actualizar'}
      </button>
    </form>
  )
}
