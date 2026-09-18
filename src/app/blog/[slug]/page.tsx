import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/lib/blogData';
import { ArrowLeft, Clock, Calendar, User, Share2 } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="pb-36 bg-white">
      {/* Header */}
      <section className="bg-[#011633] text-white py-16">
        <div className="max-w-[860px] mx-auto px-4">
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
        <p className="text-lg font-medium text-[#011633] bg-[#FFF3E0] p-6 rounded-asymmetric border-l-4 border-[#FF5722]">
          {post.excerpt}
        </p>

        {post.content.map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed">
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
