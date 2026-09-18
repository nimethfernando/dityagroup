'use client';

import React from 'react';
import HouseSidebar from '@/components/HouseSidebar';
import { CheckCircle2, TrendingUp, Clock, LineChart } from 'lucide-react';
import { useConsultation } from '@/contexts/ConsultationContext';

export default function DityaTradingHousePage() {
  const { openModal } = useConsultation();

  return (
    <div className="pb-36 bg-white">
      {/* Header Banner */}
      <section className="bg-[#011633] text-white py-16 relative overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-4 relative z-10">
          <span className="text-xs font-bold text-[#FF5722] tracking-widest uppercase">
            Learn • Trade • Grow
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2">
            Ditya Trading House
          </h1>
          <p className="text-sm text-gray-300 max-w-xl mt-3">
            Financial market education, live market technical analysis, discipline mastery, and
            structured trading mentorship for consistent wealth generation.
          </p>
        </div>
      </section>

      {/* Main Content with 2 Columns */}
      <div className="max-w-[1140px] mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: House Sidebar */}
          <div className="lg:col-span-4">
            <HouseSidebar onOpenConsultation={() => openModal('Ditya Trading House')} />
          </div>

          {/* Right Column: House Details */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#FF5722] uppercase tracking-wider block">
                Financial Markets & Trading Education
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#011633]">
                Mastering the Stock Market with Data, Discipline & Live Mentorship
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Trading without a validated edge and sound psychological discipline is gambling.
                Ditya Trading House equips aspiring and experienced market participants with
                institutional price action concepts, risk-to-reward frameworks, and real-time market
                guidance to protect capital and consistently extract profits.
              </p>
            </div>

            {/* Dual Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 border border-gray-200 rounded-asymmetric bg-[#F9F9F9]">
                <div className="w-12 h-12 rounded-xl bg-[#FF5722] text-white flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#011633] mb-1">Risk-First Trading</h4>
                <p className="text-xs text-gray-500">
                  Protect your downside rigorously with systematic position sizing and stops.
                </p>
              </div>

              <div className="p-6 border border-gray-200 rounded-asymmetric bg-[#F9F9F9]">
                <div className="w-12 h-12 rounded-xl bg-[#FF5722] text-white flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#011633] mb-1">Live Market Hours</h4>
                <p className="text-xs text-gray-500">
                  Observe real-time trade setups, levels, and execution discipline during market hours.
                </p>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-[#011633]">Trading Mentorship Syllabus:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                {[
                  'Price Action & Advanced Candlestick Pattern Recognition',
                  'Futures & Options (F&O) Hedging and Greeks Mastery',
                  'Volume Spread Analysis (VSA) & Institutional Order Flow',
                  'Daily Pre-Market Levels & Real-Time Trading Room Access',
                  'Emotional Discipline, Trader Psychology & Journaling',
                  'Long-Term Portfolio Construction & Wealth Compounding',
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
                <h4 className="text-lg font-bold">Join the Live Trading Mentorship</h4>
                <p className="text-xs text-gray-300 mt-1">
                  Access our next trading cohort and private daily discord channels.
                </p>
              </div>
              <button
                onClick={() => openModal('Trading House Mentorship')}
                className="btn-ditya-orange text-xs uppercase tracking-wider shrink-0 cursor-pointer"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
