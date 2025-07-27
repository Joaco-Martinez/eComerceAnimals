'use client';

import { FC, useState } from 'react';
import { deleteCoupon } from '../../../../service/couponsService';
import { ModalEliminarCoupon } from './ModalEliminarCoupon';

interface CardCouponProps {
  coupon: {
    id: string;
    code: string;
    description: string;
    discountType: 'percentage' | 'fixed' | 'free_shipping';
    value: number;
    expirationDate: string;
    active: boolean;
    usedCount: number;
    maxUses: number;
    userLimit: number;
  };
}

const formatDate = (iso: string) => new Date(iso).toLocaleDateString('es-AR');

export const CardCoupon: FC<{ coupon: CardCouponProps['coupon'] }> = ({ coupon }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isExpired = new Date(coupon.expirationDate) < new Date();
  const usageLeft = coupon.maxUses - coupon.usedCount;
  const isUsable = coupon.active && usageLeft > 0 && !isExpired;

  const handleConfirmDelete = async () => {
    await deleteCoupon(coupon.id);
    setIsModalOpen(false);
    // Podés agregar un toast o refetch
  };

  return (
    <>
      <div
        className={`border rounded-2xl p-4 shadow-md transition-all
        ${isUsable ? 'bg-white border-punky-green' : 'bg-gray-100 border-gray-300 opacity-60'}
      `}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-punky-green">{coupon.code.toUpperCase()}</h3>
          <span
            className={`text-sm px-2 py-1 rounded-full ${
              isUsable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
            }`}
          >
            {isUsable ? 'Activo' : 'Inactivo'}
          </span>
        </div>

        <p className="text-sm text-gray-700 mb-2">{coupon.description}</p>

        <div className="text-sm text-gray-800 space-y-1">
          <p>
            <strong>Tipo:</strong>{' '}
            {coupon.discountType === 'percentage'
              ? `Descuento del ${coupon.value}%`
              : coupon.discountType === 'fixed'
              ? `Descuento de $${coupon.value}`
              : 'Envío gratis'}
          </p>
          <p>
            <strong>Expira:</strong> {formatDate(coupon.expirationDate)}
          </p>
          <p>
            <strong>Usos:</strong> {coupon.usedCount} / {coupon.maxUses}
          </p>
          <p>
            <strong>Límite por usuario:</strong> {coupon.userLimit}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 text-sm text-red-600 hover:underline"
        >
          Eliminar
        </button>
      </div>

      <ModalEliminarCoupon
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        code={coupon.code}
      />
    </>
  );
};
