'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Globe2,
  Users2,
  TrendingUp,
  Crown,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Briefcase,
  PhoneCall,
  Clock,
} from 'lucide-react';
import { GBNPageContent } from '@/lib/defaultPageContent';
import ConsultationModal from '@/components/ConsultationModal';

interface GBNClientProps {
  content: GBNPageContent;
}

export default function GBNClient({ content }: GBNClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState('Global Business Network');

  const openModalWithService = (service: string) => {
    setModalService(service);
    setIsModalOpen(true);
  };

  const banner = content.banner || {
    badge: 'Premier International Community',
    title: 'Global Business Network',
    subtitle: 'Expand Your Reach. Connect with Industry Leaders Worldwide.',
  };

  const intro = content.intro || {
    tagline: 'Connect • Collaborate • Grow',
    heading: 'A Business Network Built Around Meaningful Relationships',
    description:
      'The Global Business Network is a premier community designed for ambitious entrepreneurs, executives, and business owners. We bridge the gap between local expertise and global opportunities by fostering powerful collaborations, sharing actionable market insights, and providing a trusted ecosystem for sustainable business growth.',
  };

  const features = content.features || {
    card1Title: 'Strategic Networking',
    card1Desc:
      'Connect with high-net-worth individuals, investors, and elite professionals across international markets to build partnerships that matter.',
    card2Title: 'Global Market Insights',
    card2Desc:
      'Gain access to exclusive resources, trends, and strategies to help your business scale across borders seamlessly.',
    card3Title: 'Exclusive Events & Cohorts',
    card3Desc:
      'Participate in private networking events, mastermind sessions, and specialized cohorts (like the Elite Council) designed to accelerate your growth.',
  };

  const tiers = content.tiers || {
    heading: 'Tailored Membership Tiers',
    subtitle: 'Select the networking circle aligned with your business scale and strategic ambitions.',
    tier1Title: 'GBN Circle',
    tier1Criteria: 'For businesses with ₹20 Lakh+ annual turnover',
    tier1Desc:
      'A structured business networking experience for entrepreneurs, professionals, and rising business leaders.',
    tier1Features: [
      'Curated online & physical networking sessions',
      'Official member business showcase presentations',
      'Direct business introductions & referral exchange',
      'Cross-industry collaboration opportunities',
      'Global business community connections',
    ],
    tier2Title: 'GBN Elite Council',
    tier2Criteria: 'For businesses with ₹5 Crore+ annual turnover',
    tier2Desc:
      'An exclusive, invite-only mastermind council for established enterprise leaders and visionary founders.',
    tier2Features: [
      'Private executive morning roundtables',
      'High-value strategic partnership introductions',
      'Confidential mastermind & scaling advisory',
      'Direct leadership-level peer networking',
      'Cross-border expansion and investment facilitation',
    ],
  };

  const stats = content.stats || {
    stat1Number: '500+',
    stat1Label: 'Vetted Business Leaders',
    stat2Number: '12+',
    stat2Label: 'Global Chapters & Hubs',
    stat3Number: '₹150Cr+',
    stat3Label: 'Closed Business Collaborations',
  };

  const cta = content.cta || {
    heading: 'Ready to Accelerate Your Global Reach?',
    description:
      'Join an elite circle of entrepreneurs and industry leaders creating cross-border impact. Apply for Global Business Network membership today.',
    btnText: 'Join the Network / Become a Member',
    btnLink: '/contact-us?service=GBN%20Circle',
  };

  return (
    <div className="bg-[#FAFAFC] dark:bg-[#030F0E] text-[#041614] dark:text-gray-100 min-h-screen font-sans pb-24 transition-colors duration-200">
      {/* ============================================================ */}
      {/* 1. DITYA GROUP HEADER BANNER */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-r from-[#020D0C] via-[#041614] to-[#0D2622] text-white py-20 sm:py-24 text-center relative overflow-hidden border-b border-white/5">
        {/* Sacred Geometry Silk Banner Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/inner-banner-bg.jpg"
            alt="Global Business Network Banner Background"
            fill
            className="object-cover object-center opacity-30 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020D0C]/90 via-[#041614]/80 to-[#0D2622]/85" />
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-[#059669]/15 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Badge */}
          <span className="inline-flex items-center space-x-2 text-xs font-bold text-[#059669] tracking-widest uppercase bg-white/10 px-3.5 py-1 rounded-full border border-white/15 mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span>{banner.badge || 'Premier International Community'}</span>
          </span>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold !text-white mt-1 tracking-tight drop-shadow-md">
            {banner.title || 'Global Business Network'}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-gray-200 max-w-2xl mx-auto mt-4 font-normal leading-relaxed drop-shadow-sm">
            {banner.subtitle || 'Expand Your Reach. Connect with Industry Leaders Worldwide.'}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              href={cta.btnLink || '/contact-us?service=GBN%20Circle'}
              className="btn-ditya-orange text-xs sm:text-sm uppercase tracking-wider py-3.5 px-8 font-bold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl cursor-pointer"
            >
              <span>{cta.btnText || 'Join the Network / Become a Member'}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <a
              href="https://www.gbncircle.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Visit GBN Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            </a>
          </div>

          {/* Slogan Ribbon */}
          <div className="pt-8 flex items-center justify-center space-x-3 text-xs tracking-[0.2em] uppercase font-bold text-emerald-400/90">
            <span>Connect</span>
            <span>•</span>
            <span>Collaborate</span>
            <span>•</span>
            <span>Grow</span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. CORE VISION & STRATEGIC ECOSYSTEM SECTION */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 max-w-[1140px] mx-auto px-4 sm:px-6">
        <div className="bg-white border border-gray-200/80 rounded-3xl p-8 sm:p-12 shadow-sm hover:shadow-md transition-shadow">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center space-x-2 text-xs font-bold text-[#059669] tracking-wider uppercase bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
              <span>{intro.tagline || 'Connect • Collaborate • Grow'}</span>
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#041614] tracking-tight">
              {intro.heading || 'A Business Network Built Around Meaningful Relationships'}
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal pt-1">
              {intro.description ||
                'The Global Business Network is a premier community designed for ambitious entrepreneurs, executives, and business owners. We bridge the gap between local expertise and global opportunities by fostering powerful collaborations, sharing actionable market insights, and providing a trusted ecosystem for sustainable business growth.'}
            </p>

            {/* Strategic Pillars Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-left">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start space-x-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#041614]">High-Trust Network</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Strictly vetted entrepreneurs & founders</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start space-x-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center shrink-0">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#041614]">Cross-Border Reach</h4>
                  <p className="text-xs text-gray-500 mt-0.5">International market scaling & insights</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start space-x-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#041614]">Proven Growth</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Direct referral exchange & joint ventures</p>
                </div>
              </div>
            </div>

            {/* Quote attribution */}
            <div className="pt-6 border-t border-gray-100 mt-6">
              <p className="text-xs sm:text-sm text-gray-500 italic">
                “Alone we grow slowly; connected, our reach becomes infinite.”
              </p>
              <span className="text-xs font-bold text-[#041614] block mt-1">
                Global Business Network Advisory Council
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. KEY FEATURES (3-CARD SIGNATURE GRID) */}
      {/* ============================================================ */}
      <section className="py-12 pb-20 max-w-[1140px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold text-[#059669] uppercase tracking-wider block">
            Why Global Business Network Stands Apart
          </span>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#041614] tracking-tight">
            Key Pillars of the Network
          </h3>
          <p className="text-sm text-gray-500">
            Engineered to empower visionary leaders with direct access, market intelligence, and executive alliances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Strategic Networking */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#059669] group-hover:bg-gradient-to-br group-hover:from-[#059669] group-hover:to-[#047857] group-hover:text-white transition-all flex items-center justify-center mb-6 shadow-xs">
                <Users2 className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-[#041614] mb-3 group-hover:text-[#059669] transition-colors">
                {features.card1Title || 'Strategic Networking'}
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {features.card1Desc ||
                  'Connect with high-net-worth individuals, investors, and elite professionals across international markets to build partnerships that matter.'}
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-6 flex items-center text-xs font-bold text-[#059669] uppercase tracking-wider">
              <span>High-Value Alliances</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Card 2: Global Market Insights */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#059669] group-hover:bg-gradient-to-br group-hover:from-[#059669] group-hover:to-[#047857] group-hover:text-white transition-all flex items-center justify-center mb-6 shadow-xs">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-[#041614] mb-3 group-hover:text-[#059669] transition-colors">
                {features.card2Title || 'Global Market Insights'}
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {features.card2Desc ||
                  'Gain access to exclusive resources, trends, and strategies to help your business scale across borders seamlessly.'}
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-6 flex items-center text-xs font-bold text-[#059669] uppercase tracking-wider">
              <span>Cross-Border Scaling</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Card 3: Exclusive Events & Cohorts */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#059669] group-hover:bg-gradient-to-br group-hover:from-[#059669] group-hover:to-[#047857] group-hover:text-white transition-all flex items-center justify-center mb-6 shadow-xs">
                <Crown className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-[#041614] mb-3 group-hover:text-[#059669] transition-colors">
                {features.card3Title || 'Exclusive Events & Cohorts'}
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {features.card3Desc ||
                  'Participate in private networking events, mastermind sessions, and specialized cohorts (like the Elite Council) designed to accelerate your growth.'}
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-6 flex items-center text-xs font-bold text-[#059669] uppercase tracking-wider">
              <span>Masterminds & Roundtables</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. TAILORED MEMBERSHIP TIERS */}
      {/* ============================================================ */}
      <section id="membership-tiers" className="py-20 bg-white border-y border-gray-200/80">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold text-[#059669] uppercase tracking-wider block">
              Structured For Your Scale
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#041614] tracking-tight">
              {tiers.heading || 'Tailored Membership Tiers'}
            </h3>
            <p className="text-sm text-gray-500">
              {tiers.subtitle ||
                'Select the networking circle aligned with your business scale and strategic ambitions.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Tier 1: GBN Circle */}
            <div className="bg-[#FAFAFC] border border-gray-200 rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:shadow-xl transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-[#059669]">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <h4 className="text-2xl font-bold text-[#041614]">
                      {tiers.tier1Title || 'GBN Circle'}
                    </h4>
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 bg-emerald-50 text-[#059669] rounded-full border border-emerald-100">
                    Growth Circle
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-gray-200 mb-5">
                  <span className="text-xs font-bold text-[#059669] block">
                    {tiers.tier1Criteria || 'For businesses with ₹20 Lakh+ annual turnover'}
                  </span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {tiers.tier1Desc ||
                    'A structured business networking experience for entrepreneurs, professionals, and rising business leaders.'}
                </p>

                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
                    Key Inclusions:
                  </span>
                  {(tiers.tier1Features || [
                    'Curated online & physical networking sessions',
                    'Official member business showcase presentations',
                    'Direct business introductions & referral exchange',
                    'Cross-industry collaboration opportunities',
                    'Global business community connections',
                  ]).map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href="/contact-us?service=GBN%20Circle"
                  className="w-full block text-center py-3.5 bg-white hover:bg-emerald-50 text-[#059669] font-bold rounded-xl border border-emerald-200 transition-all text-xs uppercase tracking-wider cursor-pointer shadow-xs hover:shadow-md"
                >
                  Apply for GBN Circle
                </Link>
              </div>
            </div>

            {/* Tier 2: GBN Elite Council */}
            <div className="bg-gradient-to-br from-[#020D0C] via-[#041614] to-[#0D2622] text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-2xl border border-emerald-500/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#059669]/15 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
                      <Crown className="w-5 h-5" />
                    </div>
                    <h4 className="text-2xl font-bold !text-white">
                      {tiers.tier2Title || 'GBN Elite Council'}
                    </h4>
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 bg-[#FF6B00] text-white rounded-full shadow-md">
                    VIP Mastermind
                  </span>
                </div>

                <div className="p-3 bg-white/10 rounded-xl border border-white/15 mb-5 relative z-10">
                  <span className="text-xs font-bold text-emerald-300 block">
                    {tiers.tier2Criteria || 'For businesses with ₹5 Crore+ annual turnover'}
                  </span>
                </div>

                <p className="text-sm text-gray-200 leading-relaxed mb-6 relative z-10">
                  {tiers.tier2Desc ||
                    'An exclusive, invite-only mastermind council for established enterprise leaders and visionary founders.'}
                </p>

                <div className="space-y-3 pt-4 border-t border-white/15 relative z-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-2">
                    Executive Inclusions:
                  </span>
                  {(tiers.tier2Features || [
                    'Private executive morning roundtables',
                    'High-value strategic partnership introductions',
                    'Confidential mastermind & scaling advisory',
                    'Direct leadership-level peer networking',
                    'Cross-border expansion and investment facilitation',
                  ]).map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-white">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 relative z-10">
                <Link
                  href="/contact-us?service=GBN%20Elite%20Council"
                  className="w-full btn-ditya-orange block text-center py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl cursor-pointer"
                >
                  Apply for Elite Council
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. GLOBAL IMPACT STATS DOCK */}
      {/* ============================================================ */}
      <section className="py-16 max-w-[1140px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-12 shadow-[0_10px_35px_rgba(1,22,51,0.06)]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            <div className="pt-4 sm:pt-0 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center mb-3 shadow-xs">
                <Users2 className="w-6 h-6" />
              </div>
              <span className="text-3xl sm:text-4xl font-black text-[#041614] tracking-tight">
                {stats.stat1Number || '500+'}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-gray-500 mt-1">
                {stats.stat1Label || 'Vetted Business Leaders'}
              </span>
            </div>

            <div className="pt-4 sm:pt-0 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center mb-3 shadow-xs">
                <Globe2 className="w-6 h-6" />
              </div>
              <span className="text-3xl sm:text-4xl font-black text-[#041614] tracking-tight">
                {stats.stat2Number || '12+'}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-gray-500 mt-1">
                {stats.stat2Label || 'Global Chapters & Hubs'}
              </span>
            </div>

            <div className="pt-4 sm:pt-0 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center mb-3 shadow-xs">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-3xl sm:text-4xl font-black text-[#041614] tracking-tight">
                {stats.stat3Number || '₹150Cr+'}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-gray-500 mt-1">
                {stats.stat3Label || 'Closed Business Collaborations'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. CALL TO ACTION SECTION */}
      {/* ============================================================ */}
      <section className="py-8 max-w-[1140px] mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 bg-gradient-to-r from-[#020D0C] via-[#041614] to-[#0D2622] rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="relative z-10 max-w-xl text-center sm:text-left space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Direct Executive Membership
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold !text-white tracking-tight">
              {cta.heading || 'Ready to Accelerate Your Global Reach?'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
              {cta.description ||
                'Join an elite circle of entrepreneurs and industry leaders creating cross-border impact. Apply for Global Business Network membership today.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 shrink-0 w-full sm:w-auto">
            <Link
              href={cta.btnLink || '/contact-us?service=GBN%20Circle'}
              className="btn-ditya-orange text-xs uppercase tracking-wider py-3.5 px-8 font-bold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl cursor-pointer w-full sm:w-auto text-center"
            >
              <span>{cta.btnText || 'Join the Network / Become a Member'}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <button
              onClick={() => openModalWithService('Global Business Network Membership')}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer text-center"
            >
              Quick Callback
            </button>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceTitle={modalService}
      />
    </div>
  );
}
