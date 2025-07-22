"use client";

import { X, ChevronRight } from "lucide-react";

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSort: "relevance" | "priceAsc" | "priceDesc";
  onSelect: (value: "relevance" | "priceAsc" | "priceDesc") => void;
}

const SortModal = ({ isOpen, onClose, currentSort, onSelect }: SortModalProps) => {
  if (!isOpen) return null;

  const options: { label: string; value: "relevance" | "priceAsc" | "priceDesc" }[] = [
    { label: "Relevancia", value: "relevance" },
    { label: "Menor a mayor", value: "priceAsc" },
    { label: "Mayor a menor", value: "priceDesc" },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/40 flex items-end sm:hidden transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`
          w-full bg-white rounded-t-2xl p-4 max-h-[70vh] overflow-y-auto
          transform transition-transform duration-300
          ${isOpen ? "translate-y-0" : "translate-y-full"}
        `}
      >
        <div className="flex justify-end mb-4">
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <h3 className="text-md font-bold text-gray-800 mb-2">Ordenar por</h3>

        <ul className="flex flex-col gap-1">
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                onClick={() => {
                  onSelect(opt.value);
                  onClose();
                }}
                className={`w-full text-left text-sm py-3 px-2 flex justify-between items-center ${
                  currentSort === opt.value ? "text-[#28403C] font-semibold" : "text-gray-800"
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

export default SortModal;
