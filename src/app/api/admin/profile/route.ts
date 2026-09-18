import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth';
import {
  getAdminEmail,
  setAdminEmail,
  isValidGmail,
  verifyAdminPassword,
  getAdminSecurityRecord,
} from '@/lib/adminSecurity';

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyAdminToken(token);
}

export async function GET() {
  try {
    const session = await checkAuth();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });
    }

    const email = await getAdminEmail();
    const record = await getAdminSecurityRecord();

    return NextResponse.json({
      success: true,
      data: {
        adminEmail: email,
        lastChangedAt: record.lastChangedAt || null,
      },
    });
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    return NextResponse.json({ success: false, message: 'Failed to retrieve profile.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await checkAuth();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });
    }

    const { newEmail, password } = await req.json();

    if (!newEmail || !password) {
      return NextResponse.json(
        { success: false, message: 'New Gmail address and current password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = newEmail.trim().toLowerCase();

    if (!isValidGmail(cleanEmail)) {
      return NextResponse.json(
        { success: false, message: 'The new email must be a valid @gmail.com address.' },
        { status: 400 }
      );
    }

    const isPasswordValid = await verifyAdminPassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Incorrect current password.' },
        { status: 401 }
      );
    }

    await setAdminEmail(cleanEmail);

    return NextResponse.json({
      success: true,
      message: `Admin login Gmail updated successfully to ${cleanEmail}. Future logins and OTPs will use this address.`,
    });
  } catch (error: unknown) {
    console.error('Error updating admin profile:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update admin email address.' },
      { status: 500 }
    );
  }
}

