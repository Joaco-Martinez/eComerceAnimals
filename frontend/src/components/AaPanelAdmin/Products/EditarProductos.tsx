"use client"

import { useEffect, useState } from "react"
import AdminProductCard from "./AdminCardProduct/AdminCardProduct"
import { getAllProducts } from "@/service/productService"
import ProductFilters from "./ProductFilter/ProductFilter"
import EditarProductoModal from "./EditarProductoModal/EditarProductoModal"

export interface ProductImage {
  id: string
  url: string
  productId?: string
}

export interface Product {
  name: string
  id: string
  description: string
  price: number
  images: ProductImage[]
  stock: number
  weight: number
  size: string[]
  color: string[]
  sku: string
  petType: "dog" | "cat" | "both"
  category: {
    id: string
    name: string
    image?: string
    description?: string
  }
  isActive: boolean
}

export const EditarProductos = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [filters, setFilters] = useState({
    search: "",
    categoryId: "",
    outOfStock: false,
  })

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts()
        setProducts(data)
      } catch (error) {
        console.error("Error al cargar productos:", error)
      }
    }

    fetchProducts()
  }, [])
  console.log(products)
  const filteredProducts = products.filter((p) => {
    const matchesName = p.name.toLowerCase().includes(filters.search.toLowerCase())
    const matchesCategory = filters.categoryId ? p.category.id === filters.categoryId : true
    const matchesStock = filters.outOfStock ? p.stock === 0 : true
    return matchesName && matchesCategory && matchesStock
  })

  const uniqueCategories = Array.from(
    new Map(products.map((p) => [p.category.id, p.category])).values()
  )

  const handleOpenEdit = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleSave = (updated: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    )
  }

  return (
    <section className="p-4">
      <div className="flex items-center justify-center">        
        <ProductFilters
          categories={uniqueCategories}
          onFilterChange={setFilters}
        />
      </div>

      <div className="grid gap-y-6 gap-x-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto mt-6 px-4">
  {filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
      <AdminProductCard
        key={product.id}
        product={product}
        onEdit={() => handleOpenEdit(product)}
      />
    ))
  ) : (
    <p className="col-span-full text-gray-500 text-center text-base">
      No se encontraron productos.
    </p>
  )}
</div>

      <EditarProductoModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        categories={uniqueCategories}
      />
    </section>
  )
}
