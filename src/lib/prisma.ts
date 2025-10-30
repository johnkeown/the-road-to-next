// import { PrismaClient } from "@/generated/prisma/client";
import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global as typeof globalThis & { prisma: PrismaClient };

// export const prisma = globalForPrisma.prisma || new PrismaClient();
export const prisma = new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
