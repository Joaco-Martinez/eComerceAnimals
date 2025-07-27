import { Coupon } from '@prisma/client';

export function calculateOrderTotals({
  cartItems,
  paymentMethod,
  coupon,
}: {
  cartItems: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  paymentMethod: 'transferencia' | 'mercadopago';
  coupon: Coupon | null;
}) {
  const productSubtotal = cartItems.reduce((acc, item) => {
    if (typeof item.price !== 'number' || isNaN(item.price)) {
      throw new Error(`Precio inválido en item con producto ${item.productId}`);
    }
    return acc + item.price * item.quantity;
  }, 0);

  const transferenciaDiscount = paymentMethod === 'transferencia' ? 20 : 0;
  const transferDiscountValue =
    transferenciaDiscount > 0 ? +(productSubtotal * transferenciaDiscount / 100) : 0;

  const couponDiscountValue = coupon
    ? coupon.discountType === 'percentage'
      ? +(productSubtotal * coupon.value / 100)
      : coupon.discountType === 'fixed'
        ? Math.min(coupon.value, productSubtotal)
        : 0
    : 0;

  const shippingCost = coupon?.discountType === 'free_shipping' ? 0 : 15000;

  const totalAmount =
    productSubtotal - transferDiscountValue - couponDiscountValue + shippingCost;

  return {
    productSubtotal,
    transferenciaDiscount,
    transferDiscountValue,
    couponDiscountValue,
    shippingCost,
    totalAmount,
  };
}