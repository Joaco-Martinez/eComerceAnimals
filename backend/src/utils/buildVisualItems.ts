import  { Coupon } from '@prisma/client';
export function buildVisualItems(
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
    color: string;
    size: string;
    product: { name: string };
  }[],
  {
    shippingCost,
    coupon,
    couponDiscountValue,
    transferDiscountValue,
  }: {
    shippingCost: number;
    coupon: Coupon | null;
    couponDiscountValue: number;
    transferDiscountValue: number;
  }
) {
  const visualItems = items.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    color: item.color,
    size: item.size,
    product: { name: item.product.name },
  }));

  if (shippingCost > 0) {
    visualItems.push({
      productId: 'shipping',
      quantity: 1,
      unitPrice: shippingCost,
      color: '',
      size: '',
      product: { name: 'Costo de envío' },
    });
  }

  if (coupon && couponDiscountValue > 0) {
    visualItems.push({
      productId: 'discount',
      quantity: 1,
      unitPrice: -couponDiscountValue,
      color: '',
      size: '',
      product: {
        name:
          coupon.discountType === 'fixed'
            ? `Descuento $${coupon.value}`
            : `Descuento ${coupon.value}%`,
      },
    });
  }

  if (transferDiscountValue > 0) {
    visualItems.push({
      productId: 'transfer',
      quantity: 1,
      unitPrice: -transferDiscountValue,
      color: '',
      size: '',
      product: { name: 'Descuento por transferencia' },
    });
  }

  return visualItems;
}
