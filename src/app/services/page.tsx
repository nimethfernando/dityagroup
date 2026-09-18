import React from 'react';
import { getPageContent } from '@/lib/getPageContent';
import { prisma } from '@/lib/prisma';
import { PAGE_DEFINITIONS, ServicesPageContent } from '@/lib/defaultPageContent';
import ServicesClient, { ServiceCardItem } from './ServicesClient';

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  const content = (await getPageContent('services')) as ServicesPageContent;

  let customServices: ServiceCardItem[] = [];
  try {
    const builtInSlugs = new Set(PAGE_DEFINITIONS.map((p) => p.slug));
    const customRecords = await prisma.pageContent.findMany({
      orderBy: { updatedAt: 'desc' },
    });

    const filtered = customRecords.filter(
      (r) => !builtInSlugs.has(r.slug) && r.slug !== 'admin_security'
    );

    customServices = filtered.map((page) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let parsed: any = {};
      try {
        parsed = JSON.parse(page.data);
      } catch {
        parsed = {};
      }

      const href = page.slug.startsWith('services/')
        ? `/${page.slug}`
        : `/services/${page.slug}`;

      return {
        title: page.title || parsed.banner?.title || 'Custom Service',
        subtitle: parsed.category || 'Specialized Solution',
        desc:
          parsed.banner?.subtitle ||
          parsed.details?.description ||
          'Comprehensive enterprise advisory, strategy, and personalized solutions tailored for growth.',
        href,
        highlights: parsed.details?.checklists?.slice(0, 3) || [
          'Tailored client solutions',
          'Industry expert consultation',
          'Measurable performance results',
        ],
      };
    });
  } catch (err) {
    console.error('Error fetching custom services in /services page:', err);
  }

  return <ServicesClient content={content} customServices={customServices} />;
}
