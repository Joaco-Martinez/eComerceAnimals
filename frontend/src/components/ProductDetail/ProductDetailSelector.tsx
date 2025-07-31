'use client';

import { useEffect, useState } from 'react';
import ProductDetail from './ProductDetail';
import ProductDetailDesktop from './ProductDetailDesktop';
import type { Product } from './ProductDetail'; // Asegurate de importar el tipo correcto

interface Props {
  product: Product;
}

const ProductDetailSelector = ({ product }: Props) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // lg breakpoint
    };

    handleResize(); // detectar en el primer render

    window.addEventListener('resize', handleResize); // actualizar al cambiar tamaño
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isDesktop ? (
    <ProductDetailDesktop product={product} />
  ) : (
    <ProductDetail product={product} />
  );
};

export default ProductDetailSelector;
