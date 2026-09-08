import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const APEX_HOST = "pigiecore.co.ke";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0].toLowerCase();

  // Redirect the bare (non-www) domain to www so every ISP resolves it.
  if (hostname === APEX_HOST) {
    const url = new URL(request.url);
    url.host = `www.${APEX_HOST}`;
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }

  const hasAuthCookie = request.cookies
    .getAll()
    .some((c) => c.name.includes("auth-token"));

  if (
    !hasAuthCookie &&
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin/login")
  ) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|webmanifest|txt|xml)$).*)",
  ],
};
