"use client";

import { SlidersHorizontal, ChevronDown } from "lucide-react";

interface Props {
  onFilterClick: () => void;
  onSortClick: () => void;
  currentSort: "relevance" | "priceAsc" | "priceDesc";
}

export default function MobileBottomBar({
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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#28403C] text-white flex sm:hidden">
      <button
        onClick={onFilterClick}
        className="w-1/2 flex flex-col items-center justify-center py-2 border-r border-white/30"
      >
        <SlidersHorizontal size={18} />
        <span className="text-xs mt-1">FILTROS</span>
      </button>

      <button
        onClick={onSortClick}
        className="w-1/2 flex flex-col items-center justify-center py-2"
      >
        <div className="flex items-center gap-1">
          <span className="text-sm font-semibold">ORDENAR POR</span>
          <ChevronDown size={16} />
        </div>
        <span className="text-xs text-white/80">
          {sortLabel[currentSort]}
        </span>
      </button>
    </div>
  );
}
