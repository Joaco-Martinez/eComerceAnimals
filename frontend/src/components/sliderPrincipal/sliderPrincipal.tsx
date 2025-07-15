"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

export default function SliderPrincipal() {
  return (
    <div className="w-full h-full text-[#F1F1F1]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4500 }}
        loop
        pagination={{ clickable: true }}
        className="h-full"
      >
        <SwiperSlide>
          <Image
            src="https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/IMG-20210316-WA0068_eygnfv"
            alt="imagen"
            width={640}
            height={800}
            className="w-full h-auto object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/stock-photo-group-of-dogs-and-cats-in-front-of-white-background_jjefap"
            alt="imagen"
            width={640}
            height={800}
            className="w-full h-auto object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/HD-wallpaper-little-beige-kitten-black-little-dog-chihuahua-british-cat-kitten-and-puppy-cat-and-dog-friendship_h3nn33"
            alt="imagen"
            width={640}
            height={800}
            className="w-full h-auto object-cover"
          />
        </SwiperSlide>
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: #E0DED1;
          opacity: 1;
          width: 9px;
          height: 9px;
          margin: 0 4px !important;
        }
        .swiper-pagination-bullet-active {
          background-color: #2C4B4D !important;
        }
      `}</style>
    </div>
  );
}
