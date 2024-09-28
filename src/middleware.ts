import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname


  // Redirect / to /en
  if (path === '/') {
    return NextResponse.redirect(new URL('/en', request.url))
  }

  // Only allow /en, /hi, and /kn routes
  if (!['/en', '/hi', '/kn', '/cn', '/es', '/jn', '/ko', '/po', '/tl', '/tm'].includes(path)) {
    return NextResponse.redirect(new URL('/en', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}