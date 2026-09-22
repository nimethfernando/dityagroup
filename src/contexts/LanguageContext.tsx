'use client';

import React, { createContext, useContext, useState, useEffect, useTransition } from 'react';
import { Language, getTranslation } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [, startTransition] = useTransition();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ditya_lang') as Language;
      if (saved === 'en' || saved === 'ka') {
        setLanguageState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (lang: Language) => {
    startTransition(() => {
      setLanguageState(lang);
      try {
        localStorage.setItem('ditya_lang', lang);
        document.documentElement.lang = lang;
      } catch {
        // ignore
      }
    });
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ka' : 'en');
  };

  const t = (key: string, fallback?: string): string => {
    return getTranslation(key, language, fallback);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
