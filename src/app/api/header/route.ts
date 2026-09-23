import { NextResponse } from 'next/server';
import { getPageContent } from '@/lib/getPageContent';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function GET() {
  try {
    const headerContent = await getPageContent('header');
    return NextResponse.json({
      success: true,
      data: headerContent,
    });
  } catch (error) {
    console.error('Error fetching header content:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch header content' },
      { status: 500 }
    );
  }
}

