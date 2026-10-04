import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

const isKnownDeadUrl = (url?: string) => {
  if (!url) return true;
  if (url.includes('[YOUR-') || url.includes('[YOUR_') || url.includes('vytvxjzgrbhokmwtovwl')) return true;
  return false;
};

const rawDbUrl = process.env.DATABASE_URL;
const hasValidDbUrl = Boolean(
  rawDbUrl &&
  !isKnownDeadUrl(rawDbUrl) &&
  (rawDbUrl.startsWith('postgresql://') || rawDbUrl.startsWith('postgres://'))
);

export const prisma = globalThis.prismaGlobal ?? (hasValidDbUrl ? new PrismaClient() : null);

if (process.env.NODE_ENV !== 'production' && prisma) {
  globalThis.prismaGlobal = prisma;
}

export const isOnlineDbConnected = Boolean(hasValidDbUrl && prisma);
