import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  // Example: add security headers or locale parsing here
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  return res;
}

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|api).*)',
  ],
};


