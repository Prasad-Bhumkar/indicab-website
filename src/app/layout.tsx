import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ErrorBoundary } from '@components/ErrorBoundary';

import { ThemeProvider } from '../context/ThemeContext';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'IndiCab - Trusted Indian Cab Booking Service',
    template: '%s | IndiCab'
  },
  description: 'Book reliable cab services across major Indian cities',
  keywords: ['cab', 'taxi', 'booking', 'India', 'transport'],
  authors: [{ name: 'IndiCab Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://indicab.com',
    siteName: 'IndiCab',
    images: [
      {
        url: '/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'IndiCab - Book Your Ride',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IndiCab - Trusted Indian Cab Booking Service',
    description: 'Book reliable cab services across major Indian cities',
    images: ['/assets/twitter-card.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563eb',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/assets/indicab-logo.png"
          as="image"
          type="image/png"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          as="style"
        />
        <link
          rel="preload"
          href="/favicon.ico"
          as="image"
          type="image/x-icon"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <ErrorBoundary>
            <main className="min-h-screen">{children}</main>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
