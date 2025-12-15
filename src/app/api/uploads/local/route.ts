import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

// Dev-only local upload handler.
// Accepts PUT requests with raw file body and saves to data/uploads/<key>
// Requires header x-user-id (to mimic auth check).

export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const key = url.searchParams.get("key");
    const userId = req.headers.get("x-user-id");

    if (!key) return NextResponse.json({ error: "MISSING_KEY" }, { status: 400 });

    // In development accept uploads without strict header checks to make local testing easier.
    if (!userId && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    }

    // Basic path safety: disallow .. segments
    if (key.includes("..")) return NextResponse.json({ error: "INVALID_KEY" }, { status: 400 });

    const uploadsDir = path.join(process.cwd(), "data", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    const filePath = path.join(uploadsDir, path.basename(key));

    const arrayBuffer = await req.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ ok: true, key, filePath });
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  // Optional: accept POST with body for some clients; forward to PUT handler
  return PUT(req);
}

// ASSISTANT_FINAL: true
