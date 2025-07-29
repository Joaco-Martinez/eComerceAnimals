'use client';

import { GetOrderResponse } from '@/service/orderService';
import { useRouter } from 'next/navigation';

interface CardOrderProps {
  order: GetOrderResponse;
}

const statusColorMap: Record<string, string> = {
  pending: 'text-[#D4A61C]',
  paid: 'text-[#2C894D]',
  processing: 'text-[#4285B0]',
  shipped: 'text-[#2B547E]',
  delivered: 'text-[#3B7C3A]',
  cancelled: 'text-[#A8504F]',
};

export const CardOrder = ({ order }: CardOrderProps) => {
  const router = useRouter();

  const handleOrderClick = () => {
    router.push(`/admin/orders/${order.id}`);
  };

  const statusColor = statusColorMap[order.status] || 'text-[#918283]';

  return (
    <div
      onClick={handleOrderClick}
      className="bg-[#FFFFFF] rounded-2xl shadow  border-[#2C4B4D] p-4 cursor-pointer hover:shadow-lg transition-all"
    >
      <p className="text-sm font-semibold text-[#2C4B4D]">
        Pedido #{order.orderNumber}
      </p>
      <p className="text-sm text-[#918283]">
        Estado:{' '}
        <span className={`capitalize font-medium ${statusColor}`}>
          {order.status}
        </span>
      </p>
      <p className="text-sm text-[#918283]">
        Cliente: {order.user.name ?? 'Sin nombre'}
      </p>
    </div>
  );
};
