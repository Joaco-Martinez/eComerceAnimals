import { Request, Response } from "express";
import { handleMercadoPagoWebhook } from '../services/mercadoPago.service';
import { mercadoPagoService } from "../services/mercadoPago.service";

export const mercadoPagoController = {
  async submit(req: Request, res: Response) {
    const { items, metadata } = req.body;
    console.log(req.body)
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Debes enviar al menos un producto en 'items'" });
    }

    try {
      const initPoint = await mercadoPagoService.createPreference(items, metadata);
      
      res.json({ init_point: initPoint });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Error al crear preferencia" });
    }
  },
};



export const mercadoPagoWebhookController = async (req: Request, res: Response) => {
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
};
