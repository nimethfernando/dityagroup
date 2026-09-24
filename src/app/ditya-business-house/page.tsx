import React from 'react';
import type { Metadata } from 'next';
import { getPageContent } from '@/lib/getPageContent';
import HousePageTemplate from '@/components/HousePageTemplate';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Ditya Business House | Business Consultancy & Growth Strategy',
  description:
    'Scale your enterprise with strategic business consultancy, execution support, opportunity analysis, and long-term stability advisory from Ditya Business House.',
  keywords: [
    'Ditya Business House',
    'Business Consultancy Jaipur',
    'Enterprise Growth Strategy',
    'Corporate Advisory Rajasthan',
    'Business Planning India',
    'Execution Strategy Support',
  ],
  alternates: {
    canonical: '/ditya-business-house',
  },
  openGraph: {
    title: 'Ditya Business House | Consultancy & Strategic Growth',
    description:
      'What you decide in business matters deeply. Plan, execute, and grow with confidence, clarity, and robust systems.',
    url: '/ditya-business-house',
    images: [
      {
        url: '/images/hero-banner-clean.jpg',
        width: 1200,
        height: 630,
        alt: 'Ditya Business House',
      },
    ],
  },
};

export default async function DityaBusinessHousePage() {
  const content = await getPageContent('ditya-business-house');
  return <HousePageTemplate content={content} houseName="Ditya Business House" />;
}
