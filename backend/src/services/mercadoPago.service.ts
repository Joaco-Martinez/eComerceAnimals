import { MercadoPagoConfig, Preference } from "mercadopago";
import { prisma } from '../db/db';
import axios from 'axios';
type OrderItem = {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
};

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});


export const handleMercadoPagoWebhook = async (paymentId: number) => {
  const accessToken = process.env.MP_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error('Mercado Pago access token no configurado');
  }

  // Consultar el pago a MP
  const response = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const payment = response.data;

  if (payment.status !== 'approved') return;

  const orderId = payment.external_reference;

  if (!orderId) throw new Error('external_reference no encontrado');

  // Actualizar estado de la orden
  await prisma.order.update({
    where: { id: orderId },
    data: { status: 'paid' },
  });

  return true;
};


export const mercadoPagoService = {
  async createPreference(items: OrderItem[], metadata?: Record<string, any>): Promise<string> {
    const preference = await new Preference(mercadopago).create({
  body: {
    items,
    metadata,
    back_urls: {
      success: process.env.URLFAILEDMP,
      failure: process.env.URLSUCCESSMP,
      pending: process.env.URLPENDINGMP,
    },
    auto_return: "approved",
  },
});
    if (!preference.init_point) throw new Error("No se pudo generar init_point");
    return preference.init_point!;
  },
};
