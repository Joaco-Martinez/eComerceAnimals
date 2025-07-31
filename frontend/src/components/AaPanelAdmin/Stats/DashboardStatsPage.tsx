// components/admin/DashboardStatsPage.tsx
'use client';
import { DailyIncomeChart } from './DailyIncomeChart';
import { useEffect, useState } from 'react';
import { StatsCard } from './StatsCard';
import { IncomeChart } from './IncomeCart';
import { OrdersPieChart } from './OrdersPieChart';
import { PetSalesBarChart } from './PetSaleBarChart';
import { TopSizes } from './TopSizes';
import { TopColors } from './TopColor';
import { BestSellers } from './BestSellers';
import { MostViewedNoSales } from './MostViewedNoSales';
import { getOverview } from '@/service/adminService';

const DashboardStatsPage = () => {
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [ordersCount, setOrdersCount] = useState<number>(0);
  const [avgTicket, setAvgTicket] = useState<number>(0);
  const [avgProducts, setAvgProducts] = useState<number>(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await getOverview();
        setTotalIncome(stats.totalRevenue ?? 0);
        setOrdersCount(stats.totalOrders ?? 0);
        setAvgTicket(stats.avgTicket ?? 0);
        setAvgProducts(stats.avgProductsPerOrder ?? 0);
      } catch (err) {
        console.error('Error al obtener overview del admin:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-4 space-y-8">
      {/* MÉTRICAS GENERALES */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard title="Ingresos totales" value={`$${totalIncome.toLocaleString()}`} />
        <StatsCard title="Pedidos totales pagados" value={ordersCount} />
        <StatsCard title="Ticket promedio" value={`$${avgTicket.toLocaleString()}`} />
        <StatsCard title="Productos x pedido" value={avgProducts} />
      </div>

      {/* GRÁFICO DE INGRESOS POR PERÍODO */}
      <div className="bg-white rounded-xl shadow p-4 ">
        <DailyIncomeChart />
        <div className='mt-4'>
        <IncomeChart />
        </div>
      </div>

      {/* PIE DE ESTADO DE ÓRDENES */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold text-punky-green mb-2">Órdenes por estado</h2>
        <OrdersPieChart />
      </div>

      {/* VENTAS POR MASCOTA */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold text-punky-green mb-2">Ventas por tipo de mascota</h2>
        <PetSalesBarChart />
      </div>

      {/* TOP TALLES Y COLORES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TopSizes />
        <TopColors />
      </div>

      {/* PRODUCTOS DESTACADOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BestSellers />
        <MostViewedNoSales />
      </div>
    </div>
  );
};

export default DashboardStatsPage;
