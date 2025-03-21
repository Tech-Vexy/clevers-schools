import { type NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

// Routes that require authentication
const protectedRoutes = ["/subscribe", "/subscription", "/profile"]

// Routes that should redirect to dashboard if user is authenticated
const authRoutes = ["/auth/signin", "/auth/signup"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // Get the token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Redirect to login if accessing protected route without authentication
  if (isProtectedRoute && !token) {
    const url = new URL("/auth/signin", request.url)
    url.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(url)
  }

  // Redirect to dashboard if accessing auth routes while authenticated
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/subscribe/:path*", "/subscription/:path*", "/profile/:path*", "/auth/:path*"],
}

