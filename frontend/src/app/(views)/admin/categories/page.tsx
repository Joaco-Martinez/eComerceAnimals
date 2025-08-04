'use client'

import { useEffect, useState } from 'react'
import { getAllCategoriesAdmin } from '@/service/adminService'
import CategoryForm from '@/components/AaPanelAdmin/Category/CategoryForm'
import CategoryUpdateForm from '@/components/AaPanelAdmin/Category/CategoryUpdateForm'
import DeleteCategoryButton from '@/components/AaPanelAdmin/Category/DeleteCategoryButton'

interface Category {
  id: string
  name: string
  description: string
  petType: 'dog' | 'cat' | 'both'
  image: string
  isActive: boolean
}

const ITEMS_PER_PAGE = 6

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [search, setSearch] = useState('')
  const [filterPetType, setFilterPetType] = useState<'all' | 'dog' | 'cat' | 'both'>('all')
  const [currentPage, setCurrentPage] = useState(1)

  const fetchCategories = async () => {
    const data = await getAllCategoriesAdmin()
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

  // Paginación
  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className="p-6 space-y-12 max-w-screen-xl mx-auto">

      {/* Formulario */}
      <div className="flex justify-center">
        <CategoryForm />
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={e => {
            setSearch(e.target.value)
            setCurrentPage(1)
          }}
          className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-punky-green"
        />

        <select
          value={filterPetType}
          onChange={e => {
            setFilterPetType(e.target.value as 'all' | 'dog' | 'cat' | 'both')
            setCurrentPage(1)
          }}
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-punky-green"
        >
          <option value="all">Todas las mascotas</option>
          <option value="dog">Solo perros</option>
          <option value="cat">Solo gatos</option>
          <option value="both">Ambos</option>
        </select>
      </div>

      {/* Lista de categorías */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedCategories.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">No se encontraron categorías</p>
        ) : (
          paginatedCategories.map(category => (
            <div
              key={category.id}
              className="bg-white border border-gray-200 p-6 rounded-xl shadow-md space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                <span
                  className={`text-sm font-medium px-2 py-1 rounded-full ${
                    category.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {category.isActive ? 'Activa' : 'Inactiva'}
                </span>
              </div>
              <p className="text-gray-500 text-sm">{category.description}</p>
              <p className="text-sm text-gray-400 capitalize">Tipo de mascota: {category.petType}</p>

              <CategoryUpdateForm category={category} />
              <DeleteCategoryButton categoryId={category.id} onDeleted={() => handleDeleted(category.id)} />
            </div>
          ))
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded text-sm disabled:opacity-50 cursor-pointer"
          >
            Anterior
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 border rounded text-sm cursor-pointer ${
                currentPage === i + 1 ? 'bg-punky-green text-white' : ''
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded text-sm disabled:opacity-50 cursor-pointer"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  )
}
