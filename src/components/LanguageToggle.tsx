'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/translations';

interface LanguageToggleProps {
  className?: string;
  variant?: 'navbar' | 'topbar' | 'compact' | 'pill';
}

const LANGUAGES: { code: Language; label: string; nativeName: string; flag: string }[] = [
  { code: 'en', label: 'EN', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ka', label: 'KA', nativeName: 'ქართული', flag: '🇬🇪' },
];

export default function LanguageToggle({ className = '', variant = 'navbar' }: LanguageToggleProps) {
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'topbar') {
    return (
      <button
        onClick={toggleLanguage}
        title={t('switcher.language')}
        className={`flex items-center space-x-1.5 text-xs text-gray-300 hover:text-white hover:bg-white/10 px-2.5 py-1 rounded-full transition-all cursor-pointer font-medium ${className}`}
      >
        <span className="text-sm">{currentLang.flag}</span>
        <span className="text-[11px] font-bold tracking-wider">{currentLang.label}</span>
      </button>
    );
  }

  if (variant === 'pill') {
    return (
      <div className={`inline-flex items-center bg-gray-100 dark:bg-white/10 p-0.5 rounded-xl border border-gray-200 dark:border-white/10 text-xs ${className}`}>
        {LANGUAGES.map((l) => {
          const isActive = language === l.code;
          return (
            <button
              key={l.code}
              onClick={() => setLanguage(l.code)}
              className={`px-2.5 py-1 rounded-lg font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-[#059669] text-[#041614] dark:text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Default navbar dropdown style
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Language"
        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 border border-gray-200 dark:border-white/10 text-[#041614] dark:text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
      >
        <span className="text-sm leading-none">{currentLang.flag}</span>
        <span className="tracking-wide">{currentLang.label}</span>
        <ChevronDown className={`w-3 h-3 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-36 bg-white dark:bg-[#041614] rounded-2xl shadow-xl border border-gray-100 dark:border-white/15 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1 border-b border-gray-100 dark:border-white/10 mb-1">
            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
              Language
            </span>
          </div>
          {LANGUAGES.map((l) => {
            const isSelected = language === l.code;
            return (
              <button
                key={l.code}
                onClick={() => {
                  setLanguage(l.code);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-[#059669]/20 text-[#059669] dark:text-[#10B981] font-bold'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 font-medium'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{l.flag}</span>
                  <span>{l.nativeName}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

