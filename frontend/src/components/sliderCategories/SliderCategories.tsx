"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { getAllCategories } from "../../service/categorieService";
import { useEffect, useState } from "react";

interface categories {
  id: number;
  name: string;
  image?: string;
}

function groupCategories<T>(items: T[], groupSize: number): T[][] {
  const groups = [];
  for (let i = 0; i < items.length; i += groupSize) {
    groups.push(items.slice(i, i + groupSize));
  }
  return groups;
}

function getGroupSizeByWidth(width: number): number {
  if (width < 640) return 3;
  if (width < 1024) return 4;
  return 5;
}

export const SliderCategories = () => {
  const [categories, setCategories] = useState<categories[]>([]);
  const [groupSize, setGroupSize] = useState(3); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        setGroupSize(getGroupSizeByWidth(width));
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const grouped = groupCategories(categories, groupSize);

  return (
    <div className="w-full px-4 flex flex-col items-center justify-center">
      {loading ? (
        <p className="text-center text-gray-500 py-6">Cargando categorías...</p>
      ) : categories.length === 0 ? (
        <p className="text-center text-gray-500 py-6">No hay categorías disponibles</p>
      ) : (
        <div className="w-full "> 
<div className="relative w-full">
  <Swiper
  modules={[Autoplay, Pagination]}
  autoplay={{ delay: 3500 }}
  loop
  slidesPerView={1}
  pagination={{
    clickable: true,
    el: '.custom-swiper-pagination',
  }}
  spaceBetween={20}
  className="w-full"
>
  {grouped.map((group, index) => (
    <SwiperSlide key={index}>
      <div
        className="flex justify-center gap-2 px-4"
        style={{
          overflowX: "hidden", // oculto scroll
          maxWidth: "100%", 
        }}
      >
        {group.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center justify-center cursor-pointer select-none px-2"
            style={{
              minWidth: 74,
              flexShrink: 1, // que se achique si falta espacio
              maxWidth: 96,
            }}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full overflow-hidden border border-gray-300 shadow-md">
              <Image
                src={category.image ?? "/placeholder.jpg"}
                alt={category.name}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
            <h5 className="text-sm font-medium text-[#918283] text-center mt-2">
              {category.name}
            </h5>
          </div>
        ))}
      </div>
    </SwiperSlide>
  ))}
</Swiper>

  <div className="custom-swiper-pagination mt-6 flex justify-center " />

  <style jsx>{`
    .custom-swiper-pagination .swiper-pagination-bullet {
      background-color: #e0ded1;
      opacity: 1;
      width: 5.5px;
      height: 5.5px;
      margin: 0 4px;
    }

    .custom-swiper-pagination .swiper-pagination-bullet-active {
      background-color: #2c4b4d;
    }
  `}</style>
  </div>
      </div>
    )}
    </div>
  );
};
