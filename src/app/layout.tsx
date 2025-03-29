import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'indicab/src/context/ThemeContext';
import HeaderFooter from 'indicab/src/components/layout/HeaderFooter';
import AppErrorBoundary from 'indicab/src/components/common/AppErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#0c9242',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

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
            <HeaderFooter />
            <main>{children}</main>
          </AppErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}