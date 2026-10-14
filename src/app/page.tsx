import React from 'react';
import type { Metadata } from 'next';
import { getPageContent } from '@/lib/getPageContent';
import { getLatestBlogs } from '@/lib/getBlogs';
import HomeClient from './HomeClient';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Home - Ditya Group | Code Your Destiny. Create Your Legacy.',
  description:
    'Where practical expertise in trading and business meets deep spiritual insight, helping you make powerful, aligned decisions for every part of your life.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Home - Ditya Group | Code Your Destiny. Create Your Legacy.',
    description:
      'Where practical expertise in trading and business meets deep spiritual insight, helping you make powerful, aligned decisions for every part of your life.',
    url: '/',
    images: [
      {
        url: '/images/hero-banner-clean.jpg',
        width: 1200,
        height: 630,
        alt: 'Ditya Group Homepage',
      },
    ],
  },
};

export default async function HomePage() {
  const [content, latestBlogs] = await Promise.all([
    getPageContent('home'),
    getLatestBlogs(3),
  ]);

  return <HomeClient content={content} latestBlogs={latestBlogs} />;
}

