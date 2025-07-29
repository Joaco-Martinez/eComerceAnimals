// app/(admin)/orders/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getOrderById } from '@/service/orderService';
import { GetOrderResponse } from '@/service/orderService';

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<GetOrderResponse | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id);
        setOrder(data);
      } catch (error) {
        console.error('Error al obtener la orden:', error);
      }
    };

    if (id) fetchOrder();
  }, [id]);

  if (!order) {
    return <p className="p-4">Cargando orden...</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-punky-green">
        Pedido #{order.orderNumber}
      </h1>

      <section>
        <h2 className="text-lg font-semibold text-punky-mauve mb-2">Dirección de envío</h2>
        <p className="text-sm text-gray-700">
          {order.address.nombre} {order.address.apellido} - {order.address.telefono}
          <br />
          {order.address.calle}
          {order.address.piso && ` piso ${order.address.piso}`}, {order.address.localidad}, {order.address.provincia}, CP {order.address.postalCode}
          <br />
          Envío a: <span className="capitalize">{order.shippingMethod}</span>
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-punky-mauve mb-2">Productos</h2>
        <ul className="space-y-1 text-sm text-gray-800">
  {order.items.map((item, i) => (
    <li key={i} className="flex items-center gap-2">
      <span>
        {item.quantity} x {item.product.name} ({item.size})
      </span>

      {/* Círculo del color */}
      <span
        className="w-4 h-4 rounded-full border border-gray-300"
        style={{ backgroundColor: item.color }}
        title={item.color}
      />

      <span>
        - $
        {typeof item.product.price === 'number'
          ? item.product.price.toFixed(2)
          : 'Precio no disponible'}
      </span>
    </li>
  ))}
</ul>
      </section>

      <p className="text-sm text-gray-600">Total: ${order.totalAmount.toFixed(2)}</p>
    </div>
  );
};

export default OrderDetailPage;
