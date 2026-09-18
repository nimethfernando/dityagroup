import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const inquiries = await prisma.inquiry.findMany({
      where: status && status !== 'ALL' ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: inquiries });
  } catch (error: unknown) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch inquiries.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'ID and status required.' }, { status: 400 });
    }

    const updated = await prisma.inquiry.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: unknown) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json({ success: false, message: 'Failed to update inquiry.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, message: 'Inquiry ID required.' }, { status: 400 });
    }

    await prisma.inquiry.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Inquiry deleted successfully.' });
  } catch (error: unknown) {
    console.error('Error deleting inquiry:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete inquiry.' }, { status: 500 });
  }
}
