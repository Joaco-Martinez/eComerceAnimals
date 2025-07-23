"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../context/authContext";
import { getOrdersByUserController } from "../../../../service/orderService";

type Order = {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: string;
  totalAmount: number;
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-200 text-yellow-800",
  paid: "bg-green-200 text-green-800",
  shipped: "bg-blue-200 text-blue-800",
  delivered: "bg-teal-200 text-teal-800",
  cancelled: "bg-red-200 text-red-800",
  processing: "bg-purple-200 text-purple-800",
};

export default function OrdersPage() {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        const orders = await getOrdersByUserController();
        setOrders(orders);
      };
      fetchOrders();
    }
  }, [user]);

  if (!user) return <p className="text-center text-[#2C4B4D]">Iniciá sesión para ver tus pedidos</p>;

  return (
    <div className="space-y-6">
      {orders.length === 0 ? (
        <p className="text-[#2C4B4D]">No tenés pedidos todavía.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border border-[#C4BFAB] rounded-xl shadow-md p-6 bg-[#F9F8F3]"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-[#2C4B4D]">
                Orden #{order.orderNumber}
              </h2>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  statusColors[order.status] || "bg-gray-200 text-gray-700"
                }`}
              >
                {order.status.toUpperCase()}
              </span>
            </div>

            <div className="text-sm text-[#534f4f] space-y-1">
              <p>
                Total:{" "}
                <span className="font-semibold text-[#2C4B4D]">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </p>
              <p>
                Fecha:{" "}
                <span className="text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
