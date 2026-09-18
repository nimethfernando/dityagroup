import React from 'react';
import { getPageContent } from '@/lib/getPageContent';
import AboutUsClient from './AboutUsClient';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function AboutUsPage() {
  const content = await getPageContent('about');
  return <AboutUsClient content={content} />;
}
