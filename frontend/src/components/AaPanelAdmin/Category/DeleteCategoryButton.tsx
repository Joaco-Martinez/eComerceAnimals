'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { deleteCategory } from '@/service/categorieService'
import ConfirmDeleteModal from './ConfirmDeleteModal'

interface Props {
  categoryId: string
  onDeleted?: () => void
}

export default function DeleteCategoryButton({ categoryId, onDeleted }: Props) {
  const [showModal, setShowModal] = useState(false)

  const handleDelete = async () => {
    try {
      await deleteCategory(categoryId)
      toast.success('Categoría eliminada')
      onDeleted?.()
    } catch (err) {
      console.error(err)
      toast.error('Error al eliminar la categoría')
    } finally {
      setShowModal(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
      >
        Eliminar
      </button>

      <ConfirmDeleteModal
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </>
  )
}
