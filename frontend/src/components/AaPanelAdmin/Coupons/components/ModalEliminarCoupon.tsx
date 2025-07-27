'use client';

import { FC } from 'react';

interface ModalEliminarCouponProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  code: string;
}

export const ModalEliminarCoupon: FC<ModalEliminarCouponProps> = ({ isOpen, onClose, onConfirm, code }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl space-y-4">
        <h2 className="text-lg font-semibold text-punky-green">
          ¿Estás seguro que querés eliminar el cupón <span className="text-black"><strong>{code}</strong></span>?
        </h2>
        <p className="text-sm text-gray-600">
          Esta acción no se puede deshacer.
        </p>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
