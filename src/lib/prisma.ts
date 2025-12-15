import { PrismaClient } from "@prisma/client";

declare global {
  // نحتاج هذا عشان ما يعطي خطأ بالـ types
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
<<<<<<< HEAD
=======

// Provide a default export for compatibility with code that imports default
export default prisma;

// ASSISTANT_FINAL: true
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
