'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Share2,
  Sparkles,
  Binary,
  LineChart,
  Briefcase,
  Laptop,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Layers,
} from 'lucide-react';
import { useConsultation } from '@/contexts/ConsultationContext';
import { ServicesPageContent } from '@/lib/defaultPageContent';

export interface ServiceCardItem {
  title: string;
  subtitle: string;
  desc: string;
  icon?: React.ElementType;
  href: string;
  highlights: string[];
}

interface ServicesClientProps {
  content: ServicesPageContent;
  customServices: ServiceCardItem[];
}

export default function ServicesClient({ content, customServices }: ServicesClientProps) {
  const { openModal } = useConsultation();

  const defaultServices: ServiceCardItem[] = [
    {
      title: 'Ditya Wealth House',
      subtitle: 'Ditya Trade Code',
      desc: 'What you do in trading matters deeply. How you enter and exit the market can have a strong impact on your profits and losses. With the right guidance through Ditya Trade Code and numerology-based timing, achieve consistency and growth.',
      icon: LineChart,
      href: '/ditya-wealth-house',
      highlights: ['Stock market and live trading guidance', 'F&O and forex trading support', 'Trade analysis and risk management'],
    },
    {
      title: 'Ditya Astroverse',
      subtitle: 'Ditya Divine Code',
      desc: 'What you carry in your name and numbers matters deeply. How your energy is aligned can have a powerful impact on your life and business with numerology, tarot, astrology, and Vedic insights.',
      icon: Sparkles,
      href: '/ditya-astroverse',
      highlights: ['Numerology and name correction', 'Tarot card and astrology guidance', 'Face reading & Vedic astrology'],
    },
    {
      title: 'Ditya Math House',
      subtitle: 'Ditya Math Code',
      desc: 'What you learn in math matters deeply. How clearly you understand concepts can have a strong impact on your confidence and academic performance with structured concept clarity.',
      icon: Binary,
      href: '/ditya-math-house',
      highlights: ['Math learning and concept clarity', 'Doubt solving and practice support', 'Academic performance improvement'],
    },
    {
      title: 'Ditya Business House',
      subtitle: 'Business Consultancy & Growth',
      desc: 'What you decide in business matters deeply. How you plan, execute, and grow can have a strong impact on your success and long-term stability with clear strategies and strategic support.',
      icon: Briefcase,
      href: '/ditya-business-house',
      highlights: ['Business consultancy and growth planning', 'Strategy building & execution support', 'Decision-making and opportunity guidance'],
    },
    {
      title: 'Ditya Trading House',
      subtitle: 'Financial Markets & Trading Education',
      desc: 'Learn. Trade. Grow. How clearly you understand market behavior, risk management, and decision-making can have a strong impact on your trading journey and financial confidence.',
      icon: TrendingUp,
      href: '/ditya-trading-house',
      highlights: ['Coworking spaces & flexible seating', 'Productivity & focused work zones', 'Stock market & live trading guidance'],
    },
    {
      title: 'Ditya Tech House',
      subtitle: 'Ditya Quantum Code',
      desc: 'What you build in technology matters deeply. How your systems and digital platforms perform can have a strong impact on your business growth and efficiency with software development and automation.',
      icon: Laptop,
      href: '/ditya-tech-house',
      highlights: ['Software development & system building', 'Automation and technical support', 'Website and application solutions'],
    },
  ];

  const allServices = [...defaultServices, ...customServices];

  return (
    <div className="pb-16 bg-white">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#020D0C] via-[#041614] to-[#0D2622] text-white py-20 text-center relative overflow-hidden border-b border-white/5">
        {/* Sacred Geometry Silk Banner Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/inner-banner-bg.jpg"
            alt="Services Banner Background"
            fill
            className="object-cover object-center opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020D0C]/90 via-[#041614]/80 to-[#0D2622]/85" />
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-[#059669]/10 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="max-w-[1140px] mx-auto px-4 relative z-10">
          <span className="text-xs font-bold text-[#059669] tracking-widest uppercase inline-block bg-white/10 px-3.5 py-1 rounded-full border border-white/15 mb-3">
            {content.banner?.badge || 'Integrated Solutions'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold !text-white mt-1 tracking-tight drop-shadow-md">
            {content.banner?.title || 'Our Services & Houses'}
          </h1>
          <p className="text-sm sm:text-base text-gray-200 max-w-xl mx-auto mt-3 font-normal leading-relaxed drop-shadow-sm">
            {content.banner?.subtitle ||
              'Explore our specialized Houses and bespoke service divisions designed to elevate your personal clarity, educational excellence, and business growth.'}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 max-w-[1140px] mx-auto px-4">
        {content.intro && (
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#041614]">
              {content.intro.heading}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {content.intro.description}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allServices.map((item, idx) => {
            const IconComp = item.icon || Layers;
            return (
              <div
                key={idx}
                className="bg-[#F9F9F9] rounded-asymmetric p-8 border border-gray-200/80 shadow-sm card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#059669] text-white flex items-center justify-center mb-6 shadow-md">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-[#059669] uppercase tracking-wider block">
                    {item.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-[#041614] mt-1 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 line-clamp-3">
                    {item.desc}
                  </p>

                  <ul className="space-y-2 mb-8">
                    {item.highlights.slice(0, 3).map((h, hIdx) => (
                      <li key={hIdx} className="flex items-center space-x-2 text-xs text-gray-700">
                        <CheckCircle className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                        <span className="line-clamp-1">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between">
                  <Link
                    href={item.href}
                    className="text-xs font-bold text-[#041614] hover:text-[#059669] inline-flex items-center space-x-1 uppercase tracking-wider"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => openModal(item.title)}
                    className="text-xs font-semibold bg-[#059669] hover:bg-[#e64a19] text-white px-3.5 py-1.5 rounded-asymmetric transition-colors cursor-pointer"
                  >
                    Consult
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

