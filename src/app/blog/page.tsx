import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { BLOG_POSTS } from '@/lib/blogData';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function BlogListingPage() {
  let dbPosts: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    readTime: string;
    authorName: string;
    createdAt: Date;
  }> = [];

  try {
    dbPosts = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch (err) {
    console.error('Error fetching blogs from database:', err);
  }

  // Combine DB posts and default posts
  const combinedPosts = [
    ...dbPosts.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      category: p.category,
      excerpt: p.excerpt,
      date: p.createdAt.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      readTime: p.readTime,
    })),
    ...BLOG_POSTS.filter((bp) => !dbPosts.some((dp) => dp.slug === bp.slug)),
  ];

  return (
    <div className="pb-36 bg-[#FBFBFB]">
      {/* Banner */}
      <section className="bg-[#011633] text-white py-16 text-center relative overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-4 relative z-10">
          <span className="text-xs font-bold text-[#FF5722] tracking-widest uppercase">
            Knowledge & Insights
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2">
            Blog & Articles
          </h1>
          <p className="text-sm text-gray-300 max-w-xl mx-auto mt-3">
            Practical insights on numerology, remedies, business systems, trading mindset, and
            personal transformation.
          </p>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="py-20 max-w-[1140px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {combinedPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-asymmetric border border-gray-200/80 overflow-hidden shadow-sm card-hover flex flex-col justify-between"
            >
              <div className="p-8 space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="font-bold text-[#FF5722] uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#011633] leading-snug hover:text-[#FF5722] transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="px-8 pb-7 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.date}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-[#FF5722] hover:underline inline-flex items-center space-x-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
