"use client";

import { SlidersHorizontal, ChevronDown } from "lucide-react";

interface Props {
  onFilterClick: () => void;
  onSortClick: () => void;
  currentSort: "relevance" | "priceAsc" | "priceDesc";
}

export default function DesktopTopBar({
  onFilterClick,
  onSortClick,
  currentSort,
}: Props) {
  const sortLabel = {
    relevance: "Relevancia",
    priceAsc: "Menor a mayor",
    priceDesc: "Mayor a menor",
  };

  return (
    <div className="hidden sm:flex justify-end gap-4 mb-4 px-4 sm:px-8 max-w-[1280px] mx-auto">
      {/* Filtros */}
      <button
        onClick={onFilterClick}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm hover:bg-gray-50 transition cursor-pointer"
      >
        <SlidersHorizontal size={16} className="text-[#2C4B4D]" />
        <span className="text-[#2C4B4D] font-medium">Filtros</span>
      </button>

      {/* Ordenar por */}
      <button
        onClick={onSortClick}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm hover:bg-gray-50 transition cursor-pointer"
      >
        <span className="text-[#2C4B4D] font-medium">Ordenar por:</span>
        <span className="text-[#2C4B4D] font-semibold">{sortLabel[currentSort]}</span>
        <ChevronDown size={16} className="text-[#2C4B4D]" />
      </button>
    </div>
  );
}
