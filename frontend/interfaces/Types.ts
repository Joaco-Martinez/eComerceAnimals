// Enums
export type Role = "customer" | "admin";
export type PetType = "dog" | "cat" | "both";
export type DiscountType = "percentage" | "fixed" | "free_shipping";
export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled";
export type PaymentStatus = "pending" | "paid" | "failed";
export type NotificationType = "order" | "promo" | "payment" | "system";

// Address
export interface Address {
  id: string;
  userId: string;
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
  id: string;
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

// ProductImage
export interface ProductImage {
  id: string;
  url: string;
  description: string;
}

// Product
export interface Product {
  id: string;
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
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  images: ProductImage[];
}

// Category
export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

// Review
export interface Review {
  id: string;
  userId: string;
  productId: string;
  comment: string;
  rating: number;
  createdAt: string;
}

// Coupon
export interface Coupon {
  id: string;
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
  id: string;
  orderId: string;
  amount: number;
  method: string;
  status: PaymentStatus;
  paidAt?: string;
}

// OrderItem
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
}

// Order
export interface Order {
  id: string;
  userId: string;
  addressId: string;
  couponId?: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

// Notification
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
}

// CartItem
export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
}

// Cart
export interface Cart {
  id: string;
  userId?: string;
  items: CartItem[];
  updatedAt: string;
}

// StockNotification
export interface StockNotification {
  id: string;
  email: string;
  productId: string;
  notified: boolean;
  createdAt: string;
}

// Image
export interface Image {
  id: string;
  url: string;
  productId: string;
}

// UserCoupon
export interface UserCoupon {
  id: string;
  userId: string;
  couponId: string;
  usedAt: string;
}
