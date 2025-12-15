// src/lib/auth/isAdmin.ts
export function isAdminEmail(email?: string | null) {
  if (!email) return false;
  const raw = process.env.ADMIN_EMAILS || "";
  const list = raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}

// ASSISTANT_FINAL: true
