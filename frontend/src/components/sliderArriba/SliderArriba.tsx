'use client'; // si estás en Next.js 13+
import "../../app/globals.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

export default function TopSlider() {
  return (
    <div className="w-full h-12 bg-[#2C4B4D] text-[#F1F1F1] text-">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3500 }}
        loop
        className="h-full"
      >
        <SwiperSlide>
          <h5 className="h-full flex items-center justify-center   ">
            <span className="font-bold mr-2">20% OFF </span>
            <span>por transferencia</span>
          </h5>
        </SwiperSlide>
        <SwiperSlide>
          <h5 className="h-full flex items-center justify-center  ">
            Lo mejor para tu pet
          </h5>
        </SwiperSlide>
        <SwiperSlide>
          <h5 className="h-full flex items-center justify-center   ">
            Envíos gratis a todo el país 
          </h5>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
