import Image from 'next/image'

type Props = {
  imageFiles: File[]
  removeImage: (idx: number) => void
}

export default function ImagePreviewGrid({ imageFiles, removeImage }: Props) {
  return (
    <div className="mt-2 space-y-2">
      <p className="text-sm text-gray-700 font-medium">Imágenes seleccionadas:</p>
      <div className="grid grid-cols-2 gap-2">
        {imageFiles.map((file, idx) => (
          <div key={idx} className="relative group w-full h-48 rounded-lg border overflow-hidden">
            <Image src={URL.createObjectURL(file)} alt={`Preview ${idx}`} fill className="object-contain" />
            <button
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute -top-1 -right-1 text-red-700 rounded-full w-12 h-12 text-2xl z-50 flex items-center justify-center"
              title="Eliminar"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
