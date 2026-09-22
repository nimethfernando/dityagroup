import type { Metadata } from 'next';
import { Inter, Heebo } from 'next/font/google';
import './globals.css';
import TopBarWrapper from '@/components/TopBarWrapper';
import Navbar from '@/components/Navbar';
import FooterWrapper from '@/components/FooterWrapper';
import { ConsultationProvider } from '@/contexts/ConsultationContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const heebo = Heebo({
  subsets: ['latin'],
  variable: '--font-heebo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Home - Ditya Group | Code Your Destiny. Create Your Legacy.',
  description:
    'Where practical expertise in trading and business meets deep spiritual insight, helping you make powerful, aligned decisions for every part of your life.',
  icons: {
    icon: '/images/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${heebo.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('ditya_theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
                var lang = localStorage.getItem('ditya_lang');
                if (lang) {
                  document.documentElement.lang = lang;
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-white dark:bg-[#030F0E] text-gray-800 dark:text-gray-100 antialiased transition-colors duration-200">
        <ThemeProvider>
          <LanguageProvider>
            <ConsultationProvider>
              <TopBarWrapper />
              <Navbar />
              <main className="flex-grow">{children}</main>
              <FooterWrapper />
            </ConsultationProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
