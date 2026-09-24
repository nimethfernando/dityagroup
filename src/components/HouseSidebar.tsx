'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, ChevronRight } from 'lucide-react';

interface HouseSidebarProps {
  onOpenConsultation?: () => void;
}

export default function HouseSidebar({ onOpenConsultation }: HouseSidebarProps) {
  const pathname = usePathname();

  const services = [
    { name: 'Global Business Network', href: '/global-business-network' },
    { name: 'Ditya Wealth House', href: '/ditya-wealth-house' },
    { name: 'Ditya Astroverse', href: '/ditya-astroverse' },
    { name: 'Ditya Math House', href: '/ditya-math-house' },
    { name: 'Ditya Business House', href: '/ditya-business-house' },
    { name: 'Ditya Trading House', href: '/ditya-trading-house' },
    { name: 'Ditya Tech House', href: '/ditya-tech-house' },
  ];

  return (
    <aside className="space-y-8">
      {/* House Navigation Box */}
      <div className="bg-[#F8FAFC] dark:bg-[#061816] rounded-asymmetric p-6 border border-gray-200/70 dark:border-white/10 shadow-sm transition-colors">
        <h3 className="text-xl font-bold text-[#041614] dark:text-white mb-5 border-b border-gray-200 dark:border-white/10 pb-3">
          Our Houses & Network
        </h3>
        <ul className="space-y-2">
            {services.map((item) => {
              const active = pathname === item.href;
              const isGBN = item.href === '/global-business-network';
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-asymmetric text-sm font-semibold transition-all ${
                      active
                        ? 'bg-[#059669] text-white shadow-md translate-x-1'
                        : isGBN
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/40 text-[#041614] dark:text-emerald-300 hover:bg-[#ECFDF5] dark:hover:bg-emerald-900/40 hover:text-[#059669] border border-emerald-200/80 dark:border-emerald-500/30 font-bold'
                        : 'bg-white dark:bg-[#030F0E] text-[#041614] dark:text-gray-200 hover:bg-[#ECFDF5] dark:hover:bg-white/5 hover:text-[#059669] dark:hover:text-[#10B981] border border-gray-100 dark:border-white/5'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <span>{item.name}</span>
                      {isGBN && (
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${
                          active
                            ? 'bg-white/20 text-white border-white/30'
                            : 'bg-amber-500/15 text-amber-700 border-amber-500/30'
                        }`}>
                          Main
                        </span>
                      )}
                    </span>
                    <ChevronRight className={`w-4 h-4 ${active ? 'text-white' : 'text-gray-400'}`} />
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>

      {/* 24/7 Callout Card */}
      <div className="bg-[#041614] text-white rounded-asymmetric p-8 text-center space-y-5 shadow-xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-[#059669] text-white flex items-center justify-center mx-auto shadow-lg">
          <Phone className="w-7 h-7" />
        </div>
        <div>
          <h4 className="text-xl font-bold !text-white drop-shadow-sm">Not Enough Time In The Day? Give Us A Call</h4>
          <p className="text-xs text-gray-200 mt-2 leading-relaxed">
            We are available 24/7 to help you with any questions or concerns that you have about our products or services. You can contact us anytime and we will be happy to assist you.
          </p>
        </div>
        <div className="space-y-3 pt-3 border-t border-white/10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/90 block">
              India Headquarters
            </span>
            <a
              href="tel:+919351090301"
              className="block text-lg font-extrabold text-[#10B981] hover:text-white transition-colors"
            >
              +91-93510 90301
            </a>
          </div>
          <div className="pt-2 border-t border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300/90 block">
              Georgia International Desk
            </span>
            <a
              href="tel:+995555433091"
              className="block text-base font-extrabold text-[#10B981] hover:text-white transition-colors"
            >
              +995 555433091
            </a>
          </div>
        </div>
        <button
          onClick={onOpenConsultation}
          className="w-full bg-[#059669] hover:bg-[#047857] text-white py-3 rounded-asymmetric text-sm font-semibold transition-colors cursor-pointer"
        >
          Get Started
        </button>
      </div>
    </aside>
  );
}
