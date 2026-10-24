import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword, isValidGmail, isAuthorizedAdminEmail } from '@/lib/adminSecurity';
import { createAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

// In-memory rate limiting to protect against brute-force attacks
const loginAttempts = new Map<string, { count: number; lockedUntil: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

function getClientIdentifier(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers.get('x-real-ip') || 'unknown-client';
}

export async function POST(req: NextRequest) {
  try {
    const clientId = getClientIdentifier(req);
    const now = Date.now();
    const attemptRecord = loginAttempts.get(clientId);

    if (attemptRecord && attemptRecord.lockedUntil > now) {
      const remainingMinutes = Math.ceil((attemptRecord.lockedUntil - now) / 60000);
      return NextResponse.json(
        {
          success: false,
          message: `Too many failed attempts. For security, portal access is temporarily suspended for ${remainingMinutes} minute(s).`,
        },
        { status: 429 }
      );
    }

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Administrator credentials are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Enforce Gmail address requirement
    if (!isValidGmail(cleanEmail)) {
      return NextResponse.json(
        { success: false, message: 'Administrator access requires a valid @gmail.com address.' },
        { status: 400 }
      );
    }

    // Verify authorized administrator email
    const isAuthorized = await isAuthorizedAdminEmail(cleanEmail);
    if (!isAuthorized) {
      // Record failed attempt
      const count = (attemptRecord?.count || 0) + 1;
      const lockedUntil = count >= MAX_ATTEMPTS ? now + LOCKOUT_MS : 0;
      loginAttempts.set(clientId, { count, lockedUntil });

      return NextResponse.json(
        { success: false, message: 'Invalid administrative credentials.' },
        { status: 401 }
      );
    }

    // Verify administrator password
    const isValid = await verifyAdminPassword(password);
    if (!isValid) {
      // Record failed attempt
      const count = (attemptRecord?.count || 0) + 1;
      const lockedUntil = count >= MAX_ATTEMPTS ? now + LOCKOUT_MS : 0;
      loginAttempts.set(clientId, { count, lockedUntil });

      return NextResponse.json(
        { success: false, message: 'Invalid administrative credentials.' },
        { status: 401 }
      );
    }

    // Reset attempt counter on successful login
    loginAttempts.delete(clientId);

    await createAdminSession(cleanEmail);

    return NextResponse.json({
      success: true,
      message: 'Authentication successful. Redirecting to executive dashboard...',
    });
  } catch (error: unknown) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during authentication.' },
      { status: 500 }
    );
  }
}
