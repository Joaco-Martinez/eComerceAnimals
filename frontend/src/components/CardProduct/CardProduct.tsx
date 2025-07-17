import { FC, useEffect, useState } from "react";
import Image from "next/image";

export interface ProductImage {
  id: number;
  url: string;
  productId: number;
}

export interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  images: ProductImage[];
  stock: number;
  weight: string;
  size: string[];
  color: string[];
  sku: string;
  petType: "dog" | "cat" | "both";
  category: {
    id: number;
    name: string;
    image?: string;
    description?: string;
  };
}

const ProductCard: FC<ProductCardProps> = ({
  name,
  description,
  price,
  images,
}) => {
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsSmallDevice(window.innerWidth <= 400);
    };

    checkDevice(); // Al montar
    window.addEventListener("resize", checkDevice); // Al cambiar tamaño

    return () => window.removeEventListener("resize", checkDevice); // Limpieza
  }, []);

  const formattedPrice = (price * 0.8).toLocaleString("es-AR");
  const originalPrice = price.toLocaleString("es-AR");
  const installment = Math.round(price / 3).toLocaleString("es-AR");

  return (
    <div className="w-full max-w-[180px] sm:max-w-sm">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
        <div className="p-0 flex-1">
          {/* Header con ícono de favorito */}
          <div className="relative bg-gray-50 px-2 sm:px-4 pt-2 sm:pt-4 pb-1 sm:pb-2">
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
              <div className="flex items-center justify-center">
                <Image
                  src="/icons/corazon.png"
                  alt="Favorito"
                  width={32}
                  height={28}
                  className="sm:w-[45px] sm:h-[45px]"
                />
              </div>
            </div>

            {/* Imagen del producto */}
            <div className="flex justify-center ">
              <Image
                src={images[0]?.url || "/placeholder.jpg"}
                alt={name}
                width={112}
                height={112}
                className="object-contain rounded-lg sm:rounded-2xl pt-2 sm:pt-4 pb-3 sm:pb-6 h-28 w-28 sm:h-56 sm:w-56 shadow-md bg-white"
              />
            </div>
          </div>

          {/* Info del producto */}
          <div className="px-2 sm:px-6 pb-3 sm:pb-6 flex-1 flex flex-col">
            <h2 className="h-10 text-sm sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-2">
              {name}
            </h2>

            <p className="text-[10px] sm:text-xs text-gray-600 mb-2 sm:mb-4 leading-relaxed flex-1">
              {description.length > (isSmallDevice ? 35 : 60)
                ? description.slice(0, isSmallDevice ? 35 : 60) + "..."
                : description}
            </p>

            {/* Precios */}
            <div className="mb-2 sm:mb-3">
              <div className="text-[10px] sm:text-sm text-gray-500 mb-1">
                ${originalPrice}
              </div>

              <div className="flex items-center justify-between">
                <div className="relative flex flex-col items-center -ml-2 sm:-ml-6">
                  <div className="bg-[#918283] rounded-r-full px-2 sm:px-4 pr-3 sm:pr-6 py-[2px] sm:py-1 flex flex-col items-start">
                    <div className="text-sm sm:text-2xl font-bold text-white leading-none">
                    ${formattedPrice}
                  </div>
                  <div className="text-[8px] sm:text-xs text-white">
                    por transferencia
                  </div>
                </div>
                </div>

                <button className="flex items-center justify-center">
                  <Image
                    src="/icons/mas.png"
                    alt="Carrito"
                    width={28}
                    height={28}
                    className="w-[28px] h-[28px] sm:w-[45px] sm:h-[45px]"
                  />
                </button>
              </div>
            </div>

            {/* Cuotas */}
            <div className="text-[10px] sm:text-xs text-gray-500">
              <span className="">3 cuotas de ${installment}</span> sin interés
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
