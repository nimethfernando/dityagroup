import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminResetOtp, updateAdminPassword, clearAdminResetOtp } from '@/lib/adminSecurity';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { otp, newPassword } = await req.json();

    if (!otp || !newPassword) {
      return NextResponse.json(
        { success: false, message: 'OTP and new password are required.' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters.' },
        { status: 400 }
      );
    }

    const verification = await verifyAdminResetOtp(otp);
    if (!verification.valid) {
      return NextResponse.json(
        { success: false, message: verification.error || 'Invalid or expired OTP.' },
        { status: 400 }
      );
    }

    await updateAdminPassword(newPassword);
    await clearAdminResetOtp();

    return NextResponse.json({
      success: true,
      message: 'Password has been securely updated. You may now log in.',
    });
  } catch (error: unknown) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to reset password.' },
      { status: 500 }
    );
  }
}
