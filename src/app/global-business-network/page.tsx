import React from 'react';
import { Metadata } from 'next';
import { getPageContent } from '@/lib/getPageContent';
import GBNClient from './GBNClient';
export const dynamic = 'force-dynamic';
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Global Business Network (GBN) | Leadership & Executive Circle',
  description:
    'Join the Global Business Network (GBN) — a premier international community for ambitious entrepreneurs, executives, and founders scaling cross-border business collaborations.',
  keywords: [
    'Global Business Network',
    'GBN Circle',
    'GBN Elite Council',
    'Executive Networking',
    'Business Networking Club',
    'International Business Network',
    'Entrepreneurs Mastermind',
    'Cross-border Business Scaling',
  ],
  alternates: {
    canonical: '/global-business-network',
  },
  openGraph: {
    title: 'Global Business Network (GBN) | Ditya Group',
    description:
      'A trusted ecosystem of vetted business leaders, cross-border scaling advisory, and private executive mastermind roundtables.',
    url: '/global-business-network',
    images: [
      {
        url: '/images/hero-banner-clean.jpg',
        width: 1200,
        height: 630,
        alt: 'Global Business Network - Ditya Group',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Global Business Network (GBN) | Ditya Group',
    description:
      'A trusted ecosystem of vetted business leaders, cross-border scaling advisory, and private executive mastermind roundtables.',
    images: ['/images/hero-banner-clean.jpg'],
  },
};

export default async function GlobalBusinessNetworkPage() {
  const content = await getPageContent('global-business-network');
  return <GBNClient content={content} />;
}
