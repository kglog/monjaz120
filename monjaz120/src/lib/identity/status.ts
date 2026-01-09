// 📄 src/lib/identity/status.ts
import fs from "fs/promises";
import path from "path";

export type VerificationStatus = "unverified" | "pending" | "verified" | "rejected";

export async function getUserVerificationStatus(
  userId: string
): Promise<VerificationStatus> {
  // نجيب أحدث جلسة توثيق لهذا المستخدم
  try {
    // Lazy-load Prisma client to avoid build-time require when `prisma generate` hasn't run
    let prismaClient: any = null;
    try {
      const mod = await import("@/lib/prisma");
      prismaClient = mod.default || mod;
    } catch (e) {
      prismaClient = null;
    }

    if (prismaClient) {
      const latest = await prismaClient.identitySession.findFirst({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });

      if (latest) {
        if (latest.status === "verified") return "verified";
        if (latest.status === "rejected") return "rejected";
        return "pending";
      }
    }
    // if prisma client not available or no latest found, fall through to file-based fallback
  } catch (e) {
    // ignore prisma errors and fallback to file-based dev storage below
  }

  // Fallback: check local file storage used in dev (data/verification-requests.json)
  try {
    const FILE = path.join(process.cwd(), "data", "verification-requests.json");
    const raw = await fs.readFile(FILE, "utf8").catch(() => "[]");
    const arr = JSON.parse(raw || "[]");
    // find latest by createdAt or last occurrence for this userId
    for (let i = arr.length - 1; i >= 0; i--) {
      const r: any = arr[i];
      if (!r) continue;
      const id = String(r.uid || r.userId || r.id || "");
      if (id === String(userId)) {
        const s = r.status || "pending";
        if (s === "verified") return "verified";
        if (s === "rejected") return "rejected";
        return "pending";
      }
    }
  } catch (e) {
    // ignore
  }

  return "unverified";
}

// ASSISTANT_FINAL: true
