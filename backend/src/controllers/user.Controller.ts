import { Request, Response } from 'express';
import * as userService from '../services/user.Service';
import { sendResetCodeEmail } from '../services/notificacion.service';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch {
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
  } catch {
    res.status(500).json({ message: 'Error al actualizar contraseña' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await userService.deleteUser(id);
    res.status(204).send();
  } catch {
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email requerido' });

    const { code } = await userService.generateResetCode(email);
    await sendResetCodeEmail(email, code);

    res.json({ message: 'Código enviado al correo electrónico' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) {
      return res.status(400).json({ message: 'Faltan datos' });
    }

    await userService.resetPasswordWithCode(email, code, newPassword);
    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
