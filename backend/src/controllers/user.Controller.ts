import { Request, Response } from 'express';
import * as userService from '../services/user.Service';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

export const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: 'La contraseña es requerida' });

    const updatedUser = await userService.updateUserPassword(id, password);
    res.json({ message: 'Contraseña actualizada correctamente', userId: updatedUser.id });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar contraseña' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await userService.deleteUser(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};
