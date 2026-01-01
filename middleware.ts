import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

function isPublicEncyclopediaEnabled(): boolean {
  return String(process.env.ENCYCLOPEDIA_PUBLIC ?? '').toLowerCase() === 'true'
}

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return { url, key }
}

export async function middleware(request: NextRequest) {
  // In public mode we bypass authentication entirely (read-only access is enforced at the UI/data layer).
  if (isPublicEncyclopediaEnabled()) {
    return NextResponse.next()
  }

  const pathname = request.nextUrl.pathname
  const isLogin = pathname.startsWith('/enzyklopaedie/login')
  const isAuthCallback = pathname.startsWith('/enzyklopaedie/auth')

  const { url: supabaseUrl, key: supabaseKey } = getSupabaseEnv()
  if (!supabaseUrl || !supabaseKey) {
    // Avoid redirect loops: allow the login/auth pages to render even when env vars are missing.
    if (isLogin || isAuthCallback) return NextResponse.next()

    // Fail closed: if auth is required but Supabase is not configured, send the user to the login page
    // with an actionable error message.
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/enzyklopaedie/login'
    redirectUrl.searchParams.set('error', 'Supabase ist nicht konfiguriert. Prüfe deine .env.local.')
    redirectUrl.searchParams.set('next', `${request.nextUrl.pathname}${request.nextUrl.search}`)
    return NextResponse.redirect(redirectUrl)
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        // Keep the request cookies in sync (Supabase expects this).
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))

        // Recreate the response so headers/cookies are applied correctly.
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        )
      },
    },
  })

  // IMPORTANT: Avoid putting logic between createServerClient and getClaims().
  // See Supabase SSR docs; incorrect cookie handling can cause random logouts.
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims ?? null

  if (!user && !isLogin && !isAuthCallback) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/enzyklopaedie/login'
    redirectUrl.searchParams.set('next', `${request.nextUrl.pathname}${request.nextUrl.search}`)
    return NextResponse.redirect(redirectUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/enzyklopaedie/:path*'],
}
