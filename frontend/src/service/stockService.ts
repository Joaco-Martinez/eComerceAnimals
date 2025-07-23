import apiService from "./apiService";



export const subsStock = async ( email: string, productId: string) => {
    console.log(email, productId);
    await apiService.post("/stock-notifications", { email, productId }, false, true, true);
    return 
};