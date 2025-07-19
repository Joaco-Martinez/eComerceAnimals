type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteConfirmModal({ onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 bg-black/45 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl p-6 shadow-xl max-w-sm w-full mx-4 text-center border border-gray-200">
        <h2 className="text-lg font-semibold text-[#918283] mb-2">¿Eliminar producto?</h2>
        <p className="text-sm text-gray-600 mb-6">
          Estás por eliminar este producto del carrito. ¿Estás seguro?
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onConfirm}
            className="bg-[#918283] hover:bg-[#7a6e6e] text-white text-sm font-medium px-4 py-2 rounded-full transition"
          >
            Sí, eliminar
          </button>
          <button
            onClick={onCancel}
            className="text-[#918283] border border-gray-300 text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
