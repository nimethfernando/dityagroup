import { NextRequest, NextResponse } from 'next/server';
import { generateOtp, setAdminResetOtp, ADMIN_PRIMARY_EMAIL } from '@/lib/adminSecurity';
import { sendAdminResetOtpEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required.' }, { status: 400 });
    }

    const otp = generateOtp();
    await setAdminResetOtp(otp, 10);

    // Send the OTP via Nodemailer
    const targetEmail = email.trim().toLowerCase();
    await sendAdminResetOtpEmail(targetEmail, otp);

    return NextResponse.json({
      success: true,
      message: `A 6-digit verification code has been dispatched to ${targetEmail}.`,
    });
  } catch (error: unknown) {
    console.error('Admin forgot password error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to dispatch verification code.' },
      { status: 500 }
    );
  }
}
