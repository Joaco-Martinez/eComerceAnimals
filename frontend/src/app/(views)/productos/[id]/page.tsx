"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { getProductById } from "@/service/productService";
import type { Product } from "@/components/ProductDetail/ProductDetail";

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<null | Product>(null);

  useEffect(() => {
    if (params?.id && typeof params.id === "string") {
      getProductById(params.id).then(setProduct);
    }
  }, [params?.id]);

  if (!product) return <div>Cargando...</div>;

  return <ProductDetail product={product} />;
}
