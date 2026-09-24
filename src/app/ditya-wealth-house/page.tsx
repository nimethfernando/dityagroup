import React from 'react';
import type { Metadata } from 'next';
import { getPageContent } from '@/lib/getPageContent';
import HousePageTemplate from '@/components/HousePageTemplate';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Ditya Wealth House | Wealth Management & Trade Code Guidance',
  description:
    'Achieve financial consistency and wealth generation through Ditya Trade Code, stock market guidance, F&O and forex strategies, and disciplined risk management.',
  keywords: [
    'Ditya Wealth House',
    'Wealth Management Jaipur',
    'Ditya Trade Code',
    'Stock Market Consultation',
    'Forex Trading Strategies',
    'Options Trading Mentorship',
    'Financial Risk Management',
  ],
  alternates: {
    canonical: '/ditya-wealth-house',
  },
  openGraph: {
    title: 'Ditya Wealth House | Wealth Management & Trading',
    description:
      'What you do in trading matters deeply. Build long-term wealth through timing, discipline, and systematic market methodologies.',
    url: '/ditya-wealth-house',
    images: [
      {
        url: '/images/hero-banner-clean.jpg',
        width: 1200,
        height: 630,
        alt: 'Ditya Wealth House',
      },
    ],
  },
};

export default async function DityaWealthHousePage() {
  const content = await getPageContent('ditya-wealth-house');
  return <HousePageTemplate content={content} houseName="Ditya Wealth House" />;
}

