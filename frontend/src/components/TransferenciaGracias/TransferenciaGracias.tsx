'use client';

import { useAuthContext } from '@/context/authContext';

interface TransferenciaGraciasProps {
  numeroOrder: string
}
export default function TransferenciaGracias({ numeroOrder }: TransferenciaGraciasProps) {
  const { user } = useAuthContext();

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-3xl shadow-md text-center text-[#333]">
      <h2 className="text-lg font-semibold mb-2">
        {user?.name ? `${user.name}, gracias por tu compra...` : 'Gracias por tu compra...'}
      </h2>

      <p className="text-sm italic text-gray-500 mb-4">Orden {numeroOrder}</p>

      <div className="mb-6">
        <p className="font-semibold">Medio de pago: <span className="text-gray-800">Transferencia bancaria</span></p>
        <p className="text-xs italic text-gray-500">(Tambien se te enviaron los datos a tu email registrado. Recuerda enviar el comprobante)</p>
      </div>

      <div className="text-sm mb-6 space-y-1"> 
        <p><strong>Banco Nación</strong></p>
        <p><strong>Joaquín Martinez</strong></p>
        <p>N° de cuenta: CA $: 37617210354446</p>
        <p>Cuil: 20465876299</p>
        <p>CBU: 0110721230072103544465</p>
        <p>Alias: vgbpets</p>
      </div>

      <p className="text-xs text-gray-600 mb-6 leading-relaxed">
        Recordá enviar el comprobante de pago por whatsapp o vía mail informando número de orden. <br />
        Si en 24 horas no se recibe el mismo, la orden se cancelará.
      </p>

      <div className="text-sm space-y-1">
        <p><strong>Whatsapp:</strong> 3564 658478</p>
        <p><strong>Email:</strong> mascotiendavgbpets@gmail.com</p>
      </div>
    </div>
  );
}
