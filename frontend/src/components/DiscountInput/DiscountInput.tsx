import { useState } from "react";

export default function DiscountInput() {
  const [code, setCode] = useState("");

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
      onClick={() => console.log("Código aplicado:", code)}
      className="whitespace-nowrap text-sm font-semibold text-[#918283] border border-[#918283] rounded-full px-4 py-1.5"
    >
      APLICAR
    </button>
  </div>
</div>
  );
}
