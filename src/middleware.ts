import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIE_NAME, verifyAdminToken } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;
  // Verify the signature and expiry, not just the cookie's presence.
  const session = token ? await verifyAdminToken(token) : null;

  const isLoginPage = pathname === '/admin/login' || pathname.startsWith('/admin/login/');

  if (!isLoginPage && !session) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    const response = NextResponse.redirect(loginUrl);
    if (token) response.cookies.delete(COOKIE_NAME); // drop invalid/expired cookie
    return response;
  }

  // Already signed in and visiting the login page: go to the dashboard.
  if (isLoginPage && session) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
