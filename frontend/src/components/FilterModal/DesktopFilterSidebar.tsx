"use client";

import { X, ChevronRight, Plus, Minus } from "lucide-react";
import { useMemo, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: (filters: { petType?: string; categoryId?: string }) => void;
  categories: { id: string; name: string; petType: "dog" | "cat" | "both" }[];
};

export default function DesktopFilterSidebar({
  open,
  onClose,
  onApply,
  categories,
}: Props) {
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
      className={`hidden md:block fixed top-0 left-0 z-50 h-full w-80 bg-white shadow-lg transition-transform duration-300 transform ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header con botón de cierre */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold text-[#2C4B4D]">Filtrar por</h2>
        <button onClick={onClose}>
          <X className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Contenido scrollable */}
      <div className="px-5 py-4 overflow-y-auto h-[calc(100%-60px)] space-y-6">
        {/* Todos los productos */}
        <div>
          <button
            onClick={() => {
              onApply({});
              onClose();
            }}
            className="w-full flex justify-between items-center text-sm font-medium text-[#2C4B4D] hover:underline cursor-pointer"
          >
            <span className="uppercase font-bold text-md">Todos los productos</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 🐶 PERROS */}
        <div>
          <div
            className="flex justify-between items-center mb-2 cursor-pointer"
            onClick={() => setIsDogOpen(!isDogOpen)}
          >
            <h3 className="text-md font-bold uppercase text-[#2C4B4D] cursor-pointer">Perros</h3>
            {isDogOpen ? (
              <Minus className="w-4 h-4 text-[#2C4B4D]" />
            ) : (
              <Plus className="w-4 h-4 text-[#2C4B4D]" />
            )}
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isDogOpen ? "max-h-[999px]" : "max-h-0"
            }`}
          >
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => {
                    onApply({ petType: "dog" });
                    onClose();
                  }}
                  className="w-full flex justify-between items-center text-sm text-gray-800 hover:underline cursor-pointer"
                >
                  Todos
                  <ChevronRight className="w-4 h-4" />
                </button>
              </li>
              {groupedCategories.dog.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onApply({ categoryId: cat.id, petType: cat.petType });
                      onClose();
                    }}
                    className="w-full flex justify-between items-center text-sm text-gray-800 hover:underline cursor-pointer"
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
            className="flex justify-between items-center mb-2 cursor-pointer "
            onClick={() => setIsCatOpen(!isCatOpen)}
          >
            <h3 className="text-md font-bold uppercase text-[#2C4B4D]">Gatos</h3>
            {isCatOpen ? (
              <Minus className="w-4 h-4 text-[#2C4B4D]" />
            ) : (
              <Plus className="w-4 h-4 text-[#2C4B4D]" />
            )}
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isCatOpen ? "max-h-[999px]" : "max-h-0"
            }`}
          >
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => {
                    onApply({ petType: "cat" });
                    onClose();
                  }}
                  className="w-full flex justify-between items-center text-sm text-gray-800 hover:underline cursor-pointer"
                >
                  Todos
                  <ChevronRight className="w-4 h-4" />
                </button>
              </li>
              {groupedCategories.cat.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onApply({ categoryId: cat.id, petType: cat.petType });
                      onClose();
                    }}
                    className="w-full flex justify-between items-center text-sm text-gray-800 hover:underline cursor-pointer"
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
