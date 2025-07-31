"use client";

import { useEffect, useState } from "react";
import { SliderCategories } from "@/components/sliderCategories/SliderCategories";
import SliderCategoriesDesktop from "@/components/sliderCategories/SliderCategoriesDesktop";

export default function SliderCategoriesSelector() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      if (typeof window !== "undefined") {
        setIsDesktop(window.innerWidth >= 768);
      }
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return isDesktop ? <SliderCategoriesDesktop /> : <SliderCategories />;
}
