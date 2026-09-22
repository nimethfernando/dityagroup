'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  Clock,
  Phone,
  Mail,
  HelpCircle,
  Sparkles,
  Tag,
  Search,
  BookOpen,
} from 'lucide-react';
import { useConsultation } from '@/contexts/ConsultationContext';

export interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  image?: string;
}

interface BlogListingClientProps {
  initialPosts: BlogPostItem[];
}

export default function BlogListingClient({ initialPosts }: BlogListingClientProps) {
  const { openModal } = useConsultation();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique categories and counts
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    initialPosts.forEach((post) => {
      const cat = post.category || 'General';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [initialPosts]);

  const categories = useMemo(() => Object.keys(categoriesWithCounts), [categoriesWithCounts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'ALL' || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  // Recent posts for sidebar (first 3)
  const recentPosts = initialPosts.slice(0, 3);

  return (
    <div className="pb-20 bg-[#FBFBFB]">
      {/* 1. Page Banner */}
      <section className="bg-gradient-to-r from-[#020D0C] via-[#041614] to-[#0D2622] text-white py-20 text-center relative overflow-hidden border-b border-white/5">
        {/* Sacred Geometry Silk Banner Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/inner-banner-bg.jpg"
            alt="Blog Banner Background"
            fill
            priority
            className="object-cover object-center opacity-25 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020D0C]/90 via-[#041614]/80 to-[#0D2622]/85" />
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-[#059669]/15 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="max-w-[1140px] mx-auto px-4 relative z-10">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 mb-3.5 shadow-sm">
            <span className="text-xs font-bold text-[#10B981] tracking-widest uppercase">
              Knowledge & Insights
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Blog
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-xl mx-auto mt-3 font-normal leading-relaxed">
            Dive into our blog and explore its captivating content!
          </p>
        </div>
      </section>

      {/* 2. Main Content & Sidebar Grid */}
      <section className="py-16 lg:py-20 max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Column: Articles List */}
          <div className="lg:col-span-8 space-y-8">
            {/* Category Filter Pills & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setSelectedCategory('ALL')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === 'ALL'
                      ? 'bg-[#059669] text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  All ({initialPosts.length})
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#059669] text-white shadow-md'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {cat} ({categoriesWithCounts[cat]})
                  </button>
                ))}
              </div>

              {/* Live Search */}
              <div className="relative w-full sm:w-60 shrink-0">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-full focus:outline-none focus:border-[#059669]"
                />
              </div>
            </div>

            {/* Articles Grid */}
            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm space-y-3">
                <BookOpen className="w-10 h-10 text-gray-300 mx-auto" />
                <h3 className="text-base font-bold text-gray-700">No Content Available</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  No articles matched your filter criteria. Try resetting the category or search query.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('ALL');
                    setSearchQuery('');
                  }}
                  className="btn-ditya-orange text-xs py-2 px-4 inline-flex items-center space-x-1.5 cursor-pointer mt-2"
                >
                  <span>Reset Filters</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                        <Image
                          src={post.image || '/images/hero-banner.jpeg'}
                          alt={post.title}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute top-3.5 left-3.5 z-10">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-white bg-[#059669] px-2.5 py-1 rounded-full shadow-md">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-3">
                        <div className="flex items-center space-x-3 text-[11px] text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3 text-[#059669]" />
                            <span>{post.date}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-[#059669]" />
                            <span>{post.readTime}</span>
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-[#041614] leading-snug group-hover:text-[#059669] transition-colors line-clamp-2">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>

                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 pb-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-xs font-bold text-[#059669] hover:underline inline-flex items-center space-x-1.5 uppercase tracking-wider"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-7">
            {/* 1. Recent Posts Widget */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
                <Clock className="w-4 h-4 text-[#059669]" />
                <h3 className="text-sm font-extrabold text-[#041614] tracking-tight uppercase">
                  Recent Posts
                </h3>
              </div>

              <div className="space-y-4 pt-1">
                {recentPosts.map((post) => (
                  <div key={post.id} className="group flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-[#059669] mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#041614] group-hover:text-[#059669] transition-colors leading-snug line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h4>
                      <span className="text-[11px] text-gray-400 mt-1 block">
                        {post.date}
                      </span>
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
                    <span className="truncate">groupditya@gmail.com</span>
                  </a>
                </div>

                <button
                  onClick={() => openModal('Blog Sidebar Consultation')}
                  className="w-full btn-ditya-orange text-xs py-2.5 font-bold shadow-lg hover:shadow-xl cursor-pointer text-center block mt-2"
                >
                  Free Consultation
                </button>
              </div>
            </div>

            {/* 3. Categories Widget */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
                <Tag className="w-4 h-4 text-[#059669]" />
                <h3 className="text-sm font-extrabold text-[#041614] tracking-tight uppercase">
                  Categories
                </h3>
              </div>

              <div className="space-y-2 pt-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                      selectedCategory === cat
                        ? 'bg-emerald-50 text-[#059669] border border-emerald-200'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {categoriesWithCounts[cat]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
