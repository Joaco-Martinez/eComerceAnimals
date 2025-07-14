'use client'; // si estás en Next.js 13+

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

export default function TopSlider() {
  return (
    <div className="w-full h-14 bg-[#2C4B4D] text-[#F1F1F1] font-montserrat">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3500 }}
        loop
        className="h-full"
      >
        <SwiperSlide>
          <div className="h-full flex items-center justify-center  text-2xl ">
            20% OFF por transferencia
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full flex items-center justify-center text-2xl ">
            Lo mejor para tu pet
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full flex items-center justify-center   text-2xl ">
            Envíos gratis a todo el país 
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
