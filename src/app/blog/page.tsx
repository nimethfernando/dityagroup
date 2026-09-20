import React from 'react';
import { prisma } from '@/lib/prisma';
import { BLOG_POSTS } from '@/lib/blogData';
import BlogListingClient, { BlogPostItem } from './BlogListingClient';

export const dynamic = 'force-dynamic';

export default async function BlogListingPage() {
  let dbPosts: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    readTime: string;
    authorName: string;
    image: string;
    createdAt: Date;
  }> = [];

  try {
    dbPosts = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch (err) {
    console.error('Error fetching blogs from database:', err);
  }

  // Combine DB posts and default posts
  const combinedPosts: BlogPostItem[] = [
    ...dbPosts.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      category: p.category,
      excerpt: p.excerpt,
      date: p.createdAt.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      readTime: p.readTime,
      image: p.image || '/images/hero-banner.jpeg',
    })),
    ...BLOG_POSTS.filter((bp) => !dbPosts.some((dp) => dp.slug === bp.slug)).map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      category: p.category,
      excerpt: p.excerpt,
      date: p.date,
      readTime: p.readTime,
      image: p.image || '/images/hero-banner.jpeg',
    })),
  ];

  return <BlogListingClient initialPosts={combinedPosts} />;
}
