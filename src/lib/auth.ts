import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { signAdminToken, verifyAdminToken, COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from './session';
import type { AdminSession } from './session';

export { signAdminToken, verifyAdminToken, COOKIE_NAME, SESSION_MAX_AGE_SECONDS };
export type { AdminSession };

/** Reads and cryptographically verifies the admin session cookie. */
export async function getAdminSession(): Promise<AdminSession | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

/**
 * Server-component guard for admin pages. Redirects to the login page
 * unless the request carries a valid, signed admin session.
 */
export async function requireAdminPage(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');
  return session;
}

export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

export function comparePassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
