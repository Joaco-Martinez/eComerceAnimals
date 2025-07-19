type Props = {
  subtotal: number;
  discount: number;
};

export default function CartSummary({ subtotal, discount }: Props) {
  return (
    <div className="p-4 space-y-1">
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>${subtotal.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Descuento Transferencia</span>
        <span>${discount.toLocaleString()}</span>
      </div>
      <hr className="border-t mt-2 border-gray-300" />
      <div className="flex justify-between font-bold text-lg mt-2 text-brown-700">
        <span>Total</span>
        <span>${Math.round(subtotal - discount).toLocaleString()}</span>
      </div>
    </div>
  );
}
