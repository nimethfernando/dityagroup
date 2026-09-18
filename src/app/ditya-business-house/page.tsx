'use client';

import React from 'react';
import HouseSidebar from '@/components/HouseSidebar';
import { CheckCircle2, TrendingUp, Clock, Briefcase } from 'lucide-react';
import { useConsultation } from '@/contexts/ConsultationContext';

export default function DityaBusinessHousePage() {
  const { openModal } = useConsultation();

  return (
    <div className="pb-36 bg-white">
      {/* Header Banner */}
      <section className="bg-[#011633] text-white py-16 relative overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-4 relative z-10">
          <span className="text-xs font-bold text-[#FF5722] tracking-widest uppercase">
            Consultancy • Strategy • Execution • Scaling
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2">
            Ditya Business House
          </h1>
          <p className="text-sm text-gray-300 max-w-xl mt-3">
            What you decide in business matters deeply. Delivering actionable consulting, operating
            frameworks, and execution advisory for ambitious enterprises.
          </p>
        </div>
      </section>

      {/* Main Content with 2 Columns */}
      <div className="max-w-[1140px] mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: House Sidebar */}
          <div className="lg:col-span-4">
            <HouseSidebar onOpenConsultation={() => openModal('Ditya Business House')} />
          </div>

          {/* Right Column: House Details */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#FF5722] uppercase tracking-wider block">
                Business Growth & Consultancy
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#011633]">
                Architecting Resilient Businesses For Predictable Revenue
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Navigating market headwinds, team alignment, and operational bottlenecks requires
                experienced guidance. Ditya Business House embeds strategic advisors within your
                leadership workflow to identify revenue leakages, streamline core operating systems,
                and position your enterprise for high-multiple growth.
              </p>
            </div>

            {/* Dual Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 border border-gray-200 rounded-asymmetric bg-[#F9F9F9]">
                <div className="w-12 h-12 rounded-xl bg-[#FF5722] text-white flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#011633] mb-1">Scale Revenue</h4>
                <p className="text-xs text-gray-500">
                  Data-driven market entry, pricing optimization, and client acquisition pipelines.
                </p>
              </div>

              <div className="p-6 border border-gray-200 rounded-asymmetric bg-[#F9F9F9]">
                <div className="w-12 h-12 rounded-xl bg-[#FF5722] text-white flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#011633] mb-1">Operational Clarity</h4>
                <p className="text-xs text-gray-500">
                  Automate redundant manual workflows and free leadership to focus on strategy.
                </p>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-[#011633]">Strategic Advisory Capabilities:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                {[
                  'Comprehensive Business Model Diagnostic & Audit',
                  'SOP Development & Delegation Architecture',
                  'Cash Flow Optimization & Working Capital Planning',
                  'Go-To-Market & Omnichannel Brand Positioning',
                  'Executive Mentorship & Decision Facilitation',
                  'Mergers, Joint Ventures & Strategic Alliance Structuring',
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
                <h4 className="text-lg font-bold">Request a Strategic Business Audit</h4>
                <p className="text-xs text-gray-300 mt-1">
                  Connect with our principal business consultants for a confidential review.
                </p>
              </div>
              <button
                onClick={() => openModal('Business House Strategic Audit')}
                className="btn-ditya-orange text-xs uppercase tracking-wider shrink-0 cursor-pointer"
              >
                Request Audit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
