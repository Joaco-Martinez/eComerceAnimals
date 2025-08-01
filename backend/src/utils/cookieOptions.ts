// src/utils/cookieOptions.ts
import type { CookieOptions } from 'express';
const isProduction = process.env.MODE === 'production';

export const getCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: 'lax' as const, // ✅ Esto le dice a TypeScript que es un valor literal, no un string genérico
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
});