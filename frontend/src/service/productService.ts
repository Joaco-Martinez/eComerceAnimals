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