
// Enums
export type Role = "customer" | "admin";
export type PetType = "dog" | "cat" | "both";
export type DiscountType = "percentage" | "fixed" | "free_shipping";
export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled";
export type PaymentStatus = "pending" | "paid" | "failed";
export type NotificationType = "order" | "promo" | "payment" | "system";

// Address
export interface Address {
  id: number;
  userId: number;
  fullName: string;
  street: string;
  number: string;
  city: string;
  province: string;
  postalCode: string;
  isPrimary: boolean;
}

export type AddressCreate = Omit<Address, "id" | "userId">;

// User
export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
}

export interface UserCreate {
  name: string;
  email: string;
  password: string;
  address: AddressCreate;
}

export interface ProductImage {
  id: number;
  url: string;
  description: number;
}

// Product
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  weight?: number;
  size: string[];
  color: string[];
  sku?: string;
  petType: PetType;
  isActive: boolean;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
  images: ProductImage[];
}

// Category
export interface Category {
  id: number;
  name: string;
  description?: string;
  image?: string;
}

// Review
export interface Review {
  id: number;
  userId: number;
  productId: number;
  comment: string;
  rating: number;
  createdAt: string;
}

// Coupon
export interface Coupon {
  id: number;
  code: string;
  description?: string;
  discountType: DiscountType;
  value: number;
  maxUses: number;
  usedCount: number;
  userLimit: number;
  expirationDate?: string;
  active: boolean;
}

// Payment
export interface Payment {
  id: number;
  orderId: number;
  amount: number;
  method: string;
  status: PaymentStatus;
  paidAt?: string;
}

// OrderItem
export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
}

// Order
export interface Order {
  id: number;
  userId: number;
  addressId: number;
  couponId?: number;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

// Notification
export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
}

// CartItem
export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
}

// Cart
export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  updatedAt: string;
}

// StockNotification
export interface StockNotification {
  id: number;
  email: string;
  productId: number;
  notified: boolean;
  createdAt: string;
}

// Image
export interface Image {
  id: number;
  url: string;
  productId: number;
}

// UserCoupon
export interface UserCoupon {
  id: number;
  userId: number;
  couponId: number;
  usedAt: string;
}
