import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { BLOG_POSTS } from '@/lib/blogData';
import { ArrowLeft, Clock, Calendar, User, Share2 } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post: {
    title: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    excerpt: string;
    content: string[];
  } | null = null;

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
        content: dbPost.content.split('\n\n').filter(Boolean),
      };
    }
  } catch (err) {
    console.error('Error querying DB blog post:', err);
  }

  if (!post) {
    const preset = BLOG_POSTS.find((p) => p.slug === slug);
    if (preset) {
      post = preset;
    }
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="pb-36 bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#001025] via-[#011633] to-[#0d274c] text-white py-16 relative overflow-hidden border-b border-white/5">
        {/* Sacred Geometry Silk Banner Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/inner-banner-bg.jpg"
            alt="Blog Post Background"
            fill
            className="object-cover object-center opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001025]/90 via-[#011633]/80 to-[#0d274c]/85" />
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5722]/10 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="max-w-[860px] mx-auto px-4 relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-xs text-[#FF5722] font-semibold hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>

          <span className="block text-xs font-bold uppercase tracking-wider text-[#FF5722] mb-2">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mt-6 text-xs text-gray-300 border-t border-white/10 pt-4">
            <span className="flex items-center space-x-1.5">
              <User className="w-4 h-4 text-[#FF5722]" />
              <span>{post.author}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-[#FF5722]" />
              <span>{post.date}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-[#FF5722]" />
              <span>{post.readTime}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-[860px] mx-auto px-4 py-16 space-y-6 text-gray-700 leading-relaxed text-base">
        {post.excerpt && (
          <p className="text-lg font-medium text-[#011633] bg-[#FFF3E0] p-6 rounded-asymmetric border-l-4 border-[#FF5722]">
            {post.excerpt}
          </p>
        )}

        {post.content.map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed whitespace-pre-line">
            {paragraph}
          </p>
        ))}

        <div className="pt-10 border-t border-gray-200 flex flex-wrap justify-between items-center gap-4">
          <Link
            href="/blog"
            className="text-sm font-bold text-[#FF5722] hover:underline inline-flex items-center space-x-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Read more articles</span>
          </Link>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <Share2 className="w-4 h-4 text-[#FF5722]" />
            <span>Share this sacred knowledge</span>
          </div>
        </div>
      </article>
    </div>
  );
}
