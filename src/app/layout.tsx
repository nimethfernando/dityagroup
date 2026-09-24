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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dityagroup.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ditya Group | Code Your Destiny. Create Your Legacy.',
    template: '%s | Ditya Group',
  },
  description:
    'Where practical expertise in trading, wealth management, mathematics, business consultancy, and technology meets deep spiritual insight and Vedic wisdom.',
  applicationName: 'Ditya Group',
  keywords: [
    'Ditya Group',
    'Global Business Network',
    'GBN Circle',
    'GBN Elite Council',
    'Ditya Astroverse',
    'Ditya Wealth House',
    'Ditya Math House',
    'Ditya Business House',
    'Ditya Trading House',
    'Ditya Tech House',
    'Vedic Astrology Jaipur',
    'Numerology Consultation',
    'Tarot Card Reading',
    'Stock Market Trading Jaipur',
    'Business Consultancy Rajasthan',
    'Financial Markets Education',
    'Wealth Management India',
  ],
  authors: [{ name: 'Ditya Group', url: siteUrl }],
  creator: 'Ditya Group',
  publisher: 'Ditya Group',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Ditya Group',
    title: 'Ditya Group | Code Your Destiny. Create Your Legacy.',
    description:
      'Where practical expertise in trading and business meets deep spiritual insight, helping you make powerful, aligned decisions for every part of your life.',
    images: [
      {
        url: '/images/hero-banner-clean.jpg',
        width: 1200,
        height: 630,
        alt: 'Ditya Group - Code Your Destiny. Create Your Legacy.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ditya Group | Code Your Destiny. Create Your Legacy.',
    description:
      'Where practical expertise in trading and business meets deep spiritual insight, helping you make powerful, aligned decisions for every part of your life.',
    images: ['/images/hero-banner-clean.jpg'],
    creator: '@dityagroup',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/favicon.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': `${siteUrl}/#organization`,
      name: 'Ditya Group',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        '@id': `${siteUrl}/#logo`,
        url: `${siteUrl}/images/logo.png`,
        caption: 'Ditya Group Logo',
      },
      image: `${siteUrl}/images/hero-banner-clean.jpg`,
      description:
        'Where practical expertise in trading, wealth management, mathematics, business consultancy, and technology meets deep spiritual and Vedic insight.',
      telephone: '+91-9351090301',
      email: 'groupditya@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '3rd floor, 261, Sewa Sadan Marg, Adarsh Nagar',
        addressLocality: 'Jaipur',
        addressRegion: 'Rajasthan',
        postalCode: '302004',
        addressCountry: 'IN',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+91-9351090301',
          contactType: 'customer service',
          areaServed: ['IN', 'Global'],
          availableLanguage: ['English', 'Hindi'],
        },
        {
          '@type': 'ContactPoint',
          telephone: '+995-555433091',
          contactType: 'international desk',
          areaServed: ['GE', 'Global'],
          availableLanguage: ['English'],
        },
      ],
      sameAs: [
        'https://www.facebook.com/dityagroup',
        'https://www.instagram.com/dityagroup',
        'https://www.linkedin.com/company/dityagroup',
        'https://twitter.com/dityagroup',
        'https://www.youtube.com/@dityagroup',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Ditya Group',
      description: 'Code Your Destiny. Create Your Legacy.',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/blog?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ],
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdData),
          }}
        />
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
