import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { BLOG_POSTS } from '@/lib/blogData';
import BlogPostClient, { SinglePostData, SidebarRecentPost } from './BlogPostClient';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post: SinglePostData | null = null;

  try {
    const dbPost = await prisma.blog.findUnique({
      where: { slug },
    });

    if (dbPost) {
      post = {
        title: dbPost.title,
        category: dbPost.category,
        author: dbPost.authorName,
        date: dbPost.createdAt.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        readTime: dbPost.readTime,
        excerpt: dbPost.excerpt,
        image: dbPost.image || '/images/hero-banner.jpeg',
        content: dbPost.content.split('\n\n').filter(Boolean),
      };
    }
  } catch (err) {
    console.error('Error querying DB blog post:', err);
  }

  // Fallback to preset BLOG_POSTS with alias support
  if (!post) {
    const preset = BLOG_POSTS.find(
      (p) => p.slug === slug || p.aliases?.includes(slug)
    );
    if (preset) {
      post = {
        title: preset.title,
        category: preset.category,
        author: preset.author,
        date: preset.date,
        readTime: preset.readTime,
        excerpt: preset.excerpt,
        image: preset.image || '/images/hero-banner.jpeg',
        content: preset.content,
      };
    }
  }

  if (!post) {
    notFound();
  }

  // Fetch recent posts for sidebar
  const recentPosts: SidebarRecentPost[] = BLOG_POSTS.slice(0, 3).map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    date: p.date,
  }));

  // Categories with counts
  const categoryCounts: Record<string, number> = {};
  BLOG_POSTS.forEach((p) => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });
  const categories = Object.keys(categoryCounts).map((name) => ({
    name,
    count: categoryCounts[name],
  }));

  return (
    <BlogPostClient
      post={post}
      recentPosts={recentPosts}
      categories={categories}
    />
  );
}
