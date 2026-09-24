import React from 'react';
import type { Metadata } from 'next';
import { getPageContent } from '@/lib/getPageContent';
import HousePageTemplate from '@/components/HousePageTemplate';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Ditya Astroverse | Vedic Astrology, Numerology & Tarot Insights',
  description:
    'Align your energy, life, and business with Vedic astrology, numerology, name corrections, tarot guidance, and face reading at Ditya Astroverse.',
  keywords: [
    'Ditya Astroverse',
    'Vedic Astrology Jaipur',
    'Numerology Consultation',
    'Name Correction Numerology',
    'Tarot Reading Jaipur',
    'Face Reading Astrologer',
    'Spiritual Alignment Business',
  ],
  alternates: {
    canonical: '/ditya-astroverse',
  },
  openGraph: {
    title: 'Ditya Astroverse | Vedic Astrology & Numerology',
    description:
      'Harmonize your life and business decisions through ancient Vedic insights and precise cosmic alignment.',
    url: '/ditya-astroverse',
    images: [
      {
        url: '/images/hero-banner-clean.jpg',
        width: 1200,
        height: 630,
        alt: 'Ditya Astroverse',
      },
    ],
  },
};

export default async function DityaAstroversePage() {
  const content = await getPageContent('ditya-astroverse');
  return <HousePageTemplate content={content} houseName="Ditya Astroverse" />;
}
