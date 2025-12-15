const BURL = process.env.NEXT_PUBLIC_BC_PROXY || "/api/bc";

type Props = Record<string, any>;

/** تتبّع حدث (page_view, click, ...) */
export async function bcTrack(event: string, props: Props = {}) {
  try {
    const payload = { event, props, t: Date.now() };
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      navigator.sendBeacon(`${BURL}/track`, new Blob([JSON.stringify(payload)], { type: "application/json" }));
    } else {
      await fetch(`${BURL}/track`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), keepalive: true
      });
    }
  } catch {}
}

/** فلاغ مفرد: يرجّع true/false */
export async function bcFlag(name: string): Promise<boolean> {
  try {
    const r = await fetch(`${BURL}/flags?feature=${encodeURIComponent(name)}`, { cache: "no-store" }).then(x => x.json());
    return !!r?.enabled;
  } catch { return false; }
}

/** فلاغات متعددة دفعة واحدة (أفضل أداء) */
export async function bcFlags(keys: string[]): Promise<Record<string, any>> {
  try {
    const r = await fetch(`${BURL}/flags?keys=${encodeURIComponent(keys.join(","))}`, { cache: "no-store" }).then(x => x.json());
    return r || {};
  } catch { return {}; }
}

/** تعريف المستخدم (اختياري) */
export function bcIdentify(user: { id?: string; role?: string } = {}) {
  return bcTrack("identify", user);
}
