'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useConsultation } from '@/contexts/ConsultationContext';

interface NavbarProps {
  onOpenConsultation?: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const pathname = usePathname();
  const { openModal } = useConsultation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

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
    { title: 'Global Business Network', href: '/global-business-network' },
    { title: 'Ditya Astro Verse', href: '/ditya-astroverse' },
    { title: 'Ditya Math House', href: '/ditya-math-house' },
    { title: 'Ditya Business House', href: '/ditya-business-house' },
    { title: 'Ditya Trading House', href: '/ditya-trading-house' },
    { title: 'Ditya Tech House', href: '/ditya-tech-house' },
  ];

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_4px_25px_rgba(1,22,51,0.06)] py-3 border-b border-slate-100'
          : 'bg-white/90 backdrop-blur-md py-4 border-b border-gray-100/70'
      }`}
    >
      <div className="max-w-[1140px] mx-auto px-4 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative h-11 sm:h-12 w-44 sm:w-56 transition-transform group-hover:scale-[1.01]">
            <Image
              src="/images/logo.png"
              alt="Ditya Group Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 text-[15px] font-medium">
          <Link
            href="/"
            className={`px-3.5 py-2 rounded-full transition-all duration-200 ${
              isActive('/')
                ? 'text-[#059669] font-bold bg-emerald-50/90 shadow-xs'
                : 'text-[#041614] hover:text-[#059669] hover:bg-gray-50'
            }`}
          >
            Home
          </Link>

          <Link
            href="/about-us"
            className={`px-3.5 py-2 rounded-full transition-all duration-200 ${
              isActive('/about-us')
                ? 'text-[#059669] font-bold bg-emerald-50/90 shadow-xs'
                : 'text-[#041614] hover:text-[#059669] hover:bg-gray-50'
            }`}
          >
            About Us
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
                  ? 'text-[#059669] font-bold bg-emerald-50/90 shadow-xs'
                  : 'text-[#041614] hover:text-[#059669] hover:bg-gray-50'
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isServicesOpen ? 'rotate-180' : ''
                }`}
              />
            </Link>

            {isServicesOpen && (
              <div className="absolute top-full left-0 w-72 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-gray-100 mb-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    6 Specialized Houses
                  </span>
                </div>
                {serviceHouses.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      pathname === item.href
                        ? 'bg-emerald-50 text-[#059669] font-bold'
                        : 'text-gray-700 hover:bg-emerald-50/60 hover:text-[#059669]'
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/blog"
            className={`px-3.5 py-2 rounded-full transition-all duration-200 ${
              isActive('/blog')
                ? 'text-[#059669] font-bold bg-emerald-50/90 shadow-xs'
                : 'text-[#041614] hover:text-[#059669] hover:bg-gray-50'
            }`}
          >
            Blog
          </Link>

          <Link
            href="/contact-us"
            className={`px-3.5 py-2 rounded-full transition-all duration-200 ${
              isActive('/contact-us')
                ? 'text-[#059669] font-bold bg-emerald-50/90 shadow-xs'
                : 'text-[#041614] hover:text-[#059669] hover:bg-gray-50'
            }`}
          >
            Contact Us
          </Link>
        </nav>

        {/* Free Consultation CTA Button */}
        <div className="hidden lg:block">
          <button
            onClick={handleOpenConsultation}
            className="btn-ditya-orange text-sm shadow-md hover:shadow-emerald-500/25 cursor-pointer"
          >
            Free Consultation
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center space-x-3">
          <button
            onClick={handleOpenConsultation}
            className="btn-ditya-orange py-2 px-4 text-xs shadow-xs"
          >
            Consultation
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#041614] hover:text-[#059669] focus:outline-none rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-2xl px-5 py-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <Link
            href="/"
            className={`block px-3 py-2 rounded-xl text-base font-medium ${
              isActive('/') ? 'text-[#059669] bg-emerald-50 font-bold' : 'text-[#041614]'
            }`}
          >
            Home
          </Link>
          <Link
            href="/about-us"
            className={`block px-3 py-2 rounded-xl text-base font-medium ${
              isActive('/about-us') ? 'text-[#059669] bg-emerald-50 font-bold' : 'text-[#041614]'
            }`}
          >
            About Us
          </Link>

          <div className="px-3 py-2">
            <div
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="flex items-center justify-between text-base font-medium text-[#041614] cursor-pointer"
            >
              <span>Services</span>
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
                  className="block px-2 py-1.5 rounded-lg text-sm font-medium text-gray-800 hover:text-[#059669]"
                >
                  All Services Overview
                </Link>
                {serviceHouses.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-2 py-1.5 rounded-lg text-sm text-gray-600 hover:text-[#059669]"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/blog"
            className={`block px-3 py-2 rounded-xl text-base font-medium ${
              isActive('/blog') ? 'text-[#059669] bg-emerald-50 font-bold' : 'text-[#041614]'
            }`}
          >
            Blog
          </Link>
          <Link
            href="/contact-us"
            className={`block px-3 py-2 rounded-xl text-base font-medium ${
              isActive('/contact-us') ? 'text-[#059669] bg-emerald-50 font-bold' : 'text-[#041614]'
            }`}
          >
            Contact Us
          </Link>

          <div className="pt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleOpenConsultation();
              }}
              className="w-full btn-ditya-orange py-3 font-semibold text-center shadow-md"
            >
              Free Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
