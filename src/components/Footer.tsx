'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Send, ArrowUp } from 'lucide-react';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaQuora,
  FaTumblr,
  FaMedium,
  FaBloggerB,
  FaWhatsapp,
  FaPinterestP,
  FaThreads,
  FaFlipboard,
  FaTelegram,
  FaXTwitter,
  FaLinkedinIn,
  FaGlobe,
  FaLink,
} from 'react-icons/fa6';
import { IconType } from 'react-icons';
import {
  DEFAULT_PAGE_CONTENTS,
  FooterPageContent,
  SocialLinkItem,
} from '@/lib/defaultPageContent';
import { useLanguage } from '@/contexts/LanguageContext';

const ICON_MAP: Record<string, IconType> = {
  facebook: FaFacebookF,
  FaFacebookF: FaFacebookF,
  instagram: FaInstagram,
  FaInstagram: FaInstagram,
  youtube: FaYoutube,
  FaYoutube: FaYoutube,
  quora: FaQuora,
  FaQuora: FaQuora,
  tumblr: FaTumblr,
  FaTumblr: FaTumblr,
  medium: FaMedium,
  FaMedium: FaMedium,
  x: FaXTwitter,
  twitter: FaXTwitter,
  FaXTwitter: FaXTwitter,
  blogger: FaBloggerB,
  FaBloggerB: FaBloggerB,
  whatsapp: FaWhatsapp,
  FaWhatsapp: FaWhatsapp,
  pinterest: FaPinterestP,
  FaPinterestP: FaPinterestP,
  threads: FaThreads,
  FaThreads: FaThreads,
  flipboard: FaFlipboard,
  FaFlipboard: FaFlipboard,
  telegram: FaTelegram,
  FaTelegram: FaTelegram,
  linkedin: FaLinkedinIn,
  FaLinkedinIn: FaLinkedinIn,
  globe: FaGlobe,
  FaGlobe: FaGlobe,
};

function getSocialIcon(item: { id?: string; icon?: string }): IconType {
  if (item.icon && ICON_MAP[item.icon]) return ICON_MAP[item.icon];
  if (item.id && ICON_MAP[item.id.toLowerCase()]) return ICON_MAP[item.id.toLowerCase()];
  return FaLink;
}

