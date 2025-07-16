import api from "./apiService";

export const getAllProducts = async () => await api.get("/products");