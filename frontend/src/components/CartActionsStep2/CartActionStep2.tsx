"use client";

import { useRouter } from "next/navigation";

interface CartActionsProps {
  onContinuar: () => void;
}
export default function CartActionsStep2({ onContinuar }: CartActionsProps) {
  const router = useRouter();

  const handleSeguirCompra = () => {
    router.push("/productos");
  }
  return (
    <div className="p-4 flex flex-col gap-2">
      <button 
      onClick={onContinuar}
      className="bg-[#918283] text-white py-2 rounded-full">
        Pagar
      </button>
      <button 
      onClick={handleSeguirCompra}
      className="border border-gray-400 py-2 rounded-full text-gray-700">
        Seguir comprando
      </button>
    </div>
  );
}

