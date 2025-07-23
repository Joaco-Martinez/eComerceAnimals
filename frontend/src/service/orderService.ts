import apiService from "./apiService"

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    name: string;
  }
  unitPrice: number;
  color: string;
  size: string;
}

export interface Payment {
  id: string;
  method: string;
  status: string;
  amount: number;
  createdAt: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  zipCode: string;
  province: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  user: User;
  addressId: string;
  address: Address;
  shippingMethod: 'domicilio' | 'sucursal';
  totalAmount: number;
  status: string;
  items: OrderItem[];
  payment: Payment;
  createdAt: string;
  updatedAt: string;
}


export interface CartItemInput {
  productId: string;
  quantity: number;
  product?: {
    name: string;
  }
  price: number;
  color: string;
  size: string;
}

export interface CreateOrderInput {
  cartItems: CartItemInput[];
  addressId: string | null;
  shippingMethod: 'domicilio' | 'sucursal' | null;
  paymentMethod: 'transferencia' | 'mercadopago' | null;
  totalAmount: number;
}
export const crearOrder = async (
  data: CreateOrderInput
): Promise<Order> => {
  const response = await apiService.post("/orders", data, true, false, false);
  return response as Order;
};

export const getOrdersByUserController = async (): Promise<Order[]> => {
  const response = await apiService.get("/orders/user", true, false, false);
  return response as Order[];
};