'use client'
import { toast } from 'react-hot-toast'
interface Props {
  colors: string[]
  setColors: (newColors: string[]) => void
  error?: string
}

export default function DynamicColors({ colors, setColors, error }: Props) {
  const updateColor = (index: number, value: string) => {
    const updated = [...colors]
    updated[index] = value
    setColors(updated)
  }

  const removeColor = (index: number) => {
    if (colors.length === 1) {
      toast.error('Debes tener al menos un color')
      return
    }
    setColors(colors.filter((_, i) => i !== index))
  }

  return (
    <div>
      <p className="font-semibold text-sm mb-1">Colores HEX (sin #)</p>
      {colors.map((color, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            value={color}
            onChange={(e) => updateColor(i, e.target.value)}
            placeholder="Ej: FF00AA"
            className="w-full border px-3 py-2 rounded"
          />
          <button type="button" onClick={() => removeColor(i)} className="text-red-500 font-bold">×</button>
        </div>
      ))}
      <button type="button" onClick={() => setColors([...colors, '000000'])} className="text-sm text-blue-600 underline">
        + Agregar color
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}
