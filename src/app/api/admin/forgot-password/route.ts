import { NextRequest, NextResponse } from 'next/server';
import { generateOtp, setAdminResetOtp, isValidGmail, getAdminEmail } from '@/lib/adminSecurity';
import { sendAdminResetOtpEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!isValidGmail(cleanEmail)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid administrator Gmail address (@gmail.com).' },
        { status: 400 }
      );
    }

    const configuredAdminEmail = await getAdminEmail();
    if (cleanEmail !== configuredAdminEmail.toLowerCase()) {
      return NextResponse.json(
        { success: false, message: 'This Gmail address is not authorized for administrator access.' },
        { status: 403 }
      );
    }

    const otp = generateOtp();
    await setAdminResetOtp(otp, 10);

    // Dispatch email asynchronously so the client doesn't stall waiting on SMTP connection
    sendAdminResetOtpEmail(cleanEmail, otp).catch((err) => {
      console.error('Asynchronous OTP email dispatch error:', err);
    });

    return NextResponse.json({
      success: true,
      message: `A 6-digit verification code has been dispatched to ${cleanEmail}. Enter the code below to proceed.`,
    });
  } catch (error: unknown) {
    console.error('Admin forgot password error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate verification code. Please try again.' },
      { status: 500 }
    );
  }
}
