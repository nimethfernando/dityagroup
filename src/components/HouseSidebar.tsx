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
      <div className="bg-[#F8FAFC] rounded-asymmetric p-6 border border-gray-200/70 shadow-sm">
        <h3 className="text-xl font-bold text-[#041614] mb-5 border-b border-gray-200 pb-3">
          Our Houses
        </h3>
        <ul className="space-y-2">
          {services.map((item) => {
            const active =
              pathname === item.href ||
              (item.href === '/ditya-wealth-house' && pathname === '/global-business-network');
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-asymmetric text-sm font-semibold transition-all ${
                    active
                      ? 'bg-[#059669] text-white shadow-md translate-x-1'
                      : 'bg-white text-[#041614] hover:bg-[#ECFDF5] hover:text-[#059669] border border-gray-100'
                  }`}
                >
                  <span>{item.name}</span>
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
          <h4 className="text-xl font-bold">Not Enough Time In The Day? Give Us A Call</h4>
          <p className="text-xs text-gray-300 mt-2 leading-relaxed">
            We are available 24/7 to help you with any questions or concerns that you have about our products or services. You can contact us anytime and we will be happy to assist you.
          </p>
        </div>
        <a
          href="tel:+919351090301"
          className="block text-xl font-extrabold text-[#10B981] hover:text-white transition-colors"
        >
          +91-93510 90301
        </a>
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
