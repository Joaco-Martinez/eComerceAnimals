import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';
import { prisma } from '../db/db';

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'No autenticado' });

  const payload = verifyToken(token);

  // ⚠️ Si no viene sessionId, el token no sirve
  if (!payload || !payload.sessionId || !payload.userId) {
    res.clearCookie('token');
    return res.status(401).json({ message: 'Token inválido' });
  }

  // // 🧾 opcional: log para debug
  // console.log("🔍 Token:", token);
  // console.log("🔍 Payload:", payload);

  const session = await prisma.session.findUnique({
    where: { id: payload.sessionId },
  });

  if (
    !session ||
    session.isRevoked ||
    session.expiresAt < new Date() ||
    session.token !== token ||
    session.userId !== payload.userId 
  ) {
    res.clearCookie('token');
    return res.status(401).json({ message: 'Sesión inválida o expirada' });
  }

  req.userId = payload.userId;
  next();
};
