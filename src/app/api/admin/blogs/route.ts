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

    const dbBlogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: dbBlogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch blogs' }, { status: 500 });
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
        category: category || 'Ditya Astroverse',
        readTime: readTime || '5 min read',
        authorName: authorName || 'Ditya Group',
        image: image || '/images/hero-banner.jpeg',
        published: true,
      },
    });

    return NextResponse.json({ success: true, data: created, message: 'Blog article published!' });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ success: false, message: 'Failed to publish blog' }, { status: 500 });
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

