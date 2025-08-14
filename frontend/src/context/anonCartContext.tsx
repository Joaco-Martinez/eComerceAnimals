"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import {
  getAnonCart,
  addToAnonCart,
  removeFromAnonCart,
  clearAnonCart,
} from "../service/anonCartService";
import type { Product } from "../../interfaces/Types";

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  color: string;
  size: string;
  product: Product;
}

interface AnonCartContextType {
  cartId: string | null;
  items: CartItem[];
  loading: boolean;
  addItem: (
    productId: string,
    quantity: number,
    color: string,
    size: string
  ) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const AnonCartContext = createContext<AnonCartContextType | undefined>(
  undefined
);

export const useAnonCart = () => {
  const ctx = useContext(AnonCartContext);
  if (!ctx)
    throw new Error("useAnonCart debe usarse dentro de un AnonCartProvider");
  return ctx;
};

export const AnonCartProvider = ({ children }: { children: ReactNode }) => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // const fetchCart = async () => {
  //   try {
  //     const data = await getAnonCart();
  //     setItems(data.items || []);
  //   } catch (error) {
  //     console.error("Error al obtener el carrito:", error);
  //     setItems([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const id = Cookies.get("AnonCart_id");
    if (id) {
      setCartId(id);
    } else {
      setLoading(false); // No hay carrito todavía, se creará cuando se agregue el primer ítem
    }
  }, []);

  const addItem = async (
    productId: string,
    quantity: number = 1,
    color: string,
    size: string
  ) => {
    await addToAnonCart(cartId || "", productId, quantity, color, size);



    const updated = await getAnonCart();
    setItems(updated.items || []);
  };

  const removeItem = async (productId: string) => {
    if (!cartId) return;
    await removeFromAnonCart(cartId, productId);
    const updated = await getAnonCart();
    setItems(updated.items || []);
  };

  const clearCart = async () => {
    if (!cartId) return;
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
