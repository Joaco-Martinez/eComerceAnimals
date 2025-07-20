"use client";

import { useRouter } from "next/navigation";

interface CartActionsProps {
  step: number;
  onContinuar: () => void;
  onBack?: () => void;
}

export default function CartActions({ step, onContinuar, onBack }: CartActionsProps) {
  const router = useRouter();

  const handleSeguirCompra = () => {
    router.push("/productos");
  };

  return (
    <div className="p-4 flex flex-col gap-2">
      {step === 1 && (
        <>
          <button
            onClick={onContinuar}
            className="bg-[#918283] text-white py-2 rounded-full"
          >
            Pagar
          </button>
          <button
            onClick={handleSeguirCompra}
            className="border border-gray-400 py-2 rounded-full text-gray-700"
          >
            Seguir comprando
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <button
            onClick={onContinuar}
            className="bg-[#918283] text-white py-2 rounded-full"
          >
            Confirmar dirección
          </button>
          <button
            onClick={onBack}
            className="border border-gray-400 py-2 rounded-full text-gray-700"
          >
            Volver atrás
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <button
            onClick={onContinuar}
            className="bg-[#918283] text-white py-2 rounded-full"
          >
            Confirmar método de pago
          </button>
          <button
            onClick={onBack}
            className="border border-gray-400 py-2 rounded-full text-gray-700"
          >
            Volver atrás
          </button>
        </>
      )}
    </div>
  );
}
