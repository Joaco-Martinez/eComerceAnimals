"use client";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";

interface CartActionsProps {
  step: number;
  onContinuar: () => void;
  onBack?: () => void;
  loadingOrder?: boolean;
}

export default function CartActions({ step, onContinuar, onBack, loadingOrder }: CartActionsProps) {
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
            className="bg-[#918283] text-white py-2 rounded-full cursor-pointer"
          >
            Pagar
          </button>
          <button
            onClick={handleSeguirCompra}
            className="border border-gray-400 py-2 rounded-full text-gray-700 cursor-pointer"
          >
            Seguir comprando
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <button
            onClick={onContinuar}
            className="bg-[#918283] text-white py-2 rounded-full cursor-pointer"
          >
            Confirmar dirección
          </button>
          <button
            onClick={onBack}
            className="border border-gray-400 py-2 rounded-full text-gray-700 cursor-pointer"
          >
            Volver atrás
          </button>
        </>
      )}

      {step === 3 && (
        <>
          {loadingOrder && <Loader />}
          {!loadingOrder && <button
            onClick={onContinuar}
            className="bg-[#918283] text-white py-2 rounded-full cursor-pointer"
          >
            Confirmar método de pago
          </button>}
          <button
            onClick={onBack}
            className="border border-gray-400 py-2 rounded-full text-gray-700 cursor-pointer"
          >
            Volver atrás
          </button>
        </>
      )}

    </div>
  );
}
