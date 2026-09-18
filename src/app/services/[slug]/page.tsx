import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import HousePageTemplate from '@/components/HousePageTemplate';
import { HousePageContent } from '@/lib/defaultPageContent';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

interface ServiceSubPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceSubPage({ params }: ServiceSubPageProps) {
  const { slug } = await params;

  // Check both "services/slug" and "slug"
  let record = await prisma.pageContent.findUnique({
    where: { slug: `services/${slug}` },
  });

  if (!record) {
    record = await prisma.pageContent.findUnique({
      where: { slug },
    });
  }

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

