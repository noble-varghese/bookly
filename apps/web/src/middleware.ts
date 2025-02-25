// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add all public routes here
const publicRoutes = ['/auth/callback']
const authRoutes = ['/login', '/signup', '/'] // Routes that authenticated users shouldn't access


export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const pathname = req.nextUrl.pathname

  // Allow access to public routes and assets regardless of auth status
  if (publicRoutes.includes(pathname) || pathname.startsWith('/api/') || pathname.startsWith('/_next/') || pathname.includes('.')) {
    return res
  }

  // If user is authenticated and trying to access auth pages, redirect to home
  if (session && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/home', req.url))
  }

  // If there's no session and we're not on a public route, redirect to login
  if (!session && !authRoutes.includes(pathname)) {
    const redirectUrl = new URL('/login', req.url)
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

// Configure matcher to exclude public files and api routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - public (public files)
     * - .next (build files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|public|.next|favicon.ico).*)',
  ],
}