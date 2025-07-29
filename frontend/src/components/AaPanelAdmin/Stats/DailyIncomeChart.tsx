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
import { getEarningsByMonth } from '@/service/adminService';

interface DailyEarnings {
  dia: number;
  total: number;
}

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

export const DailyIncomeChart = () => {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1); // JS: 0 = enero, nosotros: 1 = enero
  const [data, setData] = useState<DailyEarnings[]>([]);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await getEarningsByMonth(year, month);
        setData(response ?? []);
      } catch (error) {
        console.error('Error al obtener ingresos diarios:', error);
        setData([]);
      }
    };

    fetchEarnings();
  }, [year, month]);

  return (
    <div className="bg-white p-4 rounded-xl shadow w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-punky-green">
          Ingresos diarios
        </h2>
        <div className="flex gap-2">
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {monthNames.map((name, i) => (
              <option key={i + 1} value={i + 1}>
                {name}
              </option>
            ))}
          </select>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {[...Array(5)].map((_, i) => {
              const y = currentDate.getFullYear() - i;
              return (
                <option key={y} value={y}>
                  {y}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="dia" />
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
