'use client'

import { useEffect, useState } from 'react'
import { getAllCategories } from '@/service/categorieService'
import CategoryForm from '@/components/AaPanelAdmin/Category/CategoryForm'
import CategoryUpdateForm from '@/components/AaPanelAdmin/Category/CategoryUpdateForm'
import DeleteCategoryButton from '@/components/AaPanelAdmin/Category/DeleteCategoryButton'

interface Category {
  id: string
  name: string
  description: string
  petType: 'dog' | 'cat' | 'both'
  image: string
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [search, setSearch] = useState('')
  const [filterPetType, setFilterPetType] = useState<'all' | 'dog' | 'cat' | 'both'>('all')

  const fetchCategories = async () => {
    const data = await getAllCategories()
    setCategories(data)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleDeleted = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id))
  }

  
  const filteredCategories = categories.filter(category => {
    const matchesName = category.name.toLowerCase().includes(search.toLowerCase())
    const matchesPetType = filterPetType === 'all' || category.petType === filterPetType
    return matchesName && matchesPetType
  })

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Gestión de categorías</h1>

      {/* Formulario de creación */}
      <CategoryForm />

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/2"
        />

        <select
          value={filterPetType}
          onChange={e => setFilterPetType(e.target.value as 'all' | 'dog' | 'cat' | 'both')}
          className="border px-3 py-2 rounded"
        >
          <option value="all">Todas las mascotas</option>
          <option value="dog">Solo perros</option>
          <option value="cat">Solo gatos</option>
          <option value="both">Ambos</option>
        </select>
      </div>

      {/* Lista de categorías existentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.length === 0 ? (
          <p className="text-gray-500 col-span-full">No se encontraron categorías</p>
        ) : (
          filteredCategories.map(category => (
            <div key={category.id} className="border p-4 rounded-xl shadow space-y-4">
              <CategoryUpdateForm category={category} />
              <DeleteCategoryButton categoryId={category.id} onDeleted={() => handleDeleted(category.id)} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}
