import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connectToDB();
        const user = await User.findOne({ email: credentials.email });

        if (user && user.password === credentials.password) {
          return user;
        } else {
          return null;
        }
      },
    }),

    // Google OAuth provider with select_account prompt
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        try {
          token.id = user.id ?? token.sub ?? token.id;
        } catch (e) {}
      }
      return token;
    },
    async session({ session, token }: any) {
      try {
        session.user = session.user || {};
        session.user.id = token.sub ?? token.id ?? null;
      } catch (e) {}
      return session;
    },
  },
} as any;

// Safe debug: log presence of Google client id (masked) so developer can verify server reads env
try {
  const gid = process.env.GOOGLE_CLIENT_ID;
  const msid = process.env.MICROSOFT_CLIENT_ID;
  if (gid) {
    // print only a short hint to avoid leaking secret
     
    console.log(`[next-auth] GOOGLE_CLIENT_ID present, hint=${gid.slice(0, 6)}...`);
  } else {
     
    console.log("[next-auth] GOOGLE_CLIENT_ID not set");
  }
  if (msid) {
     
    console.log(`[next-auth] MICROSOFT_CLIENT_ID present, hint=${msid.slice(0,6)}...`);
  } else {
     
    console.log("[next-auth] MICROSOFT_CLIENT_ID not set");
  }
} catch (e) {
  /* ignore logging errors */
}

// Conditionally add Microsoft provider at runtime if env vars and provider module are available.
try {
  const msid = process.env.MICROSOFT_CLIENT_ID;
  if (msid) {
    // Use eval('require') to avoid static bundler resolution failures when the module is not installed.
     
    const req: any = eval("typeof require === 'function' ? require : undefined");
    if (req) {
      try {
        const MicrosoftProvider = req('next-auth/providers/microsoft');
        if (MicrosoftProvider) {
          // @ts-ignore - dynamic provider shape
          authOptions.providers.push(
            MicrosoftProvider({
              clientId: process.env.MICROSOFT_CLIENT_ID || '',
              clientSecret: process.env.MICROSOFT_CLIENT_SECRET || '',
              authorization: { params: { prompt: 'select_account', response_type: 'code' } },
            })
          );
           
          console.log('[next-auth] Microsoft provider loaded');
        }
      } catch (e) {
        // If the explicit Microsoft provider isn't available, try using the built-in Azure AD provider
        try {
          const AzureAD = req('next-auth/providers/azure-ad');
          if (AzureAD) {
            // Create an Azure AD provider configured for the common tenant (works with Microsoft accounts)
            // @ts-ignore
            const provider = AzureAD({
              clientId: process.env.MICROSOFT_CLIENT_ID || '',
              clientSecret: process.env.MICROSOFT_CLIENT_SECRET || '',
              tenantId: 'common',
            });
            // Override id to allow signIn('microsoft') calls to work unchanged in the UI
            try {
              // @ts-ignore
              provider.id = 'microsoft';
              // @ts-ignore
              provider.name = 'Microsoft';
            } catch (_) {}
            // @ts-ignore
            authOptions.providers.push(provider);
             
            console.log('[next-auth] AzureAD provider loaded as microsoft');
          }
        } catch (e2) {
           
          console.log('[next-auth] Microsoft provider module not installed or failed to load — skipping Microsoft provider');
        }
      }
    }
  }
} catch (e) {
  /* ignore */
}

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };

// ASSISTANT_FINAL: true
