'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import ProductCardSlide from '../productCardSlide/ProductCardSlide'; 
import { getAllProducts } from '../../service/productService';

import type { ProductCardProps } from '../CardProduct/CardProduct';

export default function SliderProductosDestacados() {
  const [featuredProducts, setFeaturedProducts] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data  = await getAllProducts(); 
        setFeaturedProducts(data.slice(0, 4)); // Solo los primeros 4 para el slider
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-6 px-4 sm:px-8">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-[#2C4B4D] mb-4">
          Productos destacados
        </h2>
        <p className="text-center text-gray-500">Cargando productos...</p>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return null;
  }
  console.log('Featured Products:', featuredProducts);
  return (
    <section className="py-6 px-4 sm:px-8">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-[#2C4B4D] mb-4">
        Productos destacados
      </h2>

      <Swiper
  modules={[Autoplay]}
  autoplay={{ delay: 3500 }}
  loop={featuredProducts.length > 1}
  spaceBetween={16}
  slidesPerView={2}
  breakpoints={{
    0: { slidesPerView: 1 },
    640: { slidesPerView: 2 },
  }}
  className="w-full"
>
  {featuredProducts.map(product => (
    <SwiperSlide key={product.sku}>
      <ProductCardSlide {...product} />
    </SwiperSlide>
  ))}
</Swiper>
    </section>
  );
}

