'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import Loader from '../Loader/Loader';

import CardProduct from '../CardProduct/CardProduct';
import { getProductByPetType } from '../../service/productService';

import type { ProductCardProps } from '../CardProduct/CardProduct';

interface Props {
  petType: string;
}

export default function SliderProductosDestacados({ petType }: Props) {
  const [featuredProducts, setFeaturedProducts] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductByPetType(petType); 
        setFeaturedProducts(data.slice(0, 4)); // Mostrar los primeros 4
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [petType]);

  if (loading) {
    return (
      <section className="py-6 px-4 sm:px-8 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-[#2C4B4D] mb-4">
          Productos destacados
        </h2>
        <Loader />
      </section>
    );
  }

  if (featuredProducts.length === 0) return null;

  return (
    <section className="py-6 px-4 sm:px-8 w-full max-w-screen-lg mx-auto">
      <h2 className="text-xl sm:text-2xl font-light  text-center text-[#918283] mb-4">
        NUESTROS <p className="text-[#918283] font-bold inline">
          RECOMENDADOS
          </p>
      </h2>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={featuredProducts.length > 2}
        spaceBetween={16}
        slidesPerView={2}
        className="w-full rounded-2xl overflow-hidden "
      >
        {featuredProducts.map(product => (
          <SwiperSlide key={product.sku}>
            <div className=" py-6">
              <CardProduct {...product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
