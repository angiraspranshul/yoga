import { createHash } from 'crypto';
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from './prisma';

// Raw SQL must name the schema explicitly: through Supabase's transaction
// pooler the connection's search_path is not reliable. Prisma models use the
// `schema` URL parameter (default "public"), so mirror that here.
function rateLimitTable(): Prisma.Sql {
  let schema = 'public';
  try {
    schema = new URL(process.env.DATABASE_URL || '').searchParams.get('schema') || 'public';
  } catch {}
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(schema)) schema = 'public';
  return Prisma.raw(`"${schema}"."RateLimit"`);
}

// Fixed-window rate limiting stored in Postgres (RateLimit table), so limits
// hold across Vercel's serverless instances without an extra service.

export interface RateLimitRule {
  /** Namespace, e.g. "login-ip". */
  name: string;
  /** Who is being limited: an IP, an email, or "global". Hashed before storage. */
  subject: string;
  limit: number;
  windowSeconds: number;
}

export function clientIp(request: Request): string {
  // Vercel sets x-forwarded-for itself; the first entry is the real client.
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

function storageKey(rule: RateLimitRule): string {
  // Hash so raw IPs and emails are never stored.
  const digest = createHash('sha256').update(rule.subject.toLowerCase()).digest('hex').slice(0, 32);
  return `${rule.name}:${digest}`;
}

/** Counts one request against the rule. Returns seconds to wait if the limit is exceeded. */
async function hit(rule: RateLimitRule): Promise<{ limited: boolean; retryAfter: number }> {
  if (!prisma) return { limited: false, retryAfter: 0 };
  const rows = await prisma.$queryRaw<{ count: number; windowStart: Date }[]>`
    INSERT INTO ${rateLimitTable()} AS rl ("key", "count", "windowStart")
    VALUES (${storageKey(rule)}, 1, now())
    ON CONFLICT ("key") DO UPDATE SET
      "count" = CASE WHEN rl."windowStart" <= now() - make_interval(secs => ${rule.windowSeconds})
                     THEN 1 ELSE rl."count" + 1 END,
      "windowStart" = CASE WHEN rl."windowStart" <= now() - make_interval(secs => ${rule.windowSeconds})
                           THEN now() ELSE rl."windowStart" END
    RETURNING "count", "windowStart"`;
  const { count, windowStart } = rows[0];
  const retryAfter = Math.max(1, Math.ceil((windowStart.getTime() + rule.windowSeconds * 1000 - Date.now()) / 1000));
  return { limited: count > rule.limit, retryAfter };
}

/**
 * Checks all rules. Returns a 429 response if any is exceeded, otherwise null.
 * Fails open (allows the request) if the counter store is unavailable.
 */
export async function enforceRateLimits(rules: RateLimitRule[]): Promise<NextResponse | null> {
  try {
    if (Math.random() < 0.02 && prisma) {
      // Occasional cleanup of stale counters.
      await prisma.$executeRaw`DELETE FROM ${rateLimitTable()} WHERE "windowStart" < now() - interval '2 days'`;
    }
    let retryAfter = 0;
    for (const rule of rules) {
      const result = await hit(rule);
      if (result.limited) retryAfter = Math.max(retryAfter, result.retryAfter);
    }
    if (retryAfter > 0) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a little and try again.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }
  } catch (error) {
    console.error('Rate limiter unavailable, allowing request:', error);
  }
  return null;
}
