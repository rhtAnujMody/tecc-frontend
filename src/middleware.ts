import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];
const nonProtectedRoutes = ["/", "/login", "/signup"];

export default function middleware(req: NextRequest) {
  const isAuthenticated = req.cookies.get("isLoggedIn")?.value === "true";

  if (!isAuthenticated && protectedRoutes.includes(req?.nextUrl?.pathname)) {
    const absoluteUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }

  if (isAuthenticated && nonProtectedRoutes.includes(req?.nextUrl?.pathname)) {
    const absoluteUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(absoluteUrl);
  }
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
