'use client';

import React from 'react';
import HouseSidebar from '@/components/HouseSidebar';
import { CheckCircle2, TrendingUp, Clock, Sparkles } from 'lucide-react';
import { useConsultation } from '@/contexts/ConsultationContext';

export default function DityaAstroversePage() {
  const { openModal } = useConsultation();

  return (
    <div className="pb-36 bg-white">
      {/* Header Banner */}
      <section className="bg-[#011633] text-white py-16 relative overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-4 relative z-10">
          <span className="text-xs font-bold text-[#FF5722] tracking-widest uppercase">
            Numerology • Astrology • Tarot • Energy
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2">
            Ditya Astro Verse
          </h1>
          <p className="text-sm text-gray-300 max-w-xl mt-3">
            Operated under Ditya Divine Code — Aligning your planetary cycles, vibrational numbers,
            and cosmic frequencies for life and business mastery.
          </p>
        </div>
      </section>

      {/* Main Content with 2 Columns */}
      <div className="max-w-[1140px] mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: House Sidebar */}
          <div className="lg:col-span-4">
            <HouseSidebar onOpenConsultation={() => openModal('Ditya Astro Verse')} />
          </div>

          {/* Right Column: House Details */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#FF5722] uppercase tracking-wider block">
                Ditya Divine Code
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#011633]">
                What You Carry In Your Name & Numbers Matters Deeply
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Every digit and vibration in your birth chart, business name, and home plays a
                profound role in the flow of energy. Ditya Astro Verse blends ancient Vedic
                principles with modern analytical numerology to decode hidden blockages, optimize
                decision timing, and open channels of sustained wealth.
              </p>
            </div>

            {/* Dual Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 border border-gray-200 rounded-asymmetric bg-[#F9F9F9]">
                <div className="w-12 h-12 rounded-xl bg-[#FF5722] text-white flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#011633] mb-1">Aligned Decisions</h4>
                <p className="text-xs text-gray-500">
                  Launch companies, sign contracts, and make investments during optimal cosmic windows.
                </p>
              </div>

              <div className="p-6 border border-gray-200 rounded-asymmetric bg-[#F9F9F9]">
                <div className="w-12 h-12 rounded-xl bg-[#FF5722] text-white flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#011633] mb-1">Remove Obstacles</h4>
                <p className="text-xs text-gray-500">
                  Fast, proven energetic remedies to clear stuck financial and relational patterns.
                </p>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-[#011633]">Comprehensive Astroverse Offerings:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                {[
                  'Professional Name Correction & Spelling Harmonization',
                  'Business Name & Brand Numerical Analysis',
                  'Vedic Birth Chart & Kundli Deep Dive',
                  'Tarot Intuitive Guidance & Decision Support',
                  'Vastu Consultation for Homes & Corporate Offices',
                  'Customized Gemstone & Energy Frequency Remedies',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF5722] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className="p-8 bg-[#011633] rounded-asymmetric text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <h4 className="text-lg font-bold">Discover Your Numerological Blueprint</h4>
                <p className="text-xs text-gray-300 mt-1">
                  Book a 1-on-1 private reading with our senior numerology master.
                </p>
              </div>
              <button
                onClick={() => openModal('Astroverse Private Reading')}
                className="btn-ditya-orange text-xs uppercase tracking-wider shrink-0 cursor-pointer"
              >
                Book Private Reading
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
