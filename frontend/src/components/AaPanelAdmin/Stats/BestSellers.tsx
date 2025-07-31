'use client';
import { getTopProducts } from '@/service/adminService';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  quantity: number;
}

export const BestSellers = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const fetchProducts = async () => {
    await getTopProducts().then((res) => {
        setProducts(res);
    });
  }

  useEffect(() => {
    try {
      fetchProducts();
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
    
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow h-full">
      <h2 className="text-lg font-semibold text-punky-green mb-2">Productos más vendidos</h2>
      <ul className="space-y-2 overflow-y-auto max-h-[300px] pr-2">
        {products.map((p, i) => (
    <li key={p.id ?? i} className="flex items-center gap-2 text-sm">
    <Image
      src={p.imageUrl || '/foto'}
      alt={p.name || 'foto'}
      width={100}
      height={100}
      className="w-10 h-10 object-cover rounded-md"
    />
    <div className="flex-1">
      <p className="font-medium">{p.name}</p>
      <p className="text-gray-500 text-xs">{p.quantity ?? 0} vendidos</p>
    </div>
  </li>
))}
      </ul>
    </div>
  );
};
