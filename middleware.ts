import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { COOKIE_COREAPI_JWT } from './lib/cookies'

export function middleware(request: NextRequest) {
  const jwt = request.cookies.get(COOKIE_COREAPI_JWT)?.value
  const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/api/')
  if (!jwt && request.nextUrl.pathname.startsWith('/app') && !isAuthRoute) {
    const url = new URL('/login', request.url)
    url.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/app/:path*']
}
