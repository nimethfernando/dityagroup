import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth';
import { PAGE_DEFINITIONS, PageContentMap, createDefaultCustomPage } from '@/lib/defaultPageContent';
import { getPageContent } from '@/lib/getPageContent';
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
  { params }: { params: Promise<{ slug: string[] | string }> }
) {
  try {
    if (!(await checkAdminAuth())) {
      return NextResponse.json(
        { success: false, message: 'Administrative authentication required' },
        { status: 401 }
      );
    }

    const resolved = await params;
    const slug = Array.isArray(resolved.slug) ? resolved.slug.join('/') : resolved.slug;

    // 1. Check if it's a built-in page
    const pageDef = PAGE_DEFINITIONS.find((p) => p.slug === slug);
    const savedRecord = await prisma.pageContent.findUnique({
      where: { slug },
    });

    if (pageDef) {
      const mergedContent = await getPageContent(slug as keyof PageContentMap);
      return NextResponse.json({
        success: true,
        data: {
          slug: pageDef.slug,
          title: pageDef.title,
          path: pageDef.path,
          category: pageDef.category,
          isCustomPage: false,
          content: mergedContent,
          isCustomized: Boolean(savedRecord),
          updatedAt: savedRecord?.updatedAt || null,
        },
      });
    }

    // 2. Check if it's a custom dynamic sub-page in DB
    if (savedRecord) {
      let parsed = {};
      try {
        parsed = JSON.parse(savedRecord.data);
      } catch {
        parsed = createDefaultCustomPage(savedRecord.title);
      }

      return NextResponse.json({
        success: true,
        data: {
          slug: savedRecord.slug,
          title: savedRecord.title,
          path: savedRecord.slug.startsWith('/') ? savedRecord.slug : `/${savedRecord.slug}`,
          category: (parsed as { category?: string }).category || 'Services Sub-Page',
          isCustomPage: true,
          content: parsed,
          isCustomized: true,
          updatedAt: savedRecord.updatedAt,
        },
      });
    }

    return NextResponse.json(
      { success: false, message: `Page "${slug}" not found in database.` },
      { status: 404 }
    );
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
  { params }: { params: Promise<{ slug: string[] | string }> }
) {
  try {
    if (!(await checkAdminAuth())) {
      return NextResponse.json(
        { success: false, message: 'Administrative authentication required' },
        { status: 401 }
      );
    }

    const resolved = await params;
    const slug = Array.isArray(resolved.slug) ? resolved.slug.join('/') : resolved.slug;

    const body = await req.json();
    const { content, title, category } = body;

    if (!content || typeof content !== 'object') {
      return NextResponse.json(
        { success: false, message: 'Valid content object is required' },
        { status: 400 }
      );
    }

    const pageDef = PAGE_DEFINITIONS.find((p) => p.slug === slug);
    const existingRecord = await prisma.pageContent.findUnique({ where: { slug } });

    const pageTitle = title || pageDef?.title || existingRecord?.title || slug;
    const pagePath = pageDef?.path || (slug.startsWith('/') ? slug : `/${slug}`);

    // Persist category inside content if customized
    if (category) {
      content.category = category;
    }

    const jsonString = JSON.stringify(content);

    const saved = await prisma.pageContent.upsert({
      where: { slug },
      update: {
        data: jsonString,
        title: pageTitle,
      },
      create: {
        slug,
        title: pageTitle,
        data: jsonString,
      },
    });

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/');
      revalidatePath(pagePath);
      revalidatePath('/services');
    } catch (revalErr) {
      console.warn('Revalidation warning:', revalErr);
    }

    return NextResponse.json({
      success: true,
      message: `Content for ${pageTitle} has been successfully updated.`,
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
  { params }: { params: Promise<{ slug: string[] | string }> }
) {
  try {
    if (!(await checkAdminAuth())) {
      return NextResponse.json(
        { success: false, message: 'Administrative authentication required' },
        { status: 401 }
      );
    }

    const resolved = await params;
    const slug = Array.isArray(resolved.slug) ? resolved.slug.join('/') : resolved.slug;

    const pageDef = PAGE_DEFINITIONS.find((p) => p.slug === slug);

    await prisma.pageContent.deleteMany({
      where: { slug },
    });

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/services');
      if (pageDef) {
        revalidatePath(pageDef.path);
      } else {
        revalidatePath(`/${slug}`);
      }
    } catch {
      // ignore
    }

    if (pageDef) {
      return NextResponse.json({
        success: true,
        message: `Content for ${pageDef.title} has been reset to defaults.`,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Custom page "${slug}" has been permanently deleted.`,
    });
  } catch (error) {
    console.error('Error deleting page content:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete page content' },
      { status: 500 }
    );
  }
}

