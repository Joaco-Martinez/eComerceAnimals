"use client";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import toast from "react-hot-toast";
import { useAnonCart } from "@/context/anonCartContext";
import {addToCart} from "@/service/cartService";
import { useAuthContext } from "@/context/authContext";

interface ProductImage {
  id: string;
  url: string;
  productId: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  weight: number;
  size: string[];
  color: string[];
  sku: string;
  petType: string;
  isActive: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  images: ProductImage[];
}

interface Props {
  product: Product;
}

const ProductDetail = ({ product }: Props) => {
  const [selectedColor, setSelectedColor] = useState(product.color[0]);
  const [selectedSize, setSelectedSize] = useState(product.size[0]);
  const [selectedVariant, setSelectedVariant] = useState({
  color: product.color[0],
  size: product.size[0],
});
  const { isAuth } = useAuthContext();
  console.log("isAuth:", isAuth);
  const { addItem } = useAnonCart();
  const [currentImage, setCurrentImage] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // Cálculos de precios dinámicos
  const originalPrice = product.price;
  const transferPrice = Math.round(originalPrice * 0.8);
  const installment = Math.round(originalPrice / 3);

  const format = (value: number) =>
    value.toLocaleString("es-AR", { minimumFractionDigits: 0 });


  const handleSizeSelect = (size: string) => {
  setSelectedSize(size);
  setSelectedVariant((prev) => ({ ...prev, size }));
};

  const handleColorSelect = (color: string) => {
  setSelectedColor(color);
  setSelectedVariant((prev) => ({ ...prev, color }));
};

  const handleAddToCart = async () => {
  if (!selectedVariant.color || !selectedVariant.size) {
    toast.error("Debes seleccionar un color y un tamaño");
    return;
  }
  if (isAuth === false) {
    
    
    try {
      await addItem(
        product.id,
        1,
        selectedVariant.color,
        selectedVariant.size
      );
  
      toast.success("Producto agregado al carrito");
  
      console.log("Producto agregado al carrito:", {
        productId: product.id,
        color: selectedVariant.color,
        size: selectedVariant.size,
      });
    } catch (error) {
      toast.error("Ocurrió un error al agregar el producto");
      console.error("Error al agregar al carrito:", error);
    }
  } 
  console.log("isAuth:", isAuth);
  if (isAuth === true) {
    try {
      await addToCart(
        product.id,
        1,
        selectedVariant.color,
        selectedVariant.size
      );
  
      toast.success("Producto agregado al carrito");
  

    } catch (error) {
      toast.error("Ocurrió un error al agregar el producto");
      console.error("Error al agregar al carrito:", error);
    }
  }
};

  return (
    <div className="max-w-[370px] mx-auto bg-white rounded-t-3xl   overflow-hidden shadow-md">
      {/* CABECERA */}
      <div className="bg-gradient-to-t from-[#d2d2d2] via-white to-[#d2d2d2] relative">
        <div className="px-4 py-2 text-sm text-white/90">
          ← {product.category?.name || "Accesorios"}
        </div>
        <div className="w-full -mb-4 z-10 relative flex justify-center  from-[#d2d2d2] to-white items-center">
          <Swiper
            onSlideChange={(swiper) => setCurrentImage(swiper.activeIndex)}
            className="w-full flex justify-center items-center"
          >
            {product.images.map((image, i) => (
              <SwiperSlide
                key={image.id}
                className="flex justify-center items-center"
              >
                <Image
                  src={image.url}
                  alt={`Imagen ${i + 1}`}
                  width={250}
                  height={250}
                  className="object-contain drop-shadow-md mx-auto"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex justify-center gap-1 mt-5 py-2">
          {product.images.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === currentImage ? "bg-[#C4BFAB]" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="bg-white rounded-t-3xl  pt-4  relative">
        <div className="flex justify-between items-start px-4 mb-3">
          <h1 className="text-[18px] font-bold text-[#333]">{product.name}</h1>
          <button>
            <Image
              src="/icons/corazon.png"
              alt="Favorito"
              width={64}
              height={64}
              className=" top-0 left-0 cursor-pointer hover:scale-110 transition-transform duration-150"
            />
          </button>
        </div>

        <div className="mb-4 px-4">
         <p className="text-sm font-semibold text-[#2C4B4D]">
  Opciones de Color
</p>
<div className="flex gap-1.5 mt-2">
  {product.color.map((color) => (
    <div
      key={color}
      onClick={() => handleColorSelect(color)}
      className={`w-5.5 h-5.5 rounded-full border-2 cursor-pointer transition-all duration-150 ${
        selectedColor === color
          ? "border-[#C4BFAB] scale-90"
          : "border-gray-300"
      }`}
      style={{ backgroundColor: color.toLowerCase() }}
    />
  ))}
</div>

<div className="flex items-center gap-1.5 mt-2">
  {product.size.map((size) => (
    <button
      key={size}
      type="button"
      onClick={() => handleSizeSelect(size)}
      className={`px-2 py-1 border-2 rounded-md cursor-pointer transition-all duration-150 ${
        selectedSize === size
          ? "border-[#C4BFAB] bg-[#C4BFAB] text-white"
          : "border-gray-300"
      }`}
    >
      {size}
    </button>
  ))}
</div>
        </div>

        <div className="text-right mb-4 px-4">
          <p className="text-sm  text-[#918283]">
            ${format(originalPrice)}
          </p>
          <p className="text-4xl font-bold text-[#2C4B4D] leading-tight">
            ${format(transferPrice)}
          </p>
          <p className="text-sm text-gray-600">por transferencia</p>
          <div className="flex  justify-end">
            <h2 className="text-sm text-[#918283] flex ">
              <p className="font-semibold pr-1">
                ${format(installment)} 
              </p>
              en 3 cuotas
            </h2>
          </div>
        </div>

        <div className="text-sm text-[#C4BFAB] mb-4 leading-relaxed px-4">
          <p className="font-semibold mb-1">Descripción</p>
          <p>{product.description}</p>
        </div>
          
          <div className="flex justify-between items-center align-center  pt-10">
        <div
          className="flex items-center mb-4 cursor-pointer"
          onClick={() => setShowDetails(!showDetails)}
          >
          <div className="text-[#918283] text-xl px-4">
            {showDetails ? (
              <ChevronDown className="w-7 h-7 text-[#918283]" />
            ) : (
              <ChevronRight className="w-7 h-7 text-[#918283]"  />
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button 
          onClick={handleAddToCart}
          className="bg-[#918283] text-white py-[14px] px-6 rounded-l-[999px] rounded-r-none font-semibold text-sm rounded-b-none">
            + AGREGAR AL CARRITO
          </button>
        </div>
            </div>

        {showDetails && (
          <div className="self-start flex flex-col items-start mt-6 text-xs text-[#918283]">
            <div className="flex items-start">
              <div className="w-8 h-8 mb-1 flex items-center justify-start">
                <Image src="/icons/size.svg" alt="Tamaño" width={24} height={24} />
              </div>
              <p>{product.size?.[0] || "Tamaño único"}</p>
            </div>
            <div className="flex  items-start">
              <div className="w-8 h-8 mb-1 flex items-center justify-start">
                <Image
                  src="/icons/brush.svg"
                  alt="Cerdas"
                  width={24}
                  height={24}
                />
              </div>
              <p>{product.weight}</p>
            </div>
              
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
