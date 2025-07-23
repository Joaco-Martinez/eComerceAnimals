"use client";
import { useState } from "react";
import Image from "next/image";
import { subsStock } from "@/service/stockService";
type Props = {
  productName: string;
  productId: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function NotifyStockModal({ productName, isOpen, onClose, productId }: Props) {
  const [email, setEmail] = useState("");
  
  if (!isOpen) return null;

  const handleSubmit = () => {
    subsStock(email, productId);
    onClose(); // Cerramos el modal luego
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-xl max-w-sm w-full p-6 text-center shadow-lg relative">
        {/* Logo */}
        <div className="border-2 border-[#c4bfab] p-4">
        <Image
          src="/punkypetpositivopng.png" 
          alt="Punky Pet"
          width={200}
          height={100}
          className="mx-auto mb-2"
          />

        {/* Título */}
        <h2 className="text-[#918283] text-sm font-medium mb-1">
          Dejanos tu email y te avisaremos cuando este producto vuelva a ingresar:
        </h2>

        {/* Nombre del producto */}
        <h3 className="text-lg font-bold text-[#3b3b3b] mb-4">{productName}</h3>

        {/* Input de email */}
        <input
          type="email"
          placeholder="Ingresá tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-full border-gray-300 focus:outline-none mb-4 text-sm"
          />

        {/* Botón */}
        <button
          onClick={handleSubmit}
          className="bg-[#918283] hover:bg-[#7e6f67] text-white px-4 py-2 rounded-full text-sm w-full"
          >
          Avisame cuando haya stock
        </button>

        {/* Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
          >
          ×
        </button>
            </div>
      </div>
    </div>
  );
}
