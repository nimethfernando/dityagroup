'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { ContactPageContent } from '@/lib/defaultPageContent';

interface ContactUsClientProps {
  content: ContactPageContent;
}

export default function ContactUsClient({ content }: ContactUsClientProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'General Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'Contact Page Form',
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        setFormData({ name: '', phone: '', email: '', service: 'General Inquiry', message: '' });
      } else {
        setErrorMsg(data.message || 'Failed to submit message.');
      }
    } catch {
      setErrorMsg('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-36 bg-white">
      {/* Banner */}
      <section className="bg-[#011633] text-white py-16 text-center relative overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-4 relative z-10">
          <span className="text-xs font-bold text-[#FF5722] tracking-widest uppercase">
            {content.banner.badge || 'We Are Available 24/7'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2">
            {content.banner.title || 'Contact Us'}
          </h1>
          <p className="text-sm text-gray-300 max-w-xl mx-auto mt-3">
            {content.banner.subtitle ||
              'Have questions about our Houses or guidance programs? Connect directly with our team.'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 max-w-[1140px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold text-[#FF5722] uppercase tracking-wider block">
              {content.info.subtitle || 'Reach Out Directly'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#011633]">
              {content.info.heading || 'Let’s Start a Conversation Today'}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {content.info.description ||
                'Whether you are looking for stock market mentorship, business growth advisory, numerology solutions, or software engineering, our executive team is ready to assist.'}
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start space-x-4 p-5 bg-[#F9F9F9] rounded-asymmetric border border-gray-200">
                <div className="w-12 h-12 rounded-full bg-[#FF5722] text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#011633]">Direct Call</h4>
                  <a
                    href={`tel:${content.info.phone || '+919351090301'}`}
                    className="text-sm font-semibold text-[#FF5722] hover:underline"
                  >
                    {content.info.phone || '+91-93510 90301'}
                  </a>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {content.info.phoneHours || 'Mon–Sat 9:00 AM – 7:00 PM IST'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 bg-[#F9F9F9] rounded-asymmetric border border-gray-200">
                <div className="w-12 h-12 rounded-full bg-[#FF5722] text-white flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#011633]">Email Support</h4>
                  <a
                    href={`mailto:${content.info.email || 'groupditya@gmail.com'}`}
                    className="text-sm font-semibold text-[#FF5722] hover:underline"
                  >
                    {content.info.email || 'groupditya@gmail.com'}
                  </a>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {content.info.emailDesc || 'Prompt response within 24 hours'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 bg-[#F9F9F9] rounded-asymmetric border border-gray-200">
                <div className="w-12 h-12 rounded-full bg-[#FF5722] text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#011633]">Corporate Headquarters</h4>
                  <p className="text-xs text-gray-700 font-medium leading-snug mt-0.5">
                    {content.info.address ||
                      '3rd floor, 261, Sewa Sadan Marg, Frontier Colony, Adarsh Nagar, Jaipur, Rajasthan 302004'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-[#F9F9F9] p-8 sm:p-10 rounded-asymmetric border border-gray-200/80 shadow-sm">
            <h3 className="text-2xl font-bold text-[#011633] mb-2">Send Us a Message</h3>
            <p className="text-xs text-gray-500 mb-6">
              Fill out the form below and an assigned specialist will get in touch with you.
            </p>

            {success ? (
              <div className="p-8 text-center space-y-4 bg-white rounded-asymmetric border border-green-200">
                <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-[#011633]">Message Dispatched!</h4>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Thank you! Your message has been safely received. Our executive desk will reach
                  out to your contact information shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="btn-ditya-orange text-xs uppercase tracking-wider"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#011633] font-bold uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-asymmetric text-sm focus:outline-none focus:border-[#FF5722]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#011633] font-bold uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-asymmetric text-sm focus:outline-none focus:border-[#FF5722]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#011633] font-bold uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-asymmetric text-sm focus:outline-none focus:border-[#FF5722]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#011633] font-bold uppercase tracking-wider mb-1.5">
                      Service of Interest
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-asymmetric text-sm focus:outline-none focus:border-[#FF5722]"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Global Business Network">Global Business Network (GBN)</option>
                      <option value="Ditya Astro Verse">Ditya Astro Verse (Numerology & Vastu)</option>
                      <option value="Ditya Math House">Ditya Math House</option>
                      <option value="Ditya Business House">Ditya Business House</option>
                      <option value="Ditya Trading House">Ditya Trading House</option>
                      <option value="Ditya Tech House">Ditya Tech House</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#011633] font-bold uppercase tracking-wider mb-1.5">
                    How Can We Assist You? *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your goals, current challenges, or specific needs..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-asymmetric text-sm focus:outline-none focus:border-[#FF5722]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-ditya-orange text-sm font-bold flex items-center justify-center space-x-2 shadow-md cursor-pointer py-3.5 mt-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
