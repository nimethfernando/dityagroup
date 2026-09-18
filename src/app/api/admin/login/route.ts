import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword } from '@/lib/adminSecurity';
import { createAdminSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const isValid = await verifyAdminPassword(password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid administrative credentials.' },
        { status: 401 }
      );
    }

    await createAdminSession(email.trim().toLowerCase());

    return NextResponse.json({
      success: true,
      message: 'Authentication successful. Redirecting to dashboard...',
    });
  } catch (error: unknown) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during authentication.' },
      { status: 500 }
    );
  }
}
