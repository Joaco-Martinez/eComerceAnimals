// src/utils/cookieOptions.ts
import type { CookieOptions } from 'express';
const isProduction = process.env.MODE === 'production';

export const getCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: 'lax', // 'lax' es un valor válido
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
  domain: isProduction ? '.punkypet.com.ar' : undefined, // 👈 esto es clave
});