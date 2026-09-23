import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const start = Date.now();
  try {
    const record = await prisma.pageContent.findUnique({
      where: { slug: 'home' },
      select: { slug: true, title: true, updatedAt: true },
    });
    const timeMs = Date.now() - start;
    return NextResponse.json({
      success: true,
      timeMs,
      record,
    });
  } catch (error: any) {
    const timeMs = Date.now() - start;
    return NextResponse.json({
      success: false,
      timeMs,
      errorName: error?.name,
      errorCode: error?.code,
      errorMessage: error?.message,
      errorStack: error?.stack,
    });
  }
}
