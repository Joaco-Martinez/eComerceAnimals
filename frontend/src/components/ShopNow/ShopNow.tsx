"use client";
import { ChevronDown } from "lucide-react";
const ShopNow = () => {
  const handleScroll = () => {
    const section = document.getElementById("productos");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={handleScroll}
      className="mt-3 text-[#918283] text-xl font-semibold flex items-center flex-col"
    >
      SHOP NOW

      <ChevronDown className="w-7 h-7 text-[#918283] animate-bounce mt-1" />
    </button>
  );
};

export default ShopNow;
