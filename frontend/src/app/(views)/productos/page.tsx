"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/CardProduct/CardProduct";
import { getAllProducts } from "@/service/productService";
import LogicaSearchbar from "@/components/LogicaSearchbar/LogicaSearchbar";
import Loader from "@/components/Loader/Loader";

interface ProductImage {
  id: number;
  url: string;
  productId: number;
}

interface Product {
  name: string;
  description: string;
  price: number;
  images: ProductImage[];
  stock: number;
  weight: string;
  size: string[];
  color: string[];
  sku: string;
  id: number;
  petType: "dog" | "cat" | "both";
  category: {
    id: number;
    name: string;
    image?: string;
    description?: string;
  };
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        const data = response;

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.warn("La respuesta del backend no es un array:", data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Loader />
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500">
        No se encontraron productos.
      </div>
    );
  }

  return (
  <>
    <div className=" px-4 sm:px-8">

        <LogicaSearchbar />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 px-3 py-6 max-w-[1280px] mx-auto">
    {products.map((product) => (
      <ProductCard key={product.sku} {...product} />
    ))}
  </div>
    </>
);

};

export default ProductsPage;
