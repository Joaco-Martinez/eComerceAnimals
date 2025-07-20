import { Response } from 'express';
import { AddressService } from '../services/addresss.Service';
import { z } from 'zod';
import { AuthRequest } from '../middlewares/authMiddlewares';

export const addressSchema = z.object({
  postalCode: z.string().min(1),
  nombre: z.string().min(1),
  apellido: z.string().min(1),
  telefono: z.string().min(1),
  dni: z.string().min(1),
  provincia: z.string().min(1),
  localidad: z.string().min(1),
  calle: z.string().min(1),
  piso: z.string().optional(),
});

export const AddressController = {
  async getByUser(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ message: 'No autenticado' });

      const addresses = await AddressService.getByUser(userId);
      res.json(addresses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener direcciones' });
    }
  },

  async create(req: AuthRequest, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    try {
      const parsedData = addressSchema.parse(req.body);
      const newAddress = await AddressService.create(parsedData, req.userId);
      res.status(201).json(newAddress);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      res.status(400).json({ error: message });
    }
  },

  async delete(req: AuthRequest, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    try {
      await AddressService.delete(req.params.id, req.userId);
      res.status(204).end();
    } catch (error) {
      res.status(404).json({ message: 'No se pudo eliminar la dirección' });
    }
  },
};
