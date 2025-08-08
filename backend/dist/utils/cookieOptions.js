"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookieOptionsHttpOnlyFalse = exports.getCookieOptions = void 0;
const isProduction = process.env.MODE === 'production';
const getCookieOptions = () => ({
    httpOnly: true,
    secure: true,
    sameSite: 'none', // 'lax' es un valor válido
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
});
exports.getCookieOptions = getCookieOptions;
const getCookieOptionsHttpOnlyFalse = () => ({
    httpOnly: false,
    secure: true,
    sameSite: 'none', // 'lax' es un valor válido
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
});
exports.getCookieOptionsHttpOnlyFalse = getCookieOptionsHttpOnlyFalse;
