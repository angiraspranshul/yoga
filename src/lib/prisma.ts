import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

const hasValidDbUrl = Boolean(
  process.env.DATABASE_URL &&
  !process.env.DATABASE_URL.includes('[YOUR-') &&
  (process.env.DATABASE_URL.startsWith('postgresql://') || process.env.DATABASE_URL.startsWith('postgres://'))
);

export const prisma = globalThis.prismaGlobal ?? (hasValidDbUrl ? new PrismaClient() : null);

if (process.env.NODE_ENV !== 'production' && prisma) {
  globalThis.prismaGlobal = prisma;
}

export const isOnlineDbConnected = Boolean(hasValidDbUrl && prisma);
