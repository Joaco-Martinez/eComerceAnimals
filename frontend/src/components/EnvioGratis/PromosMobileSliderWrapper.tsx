'use client';

import dynamic from 'next/dynamic';

// 🚫 Evita render en SSR (que rompe con Swiper)
// 👁️ Visible solo en mobile (responsive)
const PromosMobileSlider = dynamic(() => import('./PromosMobileSlider'), {
  ssr: false,
});

export default function PromosMobileSliderWrapper() {
  return (
    <div className="block md:hidden w-full h-full">
      <PromosMobileSlider />
    </div>
  );
}
