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



  // 🔁 Si está logueado e intenta ir a login o register, redirige al home
  if (token && (pathname === '/login' || pathname === '/register')) {

    return NextResponse.redirect(new URL('/', request.url));
  }

  // 🚫 Si no hay token e intenta entrar a rutas privadas
  if (!token) {
    if (pathname.startsWith('/admin') || pathname.startsWith('/user')) {

      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  }

  // 🔐 Verificamos JWT y controlamos acceso por rol
  try {
    const { payload } = await jwtVerify(token, SECRET);
    const role = payload.role;


    if (pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.rewrite(new URL('/404', request.url));
    }

    if (pathname.startsWith('/user') && role !== 'customer') {
      return NextResponse.rewrite(new URL('/404', request.url));
    }


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
