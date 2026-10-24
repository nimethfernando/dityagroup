import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword, isValidGmail, isAuthorizedAdminEmail } from '@/lib/adminSecurity';
import { createAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Enforce Gmail address requirement
    if (!isValidGmail(cleanEmail)) {
      return NextResponse.json(
        { success: false, message: 'Administrator login requires a valid Gmail address (@gmail.com).' },
        { status: 400 }
      );
    }

    // Verify authorized administrator email (groupditya@gmail.com or dityagroup@gmail.com)
    const isAuthorized = await isAuthorizedAdminEmail(cleanEmail);
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized administrator email address. Allowed: groupditya@gmail.com or dityagroup@gmail.com.' },
        { status: 401 }
      );
    }

    // Verify administrator password
    const isValid = await verifyAdminPassword(password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid administrative password. Default master password is ditya@2026.' },
        { status: 401 }
      );
    }

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
