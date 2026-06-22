import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Update these to match your exact dictionary file names
const locales = ['en', 'fr', 'ko'];
const defaultLocale = 'en';

// The function name below changed from 'middleware' to 'proxy'
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already has a locale (e.g., /en/about)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // If no locale is found, redirect to the default (e.g., / -> /en)
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Ignore internal Next.js paths and static files (like images)
  matcher: ['/((?!_next|api|favicon.ico|images|.*\\.png$).*)'],
};