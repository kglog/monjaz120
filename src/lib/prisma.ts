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
