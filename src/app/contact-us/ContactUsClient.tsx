'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { ContactPageContent } from '@/lib/defaultPageContent';

interface ContactUsClientProps {
  content: ContactPageContent;
}

interface FaqItem {
  q: string;
  a: string;
}

const contactFaqs: FaqItem[] = [
  {
    q: 'How quickly will your team respond to my message?',
    a: 'Our executive desk reviews inquiries continuously during business hours (Mon–Sat 9:00 AM – 7:00 PM IST). You will typically receive a personal response via phone or email within 2 to 4 hours, and guaranteed within 24 hours.',
  },
  {
    q: 'Can I request an in-person meeting at your Jaipur headquarters?',
    a: 'Yes, in-person consultations are welcomed by prior appointment at our corporate headquarters in Adarsh Nagar, Jaipur. We also host video consultations worldwide via Google Meet and Zoom.',
  },
  {
    q: 'Are my consultations and financial/personal discussions confidential?',
    a: 'Strict confidentiality is our cornerstone. All client inquiries, trading records, numerological blueprints, and business metrics are protected under strict non-disclosure and privacy protocols.',
  },
  {
    q: 'Which House should I select if I have multiple interrelated needs?',
    a: 'You can choose "General Inquiry" or the House most closely aligned with your immediate priority. During your discovery call, our senior advisors will create an integrated roadmap connecting any relevant Houses.',
  },
];

