"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildVisualItems = buildVisualItems;
function buildVisualItems(items, { shippingCost, coupon, couponDiscountValue, transferDiscountValue, }) {
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
                name: coupon.discountType === 'fixed'
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
