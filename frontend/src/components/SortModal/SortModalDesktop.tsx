"use client";

import { X, ChevronRight } from "lucide-react";

interface SortModalDesktopProps {
  isOpen: boolean;
  onClose: () => void;
  currentSort: "relevance" | "priceAsc" | "priceDesc";
  onSelect: (value: "relevance" | "priceAsc" | "priceDesc") => void;
}

const SortModalDesktop = ({
  isOpen,
  onClose,
  currentSort,
  onSelect,
}: SortModalDesktopProps) => {
  const options: { label: string; value: "relevance" | "priceAsc" | "priceDesc" }[] = [
    { label: "Relevancia", value: "relevance" },
    { label: "Menor a mayor", value: "priceAsc" },
    { label: "Mayor a menor", value: "priceDesc" },
  ];

  return (
    <div
      className={`hidden md:block fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <h3 className="text-lg font-bold text-[#2C4B4D]">Ordenar por</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Opciones */}
        <ul className="flex flex-col p-4 gap-2">
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                onClick={() => {
                  onSelect(opt.value);
                  onClose();
                }}
                className={`w-full text-left text-sm py-3 px-2 flex justify-between items-center rounded-md hover:bg-gray-100 transition ${
                  currentSort === opt.value ? "text-[#2C4B4D] font-semibold" : "text-gray-800"
                }`}
              >
                {opt.label}
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SortModalDesktop;
