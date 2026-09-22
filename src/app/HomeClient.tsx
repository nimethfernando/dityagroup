'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Check,
  TrendingUp,
  Clock,
  Users,
  FileCheck,
  Award,
  ArrowRight,
  Sparkles,
  Share2,
  Binary,
  LineChart,
  Briefcase,
  Laptop,
  Globe2,
  Crown,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedCounter, AnimatedRadialProgress } from '@/components/AnimatedCounter';
import { useConsultation } from '@/contexts/ConsultationContext';
import { HomePageContent } from '@/lib/defaultPageContent';

interface HomeClientProps {
  content: HomePageContent;
}

export default function HomeClient({ content }: HomeClientProps) {
  const { openModal } = useConsultation();

  return (
    <div className="flex flex-col w-full overflow-hidden bg-white">
      {/* ============================================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative min-h-[780px] lg:min-h-[860px] flex flex-col justify-between bg-[#F8F9FA] overflow-hidden">
        {/* Background Graphic */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-banner.jpeg"
            alt="Ditya Group Ancient Wisdom & Modern Solutions"
            fill
            className="object-cover object-right lg:object-center"
            priority
          />
          {/* Subtle responsive overlay on mobile to ensure text readability */}
          <div className="absolute inset-0 bg-white/40 lg:bg-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent lg:from-white/75 lg:via-white/25 lg:to-transparent" />
        </div>

        {/* Hero Left Content Overlay */}
        <div className="relative z-10 max-w-[1140px] mx-auto px-4 w-full pt-16 lg:pt-24 pb-12 flex-1 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-xl space-y-6"
          >
            {/* Live Pulsing Tagline Badge */}
            <div className="inline-flex items-center space-x-2 text-[#059669] text-xs font-bold uppercase tracking-widest bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-emerald-200/80 shadow-[0_2px_12px_rgba(5,150,105,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse"></span>
              <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
              <span>{content.hero.tagline || 'Since 2018'}</span>
            </div>

            {/* Typography Stack */}
            <div>
              <span className="block text-xs font-bold tracking-[0.25em] text-[#041614] uppercase">
                {content.hero.superHeading || 'Code Your Destiny. Create Your Legacy.'}
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-extrabold text-[#041614] leading-[1.12] mt-2 tracking-tight">
                {content.hero.title || 'Ancient Wisdom. Modern Solutions.'}
              </h1>
              <span className="block text-2xl sm:text-3xl lg:text-[38px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#059669] mt-1 font-serif">
                {content.hero.subTitle || 'Limitless Possibilities.'}
              </span>
            </div>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg font-normal">
              {content.hero.description ||
                'We blend timeless sciences with modern innovations to help you gain clarity, create wealth, build connections and live a life of purpose and fulfillment.'}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="#services-section"
                className="btn-ditya-navy text-sm font-semibold shadow-md cursor-pointer group"
              >
                <span>{content.hero.exploreBtnText || 'Explore Our Services'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => openModal()}
                className="btn-ditya-orange text-sm font-semibold shadow-md cursor-pointer"
              >
                {content.hero.getStartedBtnText || 'Get Started'}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Hero Ornate Services Banner */}
        <div className="relative z-10 w-full bg-gradient-to-t from-white via-white/80 to-transparent pt-8 pb-4">
          <div className="max-w-[1140px] mx-auto px-4">
            <div className="flex items-center justify-center space-x-4 mb-3">
              <div className="h-[1px] w-16 sm:w-28 bg-[#C59B27]/40"></div>
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#041614] uppercase">
                ✦ Our Services ✦
              </span>
              <div className="h-[1px] w-16 sm:w-28 bg-[#C59B27]/40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. VISION & CORE VALUE SECTION */}
      {/* ============================================================ */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Image with Overlaid Glassmorphic Core Values Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-[490px] sm:h-[550px] w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                <Image
                  src="/images/core-values.jpg"
                  alt="Ditya Group Support & Operations"
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* Overlaid Modern Navy Core Values Card */}
              <div className="absolute -bottom-6 left-4 right-4 sm:left-6 sm:right-6 bg-[#020D0C]/95 backdrop-blur-xl text-white p-6 sm:p-7 rounded-2xl shadow-2xl border border-white/10">
                <div className="flex items-center justify-between mb-3.5">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">Our Core Value</h3>
                  <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-200">
                  <li className="flex items-center space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#059669] to-[#047857] flex items-center justify-center shrink-0 shadow-xs">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </span>
                    <span>{content.coreValues.bullet1 || 'Simplicity Creates Growth'}</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#059669] to-[#047857] flex items-center justify-center shrink-0 shadow-xs">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </span>
                    <span>{content.coreValues.bullet2 || 'Growth Through Better Systems'}</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#059669] to-[#047857] flex items-center justify-center shrink-0 shadow-xs">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </span>
                    <span>{content.coreValues.bullet3 || 'Customer-Focused Approach'}</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#059669] to-[#047857] flex items-center justify-center shrink-0 shadow-xs">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </span>
                    <span>{content.coreValues.bullet4 || 'Continuous Learning & Improvement'}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Vision Text & Dual Feature Cards */}
            <div className="lg:col-span-7 space-y-6 pt-10 lg:pt-0">
              <div className="space-y-2">
                <span className="inline-flex items-center space-x-2 text-xs font-bold text-[#059669] tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
                  <span>{content.coreValues.subtitle || 'Welcome to DITYA GROUP'}</span>
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-[#041614] leading-tight tracking-tight">
                  {content.coreValues.heading || 'Our Vision Is Creating Infinite Growth Possibilities'}
                </h2>
              </div>

              <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed">
                {content.coreValues.para1 ||
                  'If you’re like most ambitious individuals or business owners, you manage multiple roles at once—handling finances, operations, strategy, and execution. Managing everything alone can become overwhelming and limit your true growth potential. That’s where Ditya Group steps in.'}
              </p>

              <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed">
                {content.coreValues.para2 ||
                  'We provide integrated solutions across stock market guidance with live trading support, business growth, numerology & spiritual guidance, online doctor appointment services, math learning solutions, and coworking spaces—all designed to simplify your life and accelerate your success. Our approach combines practical expertise with deep insight to help you make powerful and aligned decisions.'}
              </p>

              {/* Dual Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                {/* Increase Growth Card */}
                <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#059669] to-[#10B981] text-white flex items-center justify-center mb-4 shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#041614] mb-1.5 group-hover:text-[#059669] transition-colors">
                    {content.coreValues.growthCardTitle || 'Increase Growth'}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {content.coreValues.growthCardDesc ||
                      'Partnering with Ditya Group leads to smarter decisions, higher productivity, and faster business success'}
                  </p>
                </div>

                {/* Save Time Card */}
                <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#059669] to-[#10B981] text-white flex items-center justify-center mb-4 shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#041614] mb-1.5 group-hover:text-[#059669] transition-colors">
                    {content.coreValues.timeCardTitle || 'Save Time'}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {content.coreValues.timeCardDesc ||
                      'With Ditya Group, you can streamline tasks and focus on growth while we handle the support systems'}
                  </p>
                </div>
              </div>

              {/* Founder Signoff */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h5 className="text-base font-bold text-[#041614]">
                    {content.coreValues.founderName || 'Aamitt Batra'}
                  </h5>
                  <p className="text-xs text-gray-500 font-medium">
                    {content.coreValues.founderRole || 'CEO & Founder Ditya Group'}
                  </p>
                </div>
                <div className="relative h-10 w-28 opacity-85">
                  <Image
                    src="/images/signature.png"
                    alt="Founder Signature"
                    fill
                    className="object-contain object-right"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. STATS COUNTER DOCK */}
      {/* ============================================================ */}
      <section className="py-12 bg-white">
        <div className="max-w-[1140px] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-12 shadow-[0_10px_35px_rgba(1,22,51,0.06)]"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
              {/* Stat 1 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="flex flex-col items-center pt-4 lg:pt-0"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center mb-3 shadow-xs">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-3xl sm:text-4xl font-black text-[#041614] tracking-tight">
                  <AnimatedCounter value={content.stats.stat1Number || '500 +'} />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-gray-500 mt-1">
                  {content.stats.stat1Label || 'Happy Clients'}
                </span>
              </motion.div>

              {/* Stat 2 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex flex-col items-center pt-4 lg:pt-0"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center mb-3 shadow-xs">
                  <FileCheck className="w-6 h-6" />
                </div>
                <span className="text-3xl sm:text-4xl font-black text-[#041614] tracking-tight">
                  <AnimatedCounter value={content.stats.stat2Number || '3,000 +'} />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-gray-500 mt-1">
                  {content.stats.stat2Label || 'Projects & Solutions Delivered'}
                </span>
              </motion.div>

              {/* Stat 3 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex flex-col items-center pt-4 lg:pt-0"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center mb-3 shadow-xs">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-3xl sm:text-4xl font-black text-[#041614] tracking-tight">
                  <AnimatedCounter value={content.stats.stat3Number || '15'} />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-gray-500 mt-1">
                  {content.stats.stat3Label || 'Years Of Experience'}
                </span>
              </motion.div>

              {/* Stat 4 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex flex-col items-center pt-4 lg:pt-0"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center mb-3 shadow-xs">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-3xl sm:text-4xl font-black text-[#041614] tracking-tight">
                  <AnimatedCounter value={content.stats.stat4Number || '72'} />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-gray-500 mt-1">
                  {content.stats.stat4Label || 'Team Members'}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. OUR BUSINESS 6-HOUSE BENTO GRID */}
      {/* ============================================================ */}
      <section id="services-section" className="py-24 bg-[#F8F9FB] relative overflow-hidden">
        {/* Subtle Sacred Geometry / Modern Luxury Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/services-bg.jpg"
            alt="Services background pattern"
            fill
            className="object-cover object-center opacity-30 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F8F9FB] via-transparent to-[#F8F9FB]" />
        </div>

        <div className="max-w-[1140px] mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="inline-flex items-center space-x-2 text-xs font-bold text-[#059669] tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
                <span>Our Business</span>
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold text-[#041614] mt-3 tracking-tight">
                We Provide Smart & Integrated Business Solutions
              </h2>
            </div>
            <Link
              href="/services"
              className="btn-ditya-orange text-sm font-semibold shadow-md cursor-pointer shrink-0"
            >
              View all Business
            </Link>
          </div>

          {/* Luxury Bento Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Ditya Networking House */}
            <Link
              href="/global-business-network"
              className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#059669] group-hover:bg-gradient-to-br group-hover:from-[#059669] group-hover:to-[#047857] group-hover:text-white transition-all flex items-center justify-center mb-6 shadow-xs">
                  <Share2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#041614] mb-3 group-hover:text-[#059669] transition-colors">
                  Ditya Networking House
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We provide expert guidance in stock market and live trading support to help you
                  grow and manage your wealth with confidence.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-[#059669] uppercase tracking-wider">
                <span>Explore House</span>
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>

            {/* Card 2: Ditya Astro Verse */}
            <Link
              href="/ditya-astroverse"
              className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#059669] group-hover:bg-gradient-to-br group-hover:from-[#059669] group-hover:to-[#047857] group-hover:text-white transition-all flex items-center justify-center mb-6 shadow-xs">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#041614] mb-3 group-hover:text-[#059669] transition-colors">
                  Ditya Astro Verse
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Our numerology and spiritual guidance services help you align your decisions,
                  timing, and energy for better life and business outcomes.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-[#059669] uppercase tracking-wider">
                <span>Explore House</span>
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>

            {/* Card 3: Ditya Math House */}
            <Link
              href="/ditya-math-house"
              className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#059669] group-hover:bg-gradient-to-br group-hover:from-[#059669] group-hover:to-[#047857] group-hover:text-white transition-all flex items-center justify-center mb-6 shadow-xs">
                  <Binary className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#041614] mb-3 group-hover:text-[#059669] transition-colors">
                  Ditya Math House
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We provide structured math support and learning solutions to improve clarity,
                  performance, and confidence for students.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-[#059669] uppercase tracking-wider">
                <span>Explore House</span>
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>

            {/* Card 4: Ditya Trading House */}
            <Link
              href="/ditya-trading-house"
              className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#059669] group-hover:bg-gradient-to-br group-hover:from-[#059669] group-hover:to-[#047857] group-hover:text-white transition-all flex items-center justify-center mb-6 shadow-xs">
                  <LineChart className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#041614] mb-3 group-hover:text-[#059669] transition-colors">
                  Ditya Trading House
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We help individuals understand financial markets with practical learning, market
                  awareness, and guided support.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-[#059669] uppercase tracking-wider">
                <span>Explore House</span>
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>

            {/* Card 5: Ditya Business House */}
            <Link
              href="/ditya-business-house"
              className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#059669] group-hover:bg-gradient-to-br group-hover:from-[#059669] group-hover:to-[#047857] group-hover:text-white transition-all flex items-center justify-center mb-6 shadow-xs">
                  <Briefcase className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#041614] mb-3 group-hover:text-[#059669] transition-colors">
                  Ditya Business House
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We offer easy business consultancy, growth planning, and strategic support where we
                  provide expert guidance and complete assistance for better performance.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-[#059669] uppercase tracking-wider">
                <span>Explore House</span>
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>

            {/* Card 6: Ditya Tech House */}
            <Link
              href="/ditya-tech-house"
              className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#059669] group-hover:bg-gradient-to-br group-hover:from-[#059669] group-hover:to-[#047857] group-hover:text-white transition-all flex items-center justify-center mb-6 shadow-xs">
                  <Laptop className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#041614] mb-3 group-hover:text-[#059669] transition-colors">
                  Ditya Tech House
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We deliver complex software development, digital solutions, AI and technical
                  support to help businesses grow in the digital world.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-[#059669] uppercase tracking-wider">
                <span>Explore House</span>
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4.5. GLOBAL BUSINESS NETWORK (GBN) SHOWCASE */}
      {/* ============================================================ */}
      <section className="py-24 bg-[#070B19] text-white relative overflow-hidden border-y border-[#C5A059]/20">
        {/* Subtle Navy / Gold Background Radial Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#132A52]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,160,89,0.15),rgba(255,255,255,0))] pointer-events-none" />

        <div className="max-w-[1140px] mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-[#C5A059]/15 border border-[#C5A059]/35 px-4 py-1.5 rounded-full">
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
                Global Business Network (GBN)
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold !text-white tracking-tight leading-tight drop-shadow-md">
              Expand Your Reach.{' '}
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] bg-clip-text text-transparent">
                Connect with Industry Leaders
              </span>{' '}
              Worldwide.
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
              The Global Business Network is a premier community designed for ambitious
              entrepreneurs, executives, and business owners. We bridge the gap between local
              expertise and global opportunities by fostering powerful collaborations, sharing
              actionable market insights, and providing a trusted ecosystem for sustainable business
              growth.
            </p>
          </div>

          {/* 3-Card Signature Feature Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-14">
            {/* Card 1: Strategic Networking */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#0B162C] to-[#081021] border border-[#C5A059]/25 hover:border-[#C5A059] shadow-xl hover:shadow-[0_15px_40px_rgba(197,160,89,0.15)] transition-all duration-300 group hover:-translate-y-2 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#D4AF37] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#C5A059] group-hover:text-[#070B19] transition-all">
                  <Globe2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold !text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                  Strategic Networking
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed font-normal">
                  Connect with high-net-worth individuals, investors, and elite professionals across
                  international markets to build partnerships that matter.
                </p>
              </div>
              <div className="pt-6 border-t border-white/5 flex items-center text-xs font-bold text-[#D4AF37] tracking-wider uppercase">
                <span>International Cohorts</span>
              </div>
            </div>

            {/* Card 2: Global Market Insights */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#0B162C] to-[#081021] border border-[#C5A059]/25 hover:border-[#C5A059] shadow-xl hover:shadow-[0_15px_40px_rgba(197,160,89,0.15)] transition-all duration-300 group hover:-translate-y-2 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#D4AF37] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#C5A059] group-hover:text-[#070B19] transition-all">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold !text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                  Global Market Insights
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed font-normal">
                  Gain access to exclusive resources, trends, and strategies to help your business
                  scale across borders seamlessly.
                </p>
              </div>
              <div className="pt-6 border-t border-white/5 flex items-center text-xs font-bold text-[#D4AF37] tracking-wider uppercase">
                <span>Cross-Border Scaling</span>
              </div>
            </div>

            {/* Card 3: Exclusive Events & Cohorts */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#0B162C] to-[#081021] border border-[#C5A059]/25 hover:border-[#C5A059] shadow-xl hover:shadow-[0_15px_40px_rgba(197,160,89,0.15)] transition-all duration-300 group hover:-translate-y-2 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#D4AF37] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#C5A059] group-hover:text-[#070B19] transition-all">
                  <Crown className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold !text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                  Exclusive Events & Cohorts
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed font-normal">
                  Participate in private networking events, mastermind sessions, and specialized
                  cohorts (like the Elite Council) designed to accelerate your growth.
                </p>
              </div>
              <div className="pt-6 border-t border-white/5 flex items-center text-xs font-bold text-[#D4AF37] tracking-wider uppercase">
                <span>Elite Council & Masterminds</span>
              </div>
            </div>
          </div>

          {/* Membership Tiers Quick Banner & Action CTA */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0B162C] via-[#0E1E3B] to-[#0B162C] border border-[#C5A059]/40 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="text-xs font-bold bg-[#C5A059]/20 text-[#D4AF37] px-3 py-1 rounded-full border border-[#C5A059]/30">
                  GBN Circle (₹20L+ Turnover)
                </span>
                <span className="text-xs font-bold bg-[#D4AF37]/25 text-[#FFF] px-3 py-1 rounded-full border border-[#D4AF37]/40">
                  GBN Elite Council (₹5Cr+ Turnover)
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold !text-white tracking-tight">
                Ready to Expand into High-Trust Global Networks?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-normal">
                Join our vetted circle of visionary entrepreneurs and scale your brand internationally.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0">
              <Link
                href="/contact-us?service=GBN%20Circle"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-xl font-extrabold text-sm text-[#070B19] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] hover:from-[#F3E5AB] hover:to-[#D4AF37] shadow-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                Join the Network / Become a Member
              </Link>
              <Link
                href="/global-business-network"
                className="w-full sm:w-auto text-center px-6 py-4 rounded-xl font-bold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#C5A059] transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Explore GBN Page</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. WHY CHOOSE US SECTION */}
      {/* ============================================================ */}
      <section className="py-24 bg-white">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Image with Overlaid Testimonial Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative h-[490px] sm:h-[530px] w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                <Image
                  src="/images/why-choose-us.jpg"
                  alt="Why Choose Ditya Group"
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* Overlaid Testimonial Card */}
              <div className="absolute -bottom-6 left-4 right-4 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-xl p-6 sm:p-7 rounded-2xl shadow-2xl border-l-4 border-[#059669] border-t border-r border-b border-gray-100">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic">
                  {content.whyChooseUs.testimonialQuote ||
                    '“Working with Ditya Group has been a game changer. Their guidance in trading, numerology, and business support made decision-making easier and more effective. Everything is well-managed and results are clearly visible. Truly worth the investment and their other services.”'}
                </p>
                <div className="flex items-center space-x-2 mt-3">
                  <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
                  <h5 className="text-sm font-bold text-[#041614]">
                    {content.whyChooseUs.testimonialAuthor || 'Aditya Malhotra'}
                  </h5>
                </div>
              </div>
            </div>

            {/* Right Column: Content & Dynamic Radial Indicators */}
            <div className="lg:col-span-6 space-y-6 pt-8 lg:pt-0">
              <div className="space-y-2">
                <span className="inline-flex items-center space-x-2 text-xs font-bold text-[#059669] tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
                  <span>{content.whyChooseUs.subtitle || 'Why Choose Us'}</span>
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-[#041614] leading-tight tracking-tight">
                  {content.whyChooseUs.heading || 'Why Choose US'}
                </h2>
              </div>

              <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed">
                {content.whyChooseUs.description ||
                  'Ditya Group handles everything that slows down your growth journey. From financial guidance to essential services, we simplify your path so you can focus on achieving bigger goals. Let us manage what supports your success while you move ahead with clarity.'}
              </p>

              {/* Radial Indicators Side by Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3">
                {/* 95% Progress Indicator */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="space-y-3 flex flex-col items-start p-5 rounded-2xl bg-[#F8F9FA] border border-gray-100 shadow-xs"
                >
                  <AnimatedRadialProgress
                    percentage={content.whyChooseUs.metric1Percent || '95%'}
                  />
                  <h4 className="text-base sm:text-lg font-bold text-[#041614] leading-snug">
                    {content.whyChooseUs.metric1Title || 'Limited Growth Approach'}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {content.whyChooseUs.metric1Desc ||
                      'Managing everything alone or relying on traditional methods can slow down decisions, reduce efficiency, and limit your true potential.'}
                  </p>
                </motion.div>

                {/* 100% Progress Indicator */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-3 flex flex-col items-start p-5 rounded-2xl bg-[#F8F9FA] border border-gray-100 shadow-xs"
                >
                  <AnimatedRadialProgress
                    percentage={content.whyChooseUs.metric2Percent || '100%'}
                  />
                  <h4 className="text-base sm:text-lg font-bold text-[#041614] leading-snug">
                    {content.whyChooseUs.metric2Title || 'Ditya Smart System'}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {content.whyChooseUs.metric2Desc ||
                      'An integrated system of trading guidance, numerology insights, and essential services designed to give you clarity, speed, and complete growth support.'}
                  </p>
                </motion.div>
              </div>

              {/* Free Consultation Button */}
              <div className="pt-2">
                <button
                  onClick={() => openModal()}
                  className="btn-ditya-orange text-sm font-semibold shadow-md cursor-pointer"
                >
                  Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. HOW IT WORKS SECTION */}
      {/* ============================================================ */}
      <section className="py-24 bg-[#F8F9FB] border-t border-gray-100 relative overflow-hidden">
        {/* Roadmap Subtle Network Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/roadmap-bg.jpg"
            alt="Roadmap background pattern"
            fill
            className="object-cover object-center opacity-35 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F8F9FB]/90 via-transparent to-[#F8F9FB]/90" />
        </div>

        <div className="max-w-[1140px] mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center space-x-2 text-xs font-bold text-[#059669] tracking-wider uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
            <span>{content.howItWorks.subtitle || 'How It Works'}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold text-[#041614] mt-2 mb-4 tracking-tight">
            {content.howItWorks.heading || 'How Ditya Group Personalized Approach Works'}
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto mb-16 leading-relaxed">
            {content.howItWorks.description ||
              'Ditya Group provides integrated solutions across finance, numerology, and all other essential services. Our personalized approach helps you make better decisions, simplify tasks, and grow faster with clarity.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left relative">
            {/* Step 01 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 relative group hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] font-black text-sm flex items-center justify-center font-mono">
                  01
                </span>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Step One</span>
              </div>
              <h4 className="text-lg font-bold text-[#041614] mb-2 group-hover:text-[#059669] transition-colors">
                {content.howItWorks.step1Title || 'Book a Session'}
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                {content.howItWorks.step1Desc ||
                  'Connect with our expert team for one-on-one initial guidance and customized planning.'}
              </p>
            </div>

            {/* Step 02 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 relative group hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] font-black text-sm flex items-center justify-center font-mono">
                  02
                </span>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Step Two</span>
              </div>
              <h4 className="text-lg font-bold text-[#041614] mb-2 group-hover:text-[#059669] transition-colors">
                {content.howItWorks.step2Title || 'Choose Your Service'}
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                {content.howItWorks.step2Desc ||
                  'Select from our 6 specialized Houses to fit your precise personal or business needs.'}
              </p>
            </div>

            {/* Step 03 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 relative group hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] font-black text-sm flex items-center justify-center font-mono">
                  03
                </span>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Step Three</span>
              </div>
              <h4 className="text-lg font-bold text-[#041614] mb-2 group-hover:text-[#059669] transition-colors">
                {content.howItWorks.step3Title || 'Start Your Journey'}
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                {content.howItWorks.step3Desc ||
                  'Launch with structured support, active mentorship, and experience tangible results.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. CONSULTATION CALLOUT BANNER */}
      {/* ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="bg-gradient-to-r from-[#020D0C] via-[#041614] to-[#0D2622] text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
            {/* Background Sacred Geometry Graphic */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <Image
                src="/images/consultation-banner-bg.jpg"
                alt="Consultation Background Pattern"
                fill
                className="object-cover object-center opacity-40 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#001025]/85 via-[#011633]/75 to-[#0d274c]/85" />
            </div>

            {/* Ambient Accent Light */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#059669]/15 rounded-full blur-3xl pointer-events-none z-0" />

            <div className="max-w-2xl space-y-3 relative z-10">
              <span className="text-xs font-bold tracking-widest uppercase text-[#059669] inline-flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
                <span>{content.consultationBanner.badge || 'Need Clarification?'}</span>
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-snug tracking-tight">
                {content.consultationBanner.heading ||
                  'Still Confused About Our Features? Get A Consultation'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {content.consultationBanner.description ||
                  'If you’re unsure about our services, don’t worry! We offer consultations to guide you with complete clarity. Our team provides the right support across trading, numerology, and essential services to help you make confident decisions.'}
              </p>
            </div>
            <button
              onClick={() => openModal()}
              className="btn-ditya-orange text-sm font-bold shadow-xl shrink-0 cursor-pointer relative z-10"
            >
              {content.consultationBanner.btnText || 'Start Consultation'}
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. LATEST BLOG & ARTICLES PREVIEW WITH MODERN IMAGES */}
      {/* ============================================================ */}
      <section className="py-24 bg-[#F8F9FB] border-t border-gray-100">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-flex items-center space-x-2 text-xs font-bold text-[#059669] tracking-wider uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
              <span>Our Blog</span>
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold text-[#041614] mt-2 tracking-tight">
              Latest Blog & Articles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <article className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src="/images/blog-bay-leaf.jpg"
                    alt="Money Attraction Remedy Using Bay Leaf"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold text-[#059669] bg-white/95 backdrop-blur-md uppercase tracking-wider shadow-sm">
                      Ditya Astroverse
                    </span>
                  </div>
                </div>
                <div className="p-7 space-y-3">
                  <h3 className="text-lg font-bold text-[#041614] group-hover:text-[#059669] transition-colors line-clamp-2">
                    <Link href="/blog/most-powerful-money-attraction-remedy-using-bay-leaf-for-wealth-and-success">
                      Most Powerful Money Attraction Remedy Using Bay Leaf for Wealth and Success
                    </Link>
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                    Discover how ancient bay leaf rituals combined with numerical frequency can open
                    doors to abundance and financial clarity.
                  </p>
                </div>
              </div>
              <div className="px-7 pb-6 pt-2 border-t border-gray-100">
                <Link
                  href="/blog/most-powerful-money-attraction-remedy-using-bay-leaf-for-wealth-and-success"
                  className="text-xs font-bold text-[#059669] inline-flex items-center space-x-1.5 hover:underline uppercase tracking-wider"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>

            {/* Blog Post 2 */}
            <article className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src="/images/blog-crystal-salt.jpg"
                    alt="Remedy to Remove Negative Energy"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold text-[#059669] bg-white/95 backdrop-blur-md uppercase tracking-wider shadow-sm">
                      Ditya Astroverse
                    </span>
                  </div>
                </div>
                <div className="p-7 space-y-3">
                  <h3 className="text-lg font-bold text-[#041614] group-hover:text-[#059669] transition-colors line-clamp-2">
                    <Link href="/blog/powerful-remedy-to-remove-negative-energy-and-attract-success-in-life">
                      Powerful Remedy to Remove Negative Energy and Attract Success in Life
                    </Link>
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                    Salt water energy cleansing rituals and spatial remedies designed to eliminate
                    blocks, emotional stress, and obstacles.
                  </p>
                </div>
              </div>
              <div className="px-7 pb-6 pt-2 border-t border-gray-100">
                <Link
                  href="/blog/powerful-remedy-to-remove-negative-energy-and-attract-success-in-life"
                  className="text-xs font-bold text-[#059669] inline-flex items-center space-x-1.5 hover:underline uppercase tracking-wider"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>

            {/* Blog Post 3 */}
            <article className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src="/images/blog-copper-water.jpg"
                    alt="Simple Morning Remedy to Attract Money"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold text-[#059669] bg-white/95 backdrop-blur-md uppercase tracking-wider shadow-sm">
                      Ditya Astroverse
                    </span>
                  </div>
                </div>
                <div className="p-7 space-y-3">
                  <h3 className="text-lg font-bold text-[#041614] group-hover:text-[#059669] transition-colors line-clamp-2">
                    <Link href="/blog/simple-morning-remedy-to-attract-money-clarity-and-positive-energy">
                      Simple Morning Remedy to Attract Money, Clarity and Positive Energy
                    </Link>
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                    Harness copper water solar charging to boost mental sharpness, metabolic harmony,
                    and purposeful daily alignment.
                  </p>
                </div>
              </div>
              <div className="px-7 pb-6 pt-2 border-t border-gray-100">
                <Link
                  href="/blog/simple-morning-remedy-to-attract-money-clarity-and-positive-energy"
                  className="text-xs font-bold text-[#059669] inline-flex items-center space-x-1.5 hover:underline uppercase tracking-wider"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
