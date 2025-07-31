import apiService from "./apiService";



export const subsStock = async ( email: string, productId: string) => {
    await apiService.post("/stock-notifications", { email, productId }, false, true, true);
    return 
};