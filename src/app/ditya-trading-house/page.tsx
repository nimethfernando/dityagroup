import React from 'react';
import { getPageContent } from '@/lib/getPageContent';
import HousePageTemplate from '@/components/HousePageTemplate';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function DityaTradingHousePage() {
  const content = await getPageContent('ditya-trading-house');
  return <HousePageTemplate content={content} houseName="Ditya Trading House" />;
}
