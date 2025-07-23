import api from "./apiService";

export const getAllProducts = async () => await api.get("/products");

export const getProductById = async (id: string) => {
  if (!id) throw new Error("Product ID is required");
  return await api.get(`/products/${id}`);
}

export const getProductByPetType = async (PetType: string) => {
  if (!PetType) throw new Error("Product PetType is required");
  return await api.get(`/products/pet/${PetType}`);
}

export const searchProducts = async (query: string) => {
  return await api.get(`/products/search?q=${encodeURIComponent(query)}`);
};

export const getProductsByCategoryId = async (categoryId: string) => {
  if (!categoryId) throw new Error("Se requiere el ID de la categoría");
  return await api.get(`/products/category/${categoryId}`);
};

export const getFilteredProducts = async (filters: {
  petType?: string;
  categoryId?: string;
  sortBy?: "priceAsc" | "priceDesc" | "relevance";
}) => {
    const params = new URLSearchParams();

  if (filters.petType) params.append("petType", filters.petType);
  if (filters.categoryId) params.append("categoryId", filters.categoryId);
  if (filters.sortBy) params.append("sortBy", filters.sortBy);

  return await api.get(`/products/filter?${params.toString()}`);
};

export const getAllCategories = () => api.get("/categories");

export const deleteProduct = async (id: string) => await api.del(`/products/${id}`);

export const postProduct = async (data: FormData) => {
  return await api.post("/products", data, true, true, true, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}