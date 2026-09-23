import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth';
import {
  PAGE_DEFINITIONS,
  PageContentMap,
  DEFAULT_PAGE_CONTENTS,
  createDefaultCustomPage,
} from '@/lib/defaultPageContent';
import { getPageContent, invalidatePageContentCache } from '@/lib/getPageContent';
import { revalidatePath } from 'next/cache';

async function checkAdminAuth(req?: NextRequest) {
  try {
    let token = req?.cookies?.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) {
      try {
        const cookieStore = await cookies();
        token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
      } catch {
        // cookies() called outside request scope
      }
    }
    if (!token) return false;
    const payload = await verifyAdminToken(token);
    return Boolean(payload);
  } catch (err) {
    console.error('[API] Auth check error:', err);
    return false;
  }
}

// Timeout-safe database helper that will never block or crash requests on WAN latency
async function safeFindUnique(slug: string, timeoutMs = 2500) {
  try {
    const dbPromise = prisma.pageContent.findUnique({
      where: { slug },
    });
    const timeoutPromise = new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), timeoutMs)
    );
    return await Promise.race([dbPromise, timeoutPromise]);
  } catch (err) {
    console.warn(`[API] Safe query failed for slug "${slug}":`, err);
    return null;
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] | string }> }
) {
  let slug = '';
  try {
    if (!(await checkAdminAuth(req))) {
      return NextResponse.json(
        { success: false, message: 'Administrative authentication required' },
        { status: 401 }
      );
    }

    const resolved = await params;
    slug = Array.isArray(resolved.slug) ? resolved.slug.join('/') : (resolved.slug || '');

    // 1. Check if it's a built-in page defined in PAGE_DEFINITIONS or DEFAULT_PAGE_CONTENTS
    const pageDef = PAGE_DEFINITIONS.find((p) => p.slug === slug);
    const fallback = (DEFAULT_PAGE_CONTENTS as Record<string, unknown>)[slug];

    if (pageDef || fallback) {
      // getPageContent already has internal in-memory caching and a 1500ms timeout race
      const mergedContent = await getPageContent(slug as keyof PageContentMap);
      const finalContent = mergedContent || fallback;

      // Safe check for DB record customization status (never throws)
      const savedRecord = await safeFindUnique(slug);

      return NextResponse.json({
        success: true,
        data: {
          slug: pageDef?.slug || slug,
          title: pageDef?.title || (slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())),
          path: pageDef?.path || (slug.startsWith('/') ? slug : `/${slug}`),
          category: pageDef?.category || 'Core Pages',
          isCustomPage: false,
          content: finalContent,
          isCustomized: Boolean(savedRecord),
          updatedAt: savedRecord?.updatedAt || null,
        },
      });
    }

    // 2. Check if it's a dynamic custom sub-page stored in DB
    const savedRecord = await safeFindUnique(slug);
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

    // 3. If it's a services subpage that hasn't been saved yet, provide default template
    if (slug.startsWith('services/')) {
      const pageTitle = slug
        .replace(/^services\//, '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      const defaultContent = createDefaultCustomPage(pageTitle);

      return NextResponse.json({
        success: true,
        data: {
          slug,
          title: pageTitle,
          path: `/${slug}`,
          category: 'Services Sub-Page',
          isCustomPage: true,
          content: defaultContent,
          isCustomized: false,
          updatedAt: null,
        },
      });
    }

    return NextResponse.json(
      { success: false, message: `Page "${slug}" not found in database or defaults.` },
      { status: 404 }
    );
  } catch (error) {
    console.error(`Error fetching page content for admin (${slug}):`, error);

    // Resilient ultimate recovery: if this is a known page, return fallback instead of 500
    const emergencyFallback = (DEFAULT_PAGE_CONTENTS as Record<string, unknown>)[slug];
    const pageDef = PAGE_DEFINITIONS.find((p) => p.slug === slug);
    if (emergencyFallback) {
      return NextResponse.json({
        success: true,
        data: {
          slug: pageDef?.slug || slug,
          title: pageDef?.title || slug,
          path: pageDef?.path || `/${slug}`,
          category: pageDef?.category || 'Core Pages',
          isCustomPage: false,
          content: emergencyFallback,
          isCustomized: false,
          updatedAt: null,
        },
      });
    }

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
    if (!(await checkAdminAuth(req))) {
      return NextResponse.json(
        { success: false, message: 'Administrative authentication required' },
        { status: 401 }
      );
    }

    const resolved = await params;
    const slug = Array.isArray(resolved.slug) ? resolved.slug.join('/') : (resolved.slug || '');

    const body = await req.json();
    const { content, title, category } = body;

    if (!content || typeof content !== 'object') {
      return NextResponse.json(
        { success: false, message: 'Valid content object is required' },
        { status: 400 }
      );
    }

    const pageDef = PAGE_DEFINITIONS.find((p) => p.slug === slug);
    const existingRecord = await safeFindUnique(slug);

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

    // Invalidate local in-memory cache
    invalidatePageContentCache(slug);

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/');
      revalidatePath(pagePath);
      revalidatePath('/services');
      if (slug === 'about') revalidatePath('/about-us');
      if (slug === 'contact') revalidatePath('/contact-us');
      if (slug === 'global-business-network') revalidatePath('/global-business-network');
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
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] | string }> }
) {
  try {
    if (!(await checkAdminAuth(req))) {
      return NextResponse.json(
        { success: false, message: 'Administrative authentication required' },
        { status: 401 }
      );
    }

    const resolved = await params;
    const slug = Array.isArray(resolved.slug) ? resolved.slug.join('/') : (resolved.slug || '');

    const pageDef = PAGE_DEFINITIONS.find((p) => p.slug === slug);

    await prisma.pageContent.deleteMany({
      where: { slug },
    });

    // Invalidate local in-memory cache
    invalidatePageContentCache(slug);

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/services');
      if (pageDef) {
        revalidatePath(pageDef.path);
        if (slug === 'about') revalidatePath('/about-us');
        if (slug === 'contact') revalidatePath('/contact-us');
        if (slug === 'global-business-network') revalidatePath('/global-business-network');
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
