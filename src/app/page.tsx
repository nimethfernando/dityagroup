import React from 'react';
import { getPageContent } from '@/lib/getPageContent';
import { prisma } from '@/lib/prisma';
import HomeClient from './HomeClient';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function HomePage() {
  const content = await getPageContent('home');

  let latestBlogs: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    image: string;
  }> = [];

  try {
    const posts = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        category: true,
        image: true,
      },
    });
    latestBlogs = posts;
  } catch (err) {
    console.error('Error fetching blogs for home page:', err);
  }

  return <HomeClient content={content} latestBlogs={latestBlogs} />;
}

