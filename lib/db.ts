import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL environment variable");
}
const connectionString = process.env.DATABASE_URL;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma: PrismaClient =
  globalForPrisma.prisma ||
  (() => {
    const adapter = new PrismaPg({ connectionString });
    return new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  })();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
