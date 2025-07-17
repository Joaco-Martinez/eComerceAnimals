import { Request, Response } from 'express';
import * as authService from '../services/auth.Service';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await authService.registerUser(name, email, password);

    res
      .cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
      .status(201)
      .json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const verifyEmailCode = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;
    await authService.verifyEmailCode(email, code);
    res.status(200).json({ message: 'Email verificado correctamente' });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);

    res
      .cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
      .json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie('token').json({ message: 'Sesión cerrada' });
};

export const me = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'No autenticado' });

    const user = await authService.getUserFromToken(token);
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      cart: user.cart,
    });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};
