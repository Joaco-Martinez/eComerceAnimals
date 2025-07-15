"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { getAllCategories } from "../../service/categorieService";
import { useEffect, useState } from "react";

interface categories {
  id: number;
  name: string;
  image?: string;
}

export const SliderCategories = () => {
  const [categories, setCategories] = useState<categories[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="w-full px-4">
      {loading ? (
        <p className="text-center text-gray-500 py-6">Cargando categorías...</p>
      ) : categories.length === 0 ? (
        <p className="text-center text-gray-500 py-6">No hay categorías disponibles</p>
      ) : (
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3500 }}
          loop
          slidesPerView={3}
          breakpoints={{
            0: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          spaceBetween={20}
          className="w-full"
        >
          {categories.map((category: categories) => (
            <SwiperSlide
              key={category.id}
              className="flex flex-col items-center justify-center cursor-pointer select-none px-2"
            >
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full overflow-hidden border border-gray-300 shadow-md">
                  <Image
                    src={category.image ?? "/placeholder.jpg"}
                    alt={category.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h5 className="text-sm font-medium text-[#918283] text-center mt-2">
                  {category.name}
                </h5>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
