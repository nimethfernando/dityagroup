'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  Share2,
  Phone,
  Mail,
  HelpCircle,
  Tag,
  Sparkles,
} from 'lucide-react';
import { useConsultation } from '@/contexts/ConsultationContext';

export interface SinglePostData {
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  image?: string;
  content: string[];
}

export interface SidebarRecentPost {
  id: string;
  title: string;
  slug: string;
  date: string;
}

interface BlogPostClientProps {
  post: SinglePostData;
  recentPosts: SidebarRecentPost[];
  categories: { name: string; count: number }[];
}

export default function BlogPostClient({
  post,
  recentPosts,
  categories,
}: BlogPostClientProps) {
  const { openModal } = useConsultation();

  return (
    <div className="pb-20 bg-white dark:bg-[#030F0E] text-[#041614] dark:text-gray-100 transition-colors duration-200">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-[#020D0C] via-[#041614] to-[#0D2622] text-white py-16 lg:py-20 relative overflow-hidden border-b border-white/5">
        {/* Sacred Geometry Silk Banner Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/inner-banner-bg.jpg"
            alt="Blog Post Background"
            fill
            priority
            className="object-cover object-center opacity-25 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020D0C]/90 via-[#041614]/80 to-[#0D2622]/85" />
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-[#059669]/15 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-xs text-[#10B981] font-semibold hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>

          <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-white bg-[#059669] px-3 py-1 rounded-full mb-3 shadow-md">
            {post.category}
          </span>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold !text-white leading-tight max-w-4xl tracking-tight drop-shadow-md">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mt-6 text-xs text-gray-300 border-t border-white/10 pt-4">
            <span className="flex items-center space-x-1.5">
              <User className="w-4 h-4 text-[#059669]" />
              <span>{post.author}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-[#059669]" />
              <span>{post.date}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-[#059669]" />
              <span>{post.readTime}</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. Main Article & Sidebar Grid */}
      <section className="py-16 max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Body */}
          <article className="lg:col-span-8 space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            {/* Featured Cover Image */}
            {post.image && (
              <div className="relative h-64 sm:h-[400px] w-full rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-white/10 bg-gray-100 dark:bg-white/5">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover object-center"
                  unoptimized={Boolean(post.image.startsWith('data:') || post.image.startsWith('http'))}
                />
              </div>
            )}

            {/* Excerpt Callout */}
            {post.excerpt && (
              <p className="text-base sm:text-lg font-medium text-[#041614] dark:text-white bg-emerald-50/70 dark:bg-emerald-950/40 p-6 sm:p-7 rounded-2xl border-l-4 border-[#059669] shadow-sm leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Paragraphs */}
            <div className="space-y-5 pt-2">
              {post.content.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed whitespace-pre-line text-gray-600 dark:text-gray-300">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Bottom Navigation & Share */}
            <div className="pt-10 mt-10 border-t border-gray-200 dark:border-white/10 flex flex-wrap justify-between items-center gap-4">
              <Link
                href="/blog"
                className="btn-ditya-orange text-xs py-2 px-4 font-semibold shadow-md cursor-pointer inline-flex items-center space-x-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Read More Articles</span>
              </Link>

              <button
                onClick={() => openModal(`Blog Consultation: ${post.title}`)}
                className="text-xs font-bold text-[#059669] hover:underline cursor-pointer"
              >
                Discuss This Topic With Our Advisors →
              </button>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-7">
            {/* 1. Recent Posts Widget */}
            <div className="bg-[#FBFBFB] dark:bg-[#061A17] rounded-2xl p-6 border border-gray-200/80 dark:border-white/10 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 border-b border-gray-200/70 dark:border-white/10 pb-3">
                <Clock className="w-4 h-4 text-[#059669]" />
                <h3 className="text-sm font-extrabold text-[#041614] dark:text-white tracking-tight uppercase">
                  Recent Posts
                </h3>
              </div>

              <div className="space-y-4 pt-1">
                {recentPosts.map((r) => (
                  <div key={r.id} className="group flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#041614] dark:text-gray-200 group-hover:text-[#059669] dark:group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2">
                        <Link href={`/blog/${r.slug}`}>{r.title}</Link>
                      </h4>
                      <span className="text-[11px] text-gray-400 mt-1 block">{r.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Have Any Question? Widget */}
            <div className="bg-gradient-to-br from-[#020D0C] via-[#041614] to-[#0D2622] rounded-2xl p-7 text-white shadow-xl relative overflow-hidden border border-white/10 space-y-4">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#059669]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center space-x-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                  <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="text-[11px] font-bold text-[#10B981] uppercase tracking-wider">
                    Need Guidance?
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-white leading-tight">
                  Have Any Question?
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed">
                  Do you have any burning queries that you can’t wait to get answers to?
                </p>

                {/* Direct Contacts */}
                <div className="space-y-2.5 pt-1">
                  <a
                    href="tel:+919351090301"
                    className="flex items-center space-x-3 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-colors text-xs font-semibold text-white"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#059669] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-300 block uppercase font-bold">India HQ</span>
                      <span>+91-93510 90301</span>
                    </div>
                  </a>

                  <a
                    href="tel:+995555433091"
                    className="flex items-center space-x-3 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-colors text-xs font-semibold text-white"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#059669] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-[10px] text-blue-300 block uppercase font-bold">Georgia Desk</span>
                      <span>+995 555433091</span>
                    </div>
                  </a>

                  <a
                    href="mailto:groupditya@gmail.com"
                    className="flex items-center space-x-3 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-colors text-xs font-semibold text-white"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-[#041614]" />
                    </div>
                    <span className="truncate">bmcgenie@gmail.com</span>
                    <span className="truncate">groupditya@gmail.com</span>
                  </a>
                </div>

                <button
                  onClick={() => openModal(`Blog Inquiry: ${post.title}`)}
                  className="w-full btn-ditya-orange text-xs py-2.5 font-bold shadow-lg hover:shadow-xl cursor-pointer text-center block mt-2"
                >
                  Free Consultation
                </button>
              </div>
            </div>

            {/* 3. Categories Widget */}
            <div className="bg-[#FBFBFB] dark:bg-[#061A17] rounded-2xl p-6 border border-gray-200/80 dark:border-white/10 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 border-b border-gray-200/70 dark:border-white/10 pb-3">
                <Tag className="w-4 h-4 text-[#059669]" />
                <h3 className="text-sm font-extrabold text-[#041614] dark:text-white tracking-tight uppercase">
                  Categories
                </h3>
              </div>

              <div className="space-y-2 pt-1">
                {categories.map((c) => (
                  <Link
                    key={c.name}
                    href="/blog"
                    className="flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-[#059669] dark:hover:text-emerald-400 transition-colors"
                  >
                    <span>{c.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-200/80 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                      {c.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
