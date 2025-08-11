// cookieOptions.ts
import type { CookieOptions } from 'express';
const isProd = process.env.MODE === 'production';

export const getCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: isProd ? true : false,
  sameSite: isProd ? 'none' : 'lax',
  path: '/',                     // ← importante
  maxAge: 1000 * 60 * 60 * 24 * 7,
});

export const getCookieOptionsHttpOnlyFalse = (): CookieOptions => ({
  httpOnly: false,
  secure: isProd ? true : false,
  sameSite: isProd ? 'none' : 'lax',
  path: '/',
  maxAge: 1000 * 60 * 60 * 24 * 7,
});
