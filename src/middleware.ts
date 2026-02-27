import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // If we are already on the maintenance page, do nothing so we don't loop endlessly
  if (request.nextUrl.pathname.startsWith('/maintenance')) {
    return NextResponse.next()
  }

  // Allow static files, Next.js internal files, and API routes to pass through as usual
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.includes('.') // for files like favicon.ico, images, etc.
  ) {
    return NextResponse.next()
  }

  // Rewrite all other requests to the maintenance page
  return NextResponse.rewrite(new URL('/maintenance', request.url))
}

// Ensure the middleware runs on all paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
