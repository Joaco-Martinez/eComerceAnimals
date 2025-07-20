import { FC } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteAddressModal: FC<Props> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl p-6 shadow-xl max-w-sm w-full mx-4 text-center border border-gray-200">
        <h2 className="text-lg font-semibold text-[#918283] mb-2">¿Eliminar dirección?</h2>
        <p className="text-sm text-gray-600 mb-6">
          Estás por eliminar esta dirección. ¿Estás seguro?
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onConfirm}
            className="bg-[#918283] hover:bg-[#7a6e6e] text-white text-sm font-medium px-4 py-2 rounded-full transition"
          >
            Sí, eliminar
          </button>
          <button
            onClick={onClose}
            className="text-[#918283] border border-gray-300 text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAddressModal;
