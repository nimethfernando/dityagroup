import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth';
import { PAGE_DEFINITIONS, PageContentMap } from '@/lib/defaultPageContent';
import { getPageContent, invalidatePageContentCache } from '@/lib/getPageContent';
import { revalidatePath } from 'next/cache';

async function checkAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;
  const payload = await verifyAdminToken(token);
  return Boolean(payload);
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    if (!(await checkAdminAuth())) {
      return NextResponse.json(
        { success: false, message: 'Administrative authentication required' },
        { status: 401 }
      );
    }

    const { slug } = await params;
    const pageDef = PAGE_DEFINITIONS.find((p) => p.slug === slug);

    if (!pageDef) {
      return NextResponse.json(
        { success: false, message: `Page "${slug}" not found` },
        { status: 404 }
      );
    }

    const mergedContent = await getPageContent(slug as keyof PageContentMap);
    const savedRecord = await prisma.pageContent.findUnique({
      where: { slug },
    });

    return NextResponse.json({
      success: true,
      data: {
        slug: pageDef.slug,
        title: pageDef.title,
        path: pageDef.path,
        content: mergedContent,
        isCustomized: Boolean(savedRecord),
        updatedAt: savedRecord?.updatedAt || null,
      },
    });
  } catch (error) {
    console.error('Error fetching page content for admin:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch page content' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    if (!(await checkAdminAuth())) {
      return NextResponse.json(
        { success: false, message: 'Administrative authentication required' },
        { status: 401 }
      );
    }

    const { slug } = await params;
    const pageDef = PAGE_DEFINITIONS.find((p) => p.slug === slug);

    if (!pageDef) {
      return NextResponse.json(
        { success: false, message: `Page "${slug}" not found` },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { content } = body;

    if (!content || typeof content !== 'object') {
      return NextResponse.json(
        { success: false, message: 'Valid content object is required' },
        { status: 400 }
      );
    }

    const jsonString = JSON.stringify(content);

    const saved = await prisma.pageContent.upsert({
      where: { slug },
      update: {
        data: jsonString,
        title: pageDef.title,
      },
      create: {
        slug,
        title: pageDef.title,
        data: jsonString,
      },
    });

    invalidatePageContentCache(slug);

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/');
      if (pageDef.path) revalidatePath(pageDef.path);
    } catch (revalErr) {
      console.warn('Revalidation warning:', revalErr);
    }

    return NextResponse.json({
      success: true,
      message: `Content for ${pageDef.title} has been successfully updated in the database.`,
      data: {
        slug: saved.slug,
        updatedAt: saved.updatedAt,
      },
    });
  } catch (error) {
    console.error('Error saving page content:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save page content' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    if (!(await checkAdminAuth())) {
      return NextResponse.json(
        { success: false, message: 'Administrative authentication required' },
        { status: 401 }
      );
    }

    const { slug } = await params;
    const pageDef = PAGE_DEFINITIONS.find((p) => p.slug === slug);

    if (!pageDef) {
      return NextResponse.json(
        { success: false, message: `Page "${slug}" not found` },
        { status: 404 }
      );
    }

    await prisma.pageContent.deleteMany({
      where: { slug },
    });

    invalidatePageContentCache(slug);

    try {
      revalidatePath('/', 'layout');
      revalidatePath(pageDef.path);
    } catch (revalErr) {
      console.warn('Revalidation warning:', revalErr);
    }

    return NextResponse.json({
      success: true,
      message: `Content for ${pageDef.title} has been reset to defaults.`,
    });
  } catch (error) {
    console.error('Error resetting page content:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to reset page content' },
      { status: 500 }
    );
  }
}

