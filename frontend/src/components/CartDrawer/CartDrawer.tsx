"use client";

import { useEffect, useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";
import Cookies from "js-cookie";
import BannerCarrito from "../BannerCarrito/BannerCarrito";
import { useAuthContext } from "@/context/authContext";
import { getAnonCart } from "@/service/anonCartService";
import {useAnonCart} from "@/context/anonCartContext";
import toast from "react-hot-toast";
import namer from 'color-namer';
import { updateCartItem, deleteItemFromCart } from "@/service/cartService";
import { useRouter } from "next/navigation";
import {updateAnonCartItem, removeFromAnonCart} from "@/service/anonCartService";
import { getCart } from "@/service/cartService";
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
    images: {
        url: string;
        }[];
    }
  };

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: Props) {
  const { isAuth } = useAuthContext();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { cartId  } = useAnonCart();
  const [pendingDeleteItemId, setPendingDeleteItemId] = useState<string | null>(null);
    const router = useRouter();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      if (isAuth === false) {
        const fetchAnonCart = async () => {
          const anonCartId = Cookies.get("AnonCart_id");
          if (!anonCartId) return;
          try {
            const anonCart = await getAnonCart(anonCartId);

            if (anonCart?.items?.length > 0) {
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
              setCartItems(mappedItems);

            } else {
              setCartItems([]);
            }
          } catch (error) {
            console.error("Error cargando carrito anónimo:", error);
          }
        };

        fetchAnonCart();
      } 
    } else {
      document.body.style.overflow = "";
    }

    if (isAuth === true) {
        const fetchUserCart = async () => {
            try {
            const cart = await getCart()
                if (cart?.items?.length > 0) {
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
              setCartItems(mappedItems);

            }

            } catch (error) {
            console.error("Error cargando carrito de usuario:", error);
            }
        };
    
        fetchUserCart();
    }


    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isAuth]);



  const goToCart = () => {
    router.push("/cart");
  };



  const updateQuantity = async (id: string, delta: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    const newQuantity = item.quantity + delta;

    if (isAuth === true && newQuantity < 1) {
      setPendingDeleteItemId(id);
      setShowConfirmModal(true);
      return;
    }

    if (isAuth === false && newQuantity < 1) {
      setPendingDeleteItemId(id);
      setShowConfirmModal(true);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );

    if (isAuth === true) {
      try {
        await updateCartItem({ productId: item.productId, quantity: newQuantity });
      } catch (error) {
        console.error("Error actualizando carrito:", error);
      }
    }

    if (isAuth === false) {
      try {
        await updateAnonCartItem({
          cartId: cartId || "",
          productId: item.productId,
          quantity: newQuantity,
          color: item.color,
          size: item.size,
        });
      } catch (error) {
        console.error("Error actualizando carrito anónimo:", error);
      }
    }

  };

  const handleConfirmDelete = async () => {
    if (!pendingDeleteItemId) return;

    const item = cartItems.find((item) => item.id === pendingDeleteItemId);
    if (!item) return;

    setCartItems((prev) => prev.filter((i) => i.id !== pendingDeleteItemId));

    if (isAuth === true) {
      try {
        await deleteItemFromCart(  item.productId );
        toast.success("Producto eliminado del carrito");
      } catch (error) {
        console.error("Error eliminando producto:", error);
      }
    }

    if (isAuth === false) {
      try {
        await removeFromAnonCart( cartId || "", item.productId );
        toast.success("Producto eliminado del carrito");
      } catch (error) {
        console.error("Error eliminando producto:", error);
      }
    }

    setShowConfirmModal(false);
    setPendingDeleteItemId(null);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setPendingDeleteItemId(null);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  const discount = subtotal * 0.2;

 

 
  return (
    <div
      className={clsx(
        "fixed top-0 right-0 h-full w-11/12 bg-gray-100 shadow-lg z-50 transition-transform duration-300",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* Header */}
      <div className="text-white flex justify-between items-center px-4 py-2">
        <BannerCarrito />
      </div>

      <div className="flex items-center justify-center">
        <div className="flex items-center justify-between w-full p-4">
          <div className="flex items-center justify-center w-full">
            <h2 className="text-lg font-bold text-[#918283]">CARRITO</h2>
          </div>
          <button onClick={onClose} className="flex justify-end">
            <X />
          </button>
        </div>
      </div>

      {/* Items */}
      <div className="p-4 space-y-4 overflow-y-auto max-h-[40vh]">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="flex gap-3 items-center">
              <Image
                src={item.product.image}
                alt={item.product.name}
                width={60}
                height={60}
                className="rounded"
              />
              <div className="flex items-center flex-1">
                <div className="flex flex-col gap-2 justify-between py-2 flex-1">
                  <span className="font-bold text-sm text-black">
                    {item.product.name}
                  </span>
                  <div className="flex gap-1 items-center">
                  <div className="flex gap-0.5 items-center">
  <span className="text-xs text-gray-600"> ({item.size},</span>
  <div className="flex items-center gap-1">
    <span className="text-xs text-gray-600">
      {
        namer(item.color)?.basic?.[0]?.name.charAt(0).toUpperCase() +
        namer(item.color)?.basic?.[0]?.name.slice(1)
      })
    </span>

  </div>
</div>
                      </div>
                  <span className="text-sm text-gray-500">
                    ${item.product.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                <div className="flex items-center border-gray-300 border-2 rounded-3xl gap-1">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1"
                    >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1"
                    >
                    <Plus size={14} />
                  </button>
                </div>
                
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-sm text-gray-500">
            No hay productos en el carrito
          </div>
        )}
      </div>

      {/* Totales */}
      <div className="bg-white h-full rounded-3xl">
        <div className="p-4 space-y-1">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Descuento Transferencia</span>
            <span>${discount.toLocaleString()}</span>
          </div>
          <hr className="border-t mt-2 border-gray-300" />
          <div className="flex justify-between font-bold text-lg mt-2 text-brown-700">
            <span>Total</span>
            <span>
              ${(subtotal - discount).toLocaleString()}
            </span>
          </div>
        </div>


        {/* Acciones */}
        <div className="p-4 flex flex-col gap-2">
          
          <button 
          onClick={() => { goToCart(); onClose(); }}
          className="bg-[#8D7B74] text-white py-2 rounded-full">
            Ir al carrito
          </button>
          <button className="border border-gray-400 py-2 rounded-full text-gray-700">
            Seguir comprando
          </button>
        </div>
      </div>
      {showConfirmModal && (
  <div className="fixed inset-0  bg-black/45 backdrop-blur-sm flex justify-center items-center z-50">
    <div className="bg-white rounded-3xl p-6 shadow-xl max-w-sm w-full mx-4 text-center border border-gray-200">
      <h2 className="text-lg font-semibold text-[#918283] mb-2">¿Eliminar producto?</h2>
      <p className="text-sm text-gray-600 mb-6">
        Estás por eliminar este producto del carrito. ¿Estás seguro?
      </p>
      <div className="flex justify-center gap-3">
        <button
          onClick={handleConfirmDelete}
          className="bg-[#918283] hover:bg-[#7a6e6e] text-white text-sm font-medium px-4 py-2 rounded-full transition"
        >
          Sí, eliminar
        </button>
        <button
          onClick={handleCancelDelete}
          className="text-[#918283] border border-gray-300 text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-100 transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
