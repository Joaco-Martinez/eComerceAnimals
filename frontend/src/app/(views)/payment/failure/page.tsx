'use client';

import { useRouter } from 'next/navigation';
import { XCircle } from 'lucide-react';

export default function PaymentFailurePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-6" style={{ backgroundColor: '#FFFFFF' }}>
      <XCircle className="w-16 h-16 mb-4" color="#918283" />
      <h1 className="text-2xl font-bold" style={{ color: '#2C4B4D' }}>¡Pago rechazado!</h1>
      <p className="mt-2 max-w-md" style={{ color: '#918283' }}>
        El intento de pago no fue exitoso. Podés volver a intentarlo o elegir otro método.
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
