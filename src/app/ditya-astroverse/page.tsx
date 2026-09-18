import React from 'react';
import { getPageContent } from '@/lib/getPageContent';
import HousePageTemplate from '@/components/HousePageTemplate';

export const dynamic = 'force-dynamic';

export default async function DityaAstroversePage() {
  const content = await getPageContent('ditya-astroverse');
  return <HousePageTemplate content={content} houseName="Ditya Astro Verse" />;
}
