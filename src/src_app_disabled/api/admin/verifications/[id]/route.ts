export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

function decodeSessionToken(token: string | undefined | null) {
  if (!token) return null;
  try {
    const json = Buffer.from(token, "base64").toString("utf8");
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

async function ensureAdmin() {
  // Read cookies list and the owner session token
  const all = cookies().getAll().map((c) => ({ name: c.name, valuePresent: !!c.value }));
  const token = cookies().get("monjaz_owner_session")?.value;
  const session = decodeSessionToken(token);

  // Log cookie diagnostic info for debugging (temporary)
  try {
    console.info("[admin-guard] cookies:", all);
    console.info("[admin-guard] owner_token_present:", !!token);
    console.info("[admin-guard] decoded_session:", session ? { role: session.role, email: session.email } : null);
  } catch (e) {}

  // If a valid session exists and role is allowed, accept
  if (session && ["OWNER", "ADMIN"].includes(session.role)) {
    return { ok: true, email: session.email || "owner" };
  }

  // Dev fallback: accept a header x-admin-key when running in development
  // This helps unblock local testing when cookies aren't available yet.
  try {
    const reqHeaders = (global as any).Headers ? undefined : undefined; // noop to satisfy TS
  } catch (e) {}

  // We cannot access `req` here; caller will check header fallback. Return not-logged-in to let caller decide.
  return { ok: false, status: 401, error: "NOT_LOGGED_IN" };
}

async function handler(req: Request, ctx: { params: { id: string } }) {
  let guard = await ensureAdmin();
  if (!guard.ok) {
    // Attempt dev-only fallback using x-admin-key header
    const env = process.env.NODE_ENV || "development";
    const headerKey = req.headers.get("x-admin-key");
    const allowedKey = process.env.ADMIN_LOCAL_KEY || process.env.NEXT_PUBLIC_ADMIN_LOCAL_KEY;
    console.info("[admin-guard] header x-admin-key present:", !!headerKey);
    if (env === "development" && headerKey && allowedKey && headerKey === allowedKey) {
      console.info("[admin-guard] dev x-admin-key matched, granting local admin access");
      guard = { ok: true, email: "local-dev" } as any;
    } else {
      return NextResponse.json({ ok: false, error: guard.error }, { status: guard.status });
    }
  }

  const id = ctx.params.id;
  let body: any = {};
  try { body = await req.json(); } catch (e) {}

  const action = (body?.action || body?.decision || "").toString();
  const nextStatus =
    action === "approve" || action === "approved" ? "verified" :
    action === "reject" || action === "rejected" ? "rejected" :
    null;

  if (!nextStatus) {
    return NextResponse.json({ ok: false, error: "BAD_ACTION", hint: "use action=approve|reject" }, { status: 400 });
  }

  try {
    const now = new Date();
    const updated = await prisma.identitySession.update({
      where: { id },
      data: {
        status: nextStatus,
        decidedAt: now,
        decidedByEmail: guard.email,
        verifiedAt: nextStatus === "verified" ? now : null,
        rejectedAt: nextStatus === "rejected" ? now : null,
      } as any,
      select: { id: true, status: true, decidedAt: true, verifiedAt: true, rejectedAt: true, userId: true },
    });

    // if approved, mark the user as verified immediately so the client sees the change
    if (nextStatus === "verified" && updated.userId) {
      try {
        await prisma.user.update({ where: { id: updated.userId }, data: { verifiedAt: now } });
      } catch (e) {
        // continue even if user update fails
        console.error("failed to update user verifiedAt", e);
      }
    }

    try { revalidatePath("/account"); } catch (e) {}
    try { revalidatePath("/admin/verifications"); } catch (e) {}

    return NextResponse.json({ ok: true, updated }, { status: 200 });
  } catch (e: any) {
    const msg = e?.message || String(e);
    if (e?.code === 'P2025' || /not found/i.test(msg)) {
      return NextResponse.json({ ok: false, error: 'NOT_FOUND', details: msg }, { status: 404 });
    }
    return NextResponse.json({ ok: false, error: 'SERVER_FAIL', details: msg }, { status: 500 });
  }
}

export async function PATCH(req: Request, ctx: any) { return handler(req, ctx); }
export async function POST(req: Request, ctx: any) { return handler(req, ctx); }

// ASSISTANT_FINAL: true
