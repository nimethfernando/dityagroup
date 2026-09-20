import React from 'react';
import { getPageContent } from '@/lib/getPageContent';
import HousePageTemplate from '@/components/HousePageTemplate';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function DityaWealthHousePage() {
  const content = await getPageContent('ditya-wealth-house');
  return <HousePageTemplate content={content} houseName="Ditya Wealth House" />;
}

