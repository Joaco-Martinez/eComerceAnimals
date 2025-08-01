import { FC } from "react";
import Image from "next/image";

export interface ProductImage {
  id: string;
  url: string;
  productId: number;
}

export interface ProductCardSlideProps {
  name: string;
  description: string;
  price: number;
  images: ProductImage[];
  sku: string;
}

const ProductCardSlide: FC<ProductCardSlideProps> = ({
  name,
  description,
  price,
  images,

}) => {
  const formattedPrice = (price * 0.8).toLocaleString("es-AR");
  const originalPrice = price.toLocaleString("es-AR");
  return (
    <div className="w-[160px] bg-white rounded-xl shadow-md flex flex-col overflow-hidden">
      <div className="relative bg-gray-50 p-2">
        {/* Imagen del producto */}
        <div className="flex justify-center">
          <Image
            src={images[0]?.url || "/placeholder.jpg"}
            alt={name}
            width={120}
            height={120}
            className="object-contain rounded-lg shadow"
          />
        </div>
      </div>

      <div className="p-2 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
          {name}
        </h3>

        <p className="text-[10px] text-gray-600 flex-1 line-clamp-3 mb-2">
          {description.length > 45 ? description.slice(0, 45) + "..." : description}
        </p>

        <div className="text-xs text-gray-500 line-through mb-1">${originalPrice}</div>

        <div className="bg-[#918283] rounded-r-full px-3 py-1 inline-block text-white font-bold text-base mb-1">
          ${formattedPrice}
        </div>
      </div>
    </div>
  );
};

export default ProductCardSlide;
