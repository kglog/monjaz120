// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions as any);

// Safe debug: log presence of Google client id (masked) so developer can verify server reads env
try {
  const gid = process.env.GOOGLE_CLIENT_ID;
  if (gid) {
    // print only a short hint to avoid leaking secret
    // eslint-disable-next-line no-console
    console.log(`[next-auth] (mirror) GOOGLE_CLIENT_ID present, hint=${gid.slice(0,6)}...`);
  } else {
    // eslint-disable-next-line no-console
    console.log('[next-auth] (mirror) GOOGLE_CLIENT_ID not set');
  }
} catch (e) {
  /* ignore logging errors */
}

export { handler as GET, handler as POST };
