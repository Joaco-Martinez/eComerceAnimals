import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mi_secreto';

export interface TokenPayload {
  userId: string;
  sessionId: string;
  iat: number;
  exp: number;
}

export const generateToken = (userId: string, sessionId: string) => {
  return jwt.sign({ userId, sessionId }, JWT_SECRET, {
    expiresIn: '1h',
  });
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
};
