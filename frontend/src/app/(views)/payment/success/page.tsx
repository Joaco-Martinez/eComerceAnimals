'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/service/apiService';
import { CheckCircle } from 'lucide-react';

interface Order {
  id: string;
  status: string;
  // podés agregar más campos si querés mostrar detalles
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get('orderId');
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        router.replace('/');
        return;
      }

      try {
        const res = await api.get(`/order/${orderId}`);
        if (res.status !== 'paid') {
          router.replace('/');
          return;
        }
        setOrder(res);
      } catch (error) {
        console.error('Error al obtener orden:', error);
        router.replace('/');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, router]);

  if (loading) return <p className="text-center py-10">Verificando orden...</p>;
  if (!order) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-6" style={{ backgroundColor: '#FFFFFF' }}>
      <CheckCircle className="w-16 h-16 mb-4" color="#2C4B4D" />
      <h1 className="text-2xl font-bold" style={{ color: '#2C4B4D' }}>¡Pago exitoso!</h1>
      <p className="mt-2 max-w-md" style={{ color: '#918283' }}>
        Gracias por tu compra. Te enviamos un correo con los detalles del pedido.
      </p>
      <button
        onClick={() => router.push('/')}
        className="mt-6 px-6 py-2 rounded-2xl shadow transition cursor-pointer"
        style={{
          backgroundColor: '#2C4B4D',
          color: '#FFFFFF',
        }}
      >
        Volver al inicio
      </button>
    </main>
  );
}
