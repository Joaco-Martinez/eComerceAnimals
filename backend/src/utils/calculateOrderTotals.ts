import { Coupon } from "@prisma/client";

type CartItem =
  | {
      productId: string;
      quantity: number;
      price: number;
      // formato A: shipping en raiz
      shippingCost?: number | string;
      product?: { name?: string; shippingCost?: number | string };
    }
  | {
      productId: string;
      quantity: number;
      price: number;
      // formato B: shipping dentro de product
      product: { name?: string; shippingCost: number | string };
      shippingCost?: number | string;
    };

function toNumber(n: unknown, def = 0): number {
  const num = typeof n === "number" ? n : parseFloat(String(n ?? ""));
  return Number.isFinite(num) ? num : def;
}

function getItemShippingCost(item: CartItem): number {
  // prioridad: product.shippingCost -> item.shippingCost -> 0
  const raw = (item as any)?.product?.shippingCost ?? (item as any)?.shippingCost ?? 0;
  return toNumber(raw, 0);
}

export function calculateOrderTotals({
  cartItems,
  paymentMethod,
  coupon,
}: {
  cartItems: CartItem[];
  paymentMethod: "transferencia" | "mercadopago";
  coupon: Coupon | null;
}) {
  const productSubtotal = cartItems.reduce((acc, item) => {
    const price = toNumber((item as any).price, NaN);
    const qty = toNumber((item as any).quantity, NaN);
    if (!Number.isFinite(price) || !Number.isFinite(qty)) {
      throw new Error(`Precio o cantidad inválidos en item ${item.productId}`);
    }
    return acc + price * qty;
  }, 0);

  const transferenciaDiscount = paymentMethod === "transferencia" ? 20 : 0;
  const transferDiscountValue =
    transferenciaDiscount > 0 ? +(productSubtotal * transferenciaDiscount) / 100 : 0;

  const couponDiscountValue = coupon
    ? coupon.discountType === "percentage"
      ? +(productSubtotal * coupon.value) / 100
      : coupon.discountType === "fixed"
        ? Math.min(coupon.value, productSubtotal)
        : 0
    : 0;

  // max shipping de los items, salvo free_shipping
  const shippingCost =
    coupon?.discountType === "free_shipping"
      ? 0
      : cartItems.reduce((max, it) => Math.max(max, getItemShippingCost(it)), 0);

  const totalAmount = productSubtotal - transferDiscountValue - couponDiscountValue + shippingCost;

  return {
    productSubtotal,
    transferenciaDiscount,
    transferDiscountValue,
    couponDiscountValue,
    shippingCost,
    totalAmount,
  };
}
