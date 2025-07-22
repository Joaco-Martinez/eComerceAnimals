'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useMemo } from 'react';
type MetodoEnvio = 'domicilio' | 'sucursal';
type MetodoPago = 'mercadopago' | 'transferencia' | 'efectivo';

export interface CheckoutCartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
}

interface CheckoutContextType {
  addressId: string | null;
  shippingMethod: MetodoEnvio | null;
  paymentMethod: MetodoPago | null;
  cartItems: CheckoutCartItem[];
  totalAmount: number; // 👈 nuevo
  cartWasCleared: boolean;
  setAddressId: (id: string) => void;
  setShippingMethod: (method: MetodoEnvio) => void;
  setPaymentMethod: (method: MetodoPago) => void;
  setCartItems: (items: CheckoutCartItem[]) => void;
  setCartWasCleared: (wasCleared: boolean) => void;
  clearCheckout: () => void;
}


  

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [addressId, setAddressId] = useState<string | null>(null);
  const [shippingMethod, setShippingMethod] = useState<MetodoEnvio | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<MetodoPago | null>(null);
  const [cartItems, setCartItems] = useState<CheckoutCartItem[]>([]);
  const [cartWasCleared, setCartWasCleared] = useState(false);


const totalAmount = useMemo(() => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (paymentMethod === 'transferencia') {
    return +(subtotal * 0.8).toFixed(2); // aplica 20% off
  }
  return subtotal;
}, [cartItems, paymentMethod]);

  useEffect(() => {
    console.log("cartItems", cartItems);
    console.log("shippingmethod", shippingMethod);
    console.log("addressId", addressId);
    console.log("paymentMethod", paymentMethod);

  })
  const clearCheckout = () => {
    setAddressId(null);
    setShippingMethod(null);
    setPaymentMethod(null);
    setCartItems([]);
  };

  return (
    <CheckoutContext.Provider
      value={{
        addressId,
        shippingMethod,
        paymentMethod,
        cartItems,
        cartWasCleared,
        totalAmount, // 👈 lo agregás acá
        setAddressId,
        setShippingMethod,
        setPaymentMethod,
        setCartItems,
        clearCheckout,
        setCartWasCleared
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckoutContext() {
  const context = useContext(CheckoutContext);
  if (!context) throw new Error('useCheckoutContext debe usarse dentro de <CheckoutProvider>');
  return context;
}
