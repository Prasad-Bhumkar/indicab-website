import ClientWrapper from '@/components/ClientWrapper';
import { I18nProvider } from '@/components/I18nProvider';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { initAnalytics } from '@/lib/analytics';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import '../utils/i18n/config';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// Initialize analytics
if (typeof window !== 'undefined') {
    initAnalytics();
}

export const metadata: Metadata = {
    title: 'Indicab',
    description: 'Your AI-powered development platform',
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
}): JSX.Element {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link
                    rel="preload"
                    href="/assets/images/indicab-logo.png"
                    as="image"
                    type="image/png"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
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
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ErrorBoundary>
                        <ClientWrapper>
                            <I18nProvider>
                                <main className="min-h-screen">{children}</main>
                            </I18nProvider>
                        </ClientWrapper>
                    </ErrorBoundary>
                    <Toaster />
                </ThemeProvider>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
