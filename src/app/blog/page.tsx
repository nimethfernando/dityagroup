import React from 'react';
import type { Metadata } from 'next';
import { getAllPublishedBlogs } from '@/lib/getBlogs';
import BlogListingClient, { BlogPostItem } from './BlogListingClient';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

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
  const blogs = await getAllPublishedBlogs();
  const posts: BlogPostItem[] = blogs.map((b) => ({
    id: b.id,
    title: b.title,
    slug: b.slug,
    category: b.category,
    excerpt: b.excerpt,
    date: b.date,
    readTime: b.readTime,
    image: b.image,
  }));

  return <BlogListingClient initialPosts={posts} />;
}
