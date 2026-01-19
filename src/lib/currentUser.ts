import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import mongoose from "mongoose";

export type CurrentUser = {
  id: string;
  email?: string | null;
  name?: string | null;
  role?: string | null;
};

function parseCookies(cookieHeader: string | null) {
  const out: Record<string, string> = {};
  if (!cookieHeader) return out;
  cookieHeader.split(";").forEach((c) => {
    const [rawKey, ...rest] = c.split("=");
    const key = rawKey?.trim();
    if (!key) return;
    out[key] = decodeURIComponent((rest || []).join("=") || "");
  });
  return out;
}

function isMongoObjectId(id: string | null | undefined) {
  if (!id) return false;
  return mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === id;
}

/**
 * If id is not a Mongo ObjectId, try to resolve the Mongo _id using email.
 * This makes prod (Vercel/NextAuth/Google) behave like local Mongo-based ids.
 */
async function normalizeUserId(params: {
  id: string | null;
  email?: string | null;
  name?: string | null;
  role?: string | null;
}): Promise<CurrentUser> {
  const id = params.id ? String(params.id) : null;
  const email = params.email ? String(params.email).trim().toLowerCase() : null;

  // If already a valid ObjectId, keep it
  if (isMongoObjectId(id)) {
    return {
      id: String(id),
      email,
      name: params.name ?? null,
      role: params.role ?? null,
    };
  }

  // Try resolving via email
  if (email) {
    await connectToDB();
    const mongoUser: any = await User.findOne({ email }).select("_id name email role").lean();
    if (mongoUser?._id) {
      return {
        id: String(mongoUser._id),
        email: mongoUser.email ? String(mongoUser.email) : email,
        name: mongoUser.name ? String(mongoUser.name) : (params.name ?? null),
        role: mongoUser.role ? String(mongoUser.role) : (params.role ?? null),
      };
    }
  }

  // Fallback: return original (may be non-mongo id)
  // This prevents crashes in places that don't require ObjectId.
  return {
    id: id ?? "",
    email,
    name: params.name ?? null,
    role: params.role ?? null,
  };
}

export async function requireCurrentUser(req?: Request): Promise<CurrentUser> {
  const session = (await auth()) as any;

  const sessionUserId = session?.user?.id ? String(session.user.id) : null;
  const sessionEmail = session?.user?.email ?? null;
  const sessionName = session?.user?.name ?? null;
  const sessionRole = session?.user?.role ?? null;

  if (sessionUserId || sessionEmail) {
    const normalized = await normalizeUserId({
      id: sessionUserId,
      email: sessionEmail,
      name: sessionName,
      role: sessionRole,
    });

    // If we couldn't even get an id, treat as unauthorized
    if (!normalized.id) throw new Error("UNAUTHORIZED");
    return normalized;
  }

  // Support cookie-based auth used by the email/password login flow.
  // This is required because that flow stores the user in localStorage, which the server can't read.
  if (req) {
    const cookies = parseCookies(req.headers.get("cookie"));
    const monazaUid = cookies["monaza_uid"];
    const monazaEmail = cookies["monaza_email"] ? String(cookies["monaza_email"]) : null;

    if (monazaUid || monazaEmail) {
      const normalized = await normalizeUserId({
        id: monazaUid ? String(monazaUid) : null,
        email: monazaEmail,
        name: cookies["monaza_name"] ? String(cookies["monaza_name"]) : null,
        role: cookies["monaza_role"] ? String(cookies["monaza_role"]) : null,
      });

      if (!normalized.id) throw new Error("UNAUTHORIZED");
      return normalized;
    }
  }

  const isDev = process.env.NODE_ENV !== "production";
  if (isDev && req) {
    const headerUserId = req.headers.get("x-user-id");
    const cookies = parseCookies(req.headers.get("cookie"));
    const devId = cookies["dev_user_id"];
    const devRole = cookies["dev_user_role"];
    const devName = cookies["dev_user_name"];
    const devEmail = cookies["dev_user_email"];

    const id = headerUserId || devId;
    if (id) {
      const normalized = await normalizeUserId({
        id: String(id),
        email: devEmail ? String(devEmail) : null,
        name: devName ? String(devName) : null,
        role: devRole ? String(devRole) : null,
      });
      if (!normalized.id) throw new Error("UNAUTHORIZED");
      return normalized;
    }

    const headerEmail = req.headers.get("x-user-email");
    const emailCandidate = (headerEmail || devEmail || "").trim().toLowerCase();
    if (emailCandidate) {
      const normalized = await normalizeUserId({
        id: null,
        email: emailCandidate,
        name: null,
        role: null,
      });
      if (!normalized.id) throw new Error("UNAUTHORIZED");
      return normalized;
    }
  }

  throw new Error("UNAUTHORIZED");
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
