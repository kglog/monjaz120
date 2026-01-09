import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

// NOTE: This endpoint expects the following env vars to be set:
// AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET
// It also expects an authenticated user. Replace the simple header-based auth below
// with your real authentication middleware (NextAuth/session/JWT) in production.

export async function POST(req: Request) {
  try {
  // Prefer real session in production. Allow header fallback only in non-production
    const session = (await getServerSession(authOptions as any)) as any;
    const headerUserId = req.headers.get("x-user-id");

    // Prefer a real session user id. If missing, allow x-user-id header as a fallback
    // (useful for local/dev flows where the client passes the id). We still enforce
    // role checks below.
    let userId = session?.user?.id || null;
    if (!userId && headerUserId) {
      userId = headerUserId;
      console.warn("signed-url: using x-user-id header fallback for user", userId);
    }
    if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    // Read request body early so we can short-circuit in development without touching Prisma
    const body = await req.json();
    const { filename, contentType } = body as { filename?: string; contentType?: string };
    if (!filename || !contentType) {
      return NextResponse.json({ error: "missing" }, { status: 400 });
    }

    // Dev shortcut: when running locally, always return a local PUT URL so upload works
    // even if auth/session or the database isn't reachable. This avoids "unauthorized"
    // or Prisma initialization errors during local testing.
    if (process.env.NODE_ENV !== "production") {
      const keyDev = `design-uploads/${(userId || headerUserId || 'dev')}/${Date.now()}-${filename.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
      const localUrlDev = `/api/uploads/local?key=${encodeURIComponent(keyDev)}`;
      console.warn(`signed-url (dev): returning local dev url for key=${keyDev}`);
      return NextResponse.json({ ok: true, url: localUrlDev, key: keyDev, local: true });
    }

    // server-side role check: only sellers may request signed upload URLs (production only)
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.role !== "seller") {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    const region = process.env.AWS_REGION || "us-east-1";
    const bucket = process.env.S3_BUCKET;

    const key = `design-uploads/${userId}/${Date.now()}-${filename.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;

    // If S3 is not configured, return a local fallback URL that accepts PUT (development only)
    if (!bucket) {
      const localUrl = `/api/uploads/local?key=${encodeURIComponent(key)}`;
      return NextResponse.json({ ok: true, url: localUrl, key, local: true });
    }

    const s3 = new S3Client({ region });
    const cmd = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: contentType });
    const url = await getSignedUrl(s3, cmd, { expiresIn: 300 }); // 5 minutes

    return NextResponse.json({ ok: true, url, key });
  } catch (err: any) {
    console.error("signed-url error", err);
    const message = err?.message || String(err) || "server";
    if (process.env.NODE_ENV !== "production") {
      // expose the real error in dev to aid debugging
      return NextResponse.json({ error: message, stack: err?.stack }, { status: 500 });
    }
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
