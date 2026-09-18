import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="pb-36 bg-white">
      {/* Banner */}
      <section className="bg-[#011633] text-white py-16 text-center">
        <div className="max-w-[1140px] mx-auto px-4">
          <span className="text-xs font-bold text-[#FF5722] tracking-widest uppercase">
            Legal & Compliance
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mt-2">
            Last Updated: September 2026 • Ditya Enterprises & Ditya Wealth Management PVT LTD
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-4 py-16 space-y-8 text-gray-700 leading-relaxed text-sm">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-[#011633]">1. Introduction</h2>
          <p>
            Welcome to Ditya Group. We value your privacy and are committed to safeguarding the
            personal information you share with us through our website (dityagroup.com), service
            inquiries, consultation bookings, and communication channels.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-[#011633]">2. Information We Collect</h2>
          <p>
            We collect personal identifiers including your full name, phone number, email address,
            city, service preferences, and message content when you request a free consultation,
            apply for GBN membership, enroll in trading or math programs, or subscribe to our
            newsletter.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-[#011633]">3. How We Use Your Information</h2>
          <p>
            The information collected is used solely to provide consultation calls, tailor
            advisory sessions, deliver course access, process corporate inquiries, send critical
            security updates, and notify you about upcoming events and publications.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-[#011633]">4. Data Protection & Confidentiality</h2>
          <p>
            We implement industry-standard encryption, secure HTTP-only cookies, and database access
            controls. We never sell, rent, or trade your personal information to third parties.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-[#011633]">5. Contact Us Regarding Privacy</h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to request data erasure,
            contact us at: <a href="mailto:groupditya@gmail.com" className="text-[#FF5722] font-semibold">groupditya@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
