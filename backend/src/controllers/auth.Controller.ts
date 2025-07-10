import { Request, Response } from 'express';
import { prisma } from '../db/db';
import { generateToken, hashPassword, comparePassword, verifyToken } from '../utils/auth';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email ya registrado' });

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        cart: {
          create: {}, // ← crea un carrito vacío automáticamente
        },
      },
      include: { cart: true },
    });

    const token = generateToken(user.id);

    res
      .cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
      .status(201)
      .json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = generateToken(user.id);
    res
      .cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
      .json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie('token').json({ message: 'Sesión cerrada' });
};

export const me = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'No autenticado' });

    const payload = verifyToken(token);
    if (!payload) return res.status(401).json({ message: 'Token inválido' });

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        cart: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      cart: user.cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en /me' });
  }
};
