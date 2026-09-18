import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth';
import { PAGE_DEFINITIONS, createDefaultCustomPage } from '@/lib/defaultPageContent';
import { revalidatePath } from 'next/cache';

async function checkAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;
  return Boolean(await verifyAdminToken(token));
}

export async function GET() {
  try {
    if (!(await checkAdminAuth())) {
      return NextResponse.json(
        { success: false, message: 'Administrative authentication required' },
        { status: 401 }
      );
    }

    const savedRecords = await prisma.pageContent.findMany();
    const savedRecords = await prisma.pageContent.findMany({
      select: {
        slug: true,
        title: true,
        updatedAt: true,
        data: true,
      },
    });
    const savedMap = new Map(savedRecords.map((r) => [r.slug, r]));

    // Built-in pages
    const builtInPages = PAGE_DEFINITIONS.map((def) => {
      const saved = savedMap.get(def.slug);
      return {
        slug: def.slug,
        title: def.title,
        path: def.path,
        category: def.category,
        isCustomPage: false,
        isCustomized: Boolean(saved),
        updatedAt: saved?.updatedAt || null,
      };
    });

    const builtInSlugs = new Set(PAGE_DEFINITIONS.map((p) => p.slug));

    // Dynamically added custom sub-pages
    const customPages = savedRecords
      .filter((r) => !builtInSlugs.has(r.slug) && r.slug !== 'admin_security')
      .map((r) => {
        let category = 'Services Sub-Page';
        try {
          const parsed = JSON.parse(r.data);
          if (parsed.category) category = parsed.category;
        } catch {
          // ignore
        }

        const path = r.slug.startsWith('/') ? r.slug : `/${r.slug}`;

        return {
          slug: r.slug,
          title: r.title,
          path,
          category,
          isCustomPage: true,
          isCustomized: true,
          updatedAt: r.updatedAt,
        };
      });

    const allPages = [...builtInPages, ...customPages];

    return NextResponse.json({
      success: true,
      data: allPages,
      total: allPages.length,
      customCount: customPages.length,
      customizedCount: savedRecords.length,
    });
  } catch (error) {
    console.error('Error fetching admin pages overview:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch pages list' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!(await checkAdminAuth())) {
      return NextResponse.json(
        { success: false, message: 'Administrative authentication required' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, slug, category, content } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { success: false, message: 'Page title and slug URL are required.' },
        { status: 400 }
      );
    }

    // Format & clean slug (allow lowercase, numbers, hyphens, and single slash for subpages like services/healthcare)
    const cleanSlug = slug
      .trim()
      .toLowerCase()
      .replace(/^\/+|\/+$/g, '')
      .replace(/[^a-z0-9\/-]+/g, '-')
      .replace(/-+/g, '-');

    if (!cleanSlug) {
      return NextResponse.json(
        { success: false, message: 'Invalid slug path provided.' },
        { status: 400 }
      );
    }

    // Disallow reserved administrative slugs
    if (cleanSlug.startsWith('admin') || cleanSlug.startsWith('api') || cleanSlug === 'admin_security') {
      return NextResponse.json(
        { success: false, message: 'The slug prefix is reserved for internal system operations.' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await prisma.pageContent.findUnique({
      where: { slug: cleanSlug },
    });

    if (existing || PAGE_DEFINITIONS.some((p) => p.slug === cleanSlug)) {
      return NextResponse.json(
        { success: false, message: `A page with slug "${cleanSlug}" already exists.` },
        { status: 409 }
      );
    }

    const initialContent = content || createDefaultCustomPage(title.trim(), category || 'Services Sub-Page');

    const created = await prisma.pageContent.create({
      data: {
        slug: cleanSlug,
        title: title.trim(),
        data: JSON.stringify(initialContent),
      },
    });

    try {
      revalidatePath('/', 'layout');
      revalidatePath(`/services`);
      revalidatePath(`/${cleanSlug}`);
    } catch {
      // ignore
    }

    return NextResponse.json({
      success: true,
      message: `Sub-page "${title.trim()}" created successfully!`,
      data: {
        slug: created.slug,
        title: created.title,
        path: `/${created.slug}`,
      },
    });
  } catch (error) {
    console.error('Error creating custom sub-page:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create new sub-page.' },
      { status: 500 }
    );
  }
}
