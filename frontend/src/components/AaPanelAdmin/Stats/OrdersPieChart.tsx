'use client';
import { getOrdersByStatus } from '@/service/adminService';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useEffect, useState } from 'react';

const COLORS = ['#2C4B4D', '#918283', '#C4BFAB', '#E0DED1'];
interface Order {
    status: string;
    count: number;
}

export const OrdersPieChart = () => {
  const [data, setData] = useState([]);

    const fetchData = async () => {
  try {
    const response = await getOrdersByStatus();
    const mapped = response.map((item: Order) => ({
      estado: item.status,
      cantidad: item.count
    }));
    setData(mapped);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="cantidad" nameKey="estado" cx="50%" cy="50%" outerRadius={100} label>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};
