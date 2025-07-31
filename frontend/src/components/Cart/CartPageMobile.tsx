"use client";
import WhatsappLink from "@/components/WhatsappLink/WhatsappLink";
import { mercadoPagoService } from "@/service/mercadoPagoService";
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
import PaymentStep from "@/components/PaymentStep/PaymentStep";
import { useCheckoutContext } from "@/context/checkoutContext";
import { useAuthContext } from "@/context/authContext";
import { crearOrder } from "@/service/orderService";
import TransferenciaGracias from "@/components/TransferenciaGracias/TransferenciaGracias";
import { useAnonCart } from "@/context/anonCartContext";

import CouponAlert from '../../components/DiscountInput/CouponAlert';
import {CreateOrderInput } from "../../service/orderService";
import {
  getAnonCart,
  updateAnonCartItem,
  removeFromAnonCart,
} from "@/service/anonCartService";
import {
  getCart,
  updateCartItem,
  deleteItemFromCart,
  cleanCart,
} from "@/service/cartService";

type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  color: string;
  size: string;
  price: number;
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

export default function CartPageMobile() {
  const { isAuth } = useAuthContext();
  const { cartId, } = useAnonCart();
  const [step, setStep] = useState(1);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [ showCartItems, setShowCartItems ] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingDeleteItemId, setPendingDeleteItemId] = useState<string | null>(null);
  const { setCartItems, paymentMethod, totalAmount, shippingMethod, addressId, setCartWasCleared, couponId, cupon } = useCheckoutContext();
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = subtotal * 0.2;
  const [ showTransferencia, setShowTransferencia ] = useState(false);
  const [ loadingOrder, setLoadingOrder ] = useState(false);
  const [ numeroOrder, setNumeroOrder ] = useState<string | null>(null);

  useEffect(() => {
  const fetchCart = async () => {
    let mappedItems: CartItem[] = [];

    if (isAuth === false) {
      const anonCartId = Cookies.get("AnonCart_id");
      if (!anonCartId) return;

      try {
        const anonCart = await getAnonCart(anonCartId);
        if (!anonCart?.items?.length) return setCart([]);

        mappedItems = anonCart.items.map((item: MappedAnonCartItem) => ({
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
      } catch (error) {
        console.error("Error cargando carrito anónimo:", error);
        return;
      }
    }

    if (isAuth === true) {
      try {
        const cart = await getCart();
        if (!cart?.items?.length) return;
        
        mappedItems = cart.items.map((item: MappedAnonCartItem) => ({
          id: item.id,
          productId: item.productId,
          quantity: item.quantity,
          color: item.color,
          price: item.product.price,
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
      } catch (error) {
        console.error("Error cargando carrito de usuario:", error);
        return;
      }
    }

    
    setCart(mappedItems);
    setCartItems(
      mappedItems.map((item) => ({
        productId: item.productId,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
      }))
    );
  };

  fetchCart();
}, [isAuth, setCartItems]);

useEffect(() => {
  if (step === 1) {
    setShowCartItems(true);
  } else {
    setShowCartItems(false);
  }
}, [step]);


  // Quantity handler

const handleContinuar = async () => {
  if (cart.length === 0) {
    toast.error("El carrito está vacío");
    return;
  }

  if (!isAuth && step < 3) {
    toast.error("Debes iniciar sesión para continuar");
    setShowLoginModal(true);
    return;
  }

  if (isAuth && step === 1) {
    setStep(2);
    setShowCartItems(false);
    setShowAddressModal(true);
    return;
  }

  if (isAuth && step === 2) {
    setStep(3);
    return;
  }

  if (isAuth && step === 3) {
    setShowTransferencia(paymentMethod === "transferencia");

    if (!addressId || !shippingMethod || !paymentMethod) {
      toast.error("Faltan datos del checkout");
      return;
    }

    if (paymentMethod === "efectivo") {
      toast.error("Este método de pago no está disponible");
      return;
    }

    setLoadingOrder(true);

    const payload: CreateOrderInput = {
      cartItems: cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        color: item.color,
        size: item.size,
      })),
      addressId,
      shippingMethod,
      paymentMethod,
      totalAmount,
      couponId,
    };

    try {
      const order = await crearOrder(payload);
      await cleanCart();
      setCart([]);
      setCartItems([]);
      setCartWasCleared(true);
      setNumeroOrder(order.orderNumber);
      toast.success(`Orden creada con éxito`);

      if (paymentMethod === "mercadopago") {
        const shippingCost = 15000;

        const items = order.items.map(item => ({
          id: item.productId,
          title: item.product.name,
          quantity: item.quantity,
          unit_price: typeof item.unitPrice === "number" ? item.unitPrice : parseFloat(item.unitPrice),
        }));

        const isFreeShipping = cupon?.discountType === "free_shipping";
        if (!isFreeShipping) {
          items.push({
            id: "shipping",
            title: "Costo de envío",
            quantity: 1,
            unit_price: shippingCost,
          });
        }

        const productTotal = order.items.reduce((sum, item) => {
          const price = typeof item.unitPrice === "number" ? item.unitPrice : parseFloat(item.unitPrice);
          return sum + price * item.quantity;
        }, 0);

        if (cupon?.discountType === "fixed" && cupon.value > 0) {
          const discountAmount = Math.min(cupon.value, productTotal);
          items.push({
            id: "discount",
            title: `Descuento $${cupon.value}`,
            quantity: 1,
            unit_price: -discountAmount,
          });
        }

        if (cupon?.discountType === "percentage" && cupon.value > 0) {
          const discountAmount = Math.floor((productTotal * cupon.value) / 100);
          items.push({
            id: "discount",
            title: `Descuento ${cupon.value}%`,
            quantity: 1,
            unit_price: -discountAmount,
          });
        }

        const mpPayload = {
          items,
          payer: {
            email: order.user.email,
            name: order.user.name || "",
          },
          metadata: {
            orderNumber: order.orderNumber,
            shippingMethod: order.shippingMethod,
            address: order.address,
          },
        };

        const initPoint = await mercadoPagoService.createCheckout(mpPayload);
        window.location.href = initPoint;
        return;
      }

      setStep(4);
    } catch (error) {
      console.error("Error al crear orden:", error);
      toast.error("Hubo un problema al crear la orden");
    }
  }
};

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
      {couponId && <CouponAlert />}

      {step === 1 && <BannerCarrito />}
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
      </div>)
      
      }
      {step === 1 && cart.length > 0 && (
        <div>
        <div className="pt-3 pb-3">
          <DiscountInput />
        </div>
        <div className="bg-white w-full rounded-3xl">
          <CartSummary subtotal={subtotal} discount={discount} />
        </div>
        </div>
      )}
      {step === 2 && showAddressModal === true && <AddressStep />}
      {step === 3 && showAddressModal === true && <PaymentStep />}
      <CartActions
          step={step}
          onContinuar={handleContinuar}
          loadingOrder={loadingOrder}
          onBack={() => setStep(step - 1)}
        />
      {showLoginModal && (
        <LoginFormModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      )}

      {step === 4 && showTransferencia === true && numeroOrder?.length  && <TransferenciaGracias 
        numeroOrder={numeroOrder}/>}

      {showConfirmModal && (
        <DeleteConfirmModal
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setShowConfirmModal(false);
            setPendingDeleteItemId(null);
          }}
        />
      )}
      <WhatsappLink />
    </div>
  );
}
