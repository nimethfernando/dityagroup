import React from 'react';
import type { Metadata } from 'next';
import { getPageContent } from '@/lib/getPageContent';
import AboutUsClient from './AboutUsClient';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Discover Ditya Group — a multidisciplinary conglomerate founded to blend ancient Vedic wisdom with modern business systems, wealth management, mathematics, and technological innovation.',
  alternates: {
    canonical: '/about-us',
  },
  openGraph: {
    title: 'About Us | Ditya Group',
    description:
      'Learn about our vision, leadership, core pillars, and integrated Houses shaping personal clarity and business excellence.',
    url: '/about-us',
    images: [
      {
        url: '/images/about-group.jpg',
        width: 1200,
        height: 630,
        alt: 'About Ditya Group',
      },
    ],
  },
};

export default async function AboutUsPage() {
  const content = await getPageContent('about');
  return <AboutUsClient content={content} />;
}
