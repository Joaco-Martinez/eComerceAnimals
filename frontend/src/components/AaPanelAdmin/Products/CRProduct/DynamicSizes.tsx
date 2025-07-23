'use client'
import { validSizes, ValidSize } from './formSchema'
import { toast } from 'react-hot-toast'
interface Props {
  sizes: ValidSize[]
  setSizes: (newSizes: ValidSize[]) => void
  error?: string
}

export default function DynamicSizes({ sizes, setSizes, error }: Props) {
  const updateSize = (index: number, value: string) => {
    if (validSizes.includes(value as ValidSize)) {
      const updated = [...sizes]
      updated[index] = value as ValidSize
      setSizes(updated)
    }
  }

  const removeSize = (index: number) => {
    if (sizes.length === 1) {
      toast.error('Debes tener al menos un tamaño')
      return
    }
      
    const updated = sizes.filter((_, i) => i !== index)
    setSizes(updated)
  }

  const addSize = () => {
    setSizes([...sizes, 'M']) 
  }

  return (
    <div>
      <p className="font-semibold text-sm mb-1">Tamaños</p>
      {sizes.map((size, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <select
            value={size} // ✅ mostrar valor actual
            onChange={(e) => updateSize(i, e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            {validSizes.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => removeSize(i)}
            className="text-red-500 font-bold"
          >
            ×
          </button>
        </div>
      ))}

      <button type="button" onClick={addSize} className="text-sm text-blue-600 underline">
        + Agregar tamaño
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}
