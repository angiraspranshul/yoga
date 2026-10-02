import { NextResponse } from 'next/server';
import { signAdminToken, COOKIE_NAME } from '@/lib/auth';

const ADMIN_EMAIL = process.env.ADMIN_DEFAULT_EMAIL || 'dhaarna@yogawithdhaarna.com';
const ADMIN_PASSWORD = process.env.ADMIN_DEFAULT_PASSWORD || 'admin_password_123';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Check credentials (supports default credentials and .env configuration)
    const normalizedInputEmail = email.trim().toLowerCase();
    const normalizedAdminEmail = ADMIN_EMAIL.trim().toLowerCase();

    if (normalizedInputEmail !== normalizedAdminEmail || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = signAdminToken({
      email: normalizedAdminEmail,
      name: 'Dhaarna Sharma',
      role: 'admin',
    });

    const response = NextResponse.json({
      success: true,
      user: {
        email: normalizedAdminEmail,
        name: 'Dhaarna Sharma',
      },
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
