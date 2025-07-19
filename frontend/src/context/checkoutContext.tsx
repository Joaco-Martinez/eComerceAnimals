'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type MetodoEnvio = 'domicilio' | 'sucursal';
type MetodoPago = 'mercadopago' | 'transferencia' | 'efectivo';

export interface CheckoutAddress {
  id: string;
  metodo: MetodoEnvio;
  postalCode: string;
  nombre: string;
  apellido: string;
  telefono: string;
  dni: string;
  provincia: string;
  localidad: string;
  calle: string;
  piso?: string;
}

interface CheckoutContextType {
  selectedAddress: CheckoutAddress | null;
  selectedPaymentMethod: MetodoPago | null;
  setAddress: (address: CheckoutAddress) => void;
  setPaymentMethod: (method: MetodoPago) => void;
  clearCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [selectedAddress, setSelectedAddress] = useState<CheckoutAddress | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<MetodoPago | null>(null);

  const setAddress = (address: CheckoutAddress) => setSelectedAddress(address);
  const setPaymentMethod = (method: MetodoPago) => setSelectedPaymentMethod(method);
  const clearCheckout = () => {
    setSelectedAddress(null);
    setSelectedPaymentMethod(null);
  };

  return (
    <CheckoutContext.Provider
      value={{ selectedAddress, selectedPaymentMethod, setAddress, setPaymentMethod, clearCheckout }}
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
