'use client';

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getEarningsByYear } from '@/service/adminService';

interface MonthlyEarnings {
  mes: number; // 1 = enero, 12 = diciembre
  total: number;
}

const monthNames = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
];

export const IncomeChart = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [data, setData] = useState<MonthlyEarnings[]>([]);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await getEarningsByYear(year);
        const formatted = response.map((item: MonthlyEarnings) => ({
          ...item,
          nombreMes: monthNames[item.mes - 1],
        }));
        setData(formatted);
      } catch (error) {
        console.error('Error al obtener los ingresos:', error);
        setData([]);
      }
    };

    fetchEarnings();
  }, [year]);

  return (
    <div className="bg-white p-4 rounded-xl shadow w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-punky-green">Ingresos mensuales</h2>
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          {[...Array(5)].map((_, i) => {
            const y = currentYear - i;
            return (
              <option key={y} value={y}>
                {y}
              </option>
            );
          })}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="nombreMes" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value}`} />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#2C4B4D"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
