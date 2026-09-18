import React from 'react';
import { getPageContent } from '@/lib/getPageContent';
import HousePageTemplate from '@/components/HousePageTemplate';

export const dynamic = 'force-dynamic';

export default async function DityaTechHousePage() {
  const content = await getPageContent('ditya-tech-house');
  return <HousePageTemplate content={content} houseName="Ditya Tech House" />;
}
