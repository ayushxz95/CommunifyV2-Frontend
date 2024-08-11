import { parse } from 'cookie';
import { NextResponse } from 'next/server';

export function middleware(request: any) {
  const cookies = parse(request.headers.get('cookie') || '');
  const token = cookies.accessToken;

  if (token) {
    if (request.nextUrl.pathname === '/auth') {
      return NextResponse.redirect(new URL('/home', request.url));
    }
    return NextResponse.next();
  } else {
    const protectedPaths = ['/profile', '/questionList', '/home'];
    if (protectedPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/home', '/profile', '/questionList', '/auth'],
};
