import React from 'react';
import { getPageContent } from '@/lib/getPageContent';
import HomeClient from './HomeClient';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const content = await getPageContent('home');
  return <HomeClient content={content} />;
}
