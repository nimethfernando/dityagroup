import React from 'react';
import type { Metadata } from 'next';
import { getPageContent } from '@/lib/getPageContent';
import HousePageTemplate from '@/components/HousePageTemplate';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Ditya Math House | Ditya Math Code & Academic Excellence',
  description:
    'Master mathematical concepts, build problem-solving confidence, and excel academically with Ditya Math Code, concept clarity, and personalized doubt resolution.',
  keywords: [
    'Ditya Math House',
    'Ditya Math Code',
    'Math Learning Jaipur',
    'Mathematics Concept Clarity',
    'Academic Performance Math',
    'Competitive Exam Mathematics',
  ],
  alternates: {
    canonical: '/ditya-math-house',
  },
  openGraph: {
    title: 'Ditya Math House | Concept Clarity & Academic Performance',
    description:
      'What you learn in math matters deeply. Build rock-solid foundation, logic, and mastery with Ditya Math House.',
    url: '/ditya-math-house',
    images: [
      {
        url: '/images/hero-banner-clean.jpg',
        width: 1200,
        height: 630,
        alt: 'Ditya Math House',
      },
    ],
  },
};

export default async function DityaMathHousePage() {
  const content = await getPageContent('ditya-math-house');
  return <HousePageTemplate content={content} houseName="Ditya Math House" />;
}
