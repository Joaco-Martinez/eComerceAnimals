import { Request, Response } from 'express';
import { AddressService } from '../services/addresss.Service';
import { User } from '../types/types';

export const AddressController = {
  async getByUser(req: Request, res: Response) {
    const userId = req.user.id;
    const addresses = await AddressService.getByUser(userId);
    res.json(addresses);
  },

  async create(req: Request, res: Response) {
    const userId = req.user.id;
    try {
      const newAddress = await AddressService.create(req.body, userId);
      res.status(201).json(newAddress);
    } catch (error: unknown) {
  const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
  res.status(400).json({ error: errorMessage });
}
  },

  async delete(req: Request, res: Response) {
    const userId = req.user.id;
    const id = req.params.id;
    await AddressService.delete(id, userId);
    res.status(204).end();
  },
};
