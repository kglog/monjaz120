// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });

        if (user && user.password === credentials.password) {
          return user;
        } else {
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) token.id = user.id ?? token.sub ?? token.id;
      return token;
    },
    async session({ session, token }: any) {
      session.user = session.user || {};
      session.user.id = token.sub ?? token.id ?? null;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

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
