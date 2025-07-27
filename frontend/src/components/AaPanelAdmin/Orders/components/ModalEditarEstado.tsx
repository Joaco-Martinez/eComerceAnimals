'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { updateOrder } from '@/service/orderService';

interface ModalEditarEstadoProps {
  open: boolean;
  onClose: () => void;
  id: string;
}

export default function ModalEditarEstado({ open, onClose, id }: ModalEditarEstadoProps) {
  const [estado, setEstado] = useState<
    'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | ''
  >('');

  const handleUpdateEstado = async (e: React.FormEvent) => {
    e.preventDefault();
    if (estado === '') return;

    try {
      await updateOrder(id, { status: estado });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Dialog open={open} onClose={onClose}>
      {/* Fondo oscuro */}
      <div className="fixed inset-0 bg-black/40 z-40" />

      {/* Contenido */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-4">
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-[#A8504F] text-lg font-bold hover:text-red-700"
          >
            ×
          </button>

          {/* Título */}
          <h2 className="text-xl font-bold text-[#2C4B4D]">Editar estado del pedido</h2>

          {/* Formulario */}
          <form onSubmit={handleUpdateEstado} className="space-y-4">
            <select
              id="estado"
              value={estado}
              onChange={(e) =>
                setEstado(
                  e.target.value as
                    | 'pending'
                    | 'paid'
                    | 'processing'
                    | 'shipped'
                    | 'delivered'
                    | 'cancelled'
                    | ''
                )
              }
              className="w-full px-4 py-2 border-2 border-[#C4BFAB] rounded-md text-[#2C4B4D] focus:outline-none focus:ring-2 focus:ring-[#2C4B4D]"
            >
              <option value="">Seleccione un estado</option>
              <option value="pending">Pendiente</option>
              <option value="paid">Pagado</option>
              <option value="processing">Preparando</option>
              <option value="shipped">Enviado</option>
              <option value="delivered">Entregado</option>
              <option value="cancelled">Cancelado</option>
            </select>

            <button
              type="submit"
              className="w-full bg-[#2C4B4D] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#1e3435] transition-colors"
            >
              Actualizar estado
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
}
