import React from 'react';
import { getPageContent } from '@/lib/getPageContent';
import HousePageTemplate from '@/components/HousePageTemplate';

export const dynamic = 'force-dynamic';

export default async function DityaMathHousePage() {
  const content = await getPageContent('ditya-math-house');
  return <HousePageTemplate content={content} houseName="Ditya Math House" />;
}
