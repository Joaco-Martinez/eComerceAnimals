"use client";

import { useMemo, useState } from "react";
import { X, ChevronRight, Plus, Minus } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: (filters: { petType?: string; categoryId?: string }) => void;
  categories: { id: string; name: string; petType: "dog" | "cat" | "both" }[];
};

export default function FilterModal({ open, onClose, onApply, categories }: Props) {
  const groupedCategories = useMemo(() => {
    return {
      dog: categories.filter((c) => c.petType === "dog" || c.petType === "both"),
      cat: categories.filter((c) => c.petType === "cat" || c.petType === "both"),
    };
  }, [categories]);

  const [isDogOpen, setIsDogOpen] = useState(true);
  const [isCatOpen, setIsCatOpen] = useState(true);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/40 flex items-end sm:hidden transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`
          w-full bg-white rounded-t-2xl p-4 max-h-[85vh] overflow-y-auto
          transform transition-transform duration-300
          ${open ? "translate-y-0" : "translate-y-full"}
        `}
      >
        <div className="flex justify-end mb-4">
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Acciones rápidas */}
        <div className="flex flex-col gap-2 mb-4 mt-3">
          <button
            onClick={() => {
              onApply({});
              onClose();
            }}
            className="w-full text-left text-sm font-medium"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-bold uppercase">Todos los productos</h3>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>

        {/* 🐶 PERROS */}
        <div className="mb-4">
          <div
            className="flex justify-between items-center mb-2 cursor-pointer"
            onClick={() => setIsDogOpen(!isDogOpen)}
          >
            <h3 className="text-md font-bold uppercase">Perros</h3>
            {isDogOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </div>
          <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isDogOpen ? "max-h-[9999px]" : "max-h-0"
              }`}
            >
            <ul>
              <li>
                <button
                  className="w-full text-left flex justify-between items-center py-2 text-sm text-gray-800"
                  onClick={() => {
                    onApply({ petType: "dog" });
                    onClose();
                  }}
                >
                  Todos
                  <ChevronRight className="w-4 h-4" />
                </button>
              </li>
              {groupedCategories.dog.map((cat) => (
                <li key={cat.id}>
                  <button
                    className="w-full text-left flex justify-between items-center py-2 text-sm text-gray-800"
                    onClick={() => {
                      onApply({ categoryId: cat.id, petType: cat.petType });
                      onClose();
                    }}
                  >
                    {cat.name}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 🐱 GATOS */}
        <div>
          <div
            className="flex justify-between items-center mb-2 cursor-pointer"
            onClick={() => setIsCatOpen(!isCatOpen)}
          >
            <h3 className="text-md font-bold uppercase">Gatos</h3>
            {isCatOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </div>
          <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isCatOpen ? "max-h-[9999px]" : "max-h-0"
              }`}
            >
            <ul>
              <li>
                <button
                  className="w-full text-left flex justify-between items-center py-2 text-sm text-gray-800"
                  onClick={() => {
                    onApply({ petType: "cat" });
                    onClose();
                  }}
                >
                  Todos
                  <ChevronRight className="w-4 h-4" />
                </button>
              </li>
              {groupedCategories.cat.map((cat) => (
                <li key={cat.id}>
                  <button
                    className="w-full text-left flex justify-between items-center py-2 text-sm text-gray-800"
                    onClick={() => {
                      onApply({ categoryId: cat.id, petType: cat.petType });
                      onClose();
                    }}
                  >
                    {cat.name}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
