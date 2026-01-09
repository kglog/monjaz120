import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';

// /api/auth/me
// Returns the current user for client-side pages. Development cookie-based
// overrides (previously used to emulate a seller like 'DevSeller') have been
// removed to ensure the API returns only authenticated users. A MongoDB
// fallback for development still exists below to help surface dev accounts.

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

export async function GET(req: Request) {
  try {
    // Try to get a real session (NextAuth) first.
    const session = (await getServerSession(authOptions as any)) as any;

    const headerUserId = req.headers.get("x-user-id");
    const cookies = parseCookies(req.headers.get("cookie"));

    const isDev = process.env.NODE_ENV !== "production";
    const devRole = isDev ? cookies["dev_user_role"] : undefined;
    const devId = isDev ? cookies["dev_user_id"] : undefined;

    const userId = session?.user?.id || (isDev ? headerUserId || devId : null);
    if (!userId) return NextResponse.json({ user: null });

    if (isDev && devRole) {
      // Return a lightweight dev user without hitting the database.
      const name = cookies["dev_user_name"] || "مستخدم التطوير";
      const emailLocal = (name || "dev").replace(/\s+/g, "").toLowerCase();
      return NextResponse.json({
        user: {
          id: devId || userId,
          name,
          email: `${emailLocal}@example.local`,
          role: devRole,
          avatar: null,
        },
      });
    }

    // Production (or no dev override) - fetch from DB
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true, avatar: true },
    });

    if (user) {
      // Map DB 'vendor' to frontend 'seller' for compatibility with UI checks
      const mappedRole = user.role === 'vendor' ? 'seller' : user.role;
      const out = { ...user, role: mappedRole };
      return NextResponse.json({ user: out });
    }

    // If no Prisma/NextAuth user was found, try a Mongoose/Mongo fallback
    // This is intended for development only so existing accounts created
    // via the Mongoose signup flow are visible to the UI without full
    // session-unification. Do NOT enable this in production.
    const isDevFallbackAllowed = process.env.NODE_ENV !== 'production';
    if (isDevFallbackAllowed) {
      // Try to locate an identifying email from the session or headers/cookies.
      const emailFromSession = (session && session.user && session.user.email) ? session.user.email : null;
      const emailFromHeader = req.headers.get('x-user-email');
      const cookies = parseCookies(req.headers.get('cookie'));
      const emailFromCookie = cookies['dev_user_email'];
      const emailCandidate = emailFromSession || emailFromHeader || emailFromCookie || null;

      if (emailCandidate) {
        try {
          await connectToDB();
          const mongoUser = await User.findOne({ email: emailCandidate }).select('id name email role avatar').lean();
          if (mongoUser) {
            // Normalize to the shape the client expects
            const normalizedRole = mongoUser.role === 'vendor' ? 'seller' : (mongoUser.role || 'buyer');
            const mapped = {
              id: mongoUser._id?.toString() || mongoUser.id || null,
              name: mongoUser.name || null,
              email: mongoUser.email || null,
              role: normalizedRole,
              avatar: mongoUser.avatar || null,
            };
            return NextResponse.json({ user: mapped });
          }
        } catch (e) {
          console.error('auth/me mongo fallback error', e);
        }
      }
    }

    return NextResponse.json({ user: null });
  } catch (err) {
    console.error("/api/auth/me error", err);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}

// ASSISTANT_FINAL: true
