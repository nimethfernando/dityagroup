'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
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
} from 'react-icons/fa6';
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const socialLinks = [
    { icon: FaFacebookF, href: 'https://www.facebook.com/profile.php?id=61579723378713', label: 'Facebook' },
    { icon: FaInstagram, href: 'https://www.instagram.com/dityagroup/', label: 'Instagram' },
    { icon: FaYoutube, href: 'https://www.youtube.com/@DityaGroup', label: 'YouTube' },
    { icon: FaQuora, href: 'https://www.quora.com/profile/Ditya-Group', label: 'Quora' },
    { icon: FaTumblr, href: 'https://www.tumblr.com/dityagroup', label: 'Tumblr' },
    { icon: FaMedium, href: 'https://medium.com/@groupditya', label: 'Medium' },
    { icon: FaXTwitter, href: 'https://x.com/dityadivinecode', label: 'X (Twitter)' },
    { icon: FaBloggerB, href: 'https://ditvyadivinecode.blogspot.com/', label: 'Blogger' },
    { icon: FaWhatsapp, href: 'https://whatsapp.com/channel/0029Vb5Jj3I545v124zIG313', label: 'WhatsApp' },
    { icon: FaPinterestP, href: 'https://pin.it/37yZewWEA', label: 'Pinterest' },
    { icon: FaThreads, href: 'https://www.threads.com/@dityagroup', label: 'Threads' },
    { icon: FaFlipboard, href: 'https://flipboard.com/@DityaGroup', label: 'Flipboard' },
    { icon: FaTelegram, href: '#', label: 'Telegram' },
  ];

  return (
    <footer className="relative bg-[#000f24] text-white pt-20 pb-10 overflow-hidden border-t border-white/5">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/inner-banner-bg.jpg"
          alt="Footer background pattern"
          fill
          className="object-cover object-bottom opacity-15 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000f24] via-[#000f24]/90 to-[#000f24]/80" />
      </div>

      {/* Top 3 Floating Contact Cards */}
      <div className="max-w-[1140px] mx-auto px-4 -mt-32 mb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Phone */}
          <div className="bg-[#001738] rounded-3xl p-7 flex items-center space-x-5 shadow-2xl border border-white/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-orange-500/10">
            <div className="w-14 h-14 rounded-2xl bg-[#FF5722]/15 flex items-center justify-center shrink-0 shadow-inner">
              <Phone className="w-6 h-6 text-[#FF5722]" />
            </div>
            <div>
              <a
                href="tel:+919351090301"
                className="text-lg font-extrabold text-white hover:text-[#FF5722] transition-colors block tracking-tight"
              >
                +91-93510 90301
              </a>
              <span className="text-xs text-gray-400 font-medium tracking-wide">Give Us A Call</span>
            </div>
          </div>

          {/* Card 2: Email (Vibrant Orange Center Highlight) */}
          <div className="bg-gradient-to-br from-[#FF5722] to-[#e64a19] rounded-3xl p-7 flex items-center space-x-5 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 shadow-orange-500/30">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 shadow-inner">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <a
                href="mailto:groupditya@gmail.com"
                className="text-lg font-extrabold text-white hover:text-black/80 transition-colors block break-all tracking-tight"
              >
                groupditya@gmail.com
              </a>
              <span className="text-xs text-white/90 font-medium tracking-wide">Drop Us a Line</span>
            </div>
          </div>

          {/* Card 3: Location */}
          <div className="bg-[#001738] rounded-3xl p-7 flex items-center space-x-5 shadow-2xl border border-white/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-orange-500/10">
            <div className="w-14 h-14 rounded-2xl bg-[#FF5722]/15 flex items-center justify-center shrink-0 shadow-inner">
              <MapPin className="w-6 h-6 text-[#FF5722]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                3rd floor, 261, Sewa Sadan Marg, Adarsh Nagar, Jaipur, Rajasthan 302004
              </p>
              <span className="text-xs text-gray-400 font-medium tracking-wide">Office Location</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer 4 Columns */}
      <div className="max-w-[1140px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
        {/* Col 1: Brand & Socials */}
        <div className="lg:col-span-4 space-y-5">
          <div className="relative h-12 sm:h-14 w-52 sm:w-56">
            <Image
              src="/images/logo-white.png"
              alt="Ditya Group"
              fill
              className="object-contain object-left"
            />
          </div>
          <p className="text-gray-300 text-sm font-medium">One Group. Infinite Possibilities!</p>

          {/* 13 Circular Social Icons */}
          <div className="flex flex-wrap gap-2 pt-1">
            {socialLinks.map((s, idx) => {
              const IconComp = s.icon;
              return (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full bg-white/10 text-gray-200 hover:bg-[#FF5722] hover:text-white flex items-center justify-center transition-all duration-200 text-xs shadow-sm hover:scale-110"
                >
                  <IconComp className="w-3.5 h-3.5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-white font-extrabold text-base border-b-2 border-[#FF5722] pb-1.5 inline-block tracking-wide">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li>
              <Link href="/about-us" className="hover:text-[#FF5722] transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-[#FF5722] transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-[#FF5722] transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-[#FF5722] transition-colors">
                Blog & Insights
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Useful Links */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-white font-extrabold text-base border-b-2 border-[#FF5722] pb-1.5 inline-block tracking-wide">
            Useful Links
          </h4>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li>
              <Link href="/privacy-policy" className="hover:text-[#FF5722] transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="hover:text-[#FF5722] transition-colors">
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link href="/admin/login" className="hover:text-[#FF5722] transition-colors opacity-80">
                Admin Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Newsletter */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="text-white font-extrabold text-base border-b-2 border-[#FF5722] pb-1.5 inline-block tracking-wide">
            Newsletter
          </h4>
          <p className="text-sm text-gray-300 leading-relaxed">
            Subscribe to receive our exclusive newsletter with the latest news and trends
          </p>

          <form onSubmit={handleNewsletterSubmit} className="pt-2">
            <div className="flex rounded-2xl bg-white/10 border border-white/15 p-1.5 overflow-hidden backdrop-blur-md">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your Email Address"
                required
                className="w-full px-4 py-2.5 text-sm text-white bg-transparent focus:outline-none placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-ditya-orange py-2.5 px-5 text-sm shrink-0 shadow-md"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            {newsletterStatus && (
              <p className="text-xs mt-2 text-[#FF5722] font-medium">{newsletterStatus}</p>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-[1140px] mx-auto px-4 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 text-center gap-3">
        <p>
          A Unit of Ditya Enterprises & Ditya Wealth Management PVT LTD © Copyright Ditya Group{' '}
          {new Date().getFullYear()}. All Rights Reserved.
        </p>
        <p className="text-gray-500">
          Designed with Ancient Wisdom & Modern Solutions
        </p>
      </div>
    </footer>
  );
}
