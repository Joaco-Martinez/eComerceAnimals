// src/middlewares/ensureAnonCartCookie.ts
import type { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

const isProd = process.env.NODE_ENV === "production";

export function ensureAnonCartCookie(req: Request, res: Response, next: NextFunction) {
  let anonCartId = req.cookies?.AnonCart_id as string | undefined;

  if (!anonCartId) {
    anonCartId = randomUUID();

    res.cookie("AnonCart_id", anonCartId, {
      httpOnly: true,                 // no accesible desde JS (más seguro)
      secure: isProd,                 // true solo en prod sobre https
      sameSite: isProd ? "none" : "lax", // none si hay cross-site
      maxAge: 1000 * 60 * 60 * 24 * 7,   // 7 días
      path: "/",                      // enviala en todo el sitio
    });
  }

  // lo guardo en req para no re-leer de cookies
  (req as any).anonCartId = anonCartId;
  next();
}
