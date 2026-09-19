'use client';

import React from 'react';
import Image from 'next/image';
import { TrendingUp, Clock } from 'lucide-react';
import { useConsultation } from '@/contexts/ConsultationContext';
import { AboutPageContent } from '@/lib/defaultPageContent';

interface AboutUsClientProps {
  content: AboutPageContent;
}

export default function AboutUsClient({ content }: AboutUsClientProps) {
  const { openModal } = useConsultation();

  return (
    <div className="pb-16 bg-white">
      {/* Page Title Banner */}
      <section className="bg-gradient-to-r from-[#020D0C] via-[#041614] to-[#0D2622] text-white py-20 text-center relative overflow-hidden border-b border-white/5">
        {/* Sacred Geometry Silk Banner Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/inner-banner-bg.jpg"
            alt="About Banner Background"
            fill
            className="object-cover object-center opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020D0C]/90 via-[#041614]/80 to-[#0D2622]/85" />
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-[#059669]/10 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="max-w-[1140px] mx-auto px-4 relative z-10">
          <span className="text-xs font-bold text-[#059669] tracking-widest uppercase inline-block bg-white/10 px-3.5 py-1 rounded-full border border-white/15 mb-3">
            {content.banner.badge || 'Get To Know Us'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-1 tracking-tight">
            {content.banner.title || 'About Us'}
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto mt-3 font-normal leading-relaxed">
            {content.banner.subtitle ||
              'Building Solutions That Simplify Growth, Learning, and Financial Success'}
          </p>
        </div>
      </section>

      {/* Main Story & Vision */}
      <section className="py-20 max-w-[1140px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative h-[480px] w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100">
              <Image
                src="/images/core-values.jpg"
                alt="About Ditya Group"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 bg-[#059669] text-white p-6 rounded-asymmetric shadow-xl">
              <span className="text-xs uppercase font-bold tracking-wider opacity-90">Our Mission</span>
              <p className="text-sm font-semibold mt-1">
                {content.story.missionQuote ||
                  'Creating an integrated ecosystem where individuals and enterprises grow with clarity and confidence.'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 pt-6 lg:pt-0">
            <span className="text-xs font-bold text-[#059669] tracking-wider uppercase flex items-center space-x-2">
              <span className="w-6 h-[2px] bg-[#059669]"></span>
              <span>{content.story.subtitle || 'Our Story'}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#041614] leading-tight">
              {content.story.heading ||
                'An Integrated Ecosystem For Modern Growth & Timeless Wisdom'}
            </h2>

            <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed">
              {content.story.para1 ||
                'At DITYA Group, we believe growth becomes easier when people have access to the right support systems, structured solutions, and clear guidance. Our mission is to create an ecosystem where individuals, students, professionals, businesses, and organizations can access multiple solutions under one platform.'}
            </p>

            <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed">
              {content.story.para2 ||
                'DITYA Group was built with the vision of creating practical solutions that support learning, technology, business growth, digital transformation, financial understanding, and personal development.'}
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 border border-gray-200 rounded-asymmetric bg-[#F9F9F9]">
                <div className="w-10 h-10 rounded-lg bg-[#059669] text-white flex items-center justify-center mb-2">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#041614]">
                  {content.story.prodCardTitle || 'Increase Productivity'}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {content.story.prodCardDesc ||
                    'Streamlined execution and smarter decisions across every domain.'}
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded-asymmetric bg-[#F9F9F9]">
                <div className="w-10 h-10 rounded-lg bg-[#059669] text-white flex items-center justify-center mb-2">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#041614]">
                  {content.story.timeCardTitle || 'Save Valuable Time'}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {content.story.timeCardDesc ||
                    'Let dedicated systems handle complexity while you expand horizons.'}
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => openModal('About Us Inquiry')}
                className="btn-ditya-orange text-sm font-semibold shadow-md cursor-pointer"
              >
                Connect With Our Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Message Section */}
      <section className="py-16 bg-[#F9F9F9] border-t border-b border-gray-200/60">
        <div className="max-w-[800px] mx-auto px-4 text-center space-y-6">
          <span className="text-xs font-bold text-[#059669] tracking-widest uppercase">
            {content.founder.badge || 'Founder Message'}
          </span>
          <blockquote className="text-lg sm:text-xl font-medium text-[#041614] italic leading-relaxed">
            “{content.founder.quote ||
              'Our vision is simple — create systems, services, and solutions that make growth easier for individuals and businesses while continuously expanding opportunities under one ecosystem.'}”
          </blockquote>
          <div>
            <h4 className="text-lg font-bold text-[#041614]">
              {content.founder.name || 'Aamitt Batra'}
            </h4>
            <p className="text-xs text-gray-500">
              {content.founder.role || 'Founder & CEO, DITYA GROUP'}
            </p>
          </div>
          <div className="relative h-12 w-32 mx-auto opacity-80">
            <Image
              src="/images/signature.png"
              alt="Signature"
              fill
              className="object-contain object-center"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

