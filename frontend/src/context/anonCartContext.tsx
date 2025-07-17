"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import {
  getAnonCart,
  addToAnonCart,
  removeFromAnonCart,
  clearAnonCart,
} from "../service/anonCartService"; // asegúrate de tener el service separado
import type { CartItem } from "../../interfaces/Types";

interface AnonCartContextType {
  cartId: string;
  items: CartItem[];
  loading: boolean;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const AnonCartContext = createContext<AnonCartContextType | undefined>(undefined);

export const useAnonCart = () => {
  const ctx = useContext(AnonCartContext);
  if (!ctx) throw new Error("useAnonCart debe usarse dentro de un AnonCartProvider");
  return ctx;
};

export const AnonCartProvider = ({ children }: { children: ReactNode }) => {
  const [cartId, setCartId] = useState<string>("");
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let id = Cookies.get("cart_id");

    if (!id) {
      id = uuidv4();
      Cookies.set("cart_id", id, { expires: 7 });
    }

    setCartId(id);

    const fetchCart = async () => {
      try {
        const data = await getAnonCart(id!);
        setItems(data.items || []);
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const addItem = async (productId: string, quantity: number = 1) => {
    await addToAnonCart(cartId, productId, quantity);
    const updated = await getAnonCart(cartId);
    setItems(updated.items);
  };

  const removeItem = async (productId: string) => {
    await removeFromAnonCart(cartId, productId);
    const updated = await getAnonCart(cartId);
    setItems(updated.items);
  };

  const clearCart = async () => {
    await clearAnonCart(cartId);
    setItems([]);
  };

  return (
    <AnonCartContext.Provider
      value={{ cartId, items, loading, addItem, removeItem, clearCart }}
    >
      {children}
    </AnonCartContext.Provider>
  );
};
