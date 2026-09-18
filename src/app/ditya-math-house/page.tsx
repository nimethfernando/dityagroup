'use client';

import React from 'react';
import HouseSidebar from '@/components/HouseSidebar';
import { CheckCircle2, TrendingUp, Clock, Binary } from 'lucide-react';
import { useConsultation } from '@/contexts/ConsultationContext';

export default function DityaMathHousePage() {
  const { openModal } = useConsultation();

  return (
    <div className="pb-36 bg-white">
      {/* Header Banner */}
      <section className="bg-[#011633] text-white py-16 relative overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-4 relative z-10">
          <span className="text-xs font-bold text-[#FF5722] tracking-widest uppercase">
            Concept Mastery • Speed Math • Academic Excellence
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2">
            Ditya Math House
          </h1>
          <p className="text-sm text-gray-300 max-w-xl mt-3">
            Operated under Ditya Math Code — Building mathematical confidence, conceptual clarity,
            and high-performance problem-solving skills for every student.
          </p>
        </div>
      </section>

      {/* Main Content with 2 Columns */}
      <div className="max-w-[1140px] mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: House Sidebar */}
          <div className="lg:col-span-4">
            <HouseSidebar onOpenConsultation={() => openModal('Ditya Math House')} />
          </div>

          {/* Right Column: House Details */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#FF5722] uppercase tracking-wider block">
                Ditya Math Code
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#011633]">
                Transforming Math From Anxiety Into Intuitive Strength
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Mathematics is not just about memorizing formulas; it is the universal language of
                logic, patterns, and clarity. Ditya Math House dismantles mathematical apprehension
                through systematic conceptual coaching, visual problem decomposition, and Vedic mental
                math techniques that dramatically elevate speed and test scores.
              </p>
            </div>

            {/* Dual Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 border border-gray-200 rounded-asymmetric bg-[#F9F9F9]">
                <div className="w-12 h-12 rounded-xl bg-[#FF5722] text-white flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#011633] mb-1">Score Improvement</h4>
                <p className="text-xs text-gray-500">
                  Targeted drills and structured diagnostic testing to conquer difficult topics.
                </p>
              </div>

              <div className="p-6 border border-gray-200 rounded-asymmetric bg-[#F9F9F9]">
                <div className="w-12 h-12 rounded-xl bg-[#FF5722] text-white flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#011633] mb-1">Speed Calculations</h4>
                <p className="text-xs text-gray-500">
                  Master lightning-fast mental arithmetic for competitive and school exams.
                </p>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-[#011633]">Our Academic Programs:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                {[
                  'Foundational Concept Building (Grades 6–12)',
                  'Vedic Mathematics & Rapid Calculation Workshops',
                  'Board Exam Focused Booster Crash Courses',
                  'Competitive Exam Quantitative Aptitude Preparation',
                  'One-on-One Dedicated Doubt Clearing Sessions',
                  'Continuous Performance Analytics & Parent Reports',
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
                <h4 className="text-lg font-bold">Book a Math Assessment Session</h4>
                <p className="text-xs text-gray-300 mt-1">
                  Evaluate your student’s strengths and identify conceptual blindspots.
                </p>
              </div>
              <button
                onClick={() => openModal('Math House Assessment')}
                className="btn-ditya-orange text-xs uppercase tracking-wider shrink-0 cursor-pointer"
              >
                Schedule Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
