import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth';
import {
  verifyAdminPassword,
  updateAdminPassword,
  verifyAdminResetOtp,
  clearAdminResetOtp,
} from '@/lib/adminSecurity';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = await verifyAdminToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword, otp } = await req.json();

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: 'New password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    // Path 1: Verify via OTP sent to Gmail
    if (otp) {
      const verification = await verifyAdminResetOtp(otp);
      if (!verification.valid) {
        return NextResponse.json(
          { success: false, message: verification.error || 'Invalid or expired OTP code.' },
          { status: 400 }
        );
      }
      await updateAdminPassword(newPassword);
      await clearAdminResetOtp();
      return NextResponse.json({
        success: true,
        message: 'Administrator password verified via Gmail OTP and updated successfully.',
      });
    }

    // Path 2: Verify via Current Password
    if (!currentPassword) {
      return NextResponse.json(
        { success: false, message: 'Current password or Gmail OTP code is required.' },
        { status: 400 }
      );
    }

    const isCurrentValid = await verifyAdminPassword(currentPassword);
    if (!isCurrentValid) {
      return NextResponse.json(
        { success: false, message: 'Current password is incorrect.' },
        { status: 400 }
      );
    }

    await updateAdminPassword(newPassword);

    return NextResponse.json({
      success: true,
      message: 'Administrator password updated successfully.',
    });
  } catch (error) {
    console.error('Error changing admin password:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update password.' },
      { status: 500 }
    );
  }
}
