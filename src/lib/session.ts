// Edge-safe session helpers (no Node-only imports): used by middleware and server code.
import { SignJWT, jwtVerify } from 'jose';

export const COOKIE_NAME = 'dhaarna_admin_session';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

const MIN_SECRET_LENGTH = 32;

export interface AdminSession {
  email: string;
  name: string;
  role: 'admin';
}

/**
 * Returns the signing key, or null when JWT_SECRET is missing or too short.
 * There is deliberately no fallback secret: without a proper secret,
 * no session can be issued or accepted (fail closed).
 */
function getSecretKey(): Uint8Array | null {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < MIN_SECRET_LENGTH) {
    console.error(
      `JWT_SECRET is missing or shorter than ${MIN_SECRET_LENGTH} characters; admin sessions are disabled.`
    );
    return null;
  }
  return new TextEncoder().encode(secret);
}

export function isSessionSecretConfigured(): boolean {
  const secret = process.env.JWT_SECRET;
  return Boolean(secret && secret.length >= MIN_SECRET_LENGTH);
}

export async function signAdminToken(payload: AdminSession): Promise<string> {
  const key = getSecretKey();
  if (!key) throw new Error('JWT_SECRET is not configured');
  return new SignJWT({ email: payload.email, name: payload.name, role: payload.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.email)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(key);
}

export async function verifyAdminToken(token: string): Promise<AdminSession | null> {
  const key = getSecretKey();
  if (!key) return null;
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] });
    if (payload.role !== 'admin' || typeof payload.email !== 'string') return null;
    return {
      email: payload.email,
      name: typeof payload.name === 'string' ? payload.name : '',
      role: 'admin',
    };
  } catch {
    return null;
  }
}
