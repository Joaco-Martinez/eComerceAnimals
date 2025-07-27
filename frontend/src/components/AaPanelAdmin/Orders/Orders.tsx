'use client';

import { getAllOrders } from '@/service/orderService';
import { useEffect, useState } from 'react';
import { CardOrder } from './components/CardOrder';
import { GetOrderResponse } from '@/service/orderService';

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<GetOrderResponse[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        console.log("dataaa",data)
        setOrders(data);
      } catch (err) {
        console.error('Error al traer pedidos:', err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-4 grid gap-4">
      {orders.map((order) => (
        <CardOrder key={order.id} order={order} />
      ))}
    </div>
  );
};
