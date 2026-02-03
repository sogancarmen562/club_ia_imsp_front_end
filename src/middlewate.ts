import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log(token)
  const pathname = request.nextUrl.pathname;

  const isAuthPage = pathname.startsWith("/auth");

  if (!token && !isAuthPage) {
    return NextResponse.redirect(
      new URL("/auth/signin", request.url)
    );
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(
      new URL("/admin", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path", "/auth/:path*"],
};
