'use client';
import { getUncovertedProducts } from '@/service/adminService';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  views: number;
}

export const MostViewedNoSales = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getUncovertedProducts();
        console.log(res)
        setProducts(res ?? []);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow h-full">
      <h2 className="text-lg font-semibold text-punky-green mb-2">Productos más vistos</h2>
      {products.length > 0 ? (
        <ul className="space-y-2 overflow-y-auto max-h-[300px] pr-2">
          {products.map((p, i) => (
            <li key={p.id ?? i} className="flex items-center gap-2 text-sm">
              <Image
                width={100}
                height={100}
                src={p.imageUrl || '/foto'}
                alt={p.name || 'foto'}
                className="w-10 h-10 object-cover rounded-md"
              />
              <div className="flex-1">
                <p className="font-medium">{p.name}</p>
                <p className="text-gray-500 text-xs">{p.views ?? 0} vistas</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">Sin productos disponibles.</p>
      )}
    </div>
  );
};
