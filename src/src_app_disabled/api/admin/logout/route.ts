import { NextResponse, NextRequest } from "next/server";

// دالة مشتركة لحذف الكوكي وإرجاع توجيه لصفحة دخول المدير
function logoutResponse(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/admin-login", req.url));
  // نحذف الكوكي بتعيين قيمة فاضية و maxAge=0
  res.cookies.set("admin_pass", "", { maxAge: 0, path: "/" });
  return res;
}

export async function GET(req: NextRequest) {
  return logoutResponse(req);
}

export async function POST(req: NextRequest) {
  return logoutResponse(req);
}
