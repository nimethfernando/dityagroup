'use client';

import React from 'react';
import Image from 'next/image';
import {
  TrendingUp,
  Clock,
  Users,
  Award,
  CheckCircle2,
  UsersRound,
  ArrowRight,
  Quote,
  Star,
  Calendar,
  Layers,
} from 'lucide-react';
import { useConsultation } from '@/contexts/ConsultationContext';
import { AboutPageContent } from '@/lib/defaultPageContent';
import { AnimatedCounter, AnimatedRadialProgress } from '@/components/AnimatedCounter';

interface AboutUsClientProps {
  content: AboutPageContent;
}

export default function AboutUsClient({ content }: AboutUsClientProps) {
  const { openModal } = useConsultation();

  // Safe fallback data resolution
  const banner = content?.banner || {
    badge: 'About Us',
    title: 'About Us',
    subtitle: 'Building Solutions That Simplify Growth',
  };

  const coreValues = content?.coreValues || {
    subtitle: 'Our Core Value',
    heading: 'Our Business Is Making Your Life Easier',
    welcomeBadge: 'Welcome To DITYA GROUP',
    para1:
      'At DITYA Group, we believe growth becomes easier when people have access to the right support systems, structured solutions, and clear guidance. Our mission is to create an ecosystem where individuals, students, professionals, businesses, and organizations can access multiple solutions under one platform.',
    para2:
      'DITYA Group was built with the vision of creating practical solutions that support learning, technology, business growth, digital transformation, financial understanding, and personal development. Rather than focusing on a single industry, we aim to create a connected ecosystem where different services work together to support long-term growth.',
    para3:
      'Whether you are seeking educational support, digital services, financial learning, business solutions, technology support, or structured guidance — DITYA Group is designed to simplify the journey.',
    bullet1: 'Simplicity Creates Growth',
    bullet2: 'Growth Through Better Systems',
    bullet3: 'Customer-Focused Approach',
    bullet4: 'Continuous Learning & Improvement',
    prodCardTitle: 'Increase Productivity',
    prodCardDesc:
      'Partnering with Ditya Group leads to smarter decisions, higher productivity, and faster business success',
    timeCardTitle: 'Save Time',
    timeCardDesc:
      'With Ditya Group, you can streamline tasks and focus on growth while we handle the support systems',
  };

  const founder = content?.founder || {
    badge: 'CEO & Founder BMC Genie',
    tag: 'Founder Message',
    quote:
      '“Our vision is simple — create systems, services, and solutions that make growth easier for individuals and businesses while continuously expanding opportunities under one ecosystem.”',
    name: 'Aamitt Batra',
    role: 'Founder, DITYA GROUP',
  };

  const stats = content?.stats || {
    stat1Number: '500 +',
    stat1Label: 'Happy Clients',
    stat2Number: '3,000 +',
    stat2Label: 'Projects & Solutions Delivered',
    stat3Number: '15',
    stat3Label: 'Years Of Experience',
    stat4Number: '22',
    stat4Label: 'Team Members',
  };

  const howItWorks = content?.howItWorks || {
    subtitle: 'How It Works',
    heading: 'How Ditya Group Personalized Approach Works',
    description:
      'Ditya Group provides integrated solutions across finance, numerology, and all other essential services. Our personalized approach helps you make better decisions, simplify tasks, and grow faster with clarity.',
    step1Num: '01',
    step1Desc: 'Book a session with our expert team for guidance and planning.',
    step2Num: '02',
    step2Desc: 'Choose the service that best fits your personal or business needs.',
    step3Num: '03',
    step3Desc: 'Start your journey with structured support and see results quickly',
    testimonialQuote:
      '“Working with Ditya Group has been a game changer. Their guidance in trading, numerology, and business support made decision-making easier and more effective. Everything is well-managed and results are clearly visible. Truly worth the investment and their other services.”',
    testimonialAuthor: 'Aditya Malhotra',
  };

  const whyChooseUs = content?.whyChooseUs || {
    subtitle: 'Why Choose Us',
    heading: 'Why Choose US',
    description:
      'Ditya Group handles everything that slows down your growth journey. From financial guidance to essential services, we simplify your path so you can focus on achieving bigger goals. Let us manage what supports your success while you move ahead with clarity.',
    metric1Percent: '35%',
    metric1Title: 'Limited Growth Approach',
    metric1Desc:
      'Managing everything alone or relying on traditional methods can slow down decisions, reduce efficiency, and limit your true potential.',
    metric2Percent: '100%',
    metric2Title: 'Ditya Smart System',
    metric2Desc:
      'An integrated system of trading guidance, numerology insights, and essential services designed to give you clarity, speed, and complete growth support',
  };

  const coreValueBullets = [
    coreValues.bullet1 || 'Simplicity Creates Growth',
    coreValues.bullet2 || 'Growth Through Better Systems',
    coreValues.bullet3 || 'Customer-Focused Approach',
    coreValues.bullet4 || 'Continuous Learning & Improvement',
  ];

  return (
    <div className="pb-0 bg-white selection:bg-[#059669]/20 selection:text-[#041614]">
      {/* 1. Page Title Banner */}
      <section className="bg-gradient-to-r from-[#020D0C] via-[#041614] to-[#0D2622] text-white py-24 text-center relative overflow-hidden border-b border-white/5">
        {/* Silk Ambient Background Pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/inner-banner-bg.jpg"
            alt="About Banner Background"
            fill
            priority
            className="object-cover object-center opacity-25 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020D0C]/90 via-[#041614]/80 to-[#0D2622]/85" />
        </div>

        {/* Ambient Glow Orbs */}
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-[#059669]/15 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="max-w-[1140px] mx-auto px-4 relative z-10">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 mb-4 shadow-sm">
            <span className="text-xs font-bold text-[#10B981] tracking-widest uppercase">
              {banner.badge || 'About Us'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {banner.title || 'About Us'}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto mt-4 font-normal leading-relaxed">
            {banner.subtitle || 'Building Solutions That Simplify Growth'}
          </p>
        </div>
      </section>

      {/* 2. Welcome & Core Values Split Section */}
      <section className="py-20 lg:py-24 max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Visual & Core Value Floating Suite */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 group">
              <div className="relative h-[400px] w-full">
                <Image
                  src="/images/core-values.jpg"
                  alt="Ditya Group Core Values"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020D0C]/80 via-[#041614]/20 to-transparent" />
              </div>

              {/* Floating Tag inside the image */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-white/40">
                <span className="text-xs font-bold text-[#059669] uppercase tracking-wider flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse"></span>
                  <span>Ecosystem of Growth</span>
                </span>
              </div>
            </div>

            {/* Core Values Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xl border border-emerald-100/70 bg-gradient-to-br from-white via-[#F0FDF4]/30 to-[#ECFDF5]/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#059669]/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center space-x-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#059669] text-white flex items-center justify-center shadow-md">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#059669] tracking-widest uppercase block">
                    Our Foundation
                  </span>
                  <h3 className="text-base font-extrabold text-[#041614]">
                    {coreValues.subtitle || 'Our Core Value'}
                  </h3>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                {coreValueBullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3 p-2.5 rounded-xl bg-white/80 border border-gray-100 shadow-sm hover:border-[#059669]/30 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#059669]/10 text-[#059669] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-[#041614] leading-snug">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Welcome, Narrative & Dual Feature Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#059669] tracking-wider uppercase flex items-center space-x-2">
                <span className="w-6 h-[2px] bg-[#059669]"></span>
                <span>{coreValues.welcomeBadge || 'Welcome To DITYA GROUP'}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#041614] leading-tight tracking-tight">
                {coreValues.heading || 'Our Business Is Making Your Life Easier'}
              </h2>
            </div>

            {/* 3 Full Narrative Paragraphs */}
            <div className="space-y-4 text-sm sm:text-[15px] text-gray-600 leading-relaxed">
              <p>
                {coreValues.para1 ||
                  'At DITYA Group, we believe growth becomes easier when people have access to the right support systems, structured solutions, and clear guidance. Our mission is to create an ecosystem where individuals, students, professionals, businesses, and organizations can access multiple solutions under one platform.'}
              </p>

              <p>
                {coreValues.para2 ||
                  'DITYA Group was built with the vision of creating practical solutions that support learning, technology, business growth, digital transformation, financial understanding, and personal development. Rather than focusing on a single industry, we aim to create a connected ecosystem where different services work together to support long-term growth.'}
              </p>

              <p className="font-medium text-[#041614] bg-emerald-50/60 p-4 rounded-xl border-l-4 border-[#059669]">
                {coreValues.para3 ||
                  'Whether you are seeking educational support, digital services, financial learning, business solutions, technology support, or structured guidance — DITYA Group is designed to simplify the journey.'}
              </p>
            </div>

            {/* Dual Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 border border-gray-200/80 rounded-2xl bg-gradient-to-br from-[#FAFAFA] to-white hover:border-[#059669]/40 hover:shadow-md transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#059669] to-[#047857] text-white flex items-center justify-center mb-3 shadow-md shadow-[#059669]/20">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm sm:text-base text-[#041614]">
                  {coreValues.prodCardTitle || 'Increase Productivity'}
                </h4>
                <p className="text-xs sm:text-[13px] text-gray-500 mt-1.5 leading-relaxed">
                  {coreValues.prodCardDesc ||
                    'Partnering with Ditya Group leads to smarter decisions, higher productivity, and faster business success'}
                </p>
              </div>

              <div className="p-5 border border-gray-200/80 rounded-2xl bg-gradient-to-br from-[#FAFAFA] to-white hover:border-[#059669]/40 hover:shadow-md transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#059669] to-[#047857] text-white flex items-center justify-center mb-3 shadow-md shadow-[#059669]/20">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm sm:text-base text-[#041614]">
                  {coreValues.timeCardTitle || 'Save Time'}
                </h4>
                <p className="text-xs sm:text-[13px] text-gray-500 mt-1.5 leading-relaxed">
                  {coreValues.timeCardDesc ||
                    'With Ditya Group, you can streamline tasks and focus on growth while we handle the support systems'}
                </p>
              </div>
            </div>

            {/* Interactive Free Consultation Trigger */}
            <div className="pt-2">
              <button
                onClick={() => openModal('About Us Consultation')}
                className="btn-ditya-orange text-sm font-semibold shadow-lg hover:shadow-xl cursor-pointer inline-flex items-center space-x-2"
              >
                <span>Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Founder Message Section */}
      <section className="py-20 bg-gradient-to-b from-[#F9FAFB] via-[#F3F4F6]/60 to-[#F9FAFB] border-t border-b border-gray-200/70 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[860px] mx-auto px-4 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-[#059669]/10 border border-[#059669]/20 px-3.5 py-1 rounded-full text-xs font-bold text-[#059669] uppercase tracking-wider">
            <span>{founder.badge || 'CEO & Founder BMC Genie'}</span>
            <span className="text-gray-300">•</span>
            <span>{founder.tag || 'Founder Message'}</span>
          </div>

          <div className="relative">
            <Quote className="w-12 h-12 text-[#059669]/15 mx-auto -mb-6" />
            <blockquote className="text-xl sm:text-2xl font-semibold text-[#041614] italic leading-relaxed px-4 sm:px-8">
              {founder.quote ||
                '“Our vision is simple — create systems, services, and solutions that make growth easier for individuals and businesses while continuously expanding opportunities under one ecosystem.”'}
            </blockquote>
          </div>

          <div className="pt-2">
            <h4 className="text-lg sm:text-xl font-extrabold text-[#041614] tracking-tight">
              {founder.name || 'Aamitt Batra'}
            </h4>
            <p className="text-xs sm:text-sm font-medium text-[#059669] mt-0.5">
              {founder.role || 'Founder, DITYA GROUP'}
            </p>
          </div>

          <div className="relative h-14 w-36 mx-auto opacity-85">
            <Image
              src="/images/signature.png"
              alt="Aamitt Batra Signature"
              fill
              className="object-contain object-center"
            />
          </div>
        </div>
      </section>

      {/* 4. Key Statistics Dock */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Stat 1 */}
            <div className="bg-gradient-to-br from-[#F9FAFB] to-white p-6 sm:p-7 rounded-2xl border border-gray-200/70 shadow-sm text-center hover:border-[#059669]/40 hover:shadow-md transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-[#059669]/10 text-[#059669] flex items-center justify-center mx-auto mb-3.5 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#041614] tracking-tight">
                <AnimatedCounter value={stats.stat1Number || '500 +'} />
              </div>
              <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-1">
                {stats.stat1Label || 'Happy Clients'}
              </p>
            </div>

            {/* Stat 2 */}
            <div className="bg-gradient-to-br from-[#F9FAFB] to-white p-6 sm:p-7 rounded-2xl border border-gray-200/70 shadow-sm text-center hover:border-[#059669]/40 hover:shadow-md transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-[#059669]/10 text-[#059669] flex items-center justify-center mx-auto mb-3.5 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#041614] tracking-tight">
                <AnimatedCounter value={stats.stat2Number || '3,000 +'} />
              </div>
              <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-1">
                {stats.stat2Label || 'Projects & Solutions Delivered'}
              </p>
            </div>

            {/* Stat 3 */}
            <div className="bg-gradient-to-br from-[#F9FAFB] to-white p-6 sm:p-7 rounded-2xl border border-gray-200/70 shadow-sm text-center hover:border-[#059669]/40 hover:shadow-md transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-[#059669]/10 text-[#059669] flex items-center justify-center mx-auto mb-3.5 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#041614] tracking-tight">
                <AnimatedCounter value={stats.stat3Number || '15'} />
              </div>
              <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-1">
                {stats.stat3Label || 'Years Of Experience'}
              </p>
            </div>

            {/* Stat 4 */}
            <div className="bg-gradient-to-br from-[#F9FAFB] to-white p-6 sm:p-7 rounded-2xl border border-gray-200/70 shadow-sm text-center hover:border-[#059669]/40 hover:shadow-md transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-[#059669]/10 text-[#059669] flex items-center justify-center mx-auto mb-3.5 group-hover:scale-110 transition-transform">
                <UsersRound className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#041614] tracking-tight">
                <AnimatedCounter value={stats.stat4Number || '22'} />
              </div>
              <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-1">
                {stats.stat4Label || 'Team Members'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works Section & Featured Testimonial */}
      <section className="py-20 lg:py-24 bg-[#FAFAFA] relative overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-[#059669] tracking-wider uppercase inline-block bg-[#059669]/10 px-3.5 py-1 rounded-full border border-[#059669]/20">
              {howItWorks.subtitle || 'How It Works'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#041614] tracking-tight">
              {howItWorks.heading || 'How Ditya Group Personalized Approach Works'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {howItWorks.description ||
                'Ditya Group provides integrated solutions across finance, numerology, and all other essential services. Our personalized approach helps you make better decisions, simplify tasks, and grow faster with clarity.'}
            </p>
          </div>

          {/* 3 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-16">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-7 border border-gray-200/80 shadow-sm relative group hover:border-[#059669]/50 hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-black text-[#059669]/20 group-hover:text-[#059669] transition-colors mb-4">
                {howItWorks.step1Num || '01'}
              </div>
              <h3 className="font-bold text-base text-[#041614] mb-2">
                Initial Session & Planning
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {howItWorks.step1Desc ||
                  'Book a session with our expert team for guidance and planning.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-7 border border-gray-200/80 shadow-sm relative group hover:border-[#059669]/50 hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-black text-[#059669]/20 group-hover:text-[#059669] transition-colors mb-4">
                {howItWorks.step2Num || '02'}
              </div>
              <h3 className="font-bold text-base text-[#041614] mb-2">
                Service Selection
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {howItWorks.step2Desc ||
                  'Choose the service that best fits your personal or business needs.'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-7 border border-gray-200/80 shadow-sm relative group hover:border-[#059669]/50 hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-black text-[#059669]/20 group-hover:text-[#059669] transition-colors mb-4">
                {howItWorks.step3Num || '03'}
              </div>
              <h3 className="font-bold text-base text-[#041614] mb-2">
                Structured Growth
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {howItWorks.step3Desc ||
                  'Start your journey with structured support and see results quickly'}
              </p>
            </div>
          </div>

          {/* Client Testimonial Card */}
          <div className="max-w-[860px] mx-auto bg-gradient-to-r from-[#020D0C] via-[#041614] to-[#0D2622] rounded-3xl p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-white/10">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#059669]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              <div className="flex items-center space-x-1 text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs font-bold text-gray-300 ml-2">Verified Client Review</span>
              </div>

              <p className="text-base sm:text-lg text-gray-200 italic leading-relaxed">
                {howItWorks.testimonialQuote ||
                  '“Working with Ditya Group has been a game changer. Their guidance in trading, numerology, and business support made decision-making easier and more effective. Everything is well-managed and results are clearly visible. Truly worth the investment and their other services.”'}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div>
                  <h4 className="text-base font-bold text-white">
                    {howItWorks.testimonialAuthor || 'Aditya Malhotra'}
                  </h4>
                  <p className="text-xs text-[#10B981]">Ditya Group Client</p>
                </div>
                <button
                  onClick={() => openModal('About Us Consultation')}
                  className="btn-ditya-orange text-xs py-2 px-4 font-semibold shadow-md cursor-pointer"
                >
                  Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us & Metrics Section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold text-[#059669] tracking-wider uppercase inline-block bg-[#059669]/10 px-3.5 py-1 rounded-full border border-[#059669]/20">
              {whyChooseUs.subtitle || 'Why Choose Us'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#041614] tracking-tight">
              {whyChooseUs.heading || 'Why Choose US'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {whyChooseUs.description ||
                'Ditya Group handles everything that slows down your growth journey. From financial guidance to essential services, we simplify your path so you can focus on achieving bigger goals. Let us manage what supports your success while you move ahead with clarity.'}
            </p>
          </div>

          {/* Dual Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Metric 1: Limited Growth Approach */}
            <div className="p-7 rounded-2xl border border-gray-200 bg-[#F9FAFB] flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
              <AnimatedRadialProgress
                percentage={whyChooseUs.metric1Percent || '35%'}
                size={96}
                strokeWidth={7}
                strokeColor="#94A3B8"
                trackColor="#E2E8F0"
              />
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Traditional Methods
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#041614]">
                  {whyChooseUs.metric1Title || 'Limited Growth Approach'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {whyChooseUs.metric1Desc ||
                    'Managing everything alone or relying on traditional methods can slow down decisions, reduce efficiency, and limit your true potential.'}
                </p>
              </div>
            </div>

            {/* Metric 2: Ditya Smart System */}
            <div className="p-7 rounded-2xl border-2 border-[#059669]/30 bg-gradient-to-br from-white to-[#ECFDF5]/30 shadow-lg flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#059669] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                Recommended
              </div>
              <AnimatedRadialProgress
                percentage={whyChooseUs.metric2Percent || '100%'}
                size={96}
                strokeWidth={7}
                strokeColor="#059669"
                trackColor="#ECFDF5"
              />
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#059669] uppercase tracking-wider">
                  Integrated Ecosystem
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-[#041614]">
                  {whyChooseUs.metric2Title || 'Ditya Smart System'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {whyChooseUs.metric2Desc ||
                    'An integrated system of trading guidance, numerology insights, and essential services designed to give you clarity, speed, and complete growth support'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Bottom Call to Action Banner */}
      <section className="py-16 bg-gradient-to-r from-[#020D0C] via-[#041614] to-[#0D2622] text-white relative overflow-hidden border-t border-white/10">
        <div className="max-w-[1140px] mx-auto px-4 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/15">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs font-bold text-[#10B981] tracking-widest uppercase">
              Begin Your Journey
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
            Ready To Experience Simplified Growth With Ditya Group?
          </h2>

          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Connect with our advisory specialists today to map your personalized strategy across finance, numerology, and essential services.
          </p>

          <div className="pt-2">
            <button
              onClick={() => openModal('About Us Free Consultation')}
              className="btn-ditya-orange text-sm font-bold px-8 py-3.5 shadow-xl hover:shadow-2xl cursor-pointer inline-flex items-center space-x-2"
            >
              <span>Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
