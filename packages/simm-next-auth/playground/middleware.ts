import { NextResponse } from "next/server";
import { withAuth } from "../src/auth";

const auth = withAuth(
  function middleware(request) {
    const pathname = request.nextUrl.pathname
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
);

export default auth;

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // "/:path*",
    "/((?!api|login|_next/static|_next/image|favicon.ico).*)",
  ],
};
