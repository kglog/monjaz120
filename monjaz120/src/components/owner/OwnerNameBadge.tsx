import React from 'react';
import { cookies } from "next/headers";

export const runtime = "nodejs"; // عشان فك التشفير يكون مضمون (Buffer)

const COOKIE_NAME = process.env.OWNER_COOKIE_NAME || "owner_session";

function tryGetNameFromRaw(raw: string): string | null {
  if (!raw) return null;

  // 1) مباشرة "name:pass"
  if (raw.includes(":")) return raw.split(":")[0].trim() || null;

  // 2) JSON مباشر
  try {
    const j = JSON.parse(raw);
    if (j?.name) return String(j.name);
  } catch {}

  // 3) base64 -> "name:pass" أو JSON
  try {
    const decoded = Buffer.from(raw, "base64").toString("utf8");
    if (decoded.includes(":")) return decoded.split(":")[0].trim() || null;

    try {
      const j = JSON.parse(decoded);
      if (j?.name) return String(j.name);
    } catch {}
  } catch {}

  return null;
}

export default async function OwnerNameBadge() {
  const c = await cookies();

  const ownerNameCookie = c.get("owner_name")?.value || "";
  const session = c.get(COOKIE_NAME)?.value || "";

  const name =
    ownerNameCookie ||
    tryGetNameFromRaw(session) ||
    "المالك";

  return (
    <div className="mb-4">
      <div className="inline-flex items-center gap-2 rounded-2xl border bg-white px-4 py-2 text-sm">
        <span className="font-semibold">👑 المالك:</span>
        <span className="font-semibold">{name}</span>
        <span className="text-xs text-gray-500">— جلسة خاصة</span>
      </div>
    </div>
  );
}

// ASSISTANT_FINAL: true
