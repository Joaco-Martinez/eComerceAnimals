'use client';

import { useState } from 'react';
import { useCheckoutContext } from '@/context/checkoutContext';
import Image from 'next/image';

export default function PaymentStep() {
  const [selected, setSelected] = useState<'transferencia' | 'mercadopago' | null>(null);
  const { setPaymentMethod } = useCheckoutContext();

  const handleSelect = (method: 'transferencia' | 'mercadopago') => {
    setSelected(method);
    setPaymentMethod(method);
    console.log('✅ Método de pago seleccionado:', method);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-4 space-y-6">
      <h2 className="text-center font-semibold text-lg text-[#3d3d3d]">Método de Pago</h2>

      {/* Transferencia bancaria */}
      <div
        onClick={() => handleSelect('transferencia')}
        className={`flex gap-2 p-4 rounded-3xl cursor-pointer transition-all border shadow-sm ${
          selected === 'transferencia'
            ? 'border-[#a18c89] shadow-md bg-white scale-[1.01]'
            : 'border-[#d9d3d0] hover:border-[#a18c89]'
        }`}
      >
        <div className="pt-1">
          {selected === 'transferencia' ? (
            <span className="text-[#a18c89] text-xl">✔</span>
          ) : (
            <div className="w-4 h-4 border border-[#a18c89] rounded-sm"></div>
          )}
        </div>

        <div className="flex flex-col">
          <p className="text-xs font-semibold text-[#534f4f]">
            Transferencia bancaria directa <span className="text-[#a18c89] font-bold text-sm">-20 OFF</span>
          </p>
          <p className="text-xs text-gray-500 leading-tight">
            Una vez confirmado el pedido te enviaremos el CBU y datos de la cuenta.
          </p>
        </div>
      </div>

      {/* Mercado Pago */}
      <div
        onClick={() => handleSelect('mercadopago')}
        className={`flex gap-3 p-4 rounded-3xl cursor-pointer transition-all border shadow-sm items-center ${
          selected === 'mercadopago'
            ? 'border-[#a18c89] shadow-md bg-white scale-[1.01]'
            : 'border-[#d9d3d0] hover:border-[#a18c89]'
        }`}
      >
        <div>
          {selected === 'mercadopago' ? (
            <span className="text-[#a18c89] text-xl">✔</span>
          ) : (
            <div className="w-4 h-4 border border-[#a18c89] rounded-sm"></div>
          )}
        </div>

        <Image
          src="/MercadoPagoLogo.png"
          alt="MercadoPagoLogo.png"
          width={100}
          height={40}
          className="object-contain"
        />

        <p className="text-sm text-[#3d3d3d] font-medium">3 y 6 Cuotas sin interés</p>
      </div>
    </div>
  );
}
