'use client';

import React from 'react';
import Image from 'next/image';
import HouseSidebar from '@/components/HouseSidebar';
import { CheckCircle2, TrendingUp, Clock } from 'lucide-react';
import { useConsultation } from '@/contexts/ConsultationContext';
import { HousePageContent } from '@/lib/defaultPageContent';

interface HousePageTemplateProps {
  content: HousePageContent;
  houseName: string;
}

export default function HousePageTemplate({ content, houseName }: HousePageTemplateProps) {
  const { openModal } = useConsultation();

  return (
    <div className="pb-36 bg-[#FAFAFC]">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#001025] via-[#011633] to-[#0d274c] text-white py-20 relative overflow-hidden border-b border-white/5">
        {/* Sacred Geometry Silk Banner Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/inner-banner-bg.jpg"
            alt="House Banner Background"
            fill
            className="object-cover object-center opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001025]/90 via-[#011633]/80 to-[#0d274c]/85" />
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5722]/10 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="max-w-[1140px] mx-auto px-4 relative z-10">
          <span className="inline-flex items-center space-x-2 text-xs font-bold text-[#FF5722] tracking-widest uppercase bg-white/10 px-3 py-1 rounded-full border border-white/15 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF5722]"></span>
            <span>{content.banner.badge}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-1 tracking-tight">
            {content.banner.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mt-3 font-normal leading-relaxed">
            {content.banner.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content with 2 Columns */}
      <div className="max-w-[1140px] mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: House Sidebar */}
          <div className="lg:col-span-4">
            <HouseSidebar onOpenConsultation={() => openModal(houseName)} />
          </div>

          {/* Right Column: House Details */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#FF5722] uppercase tracking-wider block">
                {content.details.division}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#011633] tracking-tight">
                {content.details.heading}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line pt-1">
                {content.details.description}
              </p>
            </div>

            {/* Dual Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 border border-gray-200/80 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF5722] to-[#FF8A65] text-white flex items-center justify-center mb-4 shadow-md shadow-orange-500/20 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#011633] mb-1.5 group-hover:text-[#FF5722] transition-colors">
                  {content.details.card1Title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {content.details.card1Desc}
                </p>
              </div>

              <div className="p-6 border border-gray-200/80 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF5722] to-[#FF8A65] text-white flex items-center justify-center mb-4 shadow-md shadow-orange-500/20 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#011633] mb-1.5 group-hover:text-[#FF5722] transition-colors">
                  {content.details.card2Title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {content.details.card2Desc}
                </p>
              </div>
            </div>

            {/* Checklist */}
            {content.details.checklists && content.details.checklists.length > 0 && (
              <div className="space-y-4 pt-2">
                <h3 className="text-lg sm:text-xl font-bold text-[#011633]">
                  {content.details.checklistTitle || 'Key Capabilities & Features:'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                  {content.details.checklists.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2.5 p-3 rounded-xl bg-white border border-gray-100 shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#FF5722] shrink-0" />
                      <span className="font-medium text-xs sm:text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Box */}
            <div className="p-8 sm:p-10 bg-gradient-to-r from-[#001025] via-[#011633] to-[#0d274c] rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-white/10 relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-lg sm:text-xl font-bold">{content.details.ctaTitle}</h4>
                <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-md leading-relaxed">
                  {content.details.ctaDesc}
                </p>
              </div>
              <button
                onClick={() => openModal(houseName)}
                className="btn-ditya-orange text-xs uppercase tracking-wider shrink-0 cursor-pointer shadow-lg relative z-10"
              >
                {content.details.ctaBtnText || 'Get Started Today'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
