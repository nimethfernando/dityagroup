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

  // If in admin dashboard, don't show public navbar
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
      className={`sticky top-0 z-40 bg-white transition-all duration-200 ${
        isScrolled ? 'shadow-md py-3' : 'py-4'
      }`}
    >
      <div className="max-w-[1140px] mx-auto px-4 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative h-12 w-48 sm:w-56">
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
        <nav className="hidden lg:flex items-center space-x-8 text-[15px] font-medium">
          <Link
            href="/"
            className={`transition-colors ${
              isActive('/')
                ? 'text-[#FF5722] font-semibold'
                : 'text-[#011633] hover:text-[#FF5722]'
            }`}
          >
            Home
          </Link>

          <Link
            href="/about-us"
            className={`transition-colors ${
              isActive('/about-us')
                ? 'text-[#FF5722] font-semibold'
                : 'text-[#011633] hover:text-[#FF5722]'
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
              className={`flex items-center space-x-1 transition-colors ${
                isActive('/services') || serviceHouses.some((h) => pathname === h.href)
                  ? 'text-[#FF5722] font-semibold'
                  : 'text-[#011633] hover:text-[#FF5722]'
              }`}
            >
              <span>Services</span>
              <ChevronDown className="w-4 h-4 mt-0.5" />
            </Link>

            {isServicesOpen && (
              <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-b-lg border-t-2 border-[#FF5722] py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {serviceHouses.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#FFF3E0] hover:text-[#FF5722] transition-colors ${
                      pathname === item.href ? 'bg-orange-50 text-[#FF5722] font-semibold' : ''
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
            className={`transition-colors ${
              isActive('/blog')
                ? 'text-[#FF5722] font-semibold'
                : 'text-[#011633] hover:text-[#FF5722]'
            }`}
          >
            Blog
          </Link>

          <Link
            href="/contact-us"
            className={`transition-colors ${
              isActive('/contact-us')
                ? 'text-[#FF5722] font-semibold'
                : 'text-[#011633] hover:text-[#FF5722]'
            }`}
          >
            Contact Us
          </Link>
        </nav>

        {/* Free Consultation CTA Button */}
        <div className="hidden lg:block">
          <button
            onClick={handleOpenConsultation}
            className="bg-[#FF5722] hover:bg-[#e64a19] text-white px-7 py-3 rounded-asymmetric font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            Free Consultation
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center space-x-3">
          <button
            onClick={handleOpenConsultation}
            className="bg-[#FF5722] text-white px-4 py-2 text-xs font-semibold rounded-asymmetric"
          >
            Consultation
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#011633] hover:text-[#FF5722] focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl px-5 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <Link
            href="/"
            className={`block text-base font-medium ${
              isActive('/') ? 'text-[#FF5722] font-bold' : 'text-[#011633]'
            }`}
          >
            Home
          </Link>
          <Link
            href="/about-us"
            className={`block text-base font-medium ${
              isActive('/about-us') ? 'text-[#FF5722] font-bold' : 'text-[#011633]'
            }`}
          >
            About Us
          </Link>

          <div>
            <div
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="flex items-center justify-between text-base font-medium text-[#011633] cursor-pointer"
            >
              <span>Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}
              />
            </div>

            {isServicesOpen && (
              <div className="pl-4 mt-2 space-y-2 border-l-2 border-[#FF5722] py-1">
                <Link
                  href="/services"
                  className="block text-sm font-medium text-gray-700 hover:text-[#FF5722]"
                >
                  All Services Overview
                </Link>
                {serviceHouses.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-sm text-gray-600 hover:text-[#FF5722]"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/blog"
            className={`block text-base font-medium ${
              isActive('/blog') ? 'text-[#FF5722] font-bold' : 'text-[#011633]'
            }`}
          >
            Blog
          </Link>
          <Link
            href="/contact-us"
            className={`block text-base font-medium ${
              isActive('/contact-us') ? 'text-[#FF5722] font-bold' : 'text-[#011633]'
            }`}
          >
            Contact Us
          </Link>

          <div className="pt-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleOpenConsultation();
              }}
              className="w-full bg-[#FF5722] text-white py-3 rounded-asymmetric font-semibold text-center"
            >
              Free Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
