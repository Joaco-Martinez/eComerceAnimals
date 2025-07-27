'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ModalEditarEstado from '@/components/AaPanelAdmin/Orders/components/ModalEditarEstado';
import { getOrderById, GetOrderResponse } from '@/service/orderService';
import MandarCodigo from '@/components/AaPanelAdmin/Orders/components/MandarCodigo';
const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<GetOrderResponse | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [envioModal, setEnvioModal  ] = useState(false);

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

  if (!order) return <p className="p-4 text-[#918283]">Cargando orden...</p>;

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto bg-[#E0DED1] rounded-2xl shadow-lg space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#2C4B4D]">
        Detalles del pedido #{order.orderNumber}
      </h1>

      {/* Dirección */}
      <section>
        <h2 className="text-lg font-semibold text-[#918283] mb-3">Dirección</h2>
        <ul className="text-sm sm:text-base text-[#2C4B4D] space-y-1">
          <li><strong>Nombre:</strong> {order.address.nombre}</li>
          <li><strong>Apellido:</strong> {order.address.apellido}</li>
          <li><strong>DNI:</strong> {order.address.dni}</li>
          <li><strong>Teléfono:</strong> {order.address.telefono}</li>
          <li><strong>Calle:</strong> {order.address.calle}</li>
          {order.address.piso && <li><strong>Piso:</strong> {order.address.piso}</li>}
          <li><strong>Localidad:</strong> {order.address.localidad}</li>
          <li><strong>Provincia:</strong> {order.address.provincia}</li>
          <li><strong>Código Postal:</strong> {order.address.postalCode}</li>
        </ul>
      </section>

      {/* Usuario */}
      <section>
        <h2 className="text-lg font-semibold text-[#918283] mb-3">Usuario</h2>
        <p className="text-sm sm:text-base text-[#2C4B4D]">
          <strong>Nombre:</strong> {order.user.name || 'Sin nombre'}<br />
          <strong>Email:</strong> {order.user.email}
        </p>
      </section>

      {/* Productos */}
      <section>
        <h2 className="text-lg font-semibold text-[#918283] mb-3">Productos</h2>
        <div className="overflow-x-auto bg-white rounded-xl shadow-inner border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-[#f3f3f3] text-[#2C4B4D]">
                <th className="p-3 border-b border-gray-300">Color</th>
                <th className="p-3 border-b border-gray-300">Producto</th>
                <th className="p-3 border-b border-gray-300">Cantidad</th>
                <th className="p-3 border-b border-gray-300">Talle</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index} className="border-t border-gray-200 hover:bg-[#fefefe]">
                  <td className="p-3 whitespace-nowrap text-[#2C4B4D]">{item.color}</td>
                  <td className="p-3 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-[#2C4B4D]">{item.product.name}</span>
                      <span className="text-xs text-[#918283]">SKU: {item.product.sku}</span>
                    </div>
                  </td>
                  <td className="p-3 text-[#2C4B4D]">{item.quantity}</td>
                  <td className="p-3 text-[#2C4B4D]">{item.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Info adicional + botón */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm sm:text-base text-[#2C4B4D]">
        <div className="space-y-1">
          <p><strong>Método de Envío:</strong> {order.shippingMethod}</p>
          <p><strong>Estado:</strong> {order.status}</p>
          <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-[#2C4B4D] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#1e3435] transition-colors"
        >
          Cambiar Estado
        </button>
        <button
          onClick={() => (setEnvioModal(true))}
          className="bg-[#2C4B4D] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#1e3435] transition-colors"
        >
          Enviar codigo de envio
        </button>
      </section>

      <MandarCodigo
        isOpen={envioModal}
        onClose={() => setEnvioModal(false)}
        id={order.id}
      />

      <ModalEditarEstado
        open={openModal}
        onClose={() => setOpenModal(false)}
        id={order.id}
      />
    </div>
  );
};

export default OrderDetailPage;
