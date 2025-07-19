"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import LoginFormModal from "@/components/LoginFormModal/LoginFormModal";
import BannerCarrito from "@/components/BannerCarrito/BannerCarrito";
import DiscountInput from "@/components/DiscountInput/DiscountInput";
import CartItem from "@/components/CartItem/CartItem";
import CartSummary from "@/components/CartSummary/CartSummary";
import CartActions from "@/components/CartActions/CartActions";
import DeleteConfirmModal from "@/components/DeleteConfirmModal/DeleteConfirmModal";
import StepProgressBar from "@/components/StepProgressBar/StepProgressBar";
import AddressStep from "@/components/AddressStep.tsx/AddressStep";

import { useAuthContext } from "@/context/authContext";
import { useAnonCart } from "@/context/anonCartContext";
import {
  getAnonCart,
  updateAnonCartItem,
  removeFromAnonCart,
} from "@/service/anonCartService";
import {
  getCart,
  updateCartItem,
  deleteItemFromCart,
} from "@/service/cartService";

type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  color: string;
  size: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
  };
};

type MappedAnonCartItem = {
  id: string;
  productId: string;
  quantity: number;
  color: string;
  size: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    images: { url: string }[];
  };
};

export default function CartPage() {
  const { isAuth } = useAuthContext();
  const { cartId } = useAnonCart();
  const [step, setStep] = useState(1);
  const [ continuar, setContinuar ] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [ showCartItems, setShowCartItems ] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingDeleteItemId, setPendingDeleteItemId] = useState<string | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = subtotal * 0.2;

  


  useEffect(() => {
    const fetchCart = async () => {
      if (isAuth === false) {
        const anonCartId = Cookies.get("AnonCart_id");
        if (!anonCartId) return;

        try {
          const anonCart = await getAnonCart(anonCartId);
          if (!anonCart?.items?.length) return setCart([]);

          const mappedItems: CartItem[] = anonCart.items.map((item: MappedAnonCartItem) => ({
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
            color: item.color,
            size: item.size,
            product: {
              id: item.product.id,
              name: item.product.name,
              description: item.product.description,
              price: item.product.price,
              stock: item.product.stock,
              image: item.product.images?.[0]?.url || "/placeholder.jpg",
            },
          }));

          setCart(mappedItems);
        } catch (error) {
          console.error("Error cargando carrito anónimo:", error);
        }
      }

      if (isAuth === true) {
        try {
          const cart = await getCart();
          if (!cart?.items?.length) return;

          const mappedItems: CartItem[] = cart.items.map((item: MappedAnonCartItem) => ({
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
            color: item.color,
            size: item.size,
            product: {
              id: item.product.id,
              name: item.product.name,
              description: item.product.description,
              price: item.product.price,
              stock: item.product.stock,
              image: item.product.images?.[0]?.url || "/placeholder.jpg",
            },
          }));

          setCart(mappedItems);
        } catch (error) {
          console.error("Error cargando carrito de usuario:", error);
        }
      }
    };

    fetchCart();
  }, [isAuth]);

  // Quantity handler

  const handleContinuar = () => {
    if(cart.length === 0) {
      toast.error("El carrito esta vacio");
      return 
    }
    
    if(isAuth === false && step < 3) {
      toast.error("Debes iniciar sesión para continuar");
      setShowLoginModal(true);
      return 
    }

    if (isAuth === true && step < 3) {
      const newStep = step + 1;
      setStep(newStep);
      console.log(newStep)
      if(newStep === 2) {
        setShowCartItems(false);
        setShowAddressModal(true);
      }
    }
    setContinuar(true);
  }
  const updateQuantity = async (id: string, delta: number) => {
    const item = cart.find((item) => item.id === id);
    if (!item) return;

    const newQuantity = item.quantity + delta;

    if (newQuantity < 1) {
      setPendingDeleteItemId(id);
      setShowConfirmModal(true);
      return;
    }

    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, newQuantity) } : i
      )
    );

    try {
      if (isAuth) {
        await updateCartItem({ productId: item.productId, quantity: newQuantity });
      } else {
        await updateAnonCartItem({
          cartId: cartId || "",
          productId: item.productId,
          quantity: newQuantity,
          color: item.color,
          size: item.size,
        });
      }
    } catch (error) {
      console.error("Error actualizando cantidad:", error);
    }
  };

  // Delete item
  const handleConfirmDelete = async () => {
    if (!pendingDeleteItemId) return;
    const item = cart.find((i) => i.id === pendingDeleteItemId);
    if (!item) return;

    setCart((prev) => prev.filter((i) => i.id !== pendingDeleteItemId));

    try {
      if (isAuth) {
        await deleteItemFromCart(item.productId);
      } else {
        await removeFromAnonCart(cartId || "", item.productId);
      }
      toast.success("Producto eliminado del carrito");
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }

    setShowConfirmModal(false);
    setPendingDeleteItemId(null);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      <BannerCarrito />
      <StepProgressBar currentStep={step} />
      <h2 className="text-center text-lg font-bold text-[#918283] pt-3">CARRITO</h2>

      {showCartItems === true && (<div className="p-4 space-y-4 overflow-y-auto max-h-[40vh]">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Tu carrito está vacío.</p>
        ) : (
          cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={() => updateQuantity(item.id, 1)}
              onDecrease={() => updateQuantity(item.id, -1)}
            />
          ))
        )}
      <div className="pt-3 pb-3">
        <DiscountInput />
      </div>
      {cart.length > 0 && (
        <div className="bg-white w-full rounded-3xl">
          <CartSummary subtotal={subtotal} discount={discount} />
        </div>
      )}
      </div>)
      
      }

      {step === 2 && showAddressModal === true && <AddressStep />}
      {step === 1 && <CartActions onContinuar={handleContinuar}/>}

      {showLoginModal && (
        <LoginFormModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      )}

 

      {showConfirmModal && (
        <DeleteConfirmModal
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setShowConfirmModal(false);
            setPendingDeleteItemId(null);
          }}
        />
      )}
    </div>
  );
}
