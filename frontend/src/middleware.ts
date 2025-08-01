import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_STRING = process.env.JWT_SECRET;
if (!SECRET_STRING) {
  throw new Error('Falta JWT_SECRET en el .env');
}
const SECRET = new TextEncoder().encode(SECRET_STRING);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  console.log("🧩 Entró al middleware");
  console.log("📍 Pathname:", pathname);
  console.log("🍪 Token:", token ? "[TOKEN PRESENTE]" : "[NO TOKEN]");

  // 🔁 Si está logueado e intenta ir a login o register, redirige al home
  if (token && (pathname === '/login' || pathname === '/register')) {
    console.log("🔒 Usuario logueado intenta ir a login/register → redirigiendo a /");
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 🚫 Si no hay token e intenta entrar a rutas privadas
  if (!token) {
    if (pathname.startsWith('/admin') || pathname.startsWith('/user')) {
      console.log("⛔ No token en ruta protegida → redirigiendo a /login");
      return NextResponse.redirect(new URL('/login', request.url));
    }
    console.log("✅ No token pero en ruta pública → dejando pasar");
    return NextResponse.next();
  }

  // 🔐 Verificamos JWT y controlamos acceso por rol
  try {
    const { payload } = await jwtVerify(token, SECRET);
    const role = payload.role;
    console.log("✅ JWT válido. Rol:", role);

    if (pathname.startsWith('/admin') && role !== 'admin') {
      console.log("🚫 Usuario no es admin → redirigiendo a /404");
      return NextResponse.rewrite(new URL('/404', request.url));
    }

    if (pathname.startsWith('/user') && role !== 'customer') {
      console.log("🚫 Usuario no es customer → redirigiendo a /404");
      return NextResponse.rewrite(new URL('/404', request.url));
    }

    console.log("✅ Acceso permitido → dejando pasar");
    return NextResponse.next();
  } catch (err) {
    console.error('❌ JWT inválido:', err);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/user/:path*',
    '/login',
    '/register',
  ],
};
