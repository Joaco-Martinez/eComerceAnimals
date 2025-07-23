'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { postCategory } from '@/service/categorieService'
import Image from 'next/image'
export default function CategoryForm() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    petType: 'both' as 'dog' | 'cat' | 'both',
    imageFile: null as File | null,
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setForm(prev => ({ ...prev, imageFile: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.imageFile) {
      toast.error('Debés subir una imagen')
      return
    }

    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('description', form.description)
    formData.append('petType', form.petType)
    formData.append('image', form.imageFile)

    try {
      setLoading(true)
      await postCategory(formData)
      toast.success('Categoría creada con éxito')
      setForm({ name: '', description: '', petType: 'both', imageFile: null })
    } catch (err) {
      console.error(err)
      toast.error('Error al crear la categoría')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Crear nueva categoría</h2>

      <div>
        <label className="block font-medium mb-1">Nombre *</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Descripción</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
  <label className="block font-medium mb-1">Imagen *</label>
  <input
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    className="w-full border px-3 py-2 rounded bg-white"
  />

  {/* 👇 Vista previa de imagen seleccionada */}
  {form.imageFile && (
    <div className="mt-2">
      <p className="text-sm text-gray-700 font-medium">Imagen seleccionada:</p>
      <p className="text-sm text-gray-500">{form.imageFile.name}</p>
      <div className="mt-2">
        <Image
          src={URL.createObjectURL(form.imageFile)}
          alt="Preview"
          width={200}
          height={200}
          className="rounded-lg border w-full max-h-64 object-contain"
        />
      </div>
    </div>
  )}
</div>

      <div>
        <label className="block font-medium mb-1">Tipo de mascota *</label>
        <select
          name="petType"
          value={form.petType}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="dog">Perro</option>
          <option value="cat">Gato</option>
          <option value="both">Ambos</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-[#2C4B4D] text-white px-4 py-2 rounded hover:bg-[#1e3435] transition-colors"
      >
        {loading ? 'Creando...' : 'Crear categoría'}
      </button>
    </form>
  )
}
