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

    // Send the OTP via Nodemailer to the Gmail address
    await sendAdminResetOtpEmail(cleanEmail, otp);

    return NextResponse.json({
      success: true,
      message: `A 6-digit verification code has been dispatched to ${cleanEmail}. Check your inbox or spam.`,
    });
  } catch (error: unknown) {
    console.error('Admin forgot password error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to dispatch verification code to Gmail.' },
      { status: 500 }
    );
  }
}
