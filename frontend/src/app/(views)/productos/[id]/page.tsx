"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getProductById } from "@/service/productService";
import Loader from "@/components/Loader/Loader";
import SliderProductosRecomendados from "@/components/SliderProductosRecomendados/SliderProductosRecomendado";
import ProductDetailSelector from "@/components/ProductDetail/ProductDetailSelector";
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
export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<null | Product>(null);

  useEffect(() => {
    if (params?.id && typeof params.id === "string") {
      getProductById(params.id).then(setProduct);
    }
  }, [params?.id]);

  if (!product) return <Loader />;

  return (
          <>
              <ProductDetailSelector product={product} />
              <SliderProductosRecomendados petType={product.petType} />
          </>

  )
}
