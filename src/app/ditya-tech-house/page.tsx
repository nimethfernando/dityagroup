import React from 'react';
import type { Metadata } from 'next';
import { getPageContent } from '@/lib/getPageContent';
import HousePageTemplate from '@/components/HousePageTemplate';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Ditya Tech House | Ditya Quantum Code & Software Solutions',
  description:
    'Accelerate digital transformation with Ditya Quantum Code — bespoke software engineering, automation systems, high-performance web applications, and enterprise technical support.',
  keywords: [
    'Ditya Tech House',
    'Ditya Quantum Code',
    'Software Development Jaipur',
    'Enterprise Automation',
    'Web Application Solutions',
    'Technical Support Services',
  ],
  alternates: {
    canonical: '/ditya-tech-house',
  },
  openGraph: {
    title: 'Ditya Tech House | Engineering & Digital Platforms',
    description:
      'What you build in technology matters deeply. Create resilient digital platforms, modern web architecture, and smart automation.',
    url: '/ditya-tech-house',
    images: [
      {
        url: '/images/hero-banner-clean.jpg',
        width: 1200,
        height: 630,
        alt: 'Ditya Tech House',
      },
    ],
  },
};

export default async function DityaTechHousePage() {
  const content = await getPageContent('ditya-tech-house');
  return <HousePageTemplate content={content} houseName="Ditya Tech House" />;
}