export default function ContactUsClient({ content }: ContactUsClientProps) {
  const searchParams = useSearchParams();
  const serviceParam = searchParams ? searchParams.get('service') : null;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'General Inquiry',
    message: '',
  });

  useEffect(() => {
    if (serviceParam) {
      const lower = serviceParam.toLowerCase();
      if (lower.includes('gbn elite')) {
        setFormData((prev) => ({ ...prev, service: 'GBN Elite Council' }));
      } else if (lower.includes('gbn') || lower.includes('network') || lower.includes('circle')) {
        setFormData((prev) => ({ ...prev, service: 'GBN Circle' }));
      } else {
        setFormData((prev) => ({ ...prev, service: serviceParam }));
      }
    }
  }, [serviceParam]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const cleanPhone = (content.info.phone || '+91-93510 90301').replace(/[^0-9]/g, '');
  const cleanSecondaryPhone = (content.info.secondaryPhone || '+995 555433091').replace(/[^0-9]/g, '');

  return (
    <div className="pb-24 bg-[#FAFAFC] dark:bg-[#030F0E] text-[#041614] dark:text-gray-100 transition-colors duration-200">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#020D0C] via-[#041614] to-[#0D2622] text-white py-20 text-center relative overflow-hidden border-b border-white/5">
        {/* Silk Textured Banner Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src={content.banner?.backgroundImage || '/images/inner-banner-bg.jpg'}
            alt="Contact Banner Background"
            fill
            className="object-cover object-center opacity-30 mix-blend-overlay"
            priority
            unoptimized={Boolean(content.banner?.backgroundImage?.startsWith('data:') || content.banner?.backgroundImage?.startsWith('http'))}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020D0C]/90 via-[#041614]/80 to-[#0D2622]/85" />
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-[#059669]/10 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="max-w-[1140px] mx-auto px-4 relative z-10">
          <span className="inline-flex items-center space-x-2 text-xs font-bold text-[#059669] tracking-widest uppercase bg-white/10 px-3.5 py-1 rounded-full border border-white/15 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span>{content.banner.badge || 'We Are Available 24/7'}</span>
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold !text-white mt-1 tracking-tight drop-shadow-md">
            {content.banner.title || 'Contact Us'}
          </h1>
          <p className="text-sm sm:text-base text-gray-200 max-w-xl mx-auto mt-3 font-normal leading-relaxed drop-shadow-sm">
            {content.banner.subtitle ||
              'Have questions about our Houses or guidance programs? Connect directly with our team.'}
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 max-w-[1140px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards & WhatsApp CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#059669] dark:text-emerald-400 uppercase tracking-wider block">
                {content.info.subtitle || 'Reach Out Directly'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#041614] dark:text-white tracking-tight">
                {content.info.heading || 'Let’s Start a Conversation Today'}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {content.info.description ||
                  'Whether you are looking for stock market mentorship, business growth advisory, numerology solutions, or software engineering, our executive team is ready to assist.'}
              </p>
            </div>

            {/* Quick WhatsApp Connect Banner (Dual Desk) */}
            <div className="p-5 bg-gradient-to-r from-[#075E54] to-[#128C7E] text-white rounded-2xl shadow-md space-y-3">
              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
                  <FaWhatsapp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold leading-tight">Direct WhatsApp Desks</h4>
                  <p className="text-xs text-white/80 mt-0.5">Instant chat & advisory response</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={`https://wa.me/${cleanPhone}?text=Hello%20Ditya%20Group,%20I%20would%20like%20to%20inquire%20about%20your%20services`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] text-xs font-semibold bg-white/20 hover:bg-white/30 px-3 py-2 rounded-xl text-white flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <span>🇮🇳 India Desk</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={`https://wa.me/${cleanSecondaryPhone}?text=Hello%20Ditya%20Group,%20I%20would%20like%20to%20inquire%20about%20your%20services`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] text-xs font-semibold bg-white/20 hover:bg-white/30 px-3 py-2 rounded-xl text-white flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <span>🇬🇪 Georgia Desk</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Contact Information Cards */}
            <div className="space-y-3.5">
              {/* Phone Card with Primary (India) and Secondary (Georgia) */}
              <div className="flex items-start space-x-4 p-5 bg-white dark:bg-[#061A17] rounded-2xl border border-gray-200/80 dark:border-white/10 shadow-xs hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#059669] to-[#10B981] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-3">
                  {/* Primary Phone (India) */}
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Primary Call (India HQ)
                      </h4>
                      <span className="text-[10px] font-bold bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-500/30">
                        🇮🇳 India
                      </span>
                    </div>
                    <a
                      href={`tel:${(content.info.phone || '+919351090301').replace(/[^0-9+]/g, '')}`}
                      className="text-base font-bold text-[#041614] dark:text-white hover:text-[#059669] dark:hover:text-emerald-400 transition-colors block mt-0.5"
                    >
                      {content.info.phone || '+91-93510 90301'}
                    </a>
                  </div>

                  {/* Secondary Phone (Georgia) */}
                  <div className="pt-2.5 border-t border-gray-100 dark:border-white/10">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {content.info.secondaryPhoneLabel || 'Secondary Phone (Georgia)'}
                      </h4>
                      <span className="text-[10px] font-bold bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-500/30">
                        🇬🇪 Georgia
                      </span>
                    </div>
                    <a
                      href={`tel:${(content.info.secondaryPhone || '+995555433091').replace(/[^0-9+]/g, '')}`}
                      className="text-base font-bold text-[#041614] dark:text-white hover:text-[#059669] dark:hover:text-emerald-400 transition-colors block mt-0.5"
                    >
                      {content.info.secondaryPhone || '+995 555433091'}
                    </a>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 pt-1 flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-[#059669] dark:text-emerald-400 shrink-0" />
                    <span>{content.info.phoneHours || 'Mon–Sat 9:00 AM – 7:00 PM IST'}</span>
                  </p>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex items-start space-x-4 p-5 bg-white dark:bg-[#061A17] rounded-2xl border border-gray-200/80 dark:border-white/10 shadow-xs hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#059669] to-[#10B981] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email Support</h4>
                  <a
                    href={`mailto:${content.info.email || 'groupditya@gmail.com'}`}
                    className="text-base font-bold text-[#041614] dark:text-white hover:text-[#059669] dark:hover:text-emerald-400 transition-colors block mt-0.5"
                  >
                    {content.info.email || 'groupditya@gmail.com'}
                  </a>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-[#059669] dark:text-emerald-400" />
                    <span>{content.info.emailDesc || 'Prompt response within 24 hours'}</span>
                  </p>
                </div>
              </div>

              {/* Address Card */}
              <div className="flex items-start space-x-4 p-5 bg-white dark:bg-[#061A17] rounded-2xl border border-gray-200/80 dark:border-white/10 shadow-xs hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#059669] to-[#10B981] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Corporate Headquarters</h4>
                    <a
                      href="https://maps.google.com/?q=3rd+floor,+261,+Sewa+Sadan+Marg,+Frontier+Colony,+Adarsh+Nagar,+Jaipur,+Rajasthan+302004"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-[#059669] dark:text-emerald-400 hover:underline inline-flex items-center"
                    >
                      <span>Directions</span>
                      <ExternalLink className="w-2.5 h-2.5 ml-1" />
                    </a>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 font-medium leading-relaxed mt-1">
                    {content.info.address ||
                      '3rd floor, 261, Sewa Sadan Marg, Frontier Colony, Adarsh Nagar, Jaipur, Rajasthan 302004'}
                  </p>
                </div>
              </div>
            </div>

            {/* Confidentiality & Response Guarantee Pill */}
            <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-300 flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-[#059669] dark:text-emerald-400 shrink-0" />
              <p className="leading-snug">
                <strong className="font-semibold text-emerald-950 dark:text-emerald-200">Client Privacy Guaranteed:</strong> All submissions are confidential and handled directly by executive partners.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Consultation & Inquiry Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#061A17] p-8 sm:p-10 rounded-3xl border border-gray-200/80 dark:border-white/10 shadow-lg relative">
            <div className="mb-6 border-b border-gray-100 dark:border-white/10 pb-5">
              <span className="text-[11px] font-bold text-[#059669] dark:text-emerald-400 uppercase tracking-wider block mb-1">
                Direct Submission
              </span>
              <h3 className="text-2xl font-extrabold text-[#041614] dark:text-white tracking-tight">Send Us a Message</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Fill out the form below and an assigned specialist from the relevant House will connect with you.
              </p>
            </div>

            {success ? (
              <div className="py-12 px-6 text-center space-y-4 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-500/30">
                <div className="w-16 h-16 rounded-full bg-[#059669] text-white mx-auto flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="text-2xl font-bold text-[#041614] dark:text-white">Message Dispatched!</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
                  Thank you! Your message has been safely received. Our executive desk will reach
                  out to your contact number or email shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="btn-ditya-orange text-xs uppercase tracking-wider cursor-pointer mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {errorMsg && (
                  <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-300 rounded-xl flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#041614] dark:text-gray-200 font-bold uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F9F9FB] dark:bg-[#030F0E] border border-gray-200 dark:border-white/10 rounded-xl text-sm text-[#041614] dark:text-white focus:outline-none focus:border-[#059669] focus:bg-white dark:focus:bg-[#041614] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[#041614] dark:text-gray-200 font-bold uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F9F9FB] dark:bg-[#030F0E] border border-gray-200 dark:border-white/10 rounded-xl text-sm text-[#041614] dark:text-white focus:outline-none focus:border-[#059669] focus:bg-white dark:focus:bg-[#041614] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#041614] dark:text-gray-200 font-bold uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F9F9FB] dark:bg-[#030F0E] border border-gray-200 dark:border-white/10 rounded-xl text-sm text-[#041614] dark:text-white focus:outline-none focus:border-[#059669] focus:bg-white dark:focus:bg-[#041614] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[#041614] dark:text-gray-200 font-bold uppercase tracking-wider mb-1.5">
                      Service / House of Interest
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F9F9FB] dark:bg-[#030F0E] border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#059669] focus:bg-white dark:focus:bg-[#041614] transition-all font-medium text-gray-800 dark:text-white"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="GBN Circle">GBN Circle (Global Business Network)</option>
                      <option value="GBN Elite Council">GBN Elite Council (High-Turnover Network)</option>
                      <option value="Ditya Wealth House">Ditya Wealth House (Trading, F&O & Forex)</option>
                      <option value="Ditya Astroverse">Ditya Astroverse (Numerology, Tarot & Astrology)</option>
                      <option value="Ditya Math House">Ditya Math House (Math Learning & Concept Clarity)</option>
                      <option value="Ditya Business House">Ditya Business House (Consulting & Growth)</option>
                      <option value="Ditya Trading House">Ditya Trading House (Trading Education & Coworking)</option>
                      <option value="Ditya Tech House">Ditya Tech House (Software, AI & Web Solutions)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#041614] dark:text-gray-200 font-bold uppercase tracking-wider mb-1.5">
                    How Can We Assist You? *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your current requirements, market challenges, or goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F9F9FB] dark:bg-[#030F0E] border border-gray-200 dark:border-white/10 rounded-xl text-sm text-[#041614] dark:text-white focus:outline-none focus:border-[#059669] focus:bg-white dark:focus:bg-[#041614] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-ditya-orange text-sm font-bold flex items-center justify-center space-x-2 shadow-md hover:shadow-xl cursor-pointer py-3.5 mt-2 rounded-xl transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Location Map Section */}
      <section className="max-w-[1140px] mx-auto px-4 pb-16">
        <div className="bg-white dark:bg-[#061A17] rounded-3xl p-6 sm:p-8 border border-gray-200/80 dark:border-white/10 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#059669] dark:text-emerald-400 uppercase tracking-wider block">
                Physical Presence
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#041614] dark:text-white">
                Visit Our Headquarters in Jaipur
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                3rd floor, 261, Sewa Sadan Marg, Frontier Colony, Adarsh Nagar, Jaipur, Rajasthan 302004
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=3rd+floor,+261,+Sewa+Sadan+Marg,+Frontier+Colony,+Adarsh+Nagar,+Jaipur,+Rajasthan+302004"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-[#059669] dark:hover:bg-[#059669] text-gray-700 dark:text-gray-200 hover:text-white dark:hover:text-white transition-colors text-xs font-semibold shrink-0"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Embedded Google Map */}
          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-inner relative">
            <iframe
              title="Ditya Group Jaipur Corporate Office"
              src="https://maps.google.com/maps?q=3rd%20floor%2C%20261%2C%20Sewa%20Sadan%20Marg%2C%20Frontier%20Colony%2C%20Adarsh%20Nagar%2C%20Jaipur%2C%20Rajasthan%20302004&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="max-w-[1140px] mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#059669] dark:text-emerald-400 uppercase tracking-wider block mb-1">
            Got Questions?
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#041614] dark:text-white tracking-tight">
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Key details about booking consultations, confidentiality, and meeting our team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3.5">
          {contactFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#061A17] rounded-2xl border border-gray-200/80 dark:border-white/10 shadow-xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between space-x-4 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm font-bold text-[#041614] dark:text-white flex items-center space-x-2.5">
                    <HelpCircle className="w-4 h-4 text-[#059669] dark:text-emerald-400 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#059669] dark:text-emerald-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-white/10 bg-gray-50/30 dark:bg-black/20">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
