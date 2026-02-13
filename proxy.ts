import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // Handle OAuth callback with code
  if (pathname === '/api/auth/callback') {
    const code = searchParams.get('code')
    if (code) {
      // Pass through to the route handler
      return NextResponse.next()
    }
  }

  // Protect dashboard routes - use getClaims() to validate JWT
  if (pathname.startsWith('/dashboard')) {
    const response = NextResponse.next()
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options)
            })
          },
        },
      }
    )

    const { data, error } = await supabase.auth.getClaims()

    if (error || !data) {
      // Redirect to home if not authenticated
      return NextResponse.redirect(new URL('/', request.url))
    }

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/auth/callback', '/dashboard/:path*']
}
