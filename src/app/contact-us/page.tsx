import React, { Suspense } from 'react';
import { getPageContent } from '@/lib/getPageContent';
import ContactUsClient from './ContactUsClient';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function ContactUsPage() {
  const content = await getPageContent('contact');
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFC] animate-pulse" />}>
      <ContactUsClient content={content} />
    </Suspense>
  );
}

