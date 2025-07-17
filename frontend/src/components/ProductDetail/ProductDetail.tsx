"use client";
import Image from "next/image";
import { useState } from "react";

export interface ProductImage {
  id: number;
  url: string;
  productId: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface Product {
  id: number;
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
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
  images: ProductImage[];
}

interface Props {
  product: Product;
}

const ProductDetail = ({ product }: Props) => {
  const [selectedColor, setSelectedColor] = useState(product.color[0] || "");
    console.log("ProductDetail", product);

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden font-sans">
      {/* Header */}
      <div className="p-4 text-sm text-gray-500">← {product.category?.name || "Volver"}</div>

      {/* Imagen principal */}
      <div className="flex justify-center px-6">
        {product.images?.[0] && (
          <Image
            src={product.images[0].url}
            alt={product.name}
            width={250}
            height={250}
            className="object-contain rounded-lg"
          />
        )}
      </div>

      {/* Product Info */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <button className="text-gray-400 text-2xl">♡</button>
        </div>

        {/* Precio */}
        <div className="mt-2">
          <span className=" text-gray-400 text-sm">${(product.price * 0.8).toFixed(0)}</span>
          <div className="text-2xl font-bold text-[#6e3c46]">${product.price}</div>
          <div className="text-xs text-gray-500">por transferencia</div>
          <div className="text-sm text-gray-500 mt-1">${(product.price / 3).toFixed(0)} en 3 cuotas</div>
        </div>

        {/* Colores */}
        <div className="mt-4">
          <span className="text-sm font-medium">Opciones de Color</span>
          <div className="flex gap-2 mt-2 flex-wrap">
            {product.color.map((color) => (
              <button
                key={color}
                className={`w-5 h-5 rounded-full border-2 ${
                  selectedColor === color ? "border-gray-800" : "border-gray-300"
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        {/* Descripción */}
        <div className="mt-6 text-sm text-gray-700 leading-relaxed">
          <p>{product.description}</p>
        </div>

        {/* Detalles */}
        <div className="mt-6 flex justify-between text-sm text-gray-600">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gray-100 rounded-full mb-1 flex items-center justify-center">
              📏
            </div>
            <span>Peso: {product.weight} kg</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gray-100 rounded-full mb-1 flex items-center justify-center">
              🐶
            </div>
            <span>Mascota: {product.petType === "both" ? "Perros y Gatos" : product.petType}</span>
          </div>
        </div>

        {/* Botón */}
        <div className="mt-6">
          <button className="w-full bg-[#6e3c46] text-white py-3 rounded-full font-semibold">
            + AGREGAR AL CARRITO
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
