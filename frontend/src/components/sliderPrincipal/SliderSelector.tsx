"use client";

import { useEffect, useState } from "react";
import SliderPrincipal from "./sliderPrincipal";
import SliderPrincipalDesktop from "./sliderPrincipalDesktop";

export default function SliderSelector() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkSize(); // primera vez
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <>
      {isDesktop ? <SliderPrincipalDesktop /> : <SliderPrincipal />}
    </>
  );
}
