import { Request, Response } from "express";
import { mercadoPagoService } from "../services/mercadoPago.service";

export const mercadoPagoController = {
  async submit(req: Request, res: Response) {
    const { items, metadata } = req.body;

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
