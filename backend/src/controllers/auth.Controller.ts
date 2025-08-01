import { Request, Response } from 'express';
import * as authService from '../services/auth.Service';
import { prisma } from '../db/db';
import { getCookieOptions } from '../utils/cookieOptions';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await authService.registerUser(name, email, password);

    res
      .status(200)
      .json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const verifyEmailCode = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;
    const { user, token, message } = await authService.verifyEmailCode(email, code);

    res
      .cookie('token', token, getCookieOptions())
      .status(200)
      .json({
        message,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    console.log(token)
    res
      .cookie('token', token, getCookieOptions())
      .json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};


export const logout = async (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (token) {
    const session = await prisma.session.findFirst({ where: { token } });
    if (session) {
      await prisma.session.update({
        where: { id: session.id },
        data: { isRevoked: true },
      });
    }
  }

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
      role: user.role,
    });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};
