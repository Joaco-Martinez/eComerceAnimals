import apiService from "./apiService";  

export const getOverview = async () => {
    return await apiService.get("/admin/stats/overview", true, false, false);
};

export const getPetTypeSales = async () => {
    return await apiService.get("/admin/stats/pet-type-sales", true, false, false);
};

export const getTopCategories = async () => {
    return await apiService.get("/admin/stats/top-categories", true, false, false);
};

export const getTopColor = async () => {
    return await apiService.get("/admin/stats/top-colors", true, false, false);
};

export const getTopSize = async () => {
    return await apiService.get("/admin/stats/top-sizes", true, false, false);
};

export const getPaymentMethods = async () => {
    return await apiService.get("/admin/stats/payment-methods", true, false, false);
};

export const getTopProducts = async () => {
    return await apiService.get("/admin/stats/top-products", true, false, false);
};

export const getOrdersByStatus = async () => {
    return await apiService.get("/admin/stats/orders-by-status", true, false, false);
};

export const getUncovertedProducts = async () => {
    return await apiService.get("/admin/stats/unconverted-products", true, false, false);
};

export const getEarningsByYear = async (year: number) => {
  return await apiService.get(`/admin/stats/earnings/year/${year}`, true, false, false);
};

export const getEarningsByMonth = async (year: number, month: number) => {
  return await apiService.get(`/admin/stats/earnings/month/${year}/${month}`, true, false, false);
};

export const getAllProductsAdmin = async () => {
  return await apiService.get("/products/admin", true, false, false);
};


export const getAllCategoriesAdmin = async () => {
  return await apiService.get("/categories/admin", true, false, false);
};