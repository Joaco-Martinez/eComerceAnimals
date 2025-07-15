// src/controllers/stockNotification.controller.ts
import { Request, Response } from "express";
import { StockNotificationService } from "../services/stockNotification.Service";

export const subscribeToStock = async (req: Request, res: Response) => {
  const { email, productId } = req.body;

  if (!email || !productId) {
    return res.status(400).json({ error: "Email y productId son requeridos" });
  }

  try {
    const alreadyExists = await StockNotificationService.checkIfSubscribed(email, productId);
    if (alreadyExists) {
      return res.status(400).json({ error: "Ya estás suscripto para este producto" });
    }

    const subscription = await StockNotificationService.createSubscription(email, productId);
    res.status(201).json(subscription);
  } catch (error) {
    console.error("Error al suscribirse:", error);
    res.status(500).json({ error: "Error al procesar la suscripción" });
  }
};
