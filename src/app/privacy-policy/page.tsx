import React from 'react';
import { getPageContent } from '@/lib/getPageContent';
import { LegalPageContent } from '@/lib/defaultPageContent';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function PrivacyPolicyPage() {
  const pageData = (await getPageContent('privacy-policy')) as LegalPageContent;
  const banner = pageData?.banner;
  const content = pageData?.content;

  const sections = [
    { title: content?.section1Title, text: content?.section1Text },
    { title: content?.section2Title, text: content?.section2Text },
    { title: content?.section3Title, text: content?.section3Text },
    { title: content?.section4Title, text: content?.section4Text },
    { title: content?.section5Title, text: content?.section5Text },
  ].filter((s) => s.title && s.text);

  return (
    <div className="pb-16 bg-white">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#020D0C] via-[#041614] to-[#0D2622] text-white py-20 text-center relative overflow-hidden border-b border-white/5">
        <div className="max-w-[1140px] mx-auto px-4 relative z-10">
          <span className="text-xs font-bold text-[#10B981] tracking-widest uppercase inline-block bg-white/10 px-3.5 py-1 rounded-full border border-white/15 mb-3">
            {banner?.badge || 'Legal & Compliance'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold !text-white mt-1 tracking-tight drop-shadow-md">
            {banner?.title || 'Privacy Policy'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-200 max-w-xl mx-auto mt-3 drop-shadow-sm">
            {banner?.subtitle || 'Last Updated: September 2026 • Ditya Enterprises & Ditya Wealth Management PVT LTD'}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-4 py-16 space-y-8 text-gray-700 leading-relaxed text-sm">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-3">
            <h2 className="text-xl font-bold text-[#041614]">{section.title}</h2>
            <p className="whitespace-pre-line">{section.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
