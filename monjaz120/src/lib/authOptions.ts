import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
<<<<<<< Updated upstream:monjaz120/src/lib/authOptions.ts
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
=======
// import { supabase } from '@/utils/supabaseClient';
>>>>>>> Stashed changes:src/app/api/auth/[...nextauth]/route.ts

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
<<<<<<< Updated upstream:monjaz120/src/lib/authOptions.ts
        if (!credentials || !credentials.email || !credentials.password) return null;
        await connectDB();
        const user = await User.findOne({ email: credentials.email });

        if (user && user.password === credentials.password) {
          return user;
        } else {
          return null;
        }
      }
    }),
=======
        // Supabase client removed for build compatibility
        // Replace with Prisma or other logic as needed
        return null;
      }
    })
    ,
>>>>>>> Stashed changes:src/app/api/auth/[...nextauth]/route.ts
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
<<<<<<< Updated upstream:monjaz120/src/lib/authOptions.ts
=======
    // Microsoft provider removed: add back if your next-auth build includes it or upgrade next-auth
>>>>>>> Stashed changes:src/app/api/auth/[...nextauth]/route.ts
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (user) token.id = user.id ?? token.sub ?? token.id;
      return token;
    },
    async session({ session, token }: any) {
      session.user = session.user || {};
      session.user.id = token.sub ?? token.id ?? null;
      return session;
    }
  }
<<<<<<< Updated upstream:monjaz120/src/lib/authOptions.ts
};
=======
});

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
>>>>>>> Stashed changes:src/app/api/auth/[...nextauth]/route.ts
