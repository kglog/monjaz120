// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

function hasOwnerCookie(req: NextRequest) {
  // نفس الأسماء اللي نمسحها في logout
  return (
    req.cookies.has("owner_session") ||
    req.cookies.has("owner_token") ||
    req.cookies.has("owner_auth") ||
    req.cookies.has("owner") ||
    req.cookies.has("ownerUser")
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // لا تعترض طلبات الـ static والـ api الخاصة بالمالك
  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon")) {
    return NextResponse.next();
  }

  // خلي الـ logout دايمًا مسموح
  if (pathname.startsWith("/api/owner/logout")) {
    return NextResponse.next();
  }

  // حماية /owner: إذا ما فيه كوكي مالك -> ودّه للوجين
  if (pathname.startsWith("/owner")) {
    if (pathname === "/owner/login") return NextResponse.next();
    if (!hasOwnerCookie(req)) {
      const url = req.nextUrl.clone();
      url.pathname = "/owner/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // سماح للمالك يدخل لوحات admin + api/admin
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (hasOwnerCookie(req)) return NextResponse.next();
    // غير كذا خل نظامك الحالي يكمل (يروح لصفحة login حق المستخدم)
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/owner/:path*", "/admin/:path*", "/api/admin/:path*", "/api/owner/:path*"],
};

// ASSISTANT_FINAL: true
