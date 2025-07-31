"use client";

import CartDrawer from "./CartDrawer";
import clsx from "clsx";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawerDesktop({ isOpen, onClose }: Props) {
  return (
    <>
      {/* Overlay para cerrar el drawer */}
      {isOpen && (
        <div
          className="hidden md:block fixed inset-0 bg-black/20 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
  className={clsx(
    "fixed top-0 right-0 h-full w-full sm:w-3/4 lg:w-1/3 xl:w-1/4 z-50 transition-transform duration-300",
    isOpen ? "translate-x-0" : "translate-x-full"
  )}
>
  <div
    className="hidden md:block h-full"
    onClick={(e) => e.stopPropagation()}
  >
    <CartDrawer isOpen={isOpen} onClose={onClose} />
  </div>
</div>
    </>
  );
}
