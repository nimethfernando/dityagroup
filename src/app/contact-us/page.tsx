import React from 'react';
import { getPageContent } from '@/lib/getPageContent';
import ContactUsClient from './ContactUsClient';

export const dynamic = 'force-dynamic';

export default async function ContactUsPage() {
  const content = await getPageContent('contact');
  return <ContactUsClient content={content} />;
}
