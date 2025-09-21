// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });

        if (user && user.password === credentials.password) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    }
  }
});

export { handler as GET, handler as POST };
