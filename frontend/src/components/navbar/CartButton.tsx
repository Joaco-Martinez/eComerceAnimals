import Image from "next/image";
import CartDrawer from "../CartDrawer/CartDrawer";
import CartDrawerDesktop  from "../CartDrawer/CartDrawerDesktop";

type Props = {
  cartOpen: boolean;
  setCartOpen: (val: boolean) => void;
};

export default function CartButton({ cartOpen, setCartOpen }: Props) {
  return (
    <div className="relative">
      <button
        onClick={() => setCartOpen(!cartOpen)}
        className="inline-flex items-center p-2 rounded-lg text-[#E0DED1] cursor-pointer"
      >
        <Image src="/icons/carrito.png" alt="Carrito" width={20.1} height={20} />
      </button>

      {/* Mobile */}
      <div className="md:hidden">
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <CartDrawerDesktop isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </div>
  );
}