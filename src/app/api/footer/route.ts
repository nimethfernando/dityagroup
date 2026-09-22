import { NextResponse } from 'next/server';
import { getPageContent } from '@/lib/getPageContent';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function GET() {
  try {
    const footerContent = await getPageContent('footer');
    return NextResponse.json({
      success: true,
      data: footerContent,
    });
  } catch (error) {
    console.error('Error fetching footer content:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch footer content' },
      { status: 500 }
    );
  }
}

