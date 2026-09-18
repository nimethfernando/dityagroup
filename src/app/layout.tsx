import type { Metadata } from 'next';
import { Inter, Heebo } from 'next/font/google';
import './globals.css';
import TopBarWrapper from '@/components/TopBarWrapper';
import Navbar from '@/components/Navbar';
import FooterWrapper from '@/components/FooterWrapper';
import { ConsultationProvider } from '@/contexts/ConsultationContext';

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
    <html lang="en" className={`${inter.variable} ${heebo.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-white text-gray-800 antialiased">
        <ConsultationProvider>
          <TopBarWrapper />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <FooterWrapper />
        </ConsultationProvider>
      </body>
    </html>
  );
}
