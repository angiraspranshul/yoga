import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signAdminToken, COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from '@/lib/auth';
import { isSessionSecretConfigured } from '@/lib/session';
import { clientIp, enforceRateLimits } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

// Compared against when the email is unknown, so response time does not
// reveal whether an admin account exists for that email.
let dummyHash: string | null = null;
function getDummyHash(): string {
  if (!dummyHash) dummyHash = bcrypt.hashSync('dummy-password-for-timing', 12);
  return dummyHash;
}

export async function POST(request: Request) {
  try {
    if (!isSessionSecretConfigured() || !prisma) {
      console.error('Login unavailable: JWT_SECRET or DATABASE_URL is not configured.');
      return NextResponse.json({ error: 'Login is temporarily unavailable' }, { status: 503 });
    }

    const body = await request.json().catch(() => null);
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!email || !password || email.length > 254 || password.length > 200) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Brute-force protection: per IP+email, and per IP across all emails.
    const ip = clientIp(request);
    const limited = await enforceRateLimits([
      { name: 'login-ip-email', subject: `${ip}|${email}`, limit: 5, windowSeconds: 15 * 60 },
      { name: 'login-ip', subject: ip, limit: 20, windowSeconds: 15 * 60 },
    ]);
    if (limited) return limited;

    const admin = await prisma.admin.findUnique({ where: { email } });
    const passwordOk = await bcrypt.compare(password, admin?.passwordHash ?? getDummyHash());

    if (!admin || !passwordOk) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = await signAdminToken({ email: admin.email, name: admin.name, role: 'admin' });

    const response = NextResponse.json({
      success: true,
      user: { email: admin.email, name: admin.name },
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MAX_AGE_SECONDS,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
