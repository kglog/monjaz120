// src/middleware.ts
import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const adminPass = req.cookies.get("admin_pass")?.value;

  const protectedRoots = ["/orders", "/admin"];
  const needAuth = protectedRoots.some((p) =>
    url.pathname === p || url.pathname.startsWith(p + "/")
  );

  if (needAuth && adminPass !== process.env.ADMIN_PASS) {
    return NextResponse.redirect(new URL("/admin-login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/orders/:path*", "/admin/:path*"],
};
