import React from 'react';
import { Metadata } from 'next';
import { getPageContent } from '@/lib/getPageContent';
import GBNClient from './GBNClient';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Global Business Network (GBN) | Ditya Group',
  description:
    'Premier international community designed for ambitious entrepreneurs, executives, and business leaders. Connect, collaborate, and scale globally with GBN Circle and Elite Council.',
};

export default async function GlobalBusinessNetworkPage() {
  const content = await getPageContent('global-business-network');
  return <GBNClient content={content} />;
}
