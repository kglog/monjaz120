import fs from "fs";
import path from "path";

export type FlagMode = "auto" | "manual";

export type OwnerFlag = {
  key: string;
  title: string;
  enabled: boolean;
  mode: FlagMode; // auto/manual
  note?: string;
  updatedAt: string;
};

const FILE = path.join(process.cwd(), "data", "owner-flags.json");

const DEFAULTS: OwnerFlag[] = [
  { key: "emergency_mode", title: "زر الطوارئ الذكي", enabled: true, mode: "manual", updatedAt: new Date().toISOString() },
  { key: "spytraps", title: "مصائد الجواسيس", enabled: true, mode: "auto", updatedAt: new Date().toISOString() },
  { key: "ip_guard", title: "حماية الملكية (IP Guard)", enabled: true, mode: "auto", updatedAt: new Date().toISOString() },
  { key: "points", title: "نظام النقاط الصعب", enabled: true, mode: "auto", updatedAt: new Date().toISOString() },
  { key: "daily_deals", title: "العروض اليومية", enabled: true, mode: "auto", updatedAt: new Date().toISOString() },
  { key: "event_notifier", title: "منبه الأحداث", enabled: true, mode: "auto", updatedAt: new Date().toISOString() },
  { key: "risk_profiles", title: "الملف السري/تقييم المخاطر", enabled: true, mode: "auto", updatedAt: new Date().toISOString() },
  { key: "smart_arbitration", title: "القاضي الإلكتروني (اقتراح)", enabled: true, mode: "manual", updatedAt: new Date().toISOString() },
  { key: "bank_transfer_confirm", title: "تأكيد التحويل البنكي", enabled: true, mode: "manual", updatedAt: new Date().toISOString() },
  { key: "anti_leak_guard", title: "منع التسريب (خارج المنصة)", enabled: true, mode: "auto", updatedAt: new Date().toISOString() },
];

function ensure() {
  if (!fs.existsSync(FILE)) {
    fs.mkdirSync(path.dirname(FILE), { recursive: true });
    fs.writeFileSync(FILE, JSON.stringify(DEFAULTS, null, 2), "utf8");
  }
}

export function getAllFlags(): OwnerFlag[] {
  ensure();
  return JSON.parse(fs.readFileSync(FILE, "utf8"));
}

export function getFlag(key: string): OwnerFlag | undefined {
  return getAllFlags().find((f) => f.key === key);
}

export function setFlag(key: string, patch: Partial<OwnerFlag>) {
  ensure();
  const all = getAllFlags();
  const idx = all.findIndex((f) => f.key === key);
  if (idx === -1) throw new Error("FLAG_NOT_FOUND");

  all[idx] = { ...all[idx], ...patch, updatedAt: new Date().toISOString() };
  fs.writeFileSync(FILE, JSON.stringify(all, null, 2), "utf8");
  return all[idx];
}

// تستخدمها داخل الأنظمة الذكية:
export function isEnabled(key: string) {
  return getFlag(key)?.enabled ?? false;
}
export function isManual(key: string) {
  return (getFlag(key)?.mode ?? "auto") === "manual";
}

// ASSISTANT_FINAL: true
