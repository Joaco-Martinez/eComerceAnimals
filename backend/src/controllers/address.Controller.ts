import { Request, Response } from 'express';
import { AddressService } from '../services/addresss.Service';
import { z } from 'zod';

const addressSchema = z.object({
  metodo: z.enum(['domicilio', 'sucursal']),
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
  async getByUser(req: Request, res: Response) {
    const userId = req.user.id;
    const addresses = await AddressService.getByUser(userId);
    res.json(addresses);
  },

  async create(req: Request, res: Response) {
    const userId = req.user.id;
    try {
      const parsedData = addressSchema.parse(req.body);
      const newAddress = await AddressService.create(parsedData, userId);
      res.status(201).json(newAddress);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Error desconocido';
      res.status(400).json({ error: message });
    }
  },

  async delete(req: Request, res: Response) {
    const userId = req.user.id;
    const id = req.params.id;
    await AddressService.delete(id, userId);
    res.status(204).end();
  },
};
