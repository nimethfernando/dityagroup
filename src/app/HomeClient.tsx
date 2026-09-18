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
    <div className="flex flex-col w-full overflow-hidden">
      {/* ============================================================ */}
      {/* 1. HERO SECTION (Screenshot 1) */}
      {/* ============================================================ */}
      <section className="relative min-h-[750px] lg:min-h-[850px] flex flex-col justify-between bg-[#F8F9FA] overflow-hidden">
        {/* Background Graphic */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-banner.jpeg"
            alt="Ditya Group Ancient Wisdom & Modern Solutions"
            fill
            className="object-cover object-center lg:object-[center_18%]"
            className="object-cover object-right lg:object-center"
            priority
          />
          {/* Subtle responsive overlay on mobile to ensure text readability */}
          <div className="absolute inset-0 bg-white/40 lg:bg-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent lg:from-white/70 lg:via-white/20 lg:to-transparent" />
        </div>

        {/* Hero Left Content Overlay */}
        <div className="relative z-10 max-w-[1140px] mx-auto px-4 w-full pt-16 lg:pt-24 pb-12 flex-1 flex items-center">
          <div className="max-w-xl space-y-6">
            <div className="inline-flex items-center space-x-2 text-[#FF5722] text-xs font-semibold uppercase tracking-widest bg-orange-50/80 px-3 py-1 rounded-full backdrop-blur-sm border border-orange-200/50">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-xl space-y-6"
          >
            <div className="inline-flex items-center space-x-2 text-[#FF5722] text-xs font-semibold uppercase tracking-widest bg-orange-50/90 px-3.5 py-1.5 rounded-full backdrop-blur-sm border border-orange-200/60 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{content.hero.tagline || 'Since 2018'}</span>
            </div>

            <div>
              <span className="block text-xs font-bold tracking-[0.25em] text-[#011633] uppercase">
                {content.hero.superHeading || 'Code Your Destiny. Create Your Legacy.'}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#011633] leading-[1.15] mt-2">
                {content.hero.title || 'Ancient Wisdom. Modern Solutions.'}
              </h1>
              <span className="block text-2xl sm:text-3xl lg:text-[38px] font-bold text-[#B8860B] mt-1 font-serif">
                {content.hero.subTitle || 'Limitless Possibilities.'}
              </span>
            </div>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-lg font-medium">
              {content.hero.description ||
                'We blend timeless sciences with modern innovations to help you gain clarity, create wealth, build connections and live a life of purpose and fulfillment.'}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="#services-section"
                className="bg-[#011633] hover:bg-[#FF5722] text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-xl inline-flex items-center space-x-3 cursor-pointer"
              >
                <span>{content.hero.exploreBtnText || 'Explore Our Services'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => openModal()}
                className="btn-ditya-orange text-sm font-semibold shadow-md cursor-pointer"
              >
                {content.hero.getStartedBtnText || 'Get Started'}
              </button>
            </div>
          </div>
          </motion.div>
        </div>

        {/* Bottom Hero Ornate Services Banner */}
        <div className="relative z-10 w-full bg-gradient-to-t from-white via-white/80 to-transparent pt-8 pb-4">
          <div className="max-w-[1140px] mx-auto px-4">
            <div className="flex items-center justify-center space-x-4 mb-3">
              <div className="h-[1px] w-16 sm:w-28 bg-[#C59B27]/40"></div>
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#011633] uppercase">
                ✦ Our Services ✦
              </span>
              <div className="h-[1px] w-16 sm:w-28 bg-[#C59B27]/40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. VISION & CORE VALUE SECTION (Screenshot 2) */}
      {/* ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Image with Overlaid Navy Core Values Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-[480px] sm:h-[540px] w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                <Image
                  src="/images/core-values.jpg"
                  alt="Ditya Group Support & Operations"
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* Overlaid Navy Core Values Card */}
              <div className="absolute -bottom-6 left-4 right-4 sm:left-6 sm:right-6 bg-[#011633] text-white p-6 sm:p-7 rounded-asymmetric shadow-2xl border border-white/10">
                <h3 className="text-lg font-bold text-white mb-3">Our Core Value</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-200">
                  <li className="flex items-center space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#FF5722] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </span>
                    <span>{content.coreValues.bullet1 || 'Simplicity Creates Growth'}</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#FF5722] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </span>
                    <span>{content.coreValues.bullet2 || 'Growth Through Better Systems'}</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#FF5722] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </span>
                    <span>{content.coreValues.bullet3 || 'Customer-Focused Approach'}</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#FF5722] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </span>
                    <span>{content.coreValues.bullet4 || 'Continuous Learning & Improvement'}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Vision Text & Dual Feature Cards */}
            <div className="lg:col-span-7 space-y-6 pt-8 lg:pt-0">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#FF5722] tracking-wider uppercase flex items-center space-x-2">
                  <span className="w-6 h-[2px] bg-[#FF5722]"></span>
                  <span>{content.coreValues.subtitle || 'Welcome to DITYA GROUP'}</span>
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-[#011633] leading-tight">
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
                <div className="p-5 border border-gray-200 rounded-asymmetric bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-[#FF5722] text-white flex items-center justify-center mb-3.5">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#011633] mb-1.5">
                    {content.coreValues.growthCardTitle || 'Increase Growth'}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {content.coreValues.growthCardDesc ||
                      'Partnering with Ditya Group leads to smarter decisions, higher productivity, and faster business success'}
                  </p>
                </div>

                {/* Save Time Card */}
                <div className="p-5 border border-gray-200 rounded-asymmetric bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-[#FF5722] text-white flex items-center justify-center mb-3.5">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#011633] mb-1.5">
                    {content.coreValues.timeCardTitle || 'Save Time'}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {content.coreValues.timeCardDesc ||
                      'With Ditya Group, you can streamline tasks and focus on growth while we handle the support systems'}
                  </p>
                </div>
              </div>

              {/* Founder Signoff */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h5 className="text-base font-bold text-[#011633]">
                    {content.coreValues.founderName || 'Aamitt Batra'}
                  </h5>
                  <p className="text-xs text-gray-500 font-medium">
                    {content.coreValues.founderRole || 'CEO & Founder Ditya Group'}
                  </p>
                </div>
                <div className="relative h-10 w-28 opacity-80">
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
      {/* 3. STATS COUNTER BAR (Screenshot 3) */}
      {/* ============================================================ */}
      <section className="py-10 bg-white">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="bg-[#F9F9F9] rounded-asymmetric border border-gray-200/80 p-8 sm:p-10 shadow-sm">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="bg-[#F9F9F9] rounded-asymmetric border border-gray-200/80 p-8 sm:p-10 shadow-sm"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-gray-200/80">
              {/* Stat 1 */}
              <div className="flex flex-col items-center pt-4 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="flex flex-col items-center pt-4 lg:pt-0"
              >
                <div className="w-12 h-12 rounded-full bg-orange-100 text-[#FF5722] flex items-center justify-center mb-3">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#011633] tracking-tight">
                  {content.stats.stat1Number || '500 +'}
                  <AnimatedCounter value={content.stats.stat1Number || '500 +'} />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-gray-500 mt-1">
                  {content.stats.stat1Label || 'Happy Clients'}
                </span>
              </div>
              </motion.div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center pt-4 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex flex-col items-center pt-4 lg:pt-0"
              >
                <div className="w-12 h-12 rounded-full bg-orange-100 text-[#FF5722] flex items-center justify-center mb-3">
                  <FileCheck className="w-6 h-6" />
                </div>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#011633] tracking-tight">
                  {content.stats.stat2Number || '3,000 +'}
                  <AnimatedCounter value={content.stats.stat2Number || '3,000 +'} />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-gray-500 mt-1">
                  {content.stats.stat2Label || 'Projects & Solutions Delivered'}
                </span>
              </div>
              </motion.div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center pt-4 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex flex-col items-center pt-4 lg:pt-0"
              >
                <div className="w-12 h-12 rounded-full bg-orange-100 text-[#FF5722] flex items-center justify-center mb-3">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#011633] tracking-tight">
                  {content.stats.stat3Number || '15'}
                  <AnimatedCounter value={content.stats.stat3Number || '15'} />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-gray-500 mt-1">
                  {content.stats.stat3Label || 'Years Of Experience'}
                </span>
              </div>
              </motion.div>

              {/* Stat 4 */}
              <div className="flex flex-col items-center pt-4 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex flex-col items-center pt-4 lg:pt-0"
              >
                <div className="w-12 h-12 rounded-full bg-orange-100 text-[#FF5722] flex items-center justify-center mb-3">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#011633] tracking-tight">
                  {content.stats.stat4Number || '72'}
                  <AnimatedCounter value={content.stats.stat4Number || '72'} />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-gray-500 mt-1">
                  {content.stats.stat4Label || 'Team Members'}
                </span>
              </div>
              </motion.div>
            </div>
          </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. OUR BUSINESS 6-HOUSE GRID (Screenshot 3 & 4) */}
      {/* ============================================================ */}
      <section id="services-section" className="py-20 bg-[#FBFBFB]">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
            <div>
              <span className="text-xs font-bold text-[#FF5722] tracking-wider uppercase flex items-center space-x-2">
                <span className="w-6 h-[2px] bg-[#FF5722]"></span>
                <span>Our Business</span>
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-[#011633] mt-2">
                We Provide Smart & Integrated Business Solutions
              </h2>
            </div>
            <Link
              href="/services"
              className="bg-[#FF5722] hover:bg-[#e64a19] text-white px-7 py-3 rounded-asymmetric font-semibold text-sm transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0"
            >
              View all Business
            </Link>
          </div>

          {/* Asymmetrical Staggered Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Ditya Networking House */}
            <Link
              href="/global-business-network"
              className="bg-white rounded-asymmetric p-8 border border-gray-200/70 shadow-sm card-hover flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#FF5722] group-hover:bg-[#FF5722] group-hover:text-white transition-colors flex items-center justify-center mb-6">
                  <Share2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#011633] mb-3 group-hover:text-[#FF5722] transition-colors">
                  Ditya Networking House
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We provide expert guidance in stock market and live trading support to help you
                  grow and manage your wealth with confidence.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-[#FF5722] uppercase tracking-wider">
                <span>Explore House</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 2: Ditya Astro Verse */}
            <Link
              href="/ditya-astroverse"
              className="bg-white rounded-asymmetric p-8 border border-gray-200/70 shadow-sm card-hover flex flex-col justify-between group lg:translate-y-4"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#FF5722] group-hover:bg-[#FF5722] group-hover:text-white transition-colors flex items-center justify-center mb-6">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#011633] mb-3 group-hover:text-[#FF5722] transition-colors">
                  Ditya Astro Verse
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Our numerology and spiritual guidance services help you align your decisions,
                  timing, and energy for better life and business outcomes.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-[#FF5722] uppercase tracking-wider">
                <span>Explore House</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 3: Ditya Math House */}
            <Link
              href="/ditya-math-house"
              className="bg-white rounded-asymmetric p-8 border border-gray-200/70 shadow-sm card-hover flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#FF5722] group-hover:bg-[#FF5722] group-hover:text-white transition-colors flex items-center justify-center mb-6">
                  <Binary className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#011633] mb-3 group-hover:text-[#FF5722] transition-colors">
                  Ditya Math House
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We provide structured math support and learning solutions to improve clarity,
                  performance, and confidence for students.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-[#FF5722] uppercase tracking-wider">
                <span>Explore House</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 4: Ditya Trading House */}
            <Link
              href="/ditya-trading-house"
              className="bg-white rounded-asymmetric p-8 border border-gray-200/70 shadow-sm card-hover flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#FF5722] group-hover:bg-[#FF5722] group-hover:text-white transition-colors flex items-center justify-center mb-6">
                  <LineChart className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#011633] mb-3 group-hover:text-[#FF5722] transition-colors">
                  Ditya Trading House
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We help individuals understand financial markets with practical learning, market
                  awareness, and guided support.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-[#FF5722] uppercase tracking-wider">
                <span>Explore House</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 5: Ditya Business House */}
            <Link
              href="/ditya-business-house"
              className="bg-white rounded-asymmetric p-8 border border-gray-200/70 shadow-sm card-hover flex flex-col justify-between group lg:translate-y-4"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#FF5722] group-hover:bg-[#FF5722] group-hover:text-white transition-colors flex items-center justify-center mb-6">
                  <Briefcase className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#011633] mb-3 group-hover:text-[#FF5722] transition-colors">
                  Ditya Business House
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We offer easy business consultancy, growth planning, and strategic support where we
                  provide expert guidance and complete assistance for better performance.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-[#FF5722] uppercase tracking-wider">
                <span>Explore House</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 6: Ditya Tech House */}
            <Link
              href="/ditya-tech-house"
              className="bg-white rounded-asymmetric p-8 border border-gray-200/70 shadow-sm card-hover flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#FF5722] group-hover:bg-[#FF5722] group-hover:text-white transition-colors flex items-center justify-center mb-6">
                  <Laptop className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#011633] mb-3 group-hover:text-[#FF5722] transition-colors">
                  Ditya Tech House
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We deliver complex software development, digital solutions, AI and technical
                  support to help businesses grow in the digital world.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-[#FF5722] uppercase tracking-wider">
                <span>Explore House</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. WHY CHOOSE US SECTION (Screenshot 5) */}
      {/* ============================================================ */}
      <section className="py-24 bg-white">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Image with Overlaid Testimonial Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative h-[480px] sm:h-[520px] w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                <Image
                  src="/images/why-choose-us.jpg"
                  alt="Why Choose Ditya Group"
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* Overlaid Testimonial Card */}
              <div className="absolute -bottom-6 left-4 right-4 sm:left-6 sm:right-6 bg-white p-6 sm:p-7 rounded-asymmetric shadow-2xl border-l-4 border-[#FF5722] border-t border-r border-b border-gray-100">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic">
                  {content.whyChooseUs.testimonialQuote ||
                    '“Working with Ditya Group has been a game changer. Their guidance in trading, numerology, and business support made decision-making easier and more effective. Everything is well-managed and results are clearly visible. Truly worth the investment and their other services.”'}
                </p>
                <h5 className="text-sm font-bold text-[#011633] mt-3">
                  {content.whyChooseUs.testimonialAuthor || 'Aditya Malhotra'}
                </h5>
              </div>
            </div>

            {/* Right Column: Why Choose Us Content & 95%/100% Radial Indicators */}
            <div className="lg:col-span-6 space-y-6 pt-8 lg:pt-0">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#FF5722] tracking-wider uppercase flex items-center space-x-2">
                  <span className="w-6 h-[2px] bg-[#FF5722]"></span>
                  <span>{content.whyChooseUs.subtitle || 'Why Choose Us'}</span>
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-[#011633] leading-tight">
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
                <div className="space-y-3">
                  <div className="w-24 h-24 rounded-full border-4 border-[#FF5722] flex items-center justify-center">
                    <span className="text-xl font-extrabold text-[#011633]">
                      {content.whyChooseUs.metric1Percent || '95%'}
                    </span>
                  </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="space-y-3 flex flex-col items-start"
                >
                  <AnimatedRadialProgress
                    percentage={content.whyChooseUs.metric1Percent || '95%'}
                  />
                  <h4 className="text-lg font-bold text-[#011633] leading-snug">
                    {content.whyChooseUs.metric1Title || 'Limited Growth Approach'}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {content.whyChooseUs.metric1Desc ||
                      'Managing everything alone or relying on traditional methods can slow down decisions, reduce efficiency, and limit your true potential.'}
                  </p>
                </div>
                </motion.div>

                {/* 100% Progress Indicator */}
                <div className="space-y-3">
                  <div className="w-24 h-24 rounded-full border-4 border-[#FF5722] flex items-center justify-center">
                    <span className="text-xl font-extrabold text-[#011633]">
                      {content.whyChooseUs.metric2Percent || '100%'}
                    </span>
                  </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-3 flex flex-col items-start"
                >
                  <AnimatedRadialProgress
                    percentage={content.whyChooseUs.metric2Percent || '100%'}
                  />
                  <h4 className="text-lg font-bold text-[#011633] leading-snug">
                    {content.whyChooseUs.metric2Title || 'Ditya Smart System'}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {content.whyChooseUs.metric2Desc ||
                      'An integrated system of trading guidance, numerology insights, and essential services designed to give you clarity, speed, and complete growth support.'}
                  </p>
                </div>
                </motion.div>
              </div>

              {/* Free Consultation Button */}
              <div className="pt-4">
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
      <section className="py-20 bg-[#F9F9F9] border-t border-gray-200/60">
        <div className="max-w-[1140px] mx-auto px-4 text-center">
          <span className="text-xs font-bold text-[#FF5722] tracking-wider uppercase inline-flex items-center space-x-2 justify-center">
            <span className="w-6 h-[2px] bg-[#FF5722]"></span>
            <span>{content.howItWorks.subtitle || 'How It Works'}</span>
            <span className="w-6 h-[2px] bg-[#FF5722]"></span>
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-[#011633] mt-2 mb-4">
            {content.howItWorks.heading || 'How Ditya Group Personalized Approach Works'}
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto mb-14 leading-relaxed">
            {content.howItWorks.description ||
              'Ditya Group provides integrated solutions across finance, numerology, and all other essential services. Our personalized approach helps you make better decisions, simplify tasks, and grow faster with clarity.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Step 01 */}
            <div className="bg-white rounded-asymmetric p-8 border border-gray-200/70 shadow-sm relative">
              <span className="text-4xl font-extrabold text-[#FF5722]/30 block mb-3 font-serif">
                01
              </span>
              <h4 className="text-lg font-bold text-[#011633] mb-2">
                {content.howItWorks.step1Title || 'Book a Session'}
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                {content.howItWorks.step1Desc ||
                  'Connect with our expert team for one-on-one initial guidance and customized planning.'}
              </p>
            </div>

            {/* Step 02 */}
            <div className="bg-white rounded-asymmetric p-8 border border-gray-200/70 shadow-sm relative">
              <span className="text-4xl font-extrabold text-[#FF5722]/30 block mb-3 font-serif">
                02
              </span>
              <h4 className="text-lg font-bold text-[#011633] mb-2">
                {content.howItWorks.step2Title || 'Choose Your Service'}
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                {content.howItWorks.step2Desc ||
                  'Select from our 6 specialized Houses to fit your precise personal or business needs.'}
              </p>
            </div>

            {/* Step 03 */}
            <div className="bg-white rounded-asymmetric p-8 border border-gray-200/70 shadow-sm relative">
              <span className="text-4xl font-extrabold text-[#FF5722]/30 block mb-3 font-serif">
                03
              </span>
              <h4 className="text-lg font-bold text-[#011633] mb-2">
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
      <section className="py-16 bg-white">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="bg-[#011633] text-white rounded-asymmetric p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold tracking-widest uppercase text-[#FF5722]">
                {content.consultationBanner.badge || 'Need Clarification?'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
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
              className="bg-[#FF5722] hover:bg-[#e64a19] text-white px-8 py-4 rounded-asymmetric font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all cursor-pointer shrink-0"
            >
              {content.consultationBanner.btnText || 'Start Consultation'}
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. LATEST BLOG & ARTICLES PREVIEW */}
      {/* ============================================================ */}
      <section className="py-20 bg-[#FBFBFB] border-t border-gray-200/60 pb-36">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-[#FF5722] tracking-wider uppercase inline-flex items-center space-x-2 justify-center">
              <span className="w-6 h-[2px] bg-[#FF5722]"></span>
              <span>Our Blog</span>
              <span className="w-6 h-[2px] bg-[#FF5722]"></span>
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-[#011633] mt-2">
              Latest Blog & Articles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <article className="bg-white rounded-asymmetric border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="p-7 space-y-3">
                <span className="text-xs font-semibold text-[#FF5722] uppercase tracking-wider">
                  Ditya Astroverse
                </span>
                <h3 className="text-lg font-bold text-[#011633] hover:text-[#FF5722] transition-colors line-clamp-2">
                  <Link href="/blog/most-powerful-money-attraction-remedy-using-bay-leaf-for-wealth-and-success">
                    Most Powerful Money Attraction Remedy Using Bay Leaf for Wealth and Success
                  </Link>
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                  Discover how ancient bay leaf rituals combined with numerical frequency can open
                  doors to abundance and financial clarity.
                </p>
              </div>
              <div className="px-7 pb-6 pt-2 border-t border-gray-100">
                <Link
                  href="/blog/most-powerful-money-attraction-remedy-using-bay-leaf-for-wealth-and-success"
                  className="text-xs font-bold text-[#FF5722] inline-flex items-center space-x-1 hover:underline"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>

            {/* Blog Post 2 */}
            <article className="bg-white rounded-asymmetric border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="p-7 space-y-3">
                <span className="text-xs font-semibold text-[#FF5722] uppercase tracking-wider">
                  Ditya Astroverse
                </span>
                <h3 className="text-lg font-bold text-[#011633] hover:text-[#FF5722] transition-colors line-clamp-2">
                  <Link href="/blog/powerful-remedy-to-remove-negative-energy-and-attract-success-in-life">
                    Powerful Remedy to Remove Negative Energy and Attract Success in Life
                  </Link>
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                  Salt water energy cleansing rituals and spatial remedies designed to eliminate
                  blocks, emotional stress, and obstacles.
                </p>
              </div>
              <div className="px-7 pb-6 pt-2 border-t border-gray-100">
                <Link
                  href="/blog/powerful-remedy-to-remove-negative-energy-and-attract-success-in-life"
                  className="text-xs font-bold text-[#FF5722] inline-flex items-center space-x-1 hover:underline"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>

            {/* Blog Post 3 */}
            <article className="bg-white rounded-asymmetric border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="p-7 space-y-3">
                <span className="text-xs font-semibold text-[#FF5722] uppercase tracking-wider">
                  Ditya Astroverse
                </span>
                <h3 className="text-lg font-bold text-[#011633] hover:text-[#FF5722] transition-colors line-clamp-2">
                  <Link href="/blog/simple-morning-remedy-to-attract-money-clarity-and-positive-energy">
                    Simple Morning Remedy to Attract Money, Clarity and Positive Energy
                  </Link>
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                  Harness copper water solar charging to boost mental sharpness, metabolic harmony,
                  and purposeful daily alignment.
                </p>
              </div>
              <div className="px-7 pb-6 pt-2 border-t border-gray-100">
                <Link
                  href="/blog/simple-morning-remedy-to-attract-money-clarity-and-positive-energy"
                  className="text-xs font-bold text-[#FF5722] inline-flex items-center space-x-1 hover:underline"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

