'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface ThemeToggleProps {
  className?: string;
  variant?: 'navbar' | 'topbar' | 'compact';
}

export default function ThemeToggle({ className = '', variant = 'navbar' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  if (variant === 'topbar') {
    return (
      <button
        onClick={toggleTheme}
        aria-label={isDark ? t('switcher.theme_light') : t('switcher.theme_dark')}
        title={isDark ? t('switcher.theme_light') : t('switcher.theme_dark')}
        className={`flex items-center space-x-1.5 text-xs text-gray-300 hover:text-white hover:bg-white/10 px-2.5 py-1 rounded-full transition-all cursor-pointer ${className}`}
      >
        {isDark ? (
          <>
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-medium hidden sm:inline">Light</span>
          </>
        ) : (
          <>
            <Moon className="w-3.5 h-3.5 text-emerald-300" />
            <span className="text-[11px] font-medium hidden sm:inline">Dark</span>
          </>
        )}
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={toggleTheme}
        aria-label={isDark ? t('switcher.theme_light') : t('switcher.theme_dark')}
        title={isDark ? t('switcher.theme_light') : t('switcher.theme_dark')}
        className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center transition-all duration-200 cursor-pointer ${
          isDark
            ? 'bg-white/10 text-amber-400 hover:bg-white/15 border border-white/10 shadow-xs'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200 hover:text-[#059669]'
        } ${className}`}
      >
        {isDark ? (
          <Sun className="w-3.5 h-3.5 text-amber-400 transition-transform duration-300 hover:rotate-45" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-gray-700 transition-transform duration-300 hover:-rotate-12" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? t('switcher.theme_light') : t('switcher.theme_dark')}
      title={isDark ? t('switcher.theme_light') : t('switcher.theme_dark')}
      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
        isDark
          ? 'bg-white/10 text-amber-400 hover:bg-white/15 border border-white/10 hover:border-amber-400/40 shadow-xs'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200 hover:text-[#059669]'
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-gray-700 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}

