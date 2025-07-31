"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function SliderPrincipalDesktop() {
  return (
    <div className="w-full h-[600px] hidden md:block relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 4500 }}
        effect="fade"
        loop
        pagination={{
          clickable: false, // sigue estando en false para evitar clics
        }}
        className="w-full h-full  "
      >
        <SwiperSlide className="relative h-[600px]">
          <Image
            src="https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/IMG-20210316-WA0068_eygnfv"
            alt="imagen"
            fill
            className="object-contain rounded-xl"
          />
        </SwiperSlide>
        <SwiperSlide className="relative h-[600px]">
          <Image
            src="https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/stock-photo-group-of-dogs-and-cats-in-front-of-white-background_jjefap"
            alt="imagen"
            fill
            className="object-contain rounded-xl"
          />
        </SwiperSlide>
        <SwiperSlide className="relative h-[600px]">
          <Image
            src="https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/HD-wallpaper-little-beige-kitten-black-little-dog-chihuahua-british-cat-kitten-and-puppy-cat-and-dog-friendship_h3nn33"
            alt="imagen"
            fill
            className="object-contain rounded-xl"
          />
        </SwiperSlide>
      </Swiper>

      {/* 🔒 Aseguramos que los bullets sean visibles pero no clickeables */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: #E0DED1;
          opacity: 1;
          width: 10px;
          height: 10px;
          margin: 0 6px !important;
          pointer-events: none; /* <-- desactiva interacción */
        }

        .swiper-pagination-bullet-active {
          background-color: #2C4B4D !important;
        }
      `}</style>
    </div>
  );
}
