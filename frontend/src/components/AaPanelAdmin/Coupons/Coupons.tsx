'use client';

import { useEffect, useState } from 'react';
import { getCoupons } from '../../../service/couponsService';
import { CardCoupon } from './components/CardCoupon';

interface CouponType {
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
}

export default function Coupons() {
  const [coupons, setCoupons] = useState<CouponType[]>([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await getCoupons();
        setCoupons(res);
      } catch (error) {
        console.error('Error al obtener los cupones:', error);
      }
    };

    fetchCoupons();
  }, []);

  if (!coupons) {
  return <p className="p-4 text-center text-gray-600">No hay cupones disponibles.</p>;
}

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      
      {coupons.map((coupon) => (
        <CardCoupon key={coupon.id} coupon={coupon} />
      ))
      }
      
    </section>
  );
}
