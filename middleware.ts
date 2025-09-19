import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Массив с роутами для которых будет проверка на авторизацию
  const protectedRoutes: string[] = [];

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.redirect(
        new URL('/login', request.url)
      );
    }
  }
  return NextResponse.next();
}

// Настройки middleware: будет запускаться только для роутов из массива
export const config = {
  matcher: []
};
