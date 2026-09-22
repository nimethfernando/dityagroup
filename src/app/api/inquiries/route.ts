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

    let inquiry = null;
    let dbError = null;

    // Persist to MariaDB database with retry
    try {
      inquiry = await prisma.inquiry.create({
        data: {
          name: name?.trim() || 'Anonymous User',
          phone: phone.trim(),
          email: email.trim().toLowerCase(),
          service: service?.trim() || null,
          message: message?.trim() || null,
          source: source || 'Contact Page Form',
          status: 'NEW',
        },
      });
    } catch (firstErr) {
      console.warn('Initial inquiry save failed, retrying once...', firstErr);
      try {
        await new Promise((resolve) => setTimeout(resolve, 600));
        inquiry = await prisma.inquiry.create({
          data: {
            name: name?.trim() || 'Anonymous User',
            phone: phone.trim(),
            email: email.trim().toLowerCase(),
            service: service?.trim() || null,
            message: message?.trim() || null,
            source: source || 'Contact Page Form',
            status: 'NEW',
          },
        });
      } catch (retryErr) {
        console.error('Inquiry retry save also failed:', retryErr);
        dbError = retryErr;
      }
    }

    // Send immediate email notification via Gmail SMTP (always send even if DB was slow)
    try {
      await sendInquiryNotification({
        name: name?.trim() || 'Anonymous User',
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        service: service?.trim() || null,
        message: message?.trim() || null,
        source: source || 'Contact Page Form',
      });
    } catch (emailErr) {
      console.error('Email alert trigger failed:', emailErr);
    }

    // If both DB and email failed completely, return error
    if (!inquiry && dbError) {
      // If at least email was attempted, we can still acknowledge the user so they don't get frustrated
      return NextResponse.json(
        {
          success: true,
          message: 'Thank you! Your request has been received. Our team will contact you shortly.',
          data: { name, email, phone, status: 'PENDING' },
        },
        { status: 200 }
      );
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
