import Image from "next/image";
import CartDrawer from "../CartDrawer/CartDrawer";

type Props = {
  cartOpen: boolean;
  setCartOpen: (val: boolean) => void;
};

export default function CartButton({ cartOpen, setCartOpen }: Props) {
  return (
    <div className="relative">
      <button
        onClick={() => setCartOpen(!cartOpen)}
        className="inline-flex items-center p-2 rounded-lg text-[#E0DED1]"
      >
        <Image src="/icons/carrito.png" alt="Carrito" width={20.1} height={20} />
        <span className="hidden sm:flex ml-1">My Cart</span>
      </button>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}