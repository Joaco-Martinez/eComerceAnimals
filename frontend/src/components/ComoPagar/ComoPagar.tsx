'use client';

import React from 'react';

interface ModalConfirmProps {
  precio: string;
  precioTrans: string;
  onTrans: () => void;
  OnMerca: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ModalConfirm = ({
    precio,
    precioTrans,
  onTrans,
  OnMerca,
  confirmText = "Sí, confirmar",
  cancelText = "Cancelar",
}: ModalConfirmProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xl max-w-sm w-full mx-4 text-center">
        <h2 className="text-lg font-semibold text-[#918283] mb-2">{precio}</h2>
        <p className="text-sm text-gray-600 mb-6">{precioTrans}</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onTrans}
            className="bg-[#918283] hover:bg-[#7a6e6e] text-white text-sm font-medium px-4 py-2 rounded-full transition"
          >
            {confirmText}
          </button>
          <button
            onClick={OnMerca}
            className="text-[#918283] border border-gray-300 text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-100 transition"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
