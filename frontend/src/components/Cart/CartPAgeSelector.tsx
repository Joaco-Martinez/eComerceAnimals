'use client';

import { useEffect, useState } from "react";
import CartPageMobile from "./CartPageMobile";
import CartPageDesktop from "./CartPageDesktop";

export default function CartPageSelector() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop ? <CartPageDesktop /> : <CartPageMobile />;
}
