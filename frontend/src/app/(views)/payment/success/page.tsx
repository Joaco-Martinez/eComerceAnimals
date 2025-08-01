'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/service/apiService';
import { CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get('orderId');
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const confirmOrder = async () => {
      if (!orderId || !token) {
        console.log('No se proporcionaron  token', token);
        console.log('No se proporcionaron orderId', orderId);
        return;
      }

      try {
        // Validar el token y actualizar estado a "paid"
        await api.post('/orders/confirm-payment', { orderId, token });
        setValid(true);
      } catch (err) {
        console.error('Token inválido o expirado:', err);
        toast.error('Token inválido o expirado');
        router.replace('/');
      } finally {
        setLoading(false);
      }
    };

    confirmOrder();
  }, [orderId, token, router]);

  if (loading) return <p className="text-center py-10">Confirmando orden...</p>;
  if (!valid) return null;

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
