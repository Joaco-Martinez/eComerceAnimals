import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_STRING = process.env.JWT_SECRET;
if (!SECRET_STRING) throw new Error('Falta JWT_SECRET en el .env');
const SECRET = new TextEncoder().encode(SECRET_STRING);

// Map de rutas -> roles permitidos
const ALLOWED: Record<'/admin'|'/user', string[]> = {
  '/admin': ['admin'],                 // solo admin
  '/user': ['customer', 'user', 'admin'] // permití customer | user | admin
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Si está logueado e intenta ir a login/register → home
  if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Si NO hay token y quiere entrar a privadas → login
  const isAdmin = pathname.startsWith('/admin');
  const isUser = pathname.startsWith('/user');
  if (!token && (isAdmin || isUser)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si no hay token y la ruta es pública
  if (!token) return NextResponse.next();

  // Verificación de JWT
  try {
    const { payload } = await jwtVerify(token, SECRET /*, { algorithms: ['HS256'] }*/);
    const role = String(payload.role || '');

    // (opcional) chequeo de expiración si tu backend no mete `exp`
    // if (payload.exp && Date.now()/1000 > payload.exp) throw new Error('token expirado');

    if (isAdmin && !ALLOWED['/admin'].includes(role)) {
      return NextResponse.redirect(new URL('/404', request.url));
    }
    if (isUser && !ALLOWED['/user'].includes(role)) {
      return NextResponse.redirect(new URL('/404', request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error('❌ JWT inválido/expirado:', err);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*', '/login', '/register'],
};
