"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/CardProduct/CardProduct";
import LogicaSearchbar from "@/components/LogicaSearchbar/LogicaSearchbar";
import MobileBottomBar from "@/components/MobileBottomBar/MobileBottomBar";
import FilterModal from "@/components/FilterModal/FilterModal";
import SortModal from "@/components/SortModal/SortModal";
import Loader from "@/components/Loader/Loader";
import Pagination from "@/components/Pagination/Pagination";
import {
  getAllProducts,
  getFilteredProducts,
  getAllCategories,
  searchProducts,
} from "@/service/productService";

interface ProductImage {
  id: string;
  url: string;
  productId: number;
}

interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  petType: "dog" | "cat" | "both";
}

interface Product {
  name: string;
  id: string;
  description: string;
  price: number;
  images: ProductImage[];
  stock: number;
  weight: string;
  size: string[];
  color: string[];
  sku: string;
  petType: "dog" | "cat" | "both";
  category: Category;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState<{ petType?: string; categoryId?: string }>({});
  const [currentSort, setCurrentSort] = useState<"relevance" | "priceAsc" | "priceDesc">("relevance");
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const router = useRouter();
  const PRODUCTS_PER_PAGE = 32;

  const paginatedProducts = products.slice(
  (currentPage - 1) * PRODUCTS_PER_PAGE,
  currentPage * PRODUCTS_PER_PAGE
  );

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFilterChange = useCallback((newFilters: { petType?: string; categoryId?: string }) => {
    // Limpia la búsqueda global (elimina ?q=...)
    router.replace("/productos");
    setFilters(newFilters);
  }, [router]);

  // Buscar por query param (desde barra de búsqueda global)
  useEffect(() => {
    const buscarDesdeURL = async () => {
      if (!q) return;

      setLoading(true);
      try {
        const res = await searchProducts(q);
        setProducts(res);
      } catch (error) {
        console.error("Error al buscar desde query param:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    buscarDesdeURL();
  }, [q]);

    useEffect(() => {
  setCurrentPage(1);
}, [products]);

  // Obtener productos con filtros si no hay búsqueda por query param
  useEffect(() => {
    if (q) return; // si hay búsqueda global, evitamos esta lógica

    const fetchFiltered = async () => {
      setLoading(true);
      try {
        const params = {
          ...filters,
          sortBy: currentSort,
        };

        const res =
          filters.petType || filters.categoryId || currentSort !== "relevance"
            ? await getFilteredProducts(params)
            : await getAllProducts();

        setProducts(res);
      } catch (err) {
        console.error("Error al filtrar productos:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFiltered();
  }, [filters, currentSort, q]);

  // Cargar categorías al inicio
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getAllCategories();
        setCategories(cats);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="mb-3">
      <div className="px-4 sm:px-8">
        <LogicaSearchbar />
      </div>

      {products.length === 0 ? (
  <div className="flex justify-center items-center h-[60vh] text-gray-500">
    No se encontraron productos.
  </div>
) : (
  <div className="pb-12 pt-2">
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPrev={handlePrevPage}
      onNext={handleNextPage}
    />
  
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 px-3 py-6 max-w-[1280px] mx-auto">
      {paginatedProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>

    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPrev={handlePrevPage}
      onNext={handleNextPage}
    />
  </div>
)}

      <MobileBottomBar
        onFilterClick={() => setShowFilters(true)}
        onSortClick={() => setIsSortOpen(true)}
        currentSort={currentSort}
      />

      <FilterModal
        open={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={handleFilterChange}
        categories={categories}
      />

      <SortModal
        isOpen={isSortOpen}
        onClose={() => setIsSortOpen(false)}
        currentSort={currentSort}
        onSelect={(value) => setCurrentSort(value)}
      />
    </div>
  );
};

export default ProductsPage;
