import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import HousePageTemplate from '@/components/HousePageTemplate';
import { HousePageContent } from '@/lib/defaultPageContent';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

interface DynamicSubPageProps {
  params: Promise<{ slug: string }>;
}

export default async function DynamicSubPage({ params }: DynamicSubPageProps) {
  const { slug } = await params;

  // Protect internal namespaces
  if (slug.startsWith('admin') || slug.startsWith('api') || slug === 'favicon.ico') {
    notFound();
  }

  const record = await prisma.pageContent.findUnique({
    where: { slug },
  });

  if (!record || !record.data) {
    notFound();
  }

  let content: HousePageContent;
  try {
    content = JSON.parse(record.data);
  } catch {
    notFound();
  }

  return (
    <HousePageTemplate
      content={content}
      houseName={record.title}
    />
  );
}