export default function Footer() {
  const { t } = useLanguage();
  const [content, setContent] = useState<FooterPageContent>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (DEFAULT_PAGE_CONTENTS as any).footer
  );
  const [logoDark, setLogoDark] = useState('/images/logo-white.png');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/header')
      .then((res) => res.json())
      .then((d) => {
        if (d?.data?.logo?.darkLogoUrl) {
          setLogoDark(d.data.logo.darkLogoUrl);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/footer')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data && data.success && data.data) {
          setContent(data.data);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch live footer content:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setIsSubmitting(true);
    setNewsletterStatus(null);

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      setNewsletterStatus(data.message || 'Thank you for subscribing!');
      if (res.ok) setNewsletterEmail('');
    } catch {
      setNewsletterStatus('Unable to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const houseLinks = [
    { name: t('house.gbn'), href: '/global-business-network', isGBN: true },
    { name: t('house.wealth'), href: '/ditya-wealth-house' },
    { name: t('house.astroverse'), href: '/ditya-astroverse' },
    { name: t('house.math'), href: '/ditya-math-house' },
    { name: t('house.business'), href: '/ditya-business-house' },
    { name: t('house.trading'), href: '/ditya-trading-house' },
    { name: t('house.tech'), href: '/ditya-tech-house' },
  ];

  // Active unhidden social links
  const activeSocialLinks = (content.socialLinks || []).filter(
    (s: SocialLinkItem) => s.enabled !== false && s.href && s.href.trim() !== ''
  );

  const phoneIndiaHref =
    content.contactCards?.phoneIndiaHref ||
    `tel:${(content.contactCards?.phoneIndia || '+919351090301').replace(/[^0-9+]/g, '')}`;

  const phoneGeorgiaHref =
    content.contactCards?.phoneGeorgiaHref ||
    `tel:${(content.contactCards?.phoneGeorgia || '+995555433091').replace(/[^0-9+]/g, '')}`;

  return (
    <footer className="relative bg-gradient-to-b from-[#031513] via-[#020e0d] to-[#010706] text-white pt-16 pb-12 overflow-hidden border-t border-emerald-500/20">
      {/* Top Luminous Accent Hairline */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#10B981]/50 to-transparent" />

      {/* Ambient Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[280px] bg-[#10B981]/[0.08] blur-[120px] pointer-events-none" />

      {/* Background Graphic Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/inner-banner-bg.jpg"
          alt="Footer background pattern"
          fill
          className="object-cover object-bottom opacity-10 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010706] via-[#020e0d]/95 to-[#031513]/90" />
      </div>

      <div className="max-w-[1140px] mx-auto px-4 relative z-10">
        {/* ============================================================ */}
        {/* TOP: 3 LUXURY EXECUTIVE CONTACT CARDS */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Phone */}
          <div className="bg-white/[0.04] backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-[#10B981]/50 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-[0_15px_35px_rgba(0,0,0,0.4)] flex items-start space-x-5 group">
            <div className="w-13 h-13 rounded-2xl bg-[#059669]/15 border border-[#10B981]/30 flex items-center justify-center shrink-0 group-hover:bg-[#059669] group-hover:text-white transition-all duration-300 shadow-inner">
              <Phone className="w-5 h-5 text-[#10B981] group-hover:text-white transition-colors" />
            </div>
            <div className="space-y-2 flex-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300/80 block">
                {t('footer.call_title')}
              </span>
              <div>
                <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">
                  {content.contactCards?.phoneIndiaTitle || t('footer.india_hq')}
                </span>
                <a
                  href={phoneIndiaHref}
                  className="text-base sm:text-lg font-extrabold text-white group-hover:text-[#10B981] transition-colors block tracking-tight"
                >
                  {content.contactCards?.phoneIndia || '+91-93510 90301'}
                </a>
              </div>
              <div className="pt-1.5 border-t border-white/10">
                <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">
                  {content.contactCards?.phoneGeorgiaTitle || t('footer.georgia_office')}
                </span>
                <a
                  href={phoneGeorgiaHref}
                  className="text-base sm:text-lg font-extrabold text-white group-hover:text-[#10B981] transition-colors block tracking-tight"
                >
                  {content.contactCards?.phoneGeorgia || '+995 555433091'}
                </a>
              </div>
              <span className="text-xs text-gray-400 mt-1 block">
                {content.contactCards?.phoneHours || t('footer.hours')}
              </span>
            </div>
          </div>

          {/* Card 2: Email (Centerpiece Card) */}
          <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-[#D4AF37]/35 hover:border-[#D4AF37] transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-[0_15px_35px_rgba(212,175,55,0.15)] flex items-start space-x-5 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="w-13 h-13 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300 shadow-inner">
              <Mail className="w-5 h-5 text-[#D4AF37] group-hover:text-black transition-colors" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300/90 block mb-1">
                {t('footer.email_title')}
              </span>
              <a
                href={`mailto:${content.contactCards?.emailCorporate || 'groupditya@gmail.com'}`}
                className="text-base sm:text-lg font-extrabold text-white group-hover:text-[#D4AF37] transition-colors block break-all tracking-tight"
              >
                {content.contactCards?.emailCorporate || 'groupditya@gmail.com'}
              </a>
              <span className="text-xs text-gray-400 mt-1 block">
                {content.contactCards?.emailHours || t('footer.email_response')}
              </span>
            </div>
          </div>

          {/* Card 3: Location */}
          <div className="bg-white/[0.04] backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-[#10B981]/50 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-[0_15px_35px_rgba(0,0,0,0.4)] flex items-start space-x-5 group">
            <div className="w-13 h-13 rounded-2xl bg-[#059669]/15 border border-[#10B981]/30 flex items-center justify-center shrink-0 group-hover:bg-[#059669] group-hover:text-white transition-all duration-300 shadow-inner">
              <MapPin className="w-5 h-5 text-[#10B981] group-hover:text-white transition-colors" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300/80 block mb-1">
                {t('footer.location_title')}
              </span>
              <a
                href="https://maps.google.com/?q=3rd+floor+261+Sewa+Sadan+Marg+Adarsh+Nagar+Jaipur+Rajasthan+302004"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-bold text-white leading-snug group-hover:text-[#10B981] transition-colors block"
              >
                {content.contactCards?.officeIndiaAddress ||
                  '3rd floor, 261, Sewa Sadan Marg, Adarsh Nagar, Jaipur, Rajasthan 302004'}
              </a>
              <span className="text-xs text-gray-400 mt-1 block">
                {t('footer.location_city')}
              </span>
            </div>
          </div>
        </div>

        {/* Ambient Hairline Divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/15 to-transparent mb-16" />

        {/* ============================================================ */}
        {/* MIDDLE: 4 BALANCED COLUMNS */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          {/* Col 1: Brand & Socials (Span 4) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="relative h-12 sm:h-14 w-52 sm:w-56">
              <Image
                src={logoDark}
                alt="Ditya Group"
                fill
                className="object-contain object-left"
                unoptimized={logoDark.startsWith('data:')}
              />
            </div>

            {/* Customizable Tagline */}
            <p className="text-[#D4AF37] font-semibold text-sm tracking-wide">
              {content.branding?.tagline || 'One Group. Infinite Possibilities!'}
            </p>

            {/* Customizable Main Description */}
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              {content.branding?.description ||
                'Empowering wealth creation, business growth, and spiritual alignment by seamlessly bridging ancient Vedic wisdom with cutting-edge modern solutions.'}
            </p>

            {/* Customizable Additional Paragraphs */}
            {content.branding?.paragraphs && content.branding.paragraphs.length > 0 && (
              <div className="space-y-2.5 max-w-sm">
                {content.branding.paragraphs.map(
                  (p: string, idx: number) =>
                    p &&
                    p.trim() !== '' && (
                      <p key={idx} className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                        {p}
                      </p>
                    )
                )}
              </div>
            )}

            {/* Fully Customizable Social Media Buttons (Filtered to enabled only) */}
            {activeSocialLinks.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {activeSocialLinks.map((s: SocialLinkItem, idx: number) => {
                  const IconComp = getSocialIcon(s);
                  return (
                    <a
                      key={s.id || idx}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 text-gray-200 hover:bg-[#059669] hover:border-[#10B981] hover:text-white flex items-center justify-center transition-all duration-200 text-xs shadow-xs hover:scale-110"
                    >
                      <IconComp className="w-3.5 h-3.5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Col 2: Quick Links (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-extrabold text-base border-b-2 border-[#10B981] pb-1.5 inline-block tracking-wide">
              {t('footer.quick_links')}
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-300">
              <li>
                <Link
                  href="/global-business-network"
                  className="hover:text-[#10B981] transition-colors flex items-center group text-white font-semibold"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2" />
                  <span className="group-hover:translate-x-1 transition-transform flex items-center">
                    <span>{t('nav.gbn')}</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 ml-2">
                      Main
                    </span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#10B981] transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">{t('nav.home')}</span>
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-[#10B981] transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">{t('nav.about')}</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#10B981] transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">{t('nav.services')}</span>
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-[#10B981] transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">{t('nav.contact')}</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#10B981] transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">{t('nav.blog')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Specialized Houses (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-extrabold text-base border-b-2 border-[#10B981] pb-1.5 inline-block tracking-wide">
              {t('footer.houses_network')}
            </h4>
            <ul className="grid grid-cols-1 gap-2.5 text-xs sm:text-sm text-gray-300">
              {houseLinks.map((h, idx) => (
                <li key={idx}>
                  <Link
                    href={h.href}
                    className={`hover:text-[#10B981] transition-colors flex items-center group ${
                      h.isGBN ? 'text-white font-semibold' : ''
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-2 transition-colors ${
                        h.isGBN
                          ? 'bg-amber-400'
                          : 'bg-[#10B981]/60 group-hover:bg-[#10B981]'
                      }`}
                    />
                    <span className="group-hover:translate-x-1 transition-transform flex items-center">
                      <span>{h.name}</span>
                      {h.isGBN && (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 ml-2">
                          Main Business
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 border-t border-white/10 mt-3">
              <Link href="/privacy-policy" className="hover:text-[#10B981] transition-colors">{t('footer.privacy_policy')}</Link>
              <Link href="/terms-and-conditions" className="hover:text-[#10B981] transition-colors">{t('footer.terms')}</Link>
              <Link href="/admin/login" className="hover:text-[#10B981] transition-colors">{t('footer.admin')}</Link>
            </div>
          </div>

          {/* Col 4: Newsletter (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-extrabold text-base border-b-2 border-[#10B981] pb-1.5 inline-block tracking-wide">
              {content.newsletter?.heading || t('footer.newsletter')}
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {content.newsletter?.description ||
                'Subscribe to receive our exclusive executive briefings on wealth, market trends, and Vedic lifestyle strategy.'}
            </p>

            <form onSubmit={handleNewsletterSubmit} className="pt-2">
              <div className="flex rounded-2xl bg-white/10 border border-white/15 p-1.5 overflow-hidden backdrop-blur-md focus-within:border-[#10B981] transition-colors">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={t('footer.newsletter_placeholder')}
                  required
                  className="w-full px-4 py-2.5 text-sm text-white bg-transparent focus:outline-none placeholder-gray-400"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-ditya-orange py-2.5 px-4 text-xs font-bold shrink-0 shadow-md cursor-pointer"
                >
                  <span>{content.newsletter?.buttonText || t('action.send')}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {newsletterStatus && (
                <p className="text-xs mt-2 text-[#10B981] font-medium">{newsletterStatus}</p>
              )}
            </form>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BOTTOM: COPYRIGHT, CREDO & BACK TO TOP */}
        {/* ============================================================ */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 text-center gap-4">
          <p>
            {content.copyright?.text ||
              `A Unit of Ditya Enterprises & Ditya Wealth Management PVT LTD © Copyright Ditya Group ${new Date().getFullYear()}. All Rights Reserved.`}
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300 font-medium">
              {content.copyright?.subText || t('footer.credo')}
            </span>
            <button
              onClick={scrollToTop}
              aria-label={t('action.back_to_top')}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#059669] hover:text-white border border-white/15 flex items-center justify-center transition-all duration-200 cursor-pointer text-gray-300"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
