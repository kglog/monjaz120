import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = await req.json().catch(()=>({}));
  const base = process.env.BRAIN_CORE_URL, token = process.env.BRAIN_CORE_TOKEN;
  if (!base || !token) return NextResponse.json({ ok: true, skipped: true });
  await fetch(`${base}/ingest`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body), keepalive: true
  }).catch(()=>{});
  return NextResponse.json({ ok: true });
}
