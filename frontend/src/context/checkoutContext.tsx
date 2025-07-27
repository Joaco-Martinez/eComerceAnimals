'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from 'react';

type MetodoEnvio = 'domicilio' | 'sucursal';
type MetodoPago = 'mercadopago' | 'transferencia' | 'efectivo';
type DiscountType = 'percentage' | 'fixed' | 'free_shipping';

export interface CheckoutCartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
}

interface Discount {
  discountType: DiscountType;
  value: number;
}

interface CheckoutContextType {
  addressId: string | null;
  shippingMethod: MetodoEnvio | null;
  paymentMethod: MetodoPago | null;
  cartItems: CheckoutCartItem[];
  totalAmount: number;
  couponId?: string | null;
  cupon?: Discount | null;
  cartWasCleared: boolean;
  setAddressId: (id: string) => void;
  setCouponId: (id: string) => void;
  setShippingMethod: (method: MetodoEnvio) => void;
  setPaymentMethod: (method: MetodoPago) => void;
  setCartItems: (items: CheckoutCartItem[]) => void;
  setCupon: (discount: Discount | null) => void;
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
  const [couponId, setCouponId] = useState<string | null>(null);
  const [cupon, setCupon] = useState<Discount | null>(null);

  const totalAmount = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const shippingCost = 15000;

    // Descuento por transferencia
    const transferenciaDiscount =
      paymentMethod === 'transferencia' ? subtotal * 0.2 : 0;

    // Descuento por cupón
    let cuponDiscount = 0;
    let envioFinal = shippingCost;

    if (cupon) {
      switch (cupon.discountType) {
        case 'percentage':
          cuponDiscount = (subtotal * cupon.value) / 100;
          break;
        case 'fixed':
          cuponDiscount = cupon.value;
          break;
        case 'free_shipping':
          envioFinal = 0;
          break;
      }
    }

    const total = Math.max(0, subtotal - transferenciaDiscount - cuponDiscount + envioFinal);
    return +total.toFixed(2);
  }, [cartItems, paymentMethod, cupon]);

  useEffect(() => {
    console.log('cartItems', cartItems);
    console.log('shippingMethod', shippingMethod);
    console.log('addressId', addressId);
    console.log('paymentMethod', paymentMethod);
    console.log('couponId', couponId);
    console.log('discount', cupon);
  }, [cartItems, shippingMethod, addressId, paymentMethod, couponId, cupon]);

  const clearCheckout = () => {
    setAddressId(null);
    setShippingMethod(null);
    setPaymentMethod(null);
    setCartItems([]);
    setCouponId(null);
    setCupon(null);
  };

  return (
    <CheckoutContext.Provider
      value={{
        addressId,
        shippingMethod,
        paymentMethod,
        cartItems,
        cartWasCleared,
        totalAmount,
        couponId,
        cupon,
        setAddressId,
        setShippingMethod,
        setPaymentMethod,
        setCouponId,
        setCartItems,
        setCupon,
        clearCheckout,
        setCartWasCleared,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckoutContext() {
  const context = useContext(CheckoutContext);
  if (!context)
    throw new Error('useCheckoutContext debe usarse dentro de <CheckoutProvider>');
  return context;
}
