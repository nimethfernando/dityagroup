import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogBySlug, getLatestBlogs } from '@/lib/getBlogs';
import { BLOG_POSTS } from '@/lib/blogData';
import BlogPostClient, { SinglePostData, SidebarRecentPost } from './BlogPostClient';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dityagroup.com';

  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | Ditya Group Blog',
      description: 'The requested article could not be found.',
    };
  }

  const title = post.title;
  const description = post.excerpt || 'Insights on wealth, astrology, mathematics, and business from Ditya Group.';
  const image = post.image || '/images/hero-banner-clean.jpg';
  const author = post.author || 'Ditya Group';
  const category = post.category || 'Articles';
  const canonicalUrl = `${siteUrl}/blog/${encodeURIComponent(slug)}`;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? '' : '/'}${image}`;

  return {
    title: `${title} | Ditya Group Blog`,
    description,
    keywords: [category, 'Ditya Group Blog', author, 'Vedic Wisdom', 'Business Insights'],
    authors: [{ name: author }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: canonicalUrl,
      title: `${title} | Ditya Group`,
      description,
      publishedTime: post.date || undefined,
      authors: [author],
      section: category,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Ditya Group`,
      description,
      images: [fullImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  // Fetch recent posts for sidebar from cache
  const latest = await getLatestBlogs(4);
  const recentPosts: SidebarRecentPost[] = latest
    .filter((p) => p.slug !== slug)
    .slice(0, 3)
    .map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      date: p.date,
    }));

  // Categories with counts
  const categoryCounts: Record<string, number> = {};
  BLOG_POSTS.forEach((p) => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });
  const categories = Object.keys(categoryCounts).map((name) => ({
    name,
    count: categoryCounts[name],
  }));

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dityagroup.com';
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image?.startsWith('http')
      ? post.image
      : `${siteUrl}${post.image?.startsWith('/') ? '' : '/'}${post.image || 'images/hero-banner-clean.jpg'}`,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ditya Group',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`,
      },
    },
    datePublished: post.date,
    articleSection: post.category,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${encodeURIComponent(slug)}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <BlogPostClient
        post={post}
        recentPosts={recentPosts}
        categories={categories}
      />
    </>
  );
}
