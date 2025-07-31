"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../service/categorieService";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/pagination";

interface Category {
  id: string;
  name: string;
  image?: string;
}

export default function SliderCategoriesDesktop() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await getAllCategories();
        setCategories(Array.isArray(res) ? res : []);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className="hidden md:flex w-full px-6 flex-col items-center justify-center">
      {loading ? (
        <div className="py-10 text-center text-[#918283]">Cargando categorías...</div>
      ) : categories.length === 0 ? (
        <p className="text-center text-gray-500 py-6">No hay categorías disponibles</p>
      ) : (
        <div className="w-full max-w-6xl">
          <Swiper
  modules={[Autoplay, Pagination]}
  autoplay={{ delay: 4000 }}
  loop
  slidesPerView={4}
  spaceBetween={80}
  pagination={{ clickable: true, el: ".custom-swiper-pagination-desktop" }}
  className="w-full"
>
  {categories.map((category) => (
    <SwiperSlide key={category.id} className="flex justify-center">
      <div
        onClick={() => router.push(`/productos?categoryId=${category.id}`)}
        className="flex flex-col items-center justify-center cursor-pointer select-none px-6 transition-transform hover:scale-105"
        style={{ maxWidth: 180 }}
      >
        <div className="flex items-center justify-center w-40 h-40 rounded-full overflow-hidden border border-gray-300 shadow-md">
          <Image
            src={category.image ?? "/placeholder.jpg"}
            alt={category.name}
            width={160}
            height={160}
            className="object-cover w-full h-full"
          />
        </div>
        <h5 className="text-xl font-semibold text-[#918283] text-center mt-5">
          {category.name}
        </h5>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

<div className="custom-swiper-pagination-desktop mt-8 flex justify-center" />

<style jsx>{`
  .custom-swiper-pagination-desktop .swiper-pagination-bullet {
    background-color: #e0ded1;
    opacity: 1;
    width: 8px;
    height: 8px;
    margin: 0 6px;
  }
  .custom-swiper-pagination-desktop .swiper-pagination-bullet-active {
    background-color: #2c4b4d;
  }
`}</style>

        </div>
      )}
    </div>
  );
}
