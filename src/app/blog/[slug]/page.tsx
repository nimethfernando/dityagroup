import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { BLOG_POSTS } from '@/lib/blogData';
import BlogPostClient, { SinglePostData, SidebarRecentPost } from './BlogPostClient';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dityagroup.com';

  let title = 'Article';
  let description = 'Insights on wealth, astrology, mathematics, and business from Ditya Group.';
  let image = '/images/hero-banner-clean.jpg';
  let author = 'Ditya Group';
  let date = '';
  let category = 'Articles';

  try {
    const dbPost = await prisma.blog.findUnique({
      where: { slug },
      select: {
        title: true,
        excerpt: true,
        image: true,
        authorName: true,
        category: true,
        createdAt: true,
      },
    });

    if (dbPost) {
      title = dbPost.title;
      description = dbPost.excerpt;
      image = dbPost.image || image;
      author = dbPost.authorName;
      category = dbPost.category;
      date = dbPost.createdAt.toISOString();
    }
  } catch (err) {
    console.error('Error fetching blog metadata:', err);
  }

  if (title === 'Article') {
    const preset = BLOG_POSTS.find((p) => p.slug === slug || p.aliases?.includes(slug));
    if (preset) {
      title = preset.title;
      description = preset.excerpt;
      image = preset.image || image;
      author = preset.author;
      category = preset.category;
    }
  }

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
      publishedTime: date || undefined,
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

  let post: SinglePostData | null = null;

  try {
    const dbPost = await prisma.blog.findUnique({
      where: { slug },
    });

    if (dbPost) {
      post = {
        title: dbPost.title,
        category: dbPost.category,
        author: dbPost.authorName,
        date: dbPost.createdAt.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        readTime: dbPost.readTime,
        excerpt: dbPost.excerpt,
        image: dbPost.image || '/images/hero-banner.jpeg',
        content: dbPost.content.split('\n\n').filter(Boolean),
      };
    }
  } catch (err) {
    console.error('Error querying DB blog post:', err);
  }

  // Fallback to preset BLOG_POSTS with alias support
  if (!post) {
    const preset = BLOG_POSTS.find(
      (p) => p.slug === slug || p.aliases?.includes(slug)
    );
    if (preset) {
      post = {
        title: preset.title,
        category: preset.category,
        author: preset.author,
        date: preset.date,
        readTime: preset.readTime,
        excerpt: preset.excerpt,
        image: preset.image || '/images/hero-banner.jpeg',
        content: preset.content,
      };
    }
  }

  if (!post) {
    notFound();
  }

  // Fetch recent posts for sidebar
  const recentPosts: SidebarRecentPost[] = BLOG_POSTS.slice(0, 3).map((p) => ({
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
