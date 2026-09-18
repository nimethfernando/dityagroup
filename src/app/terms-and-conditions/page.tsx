import React from 'react';

export default function TermsAndConditionsPage() {
  return (
    <div className="pb-36 bg-white">
      {/* Banner */}
      <section className="bg-[#011633] text-white py-16 text-center">
        <div className="max-w-[1140px] mx-auto px-4">
          <span className="text-xs font-bold text-[#FF5722] tracking-widest uppercase">
            Legal & Compliance
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2">
            Terms and Conditions
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mt-2">
            Ditya Enterprises & Ditya Wealth Management PVT LTD
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-4 py-16 space-y-8 text-gray-700 leading-relaxed text-sm">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-[#011633]">1. Agreement to Terms</h2>
          <p>
            By accessing or using the services provided by Ditya Group (including its 6 Houses:
            Global Business Network, Ditya Astroverse, Ditya Math House, Ditya Business House, Ditya
            Trading House, and Ditya Tech House), you agree to be bound by these Terms and
            Conditions.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-[#011633]">2. Educational & Advisory Disclaimers</h2>
          <p>
            - <strong>Trading & Financial Markets:</strong> Content provided by Ditya Trading House is
            strictly for financial literacy and educational purposes. Trading in securities,
            futures, and options involves substantial capital risk. Past performance does not
            guarantee future results.
          </p>
          <p>
            - <strong>Spiritual & Numerological Guidance:</strong> Numerology, Tarot, and Astroverse
            services provide energetic perspectives and advisory guidance. They do not replace
            licensed medical, psychiatric, or legal counsel.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-[#011633]">3. Intellectual Property</h2>
          <p>
            All logos, graphic assets, proprietary curricula, codebases, and website designs are
            the exclusive property of Ditya Enterprises & Ditya Wealth Management PVT LTD.
            Unauthorized reproduction or distribution is strictly prohibited.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-[#011633]">4. Governing Law & Jurisdiction</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of India. Any
            disputes arising hereunder shall be subject to the exclusive jurisdiction of the courts
            in Jaipur, Rajasthan.
          </p>
        </div>
      </div>
    </div>
  );
}
