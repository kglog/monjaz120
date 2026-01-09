import { NextResponse } from "next/server";
export const revalidate = 30; // كاش خفيف

export async function GET(req: Request) {
  const u = new URL(req.url);
  const feature = u.searchParams.get("feature") || "";
  const list = (u.searchParams.get("keys") || "").split(",").map(s => s.trim()).filter(Boolean);

  const base = process.env.BRAIN_CORE_URL, token = process.env.BRAIN_CORE_TOKEN;
  if (!base || !token) {
    // بدون الدماغ: فلاغات ترجع مطفي
    if (list.length) return NextResponse.json(Object.fromEntries(list.map(k => [k, false])));
    return NextResponse.json({ enabled: false });
  }

  const h = { Authorization: `Bearer ${token}` };

  // دفعة واحدة (keys=...)
  if (list.length) {
    const out: Record<string, any> = {};
    await Promise.all(list.map(async (k) => {
      try {
        const r = await fetch(`${base}/flags?feature=${encodeURIComponent(k)}`, { headers: h, cache: "no-store" }).then(x => x.json());
        out[k] = r?.enabled ?? false;
      } catch { out[k] = false; }
    }));
    return NextResponse.json(out);
  }

  // فلاغ مفرد (feature=...)
  try {
    const r = await fetch(`${base}/flags?feature=${encodeURIComponent(feature)}`, { headers: h, cache: "no-store" }).then(x => x.json());
    return NextResponse.json(r || { enabled: false });
  } catch {
    return NextResponse.json({ enabled: false });
  }
}
