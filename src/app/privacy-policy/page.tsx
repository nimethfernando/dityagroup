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
    <div className="pb-36 bg-white">
      {/* Banner */}
      <section className="bg-[#011633] text-white py-16 text-center">
        <div className="max-w-[1140px] mx-auto px-4">
          <span className="text-xs font-bold text-[#FF5722] tracking-widest uppercase">
            {banner?.badge || 'Legal & Compliance'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2">
            {banner?.title || 'Privacy Policy'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mt-2">
            {banner?.subtitle || 'Last Updated: September 2026 • Ditya Enterprises & Ditya Wealth Management PVT LTD'}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-4 py-16 space-y-8 text-gray-700 leading-relaxed text-sm">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-3">
            <h2 className="text-xl font-bold text-[#011633]">{section.title}</h2>
            <p className="whitespace-pre-line">{section.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
