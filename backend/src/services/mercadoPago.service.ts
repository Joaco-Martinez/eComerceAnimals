import { MercadoPagoConfig, Preference } from "mercadopago";

type OrderItem = {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
};

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

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
