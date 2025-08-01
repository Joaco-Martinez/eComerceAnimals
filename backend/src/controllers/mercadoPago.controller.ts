import { Request, Response } from "express";
import { handleMercadoPagoWebhook } from '../services/mercadoPago.service';
import { mercadoPagoService } from "../services/mercadoPago.service";

export const mercadoPagoController = {
  // 🎯 POST /api/mercadopago/submit
  async submit(req: Request, res: Response) {
    const { items, orderId } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Debes enviar al menos un producto en 'items'" });
    }

    if (!orderId) {
      return res.status(400).json({ error: "Falta el 'orderId'" });
    }

    try {
      const initPoint = await mercadoPagoService.createPreference({ items, orderId });
      res.json({ init_point: initPoint });
    } catch (error: any) {
      console.error("Error al crear preferencia:", error);
      res.status(500).json({ error: error.message || "Error al crear preferencia" });
    }
  },

  // 🎯 POST /api/mercadopago/webhook
  async webhook(req: Request, res: Response) {
    try {
      const { type, data } = req.body;

      if (type === 'payment' && data?.id) {
        await handleMercadoPagoWebhook(data.id);
      }

      res.sendStatus(200);
    } catch (error) {
      console.error('Error en webhook de Mercado Pago:', error);
      res.sendStatus(500);
    }
  }
};
