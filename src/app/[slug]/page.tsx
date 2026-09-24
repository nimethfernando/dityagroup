import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HousePageTemplate from '@/components/HousePageTemplate';
import { HousePageContent } from '@/lib/defaultPageContent';
import { getPageContent } from '@/lib/getPageContent';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

interface DynamicSubPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: DynamicSubPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug.startsWith('admin') || slug.startsWith('api') || slug === 'favicon.ico') {
    return {};
  }
  const resolvedSlug = slug === 'global-business-network' ? 'ditya-wealth-house' : slug;
  const content = (await getPageContent(resolvedSlug)) as HousePageContent;

  if (!content || !content.banner) {
    return {};
  }

  const title = content.banner.title || 'Ditya Group';
  const description =
    content.banner.subtitle ||
    content.details?.description ||
    'Code Your Destiny. Create Your Legacy.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${slug}`,
    },
    openGraph: {
      title: `${title} | Ditya Group`,
      description,
      url: `/${slug}`,
      images: [
        {
          url: content.banner.backgroundImage || '/images/hero-banner-clean.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default async function DynamicSubPage({ params }: DynamicSubPageProps) {
  const { slug } = await params;

  // Protect internal namespaces
  if (slug.startsWith('admin') || slug.startsWith('api') || slug === 'favicon.ico') {
    notFound();
  }

  // Support backwards-compatible alias from /global-business-network to ditya-wealth-house
  const resolvedSlug = slug === 'global-business-network' ? 'ditya-wealth-house' : slug;

  const content = (await getPageContent(resolvedSlug)) as HousePageContent;

  if (!content || !content.details || !content.banner) {
    notFound();
  }

  return (
    <HousePageTemplate
      content={content}
      houseName={content.banner.title || 'Ditya Group House'}
    />
  );
}
