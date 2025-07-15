import api from "./apiService";

export const getAllCategories = async () => await api.get("/categories");