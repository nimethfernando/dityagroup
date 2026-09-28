import React from 'react';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { BLOG_POSTS } from '@/lib/blogData';
import BlogListingClient, { BlogPostItem } from './BlogListingClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog & Articles | Insights on Wealth, Astrology & Business',
  description:
    'Explore thought-provoking articles, Vedic astrology forecasts, trading strategies, numerology insights, and corporate growth frameworks from Ditya Group.',
  keywords: [
    'Ditya Group Blog',
    'Vedic Astrology Articles',
    'Trading Insights India',
    'Numerology Guide',
    'Business Growth Articles',
    'Financial Wisdom',
  ],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog & Articles | Ditya Group',
    description:
      'Explore actionable insights bridging ancient Vedic principles with modern wealth creation and business mastery.',
    url: '/blog',
    images: [
      {
        url: '/images/hero-banner-clean.jpg',
        width: 1200,
        height: 630,
        alt: 'Ditya Group Blog',
      },
    ],
  },
};

const safeFormatDate = (dateVal: any): string => {
  if (!dateVal) return 'Recently';
  try {
    const d = typeof dateVal === 'string' || typeof dateVal === 'number' ? new Date(dateVal) : dateVal;
    if (!d || isNaN(d.getTime())) return 'Recently';
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return 'Recently';
  }
};

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
    const dbQueryPromise = prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('MariaDB query timeout')), 2500)
    );
    dbPosts = (await Promise.race([dbQueryPromise, timeoutPromise])) as any;
  } catch (err) {
    console.error('Error or timeout fetching blogs from database:', err);
    dbPosts = [];
  }

  // Combine DB posts and default posts with total fail-safe error protection
  let combinedPosts: BlogPostItem[] = [];

  try {
    const dbItems: BlogPostItem[] = (dbPosts || [])
      .map((p) => ({
        id: p.id || String(Math.random()),
        title: p.title || 'Untitled Post',
        slug: p.slug || '',
        category: p.category || 'General',
        excerpt: p.excerpt || '',
        date: safeFormatDate(p.createdAt),
        readTime: p.readTime || '5 min read',
        image: p.image || '/images/hero-banner-clean.jpg',
      }))
      .filter((item) => Boolean(item.slug));

    const defaultItems: BlogPostItem[] = BLOG_POSTS.filter(
      (bp) => !dbItems.some((dp) => dp.slug === bp.slug)
    ).map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      category: p.category,
      excerpt: p.excerpt,
      date: p.date,
      readTime: p.readTime,
      image: p.image || '/images/hero-banner-clean.jpg',
    }));

    combinedPosts = [...dbItems, ...defaultItems];
  } catch (err) {
    console.error('Error combining blog posts:', err);
    // Absolute fallback: static BLOG_POSTS
    combinedPosts = BLOG_POSTS.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      category: p.category,
      excerpt: p.excerpt,
      date: p.date,
      readTime: p.readTime,
      image: p.image || '/images/hero-banner-clean.jpg',
    }));
  }

  return <BlogListingClient initialPosts={combinedPosts} />;
}
