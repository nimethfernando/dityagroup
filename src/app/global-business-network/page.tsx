'use client';

import React from 'react';
import HouseSidebar from '@/components/HouseSidebar';
import { CheckCircle2, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { useConsultation } from '@/contexts/ConsultationContext';

export default function GlobalBusinessNetworkPage() {
  const { openModal } = useConsultation();

  return (
    <div className="pb-36 bg-white">
      {/* Header Banner */}
      <section className="bg-[#011633] text-white py-16 relative overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-4 relative z-10">
          <span className="text-xs font-bold text-[#FF5722] tracking-widest uppercase">
            Networking • Referrals • Growth
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2">
            Global Business Network
          </h1>
          <p className="text-sm text-gray-300 max-w-xl mt-3">
            An elite platform connecting entrepreneurs, founders, and decision-makers for strategic
            collaborations and high-value referral exchanges.
          </p>
        </div>
      </section>

      {/* Main Content with 2 Columns */}
      <div className="max-w-[1140px] mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: House Sidebar */}
          <div className="lg:col-span-4">
            <HouseSidebar onOpenConsultation={() => openModal('Global Business Network')} />
          </div>

          {/* Right Column: House Details */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#FF5722] uppercase tracking-wider block">
                GBN Circle
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#011633]">
                Empowering Business Owners Through High-Trust Networks
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Global Business Network (GBN Circle) is designed to help entrepreneurs transcend
                traditional networking limitations. We create curated peer groups, closed-door
                executive forums, and structured referral ecosystems where business leaders can
                scale with integrity and mutual trust.
              </p>
            </div>

            {/* Dual Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 border border-gray-200 rounded-asymmetric bg-[#F9F9F9]">
                <div className="w-12 h-12 rounded-xl bg-[#FF5722] text-white flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#011633] mb-1">Increase Growth</h4>
                <p className="text-xs text-gray-500">
                  Expand into new territories with direct access to vetted partners and clients.
                </p>
              </div>

              <div className="p-6 border border-gray-200 rounded-asymmetric bg-[#F9F9F9]">
                <div className="w-12 h-12 rounded-xl bg-[#FF5722] text-white flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#011633] mb-1">Save Time</h4>
                <p className="text-xs text-gray-500">
                  Skip the friction of cold prospecting and connect directly with key decision-makers.
                </p>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-[#011633]">What GBN Circle Delivers:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                {[
                  'Weekly structured networking circles',
                  'Cross-industry referral generation',
                  'Exclusive corporate masterclasses',
                  'Access to investors and strategic capital',
                  'Verified business profile directory',
                  'VIP access to national summits & expos',
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
                <h4 className="text-lg font-bold">Ready to Expand Your Network?</h4>
                <p className="text-xs text-gray-300 mt-1">
                  Apply for GBN Circle membership and meet your local chapter.
                </p>
              </div>
              <button
                onClick={() => openModal('Global Business Network Membership')}
                className="btn-ditya-orange text-xs uppercase tracking-wider shrink-0 cursor-pointer"
              >
                Apply for Membership
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
