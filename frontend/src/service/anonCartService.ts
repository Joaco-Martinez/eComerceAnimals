import apiService from "./apiService";
import type { Product } from "../../interfaces/Types"; 

export interface AnonCartItem {
  id: string;
  productId: string;
  quantity: number;
  color: string;
  size: string;
  product: Product;
}

export interface AnonCart {
  id: string;
  items: AnonCartItem[];
}

interface UpdateAnonCartItemData {
  cartId: string;
  productId: string;
  quantity: number;
  color: string;
  size: string;
}

export const getAnonCart = async (AnonCartId: string) => {
  return await apiService.get(`/anon-cart?cartId=${AnonCartId}` , true, false, true);
};


export const addToAnonCart = async (
  AnonCartId: string,
  productId: string,
  quantity: number,
  color: string,
  size: string
) => {
  return await apiService.post(
    `/anon-cart/add`,
    { AnonCartId, productId, quantity, color, size },
    true,
    false,
    true
  );
};

export const removeFromAnonCart = async (AnonCartId: string, productId: string) => {
  return await apiService.post(`/anon-cart/remove`, { cartId: AnonCartId, productId }, false, false, true);
};

export const clearAnonCart = async (AnonCartId: string) => {
  return await apiService.post(`/anon-cart/clear`, { cartId: AnonCartId }, false, false, true);
};

export const updateAnonCartItem = async (data: UpdateAnonCartItemData ) => {
  
    await apiService.put("/anon-cart/update", data);
    return
};