'use client'
 
import { useCrearProducto } from './CRProduct/useCrearProducto'
import DynamicSizes from './CRProduct/DynamicSizes'
import DynamicColors from './CRProduct/DynamicColors'
import ImagePreviewGrid from './CRProduct/ImagePreviewGrid'

export default function CrearProductos() {
  const {
    register,
    handleSubmit,
    errors,
    imageFiles,
    loading,
    categories,
    setValue,
    watch,
    onSubmit,
    handleFileChange,
    removeImage,
  } = useCrearProducto()
const watchedSizes = watch('sizes')
const watchedColors = watch('colors')

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h2 className="text-xl font-semibold">Crear nuevo producto</h2>

      <input {...register('name')} placeholder="Nombre" className="w-full border px-3 py-2 rounded" />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

      <textarea {...register('description')} placeholder="Descripción" className="w-full border px-3 py-2 rounded" />
      {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

      <input type="number" {...register('price')} placeholder="Precio" className="w-full border px-3 py-2 rounded" />
      {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

      <input type="number" {...register('stock')} placeholder="Stock" className="w-full border px-3 py-2 rounded" />
      {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}

      <input type="number" step="0.01" {...register('weight')} placeholder="Peso (kg)" className="w-full border px-3 py-2 rounded" />
      {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message}</p>}

      <DynamicSizes
          sizes={watchedSizes}
          setSizes={(val) => setValue('sizes', val)}
          error={errors.sizes?.message}
        />

        <div>
      <DynamicColors
        colors={watchedColors}
        setColors={(newColors) => setValue('colors', newColors)}
        error={errors.colors?.message}
      />
        <p className="text-sm text-gray-500">¿No sabes el color hex?</p>
        <p className="text-sm text-gray-500">

          <a
            href="https://htmlcolorcodes.com/es/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Ver tabla de colores hex
          </a>
        </p>

        </div>

      <input {...register('sku')} placeholder="SKU" className="w-full border px-3 py-2 rounded" />
      {errors.sku && <p className="text-red-500 text-sm">{errors.sku.message}</p>}

      <select {...register('petType')} className="w-full border px-3 py-2 rounded">
        <option value="dog">Perro</option>
        <option value="cat">Gato</option>
        <option value="both">Ambos</option>
      </select>

      <select {...register('categoryId')} className="w-full border px-3 py-2 rounded">
        <option value="">Seleccionar categoría</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId.message}</p>}

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="w-full border px-3 py-2 rounded bg-white"
      />

      {imageFiles.length > 0 && (
        <ImagePreviewGrid imageFiles={imageFiles} removeImage={removeImage} />
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-[#2C4B4D] text-white px-4 py-2 rounded hover:bg-[#1e3435] transition-colors"
      >
        {loading ? 'Creando...' : 'Crear producto'}
      </button>
    </form>
  )
}
