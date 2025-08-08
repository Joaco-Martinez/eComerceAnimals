// src/utils/cookieOptions.ts
import type { CookieOptions } from 'express';
const isProduction = process.env.MODE === 'production';

export const getCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: true,
  sameSite: 'none', // 'lax' es un valor válido
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
});


export const getCookieOptionsHttpOnlyFalse = (): CookieOptions => ({
  httpOnly: false,
  secure: true,
  sameSite: 'none', // 'lax' es un valor válido
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
});