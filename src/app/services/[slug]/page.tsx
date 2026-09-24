import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import HousePageTemplate from '@/components/HousePageTemplate';
import { HousePageContent } from '@/lib/defaultPageContent';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

interface ServiceSubPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServiceSubPageProps): Promise<Metadata> {
  const { slug } = await params;

  let record = await prisma.pageContent.findUnique({
    where: { slug: `services/${slug}` },
  });

  if (!record) {
    record = await prisma.pageContent.findUnique({
      where: { slug },
    });
  }

  if (!record || !record.data) {
    return {};
  }

  let content: HousePageContent;
  try {
    content = JSON.parse(record.data);
  } catch {
    return {};
  }

  const title = record.title || content.banner?.title || 'Service';
  const description =
    content.banner?.subtitle ||
    content.details?.description ||
    'Ditya Group specialized service division.';

  return {
    title: `${title} | Ditya Group`,
    description,
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title: `${title} | Ditya Group`,
      description,
      url: `/services/${slug}`,
      images: [
        {
          url: content.banner?.backgroundImage || '/images/hero-banner-clean.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
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

