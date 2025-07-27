import apiService from "./apiService"


export interface GetOrderResponse {
  id: string;
  orderNumber: string;
  userId: string;
  user: {
    id: string;
    email: string;
    name: string; // obligatoria según lo que renderizás en CardOrder
  };
  addressId: string;
  address: {
    id: string;
    nombre: string;
    apellido: string;
    calle: string;
    piso?: string;
    localidad: string;
    provincia: string;
    postalCode: string;
    telefono: string;
    dni: string;
    userId: string;
  };
  shippingMethod: 'domicilio' | 'sucursal';
  totalAmount: number;
  status: string;
  trackingNumber: string | null;
  createdAt: string;
  updatedAt: string;
  couponId?: string | null;
  items: {
    productId: string;
    quantity: number;
    color: string;
    size: string;
    product: {
      name: string;
      price: number;
      sku: string;
    };
  }[];
}

export interface OrderStatus {
  status:
    | "pending" // Todavía no pagó
    | "paid" // Pagó, esperando envío
    | "processing" // Preparando el pedido
    | "shipped" // Enviado
    | "delivered" // Entregado
    | "cancelled"; // Cancelado
}


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
  coupon?: Coupon | null;
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
type Coupon = {
  type: "fixed" | "percentage" | "free_shipping";
  value: number;
};
export interface CreateOrderInput {
  cartItems: CartItemInput[];
  addressId: string | null;
  shippingMethod: 'domicilio' | 'sucursal' | null;
  paymentMethod: 'transferencia' | 'mercadopago' | null;
  totalAmount: number;
  couponId?: string | null;
  coupon?: Coupon | null;
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

export const getAllOrders = async (): Promise<GetOrderResponse[]> => {
  const response = await apiService.get("/orders", true, false, false);
  return response as GetOrderResponse[];
};

export const getOrderById = async (id: string): Promise<GetOrderResponse> => {
  const response = await apiService.get(`/orders/${id}`, true, false, false);
  return response as GetOrderResponse;
};

export const updateOrder = async (id: string, data: OrderStatus): Promise<GetOrderResponse> => {
  const response = await apiService.patch(`/orders/${id}/status`, data, true, true, true);
  return response as GetOrderResponse;
};

export const mandarNotificacion = async (id: string, data: { trackingNumber: string }): Promise<GetOrderResponse> => {
  const response = await apiService.patch(`/notifications/${id}/tracking`, data, true, true, true);
  return response as GetOrderResponse;
};