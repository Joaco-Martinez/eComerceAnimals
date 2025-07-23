import { Request, Response, NextFunction } from 'express'
import { Role } from '@prisma/client'
import { AuthRequest } from './authMiddlewares';
import { getUserById } from '../services/user.Service'

export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId
    if (!userId) {
      return res.status(401).json({ error: 'No autenticado' })
    }

    const user = await getUserById(userId)

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    if (user.role !== Role.admin) {
      return res.status(403).json({ error: 'Acceso denegado: se requiere rol admin' })
    }

    next()
  } catch (err) {
    console.error('Error en isAdmin middleware:', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}