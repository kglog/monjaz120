// monjaz120/src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        // ✅ fix: credentials ممكن تكون undefined
        const email = credentials?.email;
        const password = credentials?.password;
        if (!email || !password) return null;

        const user = await User.findOne({ email });

        if (user && user.password === password) {
          // ✅ رجّع Object بسيط (مهم لـ NextAuth)
          return {
            id: user._id?.toString?.() ?? user.id?.toString?.() ?? "",
            name: user.name ?? "",
            email: user.email ?? email,
            role: user.role ?? "user",
          } as any;
        }

        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
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
      session.user = session.user || ({} as any);
      (session.user as any).id = token.sub ?? token.id ?? null;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
