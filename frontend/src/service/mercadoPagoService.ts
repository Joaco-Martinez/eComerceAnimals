/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./apiService";

type OrderItem = {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
};

type OrderPayload = {
  items: OrderItem[];
  metadata?: Record<string, any>;
};

export const mercadoPagoService = {
  async createCheckout(order: OrderPayload): Promise<string> {
    const response = await api.post("/mercadopago/submit", order);
    console.log(response)
    return response.init_point; 
  },
};
