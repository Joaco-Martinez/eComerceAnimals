'use client';
import { getTopColor } from '@/service/adminService';
import { useEffect, useState } from 'react';

interface ColorStat {
  color: string;
  quantity: number;
}

export const TopColors = () => {
  const [colors, setColors] = useState<ColorStat[]>([]);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await getTopColor();
        console.log("TOP COLOR",response)
        setColors(response ?? []);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setColors([]); // fallback seguro
      }
    };

    fetchColors();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold text-punky-green mb-2">Colores más vendidos</h2>
      <ul className="space-y-1">
        {colors.length > 0 ? (
          colors.map((c) => (
            <li key={c.color} className="flex justify-between text-sm">
              <span>{c.color}</span>
              <span className="font-medium">{c.quantity ?? 0}</span>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500">Sin datos disponibles.</p>
        )}
      </ul>
    </div>
  );
};
