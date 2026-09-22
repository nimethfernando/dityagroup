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
  Calendar,
  Sparkles,
  Building2,
  Briefcase,
} from 'lucide-react';
import { GBNPageContent } from '@/lib/defaultPageContent';
import ConsultationModal from '@/components/ConsultationModal';

interface GBNClientProps {
  content: GBNPageContent;
}

export default function GBNClient({ content }: GBNClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState('GBN Circle');

  const openModalWithService = (service: string) => {
    setModalService(service);
    setIsModalOpen(true);
  };

  const banner = content.banner || {
    badge: 'Premier International Community',
    title: 'Global Business Network (GBN)',
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
      'Join an elite circle of entrepreneurs and industry leaders creating cross-border impact. Apply for GBN Circle membership today.',
    btnText: 'Join the Network / Become a Member',
    btnLink: '/contact-us?service=GBN%20Circle',
  };

  return (
    <div className="bg-[#070B19] text-white min-h-screen selection:bg-[#C5A059] selection:text-black font-sans">
      {/* ============================================================ */}
      {/* 1. ROYAL NAVY & GOLD HERO BANNER */}
      {/* ============================================================ */}
      <section className="relative pt-24 pb-20 sm:pt-28 sm:pb-24 overflow-hidden border-b border-[#C5A059]/20 bg-gradient-to-b from-[#0B162C] via-[#070B19] to-[#050814]">
        {/* Ambient Top Glow & Texture */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#C5A059]/10 blur-[140px] pointer-events-none z-0" />
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-[#1E3A8A]/20 rounded-full blur-3xl pointer-events-none z-0" />

        {/* Subtle Silk Texture Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-overlay">
          <Image
            src="/images/inner-banner-bg.jpg"
            alt="GBN Background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-[#C5A059]/15 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#C5A059]/40 mb-5 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
              {banner.badge || 'Premier International Community'}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold !text-white tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-md">
            {banner.title || 'Global Business Network (GBN)'}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-[#E2E8F0] max-w-2xl mx-auto mt-4 font-normal leading-relaxed drop-shadow-sm">
            {banner.subtitle || 'Expand Your Reach. Connect with Industry Leaders Worldwide.'}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              href={cta.btnLink || '/contact-us?service=GBN%20Circle'}
              className="w-full sm:w-auto bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B8860B] hover:from-[#D4AF37] hover:to-[#C5A059] text-[#070B19] font-bold text-sm px-8 py-3.5 rounded-xl shadow-xl hover:shadow-[0_0_25px_rgba(197,160,89,0.35)] hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>{cta.btnText || 'Join the Network / Become a Member'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://www.gbncircle.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/15 border border-white/20 hover:border-[#C5A059]/60 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2"
            >
              <span>Visit GBN Circle Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
            </a>
          </div>

          {/* Pillar Ribbon */}
          <div className="pt-10 flex items-center justify-center space-x-3 text-xs tracking-[0.2em] uppercase font-bold text-[#C5A059]">
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
      <section className="py-20 max-w-[1140px] mx-auto px-4 sm:px-6 relative">
        <div className="bg-gradient-to-br from-[#0B162C] to-[#081020] border border-[#C5A059]/25 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Corner Gold Ornament */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] block">
              {intro.tagline || 'Connect • Collaborate • Grow'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {intro.heading || 'A Business Network Built Around Meaningful Relationships'}
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto my-3" />
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
              {intro.description ||
                'The Global Business Network is a premier community designed for ambitious entrepreneurs, executives, and business owners. We bridge the gap between local expertise and global opportunities by fostering powerful collaborations, sharing actionable market insights, and providing a trusted ecosystem for sustainable business growth.'}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. KEY FEATURES (3-CARD SIGNATURE GRID) */}
      {/* ============================================================ */}
      <section className="py-12 pb-24 max-w-[1140px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
            Why GBN Stands Apart
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Key Pillars of the Network
          </h3>
          <p className="text-sm text-gray-400 mt-2">
            Engineered to empower visionary leaders with direct access, market intelligence, and executive alliances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Strategic Networking */}
          <div className="bg-[#0B162C]/90 backdrop-blur-md rounded-3xl p-8 border border-[#C5A059]/30 hover:border-[#C5A059] transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-[0_15px_35px_rgba(197,160,89,0.15)] flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#C5A059]/15 border border-[#C5A059]/35 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#C5A059] group-hover:text-[#070B19] transition-colors">
                <Users2 className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                {features.card1Title || 'Strategic Networking'}
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed font-normal">
                {features.card1Desc ||
                  'Connect with high-net-worth individuals, investors, and elite professionals across international markets to build partnerships that matter.'}
              </p>
            </div>
            <div className="pt-6 border-t border-white/10 mt-6 flex items-center text-xs font-bold text-[#C5A059] group-hover:text-white transition-colors">
              <span>High-Value Alliances</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Global Market Insights */}
          <div className="bg-gradient-to-b from-[#0F1E3D] to-[#0B162C] backdrop-blur-md rounded-3xl p-8 border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all duration-300 hover:-translate-y-1.5 shadow-2xl hover:shadow-[0_15px_35px_rgba(212,175,55,0.25)] flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/45 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#070B19] transition-colors">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                {features.card2Title || 'Global Market Insights'}
              </h4>
              <p className="text-sm text-gray-200 leading-relaxed font-normal">
                {features.card2Desc ||
                  'Gain access to exclusive resources, trends, and strategies to help your business scale across borders seamlessly.'}
              </p>
            </div>
            <div className="pt-6 border-t border-white/15 mt-6 flex items-center text-xs font-bold text-[#D4AF37] group-hover:text-white transition-colors relative z-10">
              <span>Cross-Border Intelligence</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Exclusive Events & Cohorts */}
          <div className="bg-[#0B162C]/90 backdrop-blur-md rounded-3xl p-8 border border-[#C5A059]/30 hover:border-[#C5A059] transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-[0_15px_35px_rgba(197,160,89,0.15)] flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#C5A059]/15 border border-[#C5A059]/35 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#C5A059] group-hover:text-[#070B19] transition-colors">
                <Crown className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                {features.card3Title || 'Exclusive Events & Cohorts'}
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed font-normal">
                {features.card3Desc ||
                  'Participate in private networking events, mastermind sessions, and specialized cohorts (like the Elite Council) designed to accelerate your growth.'}
              </p>
            </div>
            <div className="pt-6 border-t border-white/10 mt-6 flex items-center text-xs font-bold text-[#C5A059] group-hover:text-white transition-colors">
              <span>Masterminds & Roundtables</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. TAILORED MEMBERSHIP TIERS */}
      {/* ============================================================ */}
      <section id="membership-tiers" className="py-20 bg-gradient-to-b from-[#070B19] via-[#091124] to-[#070B19] border-y border-[#C5A059]/20">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
              Structured For Your Scale
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {tiers.heading || 'Tailored Membership Tiers'}
            </h3>
            <p className="text-sm text-gray-400 mt-2">
              {tiers.subtitle ||
                'Select the networking circle aligned with your business scale and strategic ambitions.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Tier 1: GBN Circle */}
            <div className="bg-[#0B162C] border border-[#C5A059]/30 rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:border-[#C5A059] transition-all shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 flex items-center justify-center text-[#D4AF37]">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <h4 className="text-2xl font-bold text-white">
                      {tiers.tier1Title || 'GBN Circle'}
                    </h4>
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 bg-white/10 text-emerald-400 rounded-full border border-white/15">
                    Growth Circle
                  </span>
                </div>

                <div className="p-3 bg-[#070B19] rounded-xl border border-white/10 mb-5">
                  <span className="text-xs font-bold text-[#D4AF37] block">
                    {tiers.tier1Criteria || 'For businesses with ₹20 Lakh+ annual turnover'}
                  </span>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  {tiers.tier1Desc ||
                    'A structured business networking experience for entrepreneurs, professionals, and rising business leaders.'}
                </p>

                <div className="space-y-3 pt-4 border-t border-white/10">
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
                    <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href="/contact-us?service=GBN%20Circle"
                  className="w-full block text-center py-3.5 bg-white/10 hover:bg-[#C5A059] hover:text-[#070B19] text-white font-bold rounded-xl border border-white/15 transition-all text-xs uppercase tracking-wider cursor-pointer"
                >
                  Apply for GBN Circle
                </Link>
              </div>
            </div>

            {/* Tier 2: GBN Elite Council */}
            <div className="bg-gradient-to-br from-[#0F1E3D] to-[#0A162B] border-2 border-[#D4AF37] rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37]">
                      <Crown className="w-5 h-5" />
                    </div>
                    <h4 className="text-2xl font-bold text-white">
                      {tiers.tier2Title || 'GBN Elite Council'}
                    </h4>
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 bg-[#D4AF37] text-black rounded-full shadow-md font-sans">
                    VIP Mastermind
                  </span>
                </div>

                <div className="p-3 bg-[#070B19] rounded-xl border border-[#D4AF37]/40 mb-5 relative z-10">
                  <span className="text-xs font-bold text-[#D4AF37] block">
                    {tiers.tier2Criteria || 'For businesses with ₹5 Crore+ annual turnover'}
                  </span>
                </div>

                <p className="text-sm text-gray-200 leading-relaxed mb-6 relative z-10">
                  {tiers.tier2Desc ||
                    'An exclusive, invite-only mastermind council for established enterprise leaders and visionary founders.'}
                </p>

                <div className="space-y-3 pt-4 border-t border-white/15 relative z-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-2">
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
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 relative z-10">
                <Link
                  href="/contact-us?service=GBN%20Circle"
                  className="w-full block text-center py-3.5 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#C5A059] text-black font-extrabold rounded-xl shadow-xl hover:scale-[1.02] transition-all text-xs uppercase tracking-wider cursor-pointer"
                >
                  Apply for Elite Council
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. GLOBAL IMPACT STATS */}
      {/* ============================================================ */}
      <section className="py-16 max-w-[1140px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#0B162C]/60 border border-white/10 rounded-2xl p-6 text-center space-y-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37] block font-mono">
              {stats.stat1Number || '500+'}
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-gray-300 block">
              {stats.stat1Label || 'Vetted Business Leaders'}
            </span>
          </div>

          <div className="bg-[#0B162C]/60 border border-white/10 rounded-2xl p-6 text-center space-y-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37] block font-mono">
              {stats.stat2Number || '12+'}
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-gray-300 block">
              {stats.stat2Label || 'Global Chapters & Hubs'}
            </span>
          </div>

          <div className="bg-[#0B162C]/60 border border-white/10 rounded-2xl p-6 text-center space-y-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37] block font-mono">
              {stats.stat3Number || '₹150Cr+'}
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-gray-300 block">
              {stats.stat3Label || 'Closed Business Collaborations'}
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. CALL TO ACTION SECTION */}
      {/* ============================================================ */}
      <section className="py-20 max-w-[1140px] mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#0B162C] via-[#112347] to-[#0B162C] border border-[#C5A059]/40 rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">
              Direct Executive Membership
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {cta.heading || 'Ready to Accelerate Your Global Reach?'}
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
              {cta.description ||
                'Join an elite circle of entrepreneurs and industry leaders creating cross-border impact. Apply for GBN Circle membership today.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href={cta.btnLink || '/contact-us?service=GBN%20Circle'}
              className="w-full sm:w-auto bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-black font-extrabold text-sm px-9 py-4 rounded-xl shadow-xl hover:scale-105 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>{cta.btnText || 'Join the Network / Become a Member'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => openModalWithService('GBN Circle Membership')}
              className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer"
            >
              Quick Callback Request
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

