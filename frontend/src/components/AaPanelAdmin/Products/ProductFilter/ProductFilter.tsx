'use client'

import { ChangeEvent, useState } from 'react'

type Props = {
  categories: { id: string; name: string }[]
  onFilterChange: (filters: {
    outOfStock: boolean
    categoryId: string
    search: string
  }) => void
}

export default function ProductFilters({ categories, onFilterChange }: Props) {
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [outOfStock, setOutOfStock] = useState(false)


  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    onFilterChange({ search: e.target.value, categoryId, outOfStock })
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
      {/* Search */}
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={handleSearchChange}
        className="px-4 py-2 border rounded-md w-full sm:w-64"
      />

      {/* Categoría */}
      <select
        value={categoryId}
        onChange={(e) => {
          setCategoryId(e.target.value)
          onFilterChange({ search, categoryId: e.target.value, outOfStock })
        }}
        className="px-4 py-2 border rounded-md"
      >
        <option value="">Todas las categorías</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Sin stock */}
      <label className="inline-flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={outOfStock}
          onChange={(e) => {
            setOutOfStock(e.target.checked)
            onFilterChange({ search, categoryId, outOfStock: e.target.checked })
          }}
        />
        Solo sin stock
      </label>
    </div>
  )
}
