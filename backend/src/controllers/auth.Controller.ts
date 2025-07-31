import { Request, Response } from 'express';
import * as authService from '../services/auth.Service';
import { prisma } from '../db/db';
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await authService.registerUser(name, email, password);

    res
      .cookie('token', token, {
  httpOnly: true,
  secure: false,         // ⚠️ en desarrollo, NO puede ser true
  sameSite: 'lax',       // 🔥 importante para que la cookie cruce entre localhost:3000 y 4000
})
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
      .cookie('token', token, {
  httpOnly: true,
  secure: false,         // ⚠️ en desarrollo, NO puede ser true
  sameSite: 'lax',       // 🔥 importante para que la cookie cruce entre localhost:3000 y 4000
})
      .status(200)
      .json({
        message,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
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
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // ✅ true solo en producción con HTTPS
        sameSite: 'lax', // 🔥 permite cookies entre dominios en dev
        maxAge: 7 * 24 * 60 * 60 * 1000, // ✅ 7 días en milisegundos
      })
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
