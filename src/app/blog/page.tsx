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
