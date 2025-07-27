'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { createCoupon } from '@/service/couponsService';

type DiscountType = 'percentage' | 'fixed' | 'free_shipping';

interface CouponInput {
  code: string;
  description: string;
  discountType: DiscountType;
  value: number;
  maxUses: number;
  userLimit: number;
  expirationDate: string;
}

export default function CrearCouponForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CouponInput>({
    defaultValues: {
      discountType: 'percentage',
    },
  });

  const [loading, setLoading] = useState(false);
  const discountType = watch('discountType');

  const onSubmit = async (data: CouponInput) => {
    try {
      setLoading(true);
      await createCoupon({
        ...data,
        value: Number(data.value),
        maxUses: Number(data.maxUses),
        userLimit: Number(data.userLimit),
      });
      toast.success('Cupón creado correctamente');
      reset();
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-2xl shadow-xl max-w-xl mx-auto space-y-6 border"
      style={{ borderColor: '#C4BFAB' }} // punky.beige
    >
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#2C4B4D' }}>
        🎟️ Crear nuevo cupón
      </h2>

      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: '#918283' }}>
          Código
        </label>
        <input
          {...register('code', { required: true })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-[#2C4B4D]"
          placeholder="EJ: BIENVENIDA10"
        />
        {errors.code && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: '#918283' }}>
          Descripción
        </label>
        <input
          {...register('description', { required: true })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          placeholder="Ej: 10% para primeras compras"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: '#918283' }}>
          Tipo de descuento
        </label>
        <select
          {...register('discountType')}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option value="percentage">Porcentaje (%)</option>
          <option value="fixed">Monto fijo ($)</option>
          <option value="free_shipping">Envío gratis</option>
        </select>
      </div>

      {discountType !== 'free_shipping' && (
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#918283' }}>
            Valor
          </label>
          <input
            type="number"
            min={0}
            {...register('value', { required: true, valueAsNumber: true })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          />
          {errors.value && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#918283' }}>
            Máximo de usos
          </label>
          <input
            type="number"
            min={1}
            {...register('maxUses', { required: true, valueAsNumber: true })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          />
          {errors.maxUses && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#918283' }}>
            Límite por usuario
          </label>
          <input
            type="number"
            min={1}
            {...register('userLimit', { required: true, valueAsNumber: true })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          />
          {errors.userLimit && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: '#918283' }}>
          Fecha de expiración
        </label>
        <input
          type="datetime-local"
          {...register('expirationDate', { required: true })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        />
        {errors.expirationDate && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors"
        style={{
          backgroundColor: '#2C4B4D', // punky.green
        }}
      >
        {loading ? 'Creando...' : 'Crear cupón'}
      </button>
    </form>
  );
}
