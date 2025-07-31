'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WishlistAddButton from './WishlistAddButton';
import type { ProductCardProps } from './CardProduct';

const ProductCardDesktop: FC<ProductCardProps> = ({
  name,
  description,
  price,
  images,
  id,
  stock,
}) => {
  const formattedPrice = (price * 0.8).toLocaleString('es-AR');
  const originalPrice = price.toLocaleString('es-AR');
  const installment = Math.round(price / 3).toLocaleString('es-AR');

  return (
    <div className="hidden sm:block w-full max-w-[240px] h-[450px] cursor-pointer">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden h-full flex flex-col transition-transform hover:-translate-y-1 hover:shadow-lg cursor-pointer">
        <div className="relative px-3 pt-4 pb-3 bg-gray-50 flex-1 cursor-pointer">
          {/* Wishlist */}
          <div className="absolute top-3 right-3 z-10 ">
            <WishlistAddButton productId={id} />
          </div>

          <Link href={`/productos/${id}`} className="h-full flex flex-col justify-between">
            {/* Etiqueta de stock */}
            {stock === 0 && (
              <div className="absolute top-2 left-2 bg-[#ff905c] px-2 py-[2px] rounded-sm text-white text-[10px] font-semibold shadow-md z-10">
                SIN STOCK
              </div>
            )}

            {/* Imagen */}
            <div className="flex justify-center items-center h-[180px] mb-3">
              <Image
                src={images[0]?.url || '/placeholder.jpg'}
                alt={name}
                width={160}
                height={160}
                className="object-contain rounded-xl bg-white max-h-full"
              />
            </div>

            {/* Info */}
            <div className="px-2 pb-4 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-base font-bold text-gray-900 mb-2 leading-snug line-clamp-2">
                  {name}
                </h2>

                <p className="text-xs text-gray-600 mb-3 leading-snug line-clamp-2">
                  {description.length > 70 ? description.slice(0, 70) + '...' : description}
                </p>
              </div>

              <div>
                {/* Precios */}
                <div className="mb-2">
                  <div className="text-xs text-gray-500 mb-1">${originalPrice}</div>
                  <div className="flex items-center justify-between">
                    <div className="bg-[#918283] rounded-r-full px-3 pr-4 py-1 flex flex-col items-start">
                      <div className="text-base font-bold text-white leading-none">
                        ${formattedPrice}
                      </div>
                      <div className="text-[10px] text-white">por transferencia</div>
                    </div>

                    <button className="flex items-center justify-center">
                      <Image
                        src="/icons/mas.png"
                        alt="Carrito"
                        width={42}
                        height={42}
                        className="w-[42px] h-[42px]"
                      />
                    </button>
                  </div>
                </div>

                {/* Cuotas */}
                <div className="text-xs text-gray-500">
                  <span>3 cuotas de ${installment}</span> sin interés
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCardDesktop;
