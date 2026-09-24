'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useConsultation } from '@/contexts/ConsultationContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { DEFAULT_PAGE_CONTENTS, HeaderPageContent } from '@/lib/defaultPageContent';

interface NavbarProps {
  onOpenConsultation?: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const pathname = usePathname();
  const { openModal } = useConsultation();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [headerContent, setHeaderContent] = useState<HeaderPageContent>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (DEFAULT_PAGE_CONTENTS as any).header
  );

  useEffect(() => {
    let isMounted = true;
    fetch('/api/header')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data && data.success && data.data) {
          setHeaderContent(data.data);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch live header content:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const handleOpenConsultation = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      openModal();
    }
  };

  const isConsultationEnabled = headerContent.consultationButton?.enabled !== false;
  const consultationText = headerContent.consultationButton?.text || t('nav.free_consultation');
  const consultationMobileText = headerContent.consultationButton?.mobileText || t('nav.consultation');

  const handleConsultationClick = () => {
    if (headerContent.consultationButton?.actionType === 'link' && headerContent.consultationButton?.customLink) {
      window.location.href = headerContent.consultationButton.customLink;
      return;
    }
    handleOpenConsultation();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [pathname]);

  const serviceHouses = [
    { title: t('house.gbn'), href: '/global-business-network' },
    { title: t('house.wealth'), href: '/ditya-wealth-house' },
    { title: t('house.astroverse'), href: '/ditya-astroverse' },
    { title: t('house.math'), href: '/ditya-math-house' },
    { title: t('house.business'), href: '/ditya-business-house' },
    { title: t('house.trading'), href: '/ditya-trading-house' },
    { title: t('house.tech'), href: '/ditya-tech-house' },
  ];

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  const isDark = theme === 'dark';
  const logoSrc = isDark
    ? (headerContent.logo?.darkLogoUrl || '/images/logo-white.png')
    : (headerContent.logo?.lightLogoUrl || '/images/logo.png');
  const logoAlt = headerContent.logo?.altText || 'Ditya Group Logo';

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#020D0C]/95 backdrop-blur-xl shadow-[0_4px_25px_rgba(1,22,51,0.06)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.5)] py-2 sm:py-3 border-b border-slate-100 dark:border-white/10'
          : 'bg-white/95 dark:bg-[#020D0C]/95 backdrop-blur-md py-2.5 sm:py-4 border-b border-gray-100/70 dark:border-white/5'
      }`}
    >
      <div className="max-w-[1140px] mx-auto px-3 sm:px-4 flex items-center justify-between">
        {/* Brand Logo - Switches to crisp white in Dark Mode or Custom Logo */}
        <Link href="/" className="flex items-center space-x-3 group shrink-0">
          <div className="relative h-8 sm:h-11 md:h-12 w-28 sm:w-44 md:w-56 transition-transform group-hover:scale-[1.01]">
            <Image
              src={logoSrc}
              alt={logoAlt}
              fill
              className="object-contain object-left"
              priority
              unoptimized={logoSrc.startsWith('data:')}
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 text-[15px] font-medium">
          <Link
            href="/"
            className={`px-3.5 py-2 rounded-full transition-all duration-200 ${
              isActive('/')
                ? 'text-[#059669] dark:text-[#10B981] font-bold bg-emerald-50/90 dark:bg-emerald-950/40 shadow-xs'
                : 'text-[#041614] dark:text-gray-200 hover:text-[#059669] dark:hover:text-[#10B981] hover:bg-gray-50 dark:hover:bg-white/5'
            }`}
          >
            {t('nav.home')}
          </Link>

          <Link
            href="/about-us"
            className={`px-3.5 py-2 rounded-full transition-all duration-200 ${
              isActive('/about-us')
                ? 'text-[#059669] dark:text-[#10B981] font-bold bg-emerald-50/90 dark:bg-emerald-950/40 shadow-xs'
                : 'text-[#041614] dark:text-gray-200 hover:text-[#059669] dark:hover:text-[#10B981] hover:bg-gray-50 dark:hover:bg-white/5'
            }`}
          >
            {t('nav.about')}
          </Link>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <Link
              href="/services"
              className={`px-3.5 py-2 rounded-full flex items-center space-x-1.5 transition-all duration-200 ${
                isActive('/services') || serviceHouses.some((h) => pathname === h.href)
                  ? 'text-[#059669] dark:text-[#10B981] font-bold bg-emerald-50/90 dark:bg-emerald-950/40 shadow-xs'
                  : 'text-[#041614] dark:text-gray-200 hover:text-[#059669] dark:hover:text-[#10B981] hover:bg-gray-50 dark:hover:bg-white/5'
              }`}
            >
              <span>{t('nav.services')}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isServicesOpen ? 'rotate-180' : ''
                }`}
              />
            </Link>

            {isServicesOpen && (
              <div className="absolute top-full left-0 w-72 bg-white/95 dark:bg-[#041614] backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-100 dark:border-white/10 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-gray-100 dark:border-white/10 mb-1">
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                    {t('nav.houses_header')}
                  </span>
                </div>
                {serviceHouses.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? 'text-[#059669] dark:text-[#10B981] bg-emerald-50 dark:bg-emerald-950/40 font-bold'
                        : 'text-gray-700 dark:text-gray-200 hover:text-[#059669] dark:hover:text-[#10B981] hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/blog"
            className={`px-3.5 py-2 rounded-full transition-all duration-200 ${
              isActive('/blog')
                ? 'text-[#059669] dark:text-[#10B981] font-bold bg-emerald-50/90 dark:bg-emerald-950/40 shadow-xs'
                : 'text-[#041614] dark:text-gray-200 hover:text-[#059669] dark:hover:text-[#10B981] hover:bg-gray-50 dark:hover:bg-white/5'
            }`}
          >
            {t('nav.blog')}
          </Link>

          <Link
            href="/contact-us"
            className={`px-3.5 py-2 rounded-full transition-all duration-200 ${
              isActive('/contact-us')
                ? 'text-[#059669] dark:text-[#10B981] font-bold bg-emerald-50/90 dark:bg-emerald-950/40 shadow-xs'
                : 'text-[#041614] dark:text-gray-200 hover:text-[#059669] dark:hover:text-[#10B981] hover:bg-gray-50 dark:hover:bg-white/5'
            }`}
          >
            {t('nav.contact')}
          </Link>
        </nav>

        {/* Desktop Controls (Language + Theme + Consultation CTA) */}
        <div className="hidden lg:flex items-center space-x-2.5">
          <LanguageToggle />
          <ThemeToggle />
          {isConsultationEnabled && (
            <button
              onClick={handleConsultationClick}
              className="btn-ditya-orange text-sm shadow-md hover:shadow-emerald-500/25 cursor-pointer ml-1"
            >
              {consultationText}
            </button>
          )}
        </div>

        {/* Mobile Action Controls */}
        <div className="lg:hidden flex items-center space-x-1 sm:space-x-2 shrink-0">
          <ThemeToggle variant="compact" />
          <LanguageToggle variant="compact" />
          {isConsultationEnabled && (
            <button
              onClick={handleConsultationClick}
              className="btn-ditya-orange py-1.5 px-2 sm:px-3 text-[11px] sm:text-xs font-semibold shadow-xs shrink-0 whitespace-nowrap cursor-pointer"
            >
              {consultationMobileText}
            </button>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#041614] dark:text-white hover:text-[#059669] focus:outline-none rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/98 dark:bg-[#020D0C]/98 backdrop-blur-xl border-t border-gray-100 dark:border-white/10 shadow-2xl px-5 py-6 space-y-3 animate-in slide-in-from-top-2 duration-200 text-[#041614] dark:text-white max-h-[calc(100vh-4rem)] overflow-y-auto">
          <Link
            href="/"
            className={`block px-3 py-2 rounded-xl text-base font-medium ${
              isActive('/')
                ? 'text-[#059669] dark:text-[#10B981] bg-emerald-50 dark:bg-emerald-950/40 font-bold'
                : 'text-[#041614] dark:text-gray-200'
            }`}
          >
            {t('nav.home')}
          </Link>

          <Link
            href="/about-us"
            className={`block px-3 py-2 rounded-xl text-base font-medium ${
              isActive('/about-us')
                ? 'text-[#059669] dark:text-[#10B981] bg-emerald-50 dark:bg-emerald-950/40 font-bold'
                : 'text-[#041614] dark:text-gray-200'
            }`}
          >
            {t('nav.about')}
          </Link>

          <div className="px-3 py-2">
            <div
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="flex items-center justify-between text-base font-medium text-[#041614] dark:text-gray-200 cursor-pointer"
            >
              <span>{t('nav.services')}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isServicesOpen ? 'rotate-180 text-[#059669]' : ''
                }`}
              />
            </div>

            {isServicesOpen && (
              <div className="pl-3 mt-2 space-y-1.5 border-l-2 border-[#059669] py-1">
                <Link
                  href="/services"
                  className="block px-2 py-1.5 rounded-lg text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-[#059669]"
                >
                  {t('nav.services')} Overview
                </Link>
                {serviceHouses.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-2 py-1.5 rounded-lg text-sm transition-colors ${
                      pathname === item.href
                        ? 'text-[#059669] dark:text-[#10B981] font-bold'
                        : 'text-gray-600 dark:text-gray-400 hover:text-[#059669]'
                    }`}
                  >
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/blog"
            className={`block px-3 py-2 rounded-xl text-base font-medium ${
              isActive('/blog')
                ? 'text-[#059669] dark:text-[#10B981] bg-emerald-50 dark:bg-emerald-950/40 font-bold'
                : 'text-[#041614] dark:text-gray-200'
            }`}
          >
            {t('nav.blog')}
          </Link>

          <Link
            href="/contact-us"
            className={`block px-3 py-2 rounded-xl text-base font-medium ${
              isActive('/contact-us')
                ? 'text-[#059669] dark:text-[#10B981] bg-emerald-50 dark:bg-emerald-950/40 font-bold'
                : 'text-[#041614] dark:text-gray-200'
            }`}
          >
            {t('nav.contact')}
          </Link>

          {/* Switchers in Mobile Menu */}
          <div className="pt-3 pb-1 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Preferences</span>
            <div className="flex items-center space-x-2">
              <LanguageToggle variant="pill" />
              <ThemeToggle />
            </div>
          </div>

          {isConsultationEnabled && (
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleConsultationClick();
                }}
                className="w-full btn-ditya-orange py-3 font-semibold text-center shadow-md cursor-pointer"
              >
                {consultationText}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
