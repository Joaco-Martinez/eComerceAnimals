import apiService from "./apiService";

interface UpdateCartBody {
  productId: string;
  quantity: number;
}

export const getCart = async () => {
  return await apiService.get(`/cart`, true, false, false);
}

export const addToCart = async (
  productId: string,
  quantity: number,
  color: string,
  size: string
) => {
  return await apiService.post(
    `/cart/add`,
    { productId, quantity, color, size },
    true,
    false,
    true
  );
};

export const cleanCart = async () => {
  return await apiService.del(`/cart/clean`, true, false, false);
}
export const deleteItemFromCart = async (productId: string) => {
  return await apiService.del(`/cart/remove/${productId}`, true, false, true);
};

export const  updateCartItem= async (data: UpdateCartBody) => {
  return await apiService.put("/cart/update", data);
};

export const applyCoupon = async (code: string) => {
  return await apiService.post("/coupons/apply", { code }, true, true, true);
};