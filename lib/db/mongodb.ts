import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prisma: PrismaClient;

if (process.env.NEXT_PHASE === 'phase-production-build') {
  // During build, create a mock to avoid instantiation
  prisma = new Proxy({} as any, {
    get: (target, prop) => {
      if (prop === 'then') return undefined;
      return () => Promise.resolve({});
    }
  }) as PrismaClient;
} else {
  prisma = globalForPrisma.prisma ?? new PrismaClient();
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
}

export { prisma };
