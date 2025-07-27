import { useState } from "react";
import { applyCoupon } from "@/service/cartService";
import { useCheckoutContext } from "@/context/checkoutContext";
import toast from "react-hot-toast";
export default function DiscountInput() {
  const [code, setCode] = useState("");
  const { setCouponId, setCupon, cupon } = useCheckoutContext();

  const handleCoupon = async () => {

    if (cupon) {
      toast.error("Ya tienes un cupón aplicado");
      return;
    }
    
    try {
      const result = await applyCoupon(code);
      const discountType = result.type, value = result.value;
      setCupon({ discountType, value });
      setCouponId(result.id);
    } catch (error) {
      console.error("Error al aplicar el código de descuento:", error);
    }
  };

  return (
    <div className="bg-white rounded-full shadow-md px-4 py-2 w-full max-w-md mx-auto">
  <p className="text-sm font-semibold text-neutral-800 mb-1">
    ¿Tenés un código de descuento?
  </p>
  <div className="flex items-center gap-2">
    <input
      type="text"
      value={code}
      onChange={(e) => setCode(e.target.value)}
      placeholder="Código de descuento"
      className="flex-1 min-w-0 bg-[#F5F5F5] text-sm px-3 py-1.5 rounded-md outline-none placeholder:text-neutral-400 border-none"
    />
    <button
      onClick={handleCoupon}
      className="whitespace-nowrap text-sm font-semibold text-[#918283] border border-[#918283] rounded-full px-4 py-1.5"
    >
      APLICAR
    </button>
  </div>
</div>
  );
}
