'use client';

import { getPetTypeSales } from '@/service/adminService';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { useEffect, useState } from 'react';

interface PetSalesData {
  petType: string;
  cantidad: number;
}

export const PetSalesBarChart = () => {
  const [data, setData] = useState<PetSalesData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPetTypeSales();
        setData(response);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow w-full">


      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
          barCategoryGap="20%" // separa más las barras
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="petType" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="cantidad" fill="#2C4B4D" barSize={40} radius={[4, 4, 0, 0]}>
            <LabelList dataKey="cantidad" position="top" fill="#2C4B4D" fontSize={12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
