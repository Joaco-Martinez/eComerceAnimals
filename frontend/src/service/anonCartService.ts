import apiService from "./apiService";
import type { Product } from "../../interfaces/Types"; 


export interface AnonCart {
  id: string;
  items: {
    id: string;
    productId: string;
    quantity: number;
    product: Product;
  }[];
}


const BASE_URL = "/anon-cart"

export const getAnonCart = async (cartId: string) => {
  return await apiService.get(`${BASE_URL}?cartId=${cartId}`)
}

export const addToAnonCart = async (cartId: string, productId: string, quantity: number) => {
  return await apiService.post(`${BASE_URL}/add`, { cartId, productId, quantity }, false, false, true)
}

export const removeFromAnonCart = async (cartId: string, productId: string) => {
  return await apiService.post(`${BASE_URL}/remove`, { cartId, productId }, false, false, true)
}

export const clearAnonCart = async (cartId: string) => {
  return await apiService.post(`${BASE_URL}/clear`, { cartId }, false, false, true)
}