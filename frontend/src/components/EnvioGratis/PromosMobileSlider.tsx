'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const slides = [
  {
    icon: '/icons/envios.png',
    title: 'Envíos GRATIS',
    subtitle: 'desde los $45.000 a todo el país',
  },
  {
    icon: '/icons/transferencia.png',
    title: '20% OFF',
    subtitle: 'por transferencia',
  },
  {
    icon: '/icons/cuotas.png',
    title: '3 y 6 CUOTAS',
    subtitle: 'con Mercado Pago',
  },
];

export default function PromosMobileSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000); // cada 4 segundos
    return () => clearInterval(interval);
  }, []);

  const { icon, title, subtitle } = slides[index];

  return (
    <div className="w-screen h-16 md:hidden bg-[#E0DED1] px-4 py-3 flex items-center justify-center text-black overflow-x-hidden">
      <div className="flex justify-center items-center gap-2 max-w-full w-full overflow-hidden">
        <Image
          src={icon}
          alt={title}
          width={40}
          height={40}
          className="shrink-0"
        />
        <div className="truncate">
          <h5 className="text-sm font-semibold leading-none">{title}</h5>
          <h5 className="text-xs font-light leading-none">{subtitle}</h5>
        </div>
      </div>
    </div>
  );
}
