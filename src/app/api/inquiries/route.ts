import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendInquiryNotification } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, service, message, source } = body;

    if (!phone || !email) {
      return NextResponse.json(
        { success: false, message: 'Phone number and Email address are required.' },
        { status: 400 }
      );
    }

    // Persist to MariaDB database
    const inquiry = await prisma.inquiry.create({
      data: {
        name: name?.trim() || 'Anonymous User',
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        service: service?.trim() || null,
        message: message?.trim() || null,
        source: source || 'Consultation Popup',
        status: 'NEW',
      },
    });

    // Send immediate email notification via Gmail SMTP
    try {
      await sendInquiryNotification({
        name: inquiry.name,
        phone: inquiry.phone,
        email: inquiry.email,
        service: inquiry.service,
        message: inquiry.message,
        source: inquiry.source,
      });
    } catch (emailErr) {
      console.error('Email alert trigger failed (db record saved):', emailErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your request has been received. Our team will contact you shortly.',
        data: inquiry,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Error saving inquiry:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process inquiry. Please try again later.' },
      { status: 500 }
    );
  }
}
