// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // اسمح بالدخول للصفحة والـ API حقها
  if (pathname === "/owner/login" || pathname.startsWith("/api/owner/")) {
    return NextResponse.next();
  }

  // حماية /owner + /admin: وجود كوكي المالك يكفي هنا
  const needsOwner = pathname.startsWith("/owner") || pathname.startsWith("/admin");
  if (needsOwner) {
    const has = !!req.cookies.get("monaza_owner")?.value;
    if (!has) {
      const url = req.nextUrl.clone();
      url.pathname = "/owner/login";
      url.search = `?returnTo=${encodeURIComponent(pathname + search)}`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/owner/:path*", "/admin/:path*"],
};

// ASSISTANT_FINAL: true
