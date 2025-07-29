'use client';
import { getTopSize } from '@/service/adminService';
import { useEffect, useState } from 'react';

interface SizeStat {
  size: string;
  quantity: number;
}

export const TopSizes = () => {
  const [sizes, setSizes] = useState<SizeStat[]>([]);

  useEffect(() => {
    const fetchSize = async () => {
      try {
        const res = await getTopSize();
        setSizes(res ?? []);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setSizes([]); // fallback seguro
      }
    };

    fetchSize();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold text-punky-green mb-2">Talles más vendidos</h2>
      <ul className="space-y-1">
        {sizes.length > 0 ? (
          sizes.map((s) => (
            <li key={s.size} className="flex justify-between text-sm">
              <span>{s.size}</span>
              <span className="font-medium">{s.quantity ?? 0}</span>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500">Sin datos disponibles.</p>
        )}
      </ul>
    </div>
  );
};
