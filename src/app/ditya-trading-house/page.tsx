import React from 'react';
import type { Metadata } from 'next';
import { getPageContent } from '@/lib/getPageContent';
import HousePageTemplate from '@/components/HousePageTemplate';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Ditya Trading House | Financial Markets & Coworking Hub',
  description:
    'Learn, trade, and grow with Ditya Trading House. Master financial market psychology, risk management, and thrive in dedicated trading coworking environments.',
  keywords: [
    'Ditya Trading House',
    'Trading Education Jaipur',
    'Stock Market Trading Coworking',
    'Live Market Trading Guidance',
    'Financial Markets Training',
    'Trading Floor Jaipur',
  ],
  alternates: {
    canonical: '/ditya-trading-house',
  },
  openGraph: {
    title: 'Ditya Trading House | Financial Markets & Trading Education',
    description:
      'Learn. Trade. Grow. Master market behavior, emotional discipline, and risk management with peer traders.',
    url: '/ditya-trading-house',
    images: [
      {
        url: '/images/hero-banner-clean.jpg',
        width: 1200,
        height: 630,
        alt: 'Ditya Trading House',
      },
    ],
  },
};

export default async function DityaTradingHousePage() {
  const content = await getPageContent('ditya-trading-house');
  return <HousePageTemplate content={content} houseName="Ditya Trading House" />;
}
