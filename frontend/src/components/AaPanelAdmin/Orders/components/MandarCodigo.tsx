'use client';
import { useState } from 'react';
import { X } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import toast from 'react-hot-toast';
import {mandarNotificacion} from "@/service/orderService";
interface MandarCodigoProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

export default function MandarCodigo({ isOpen, onClose, id }: MandarCodigoProps) {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleEnviarCodigo = async () => {
    if (!trackingNumber.trim()) {
      toast.error('Ingresá un número de seguimiento válido');
      return;
    }

    try {
      await mandarNotificacion(id, { trackingNumber });
      toast.success('Código enviado correctamente');
      onClose();
      setTrackingNumber('');
    } catch (error) {
      console.error(error);
      toast.error('Error al enviar el código');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Fondo oscurecido */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      {/* Centro del modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-lg">
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <X size={24} />
          </button>

          <div className="text-xl font-bold text-[#2C4B4D] mb-2">
            ¿Deseás enviar el código de seguimiento al cliente?
          </div>

          <div className="text-sm text-gray-600 mb-4">
            Al confirmar, se enviará un correo electrónico al cliente con el número de seguimiento.
          </div>

          {/* Input del código */}
          <label className="block text-sm font-medium text-[#2C4B4D] mb-1">
            Número de seguimiento
          </label>
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Ej: AB123456CD"
            className="w-full border border-[#C4BFAB] rounded-lg px-4 py-2 text-[#2C4B4D] focus:outline-none focus:ring-2 focus:ring-[#2C4B4D]"
          />

          <div className="flex justify-end gap-2 mt-6">
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="bg-[#2C4B4D] text-white px-4 py-2 rounded-lg"
              onClick={handleEnviarCodigo}
            >
              Enviar código
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
