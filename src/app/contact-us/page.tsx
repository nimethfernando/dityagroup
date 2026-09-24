import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { getPageContent } from '@/lib/getPageContent';
import ContactUsClient from './ContactUsClient';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Contact Us | Consult with Ditya Group',
  description:
    'Get in touch with Ditya Group for consultations, partnerships, and executive inquiries. Visit our Jaipur HQ or connect with our Georgia International Desk.',
  keywords: [
    'Contact Ditya Group',
    'Ditya Group Jaipur Office',
    'Free Business Consultation',
    'Astrology Consultation Jaipur',
    'Trading Mentorship Inquiry',
  ],
  alternates: {
    canonical: '/contact-us',
  },
  openGraph: {
    title: 'Contact Us | Ditya Group',
    description:
      'Have inquiries about our Houses, trading mentorship, or business consultancy? Contact our advisory team directly.',
    url: '/contact-us',
    images: [
      {
        url: '/images/hero-banner-clean.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Ditya Group',
      },
    ],
  },
};

export default async function ContactUsPage() {
  const content = await getPageContent('contact');
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFC] animate-pulse" />}>
      <ContactUsClient content={content} />
    </Suspense>
  );
}

