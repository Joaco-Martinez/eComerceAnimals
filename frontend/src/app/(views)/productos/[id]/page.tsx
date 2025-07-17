"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { getProductById } from "@/service/productService";
import Loader from "@/components/Loader/Loader";

interface ProductImage {
  id: number;
  url: string;
  productId: number;
}

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface Product {
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
export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<null | Product>(null);

  useEffect(() => {
    if (params?.id && typeof params.id === "string") {
      getProductById(params.id).then(setProduct);
    }
  }, [params?.id]);

  if (!product) return <Loader />;

  return <ProductDetail product={product} />;
}
