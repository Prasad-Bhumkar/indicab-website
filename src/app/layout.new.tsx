import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@context/ThemeContext';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@components/layout/header/Header'), { 
  loading: () => <div className="h-16 bg-gray-100" />,
  ssr: false 
});

const Footer = dynamic(() => import('@components/layout/footer/Footer'), {
  loading: () => <div className="h-12 bg-gray-100" />,
  ssr: false
});

import AppErrorBoundary from '@components/common/AppErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://indicab.same-app.com'),
  title: 'IndiCab - Trusted Indian Cab Booking Service',
  description: 'Book reliable cab services for one-way, round trip, and rentals across major Indian cities. Service of trusted Indian drivers for business and leisure.',
  keywords: ['cab booking', 'taxi service', 'India', 'one-way', 'round trip', 'rental', 'trusted drivers'],
  openGraph: {
    title: 'IndiCab - Trusted Indian Cab Booking Service',
    description: 'Book reliable cab services across major Indian cities with trusted Indian drivers for business and leisure.',
    images: ['/indicab-logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IndiCab - Trusted Indian Cab Booking Service',
    description: 'Book reliable cab services across major Indian cities with trusted Indian drivers for business and leisure.',
    images: ['/indicab-logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/indicab-logo.png', type: 'image/png' }
    ],
    apple: '/indicab-logo.png',
  },
  manifest: '/manifest.json',
  other: {
    'X-UA-Compatible': 'IE=edge',
    'format-detection': 'telephone=no',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'mobile-web-app-capable': 'yes',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AppErrorBoundary>
            <Header />
            <main>{children}</main>
            <Footer />
          </AppErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}