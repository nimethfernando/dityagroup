import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth';
import { BLOG_POSTS } from '@/lib/blogData';

async function checkAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;
  return Boolean(await verifyAdminToken(token));
}

export async function GET() {
  try {
    if (!(await checkAdminAuth())) {
      return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });
    }

    let dbBlogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Auto-seed default 6 articles if database is empty
    if (dbBlogs.length === 0) {
      for (const p of BLOG_POSTS) {
        await prisma.blog.upsert({
          where: { slug: p.slug },
          update: {},
          create: {
            title: p.title,
            slug: p.slug,
            excerpt: p.excerpt,
            content: p.content.join('\n\n'),
            category: p.category,
            readTime: p.readTime,
            authorName: p.author,
            image: p.image || '/images/hero-banner.jpeg',
            published: true,
          },
        });
      }
      dbBlogs = await prisma.blog.findMany({
        orderBy: { createdAt: 'desc' },
      });
    }

    return NextResponse.json({ success: true, data: dbBlogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    // Fallback to in-memory BLOG_POSTS if database is unreachable
    const fallbackData = BLOG_POSTS.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content.join('\n\n'),
      category: p.category,
      readTime: p.readTime,
      authorName: p.author,
      image: p.image || '/images/hero-banner.jpeg',
      published: true,
      createdAt: new Date().toISOString(),
    }));
    return NextResponse.json({ success: true, data: fallbackData });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!(await checkAdminAuth())) {
      return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });
    }

    const body = await req.json();
    const { title, slug, excerpt, content, category, readTime, authorName, image } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ success: false, message: 'Title, slug, and content are required' }, { status: 400 });
    }

    const created = await prisma.blog.create({
      data: {
        title: title.trim(),
        slug: slug.trim().toLowerCase(),
        excerpt: excerpt?.trim() || '',
        content: content.trim(),
        category: category?.trim() || 'Ditya Astroverse',
        readTime: readTime?.trim() || '5 min read',
        authorName: authorName?.trim() || 'Ditya Divine Code Team',
        image: image?.trim() || '/images/hero-banner.jpeg',
        published: true,
      },
    });

    return NextResponse.json({ success: true, data: created, message: 'Blog article published successfully!' });
  } catch (error: any) {
    console.error('Error creating blog:', error);
    if (error?.code === 'P2002') {
      return NextResponse.json({ success: false, message: 'An article with this URL slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Failed to publish blog' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    if (!(await checkAdminAuth())) {
      return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });
    }

    const body = await req.json();
    const { id, title, slug, excerpt, content, category, readTime, authorName, image, published } = body;

    if (!id || !title || !slug || !content) {
      return NextResponse.json({ success: false, message: 'ID, title, slug, and content are required' }, { status: 400 });
    }

    const updated = await prisma.blog.update({
      where: { id },
      data: {
        title: title.trim(),
        slug: slug.trim().toLowerCase(),
        excerpt: excerpt?.trim() || '',
        content: content.trim(),
        category: category?.trim() || 'Ditya Astroverse',
        readTime: readTime?.trim() || '5 min read',
        authorName: authorName?.trim() || 'Ditya Divine Code Team',
        image: image?.trim() || '/images/hero-banner.jpeg',
        published: published !== undefined ? published : true,
      },
    });

    return NextResponse.json({ success: true, data: updated, message: 'Article updated successfully!' });
  } catch (error: any) {
    console.error('Error updating blog:', error);
    if (error?.code === 'P2002') {
      return NextResponse.json({ success: false, message: 'An article with this URL slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Failed to update blog article' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!(await checkAdminAuth())) {
      return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, message: 'Blog ID is required' }, { status: 400 });
    }

    await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete blog' }, { status: 500 });
  }
}
