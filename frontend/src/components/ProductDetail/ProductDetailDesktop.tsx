"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "@/context/authContext";
import { useAnonCart } from "@/context/anonCartContext";
import { addToCart } from "@/service/cartService";
import { Product } from "./ProductDetail"; // Asegurate de importar el tipo correcto
import NotifyStockModal from "../NotifyStockModal/NotifyStockModal";
import { useRouter } from "next/navigation";
interface Props {
  product: Product;
}

const ProductDetailDesktop = ({ product }: Props) => {
  const [selectedColor, setSelectedColor] = useState(product.color[0]);
  const [selectedSize, setSelectedSize] = useState(product.size[0]);
  const [mainImage, setMainImage] = useState(product.images[0].url);
    const [showNotifyStockModal, setShowNotifyStockModal] = useState(false);
  const { isAuth } = useAuthContext();
  const { addItem } = useAnonCart();
     const router = useRouter();
  const format = (value: number) =>
    value.toLocaleString("es-AR", { minimumFractionDigits: 0 });

  const originalPrice = product.price;
  const transferPrice = Math.round(originalPrice * 0.8);
  const installment = Math.round(originalPrice / 3);

  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Debes seleccionar un color y un tamaño");
      return;
    }

    try {
      if (isAuth) {
        await addToCart(product.id, 1, selectedColor, selectedSize);
      } else {
        await addItem(product.id, 1, selectedColor, selectedSize);
      }

      toast.success("Producto agregado al carrito");
    } catch (error) {
      toast.error("Error al agregar al carrito");
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 flex gap-10">
      {/* Sección Izquierda - Imágenes */}
      {/* Botón Volver */}
      <NotifyStockModal productId={product.id} productName={product.name} isOpen={showNotifyStockModal} onClose={() => setShowNotifyStockModal(false)} />
      
      <div className="flex-1 mb-12">
      <button
        onClick={() => router.back()}
        className="text-sm text-[#2C4B4D] hover:underline mb-4 cursor-pointer "
      >
        ← Volver
      </button>
        <div className="w-full aspect-square bg-white rounded-lg shadow">
          <Image
            src={mainImage}
            alt="Imagen principal"
            width={500}
            height={500}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="flex gap-2 mt-4">
          {product.images.map((img) => (
            <div
              key={img.id}
              onClick={() => setMainImage(img.url)}
              className={`w-20 h-20 border rounded-lg overflow-hidden cursor-pointer ${
                mainImage === img.url ? "border-[#2C4B4D]" : "border-gray-300"
              }`}
            >
              <Image
                src={img.url}
                alt="Miniatura"
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Sección Derecha - Detalles */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2C4B4D] mb-4">
            {product.name}
          </h1>

          {/* Colores */}
          <p className="text-sm font-semibold text-[#2C4B4D] mb-2">Opciones de Color</p>
          <div className="flex gap-2 mb-4">
            {product.color.map((color) => (
              <div
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-all duration-150 ${
                  selectedColor === color
                    ? "bg-[#C4BFAB] scale-90 border-[#C4BFAB]"
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
              />
            ))}
          </div>

          {/* Talles */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {["XS", "S", "M", "L", "XL", "U"]
              .filter((t) => product.size.includes(t))
              .map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border rounded-md text-sm cursor-pointer transition-all duration-150 ${
                    selectedSize === size
                      ? "bg-[#C4BFAB] text-white border-[#C4BFAB]"
                      : "border-gray-300"
                  }`}
                >   
                  {size}
                </button>
              ))}
          </div>

          {/* Precios */}
          <div className="mb-6">
            <p className="text-[#918283] line-through text-sm">
              ${format(originalPrice)}
            </p>
            <p className="text-3xl font-bold text-[#2C4B4D]">
              ${format(transferPrice)}
            </p>
            <p className="text-sm text-gray-600">por transferencia</p>
            <p className="text-sm text-[#918283]">
              ${format(installment)} en 3 cuotas
            </p>
          </div>

          {/* Descripción */}
          <div className="text-sm text-[#555] whitespace-pre-line">
            <p className="font-semibold text-[#C4BFAB] mb-1">Descripción</p>
            <p>{product.description}</p>
          </div>
        </div>

        {/* Botón */}
         {product.stock > 0 ? (
              <button
                onClick={handleAddToCart}
                className="mt-6 bg-[#918283] hover:bg-[#7b6e6e] text-white py-3 px-8 rounded-full text-sm font-semibold w-full max-w-xs self-end transition-colors"
              >
                + AGREGAR AL CARRITO
              </button>
            ) : (
              <button
                onClick={() => setShowNotifyStockModal(true)}
                className="mt-6 bg-[#918283] hover:bg-[#7b6e6e] text-white py-3 px-8 rounded-xl text-center w-full max-w-xs self-end transition-colors cursor-pointer"
              >
                <div className="leading-tight">
                  <p className="text-base font-bold">SIN STOCK</p>
                  <p className="text-xs text-white/90">Avisarme cuando haya stock</p>
                </div>
              </button>
            )}
      </div>
    </div>
  );
};

export default ProductDetailDesktop;
