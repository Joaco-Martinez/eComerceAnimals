"use client";

import { useState, useEffect, useRef } from "react";

type Props = {
  onFilterChange: (filters: { petType?: string; categoryId?: string }) => void;
  categories: { id: string; name: string }[];
};

export default function ProductFilters({ onFilterChange, categories }: Props) {
  const [petType, setPetType] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const prevFilters = useRef<{ petType?: string; categoryId?: string }>({});
  const firstRender = useRef(true);

  useEffect(() => {
    const currentFilters = {
      petType: petType || undefined,
      categoryId: categoryId || undefined,
    };

    const filtersChanged =
      currentFilters.petType !== prevFilters.current.petType ||
      currentFilters.categoryId !== prevFilters.current.categoryId;

    if (firstRender.current) {
      firstRender.current = false;
      prevFilters.current = currentFilters;
      return;
    }

    if (filtersChanged) {
      onFilterChange(currentFilters);
      prevFilters.current = currentFilters;
    }
  }, [petType, categoryId, onFilterChange]);

  return (
    <div className="flex flex-wrap gap-4 items-center mb-4">
      <select
        value={petType}
        onChange={(e) => setPetType(e.target.value)}
        className="border border-gray-300 rounded px-3 py-1"
      >
        <option value="">Tipo de mascota</option>
        <option value="dog">Perros</option>
        <option value="cat">Gatos</option>
        <option value="both">Ambos</option>
      </select>

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="border border-gray-300 rounded px-3 py-1"
      >
        <option value="">Categoría</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}
