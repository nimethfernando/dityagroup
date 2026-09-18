'use client';

import React from 'react';
import HouseSidebar from '@/components/HouseSidebar';
import { CheckCircle2, TrendingUp, Clock, Laptop } from 'lucide-react';
import { useConsultation } from '@/contexts/ConsultationContext';

export default function DityaTechHousePage() {
  const { openModal } = useConsultation();

  return (
    <div className="pb-36 bg-white">
      {/* Header Banner */}
      <section className="bg-[#011633] text-white py-16 relative overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-4 relative z-10">
          <span className="text-xs font-bold text-[#FF5722] tracking-widest uppercase">
            Software • AI • Web & Mobile • Automation
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2">
            Ditya Tech House
          </h1>
          <p className="text-sm text-gray-300 max-w-xl mt-3">
            Operated under Ditya Quantum Code — Architecting enterprise software solutions, AI
            workflows, responsive web platforms, and digital transformation.
          </p>
        </div>
      </section>

      {/* Main Content with 2 Columns */}
      <div className="max-w-[1140px] mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: House Sidebar */}
          <div className="lg:col-span-4">
            <HouseSidebar onOpenConsultation={() => openModal('Ditya Tech House')} />
          </div>

          {/* Right Column: House Details */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#FF5722] uppercase tracking-wider block">
                Ditya Quantum Code
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#011633]">
                What You Build In Technology Matters Deeply
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                In a digital-first global economy, cutting-edge technology is the primary driver of
                competitive advantage. Ditya Tech House delivers full-cycle software engineering,
                cloud infrastructure, custom web & mobile apps, and artificial intelligence
                integrations that empower businesses to operate with extreme speed and reliability.
              </p>
            </div>

            {/* Dual Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 border border-gray-200 rounded-asymmetric bg-[#F9F9F9]">
                <div className="w-12 h-12 rounded-xl bg-[#FF5722] text-white flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#011633] mb-1">Modern Architectures</h4>
                <p className="text-xs text-gray-500">
                  Next.js, React, TypeScript, cloud serverless microservices, and clean databases.
                </p>
              </div>

              <div className="p-6 border border-gray-200 rounded-asymmetric bg-[#F9F9F9]">
                <div className="w-12 h-12 rounded-xl bg-[#FF5722] text-white flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#011633] mb-1">Rapid Deployment</h4>
                <p className="text-xs text-gray-500">
                  Agile sprints, automated CI/CD pipelines, and enterprise-grade security.
                </p>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-[#011633]">Technology Engineering Services:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                {[
                  'Custom Web Applications (Next.js, React, Tailwind, Node)',
                  'Enterprise Database Design, Optimization & Migration',
                  'AI Chatbots, LLM Agents & Workflow Automation',
                  'E-Commerce & High-Conversion Digital Portals',
                  'Mobile Applications (iOS & Android cross-platform)',
                  'Cybersecurity Audits, API Development & Cloud Hosting',
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
                <h4 className="text-lg font-bold">Have a Project in Mind?</h4>
                <p className="text-xs text-gray-300 mt-1">
                  Discuss your technical architecture and scope with our lead developers.
                </p>
              </div>
              <button
                onClick={() => openModal('Tech House Project Scope')}
                className="btn-ditya-orange text-xs uppercase tracking-wider shrink-0 cursor-pointer"
              >
                Discuss Project Scope
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
