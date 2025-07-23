'use client'

interface Props {
  isOpen: boolean
  onCancel: () => void
  onConfirm: () => void
}

export default function ConfirmDeleteModal({ isOpen, onCancel, onConfirm }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">¿Eliminar categoría?</h2>
        <p className="text-sm text-gray-600">Esta acción no se puede deshacer.</p>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
