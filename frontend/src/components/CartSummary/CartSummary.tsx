import { useCheckoutContext } from "@/context/checkoutContext";

type Props = {
  subtotal: number;
  discount: number; // descuento por transferencia, por ejemplo
};

export default function CartSummary({ subtotal, discount }: Props) {
  const { cupon } = useCheckoutContext();

  const shippingCost = 15000;
  const envio = cupon?.discountType === "free_shipping" ? 0 : shippingCost;

  let cuponDiscount = 0;

  if (cupon) {
    if (cupon.discountType === "percentage") {
      cuponDiscount = (subtotal * cupon.value) / 100;
    } else if (cupon.discountType === "fixed") {
      cuponDiscount = cupon.value;
    }
    // 👉 free_shipping NO afecta cuponDiscount
  }

  const total = Math.max(0, subtotal - discount - cuponDiscount + envio);

  return (
    <div className="p-4 space-y-1">
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>${subtotal.toLocaleString()}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span>Descuento Transferencia</span>
        <span>- ${discount.toLocaleString()}</span>
      </div>

      {cupon && cupon.discountType !== "free_shipping" && (
        <div className="flex justify-between text-sm">
          <span>Descuento Cupón</span>
          <span>- ${Math.round(cuponDiscount).toLocaleString()}</span>
        </div>
      )}

      <div className="flex justify-between text-sm">
        <span>Envío</span>
        <span>
          {cupon?.discountType === "free_shipping" ? (
            <span className="text-green-700 font-semibold">Gratis</span>
          ) : (
            `$${shippingCost.toLocaleString()}`
          )}
        </span>
      </div>

      <hr className="border-t mt-2 border-gray-300" />

      <div className="flex justify-between font-bold text-lg mt-2 text-brown-700">
        <span>Total</span>
        <span>${total.toLocaleString()}</span>
      </div>
    </div>
  );
}
