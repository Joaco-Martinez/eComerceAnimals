"use client";
import { mercadoPagoService } from "../../../service/mercadoPagoService";

const CartCheckout = () => {
  const handleCheckout = async () => {
    const order = {
      items: [
        {
          id: "prod-1",
          title: "Collar de perro",
          quantity: 2,
          unit_price: 2500,
        },
        {
          id: "prod-2",
          title: "Bolso de transporte",
          quantity: 1,
          unit_price: 3500,
        },
      ],
      metadata: {
        userId: 42,
        comentario: "Envío urgente",
      },
    };

    try {
      const initPoint = await mercadoPagoService.createCheckout(order);
      window.location.href = initPoint; 
    } catch (error) {
      console.error("Error creando la preferencia de pago:", error);
    }
  };

  return (
    <button onClick={handleCheckout} className="btn btn-primary">
      Pagar con Mercado Pago
    </button>
  );
};

export default CartCheckout;
