import { NextResponse } from "next/server";

// Dev-only endpoint to set a dev cookie for role switching (mimic session change).
// POST { role: 'seller'|'buyer', id?: string, name?: string }
export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false, error: "Not allowed in production" }, { status: 403 });
  }

  try {
    const payload = await req.json();
    const role = payload?.role || "buyer";
    const id = payload?.id || "dev-user";
    const name = payload?.name || "مستخدم التطوير";

    const res = NextResponse.json({ ok: true, role, id, name });

    // Set a non-HttpOnly cookie so client-side JS can read/update if needed.
    // Keep cookie short-lived for dev convenience.
    const maxAge = 60 * 60 * 24 * 30; // 30 days
    res.cookies.set("dev_user_role", String(role), { path: "/", maxAge });
    res.cookies.set("dev_user_id", String(id), { path: "/", maxAge });
    res.cookies.set("dev_user_name", String(name), { path: "/", maxAge });

    return res;
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
