import React from 'react';
import { getPageContent } from '@/lib/getPageContent';
import HousePageTemplate from '@/components/HousePageTemplate';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function GlobalBusinessNetworkPage() {
  const content = await getPageContent('global-business-network');
  return <HousePageTemplate content={content} houseName="Global Business Network" />;
}
