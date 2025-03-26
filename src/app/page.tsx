import HeroEnhanced from '@/components/HeroEnhanced';
import FeaturedCars from '@/components/FeaturedCars';
import PopularRoutes from '@/components/PopularRoutes';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import MobileApp from '@/components/MobileApp';
import FloatingActionButton from '@/components/FloatingActionButton';
import SchemaData from '@/components/SchemaData';
import SuspenseBoundary from '@/components/SuspenseBoundary';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IndiCab - Book Outstation Cabs & Taxi Service in India',
  description: 'Book outstation cabs for one-way and round trips across India. Premium cars, experienced drivers, and affordable rates for all your intercity travel needs.',
  keywords: 'outstation cab, intercity taxi, one way cab, cab booking, taxi service',
  openGraph: {
    title: 'IndiCab - Outstation Cab & Taxi Service',
    description: 'Book outstation cabs for one-way and round trips across India with IndiCab.',
    url: 'https://indicab.example.com',
    siteName: 'IndiCab',
    images: [
      {
        url: 'https://indicab.example.com/indicab-logo.svg',
        width: 1200,
        height: 630,
        alt: 'IndiCab Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IndiCab - Outstation Cab & Taxi Service',
    description: 'Book outstation cabs for one-way and round trips across India with IndiCab.',
    images: ['https://indicab.example.com/indicab-logo.svg'],
    creator: '@indicab',
  },
};

export default function Home() {
  // Common FAQ data
  const faqData = [
    {
      question: "How do I book an outstation cab?",
      answer: "You can book an outstation cab by selecting your pickup and drop locations, choosing a car type, and confirming your booking details."
    },
    {
      question: "Is there a cancellation fee?",
      answer: "Free cancellation up to 1 hour before pickup. Cancellations made within 1 hour of pickup time incur a 10% fee."
    },
    {
      question: "Are your drivers experienced for long routes?",
      answer: "Yes, all our drivers have 5+ years of experience and are specifically trained for long-distance intercity travel."
    },
    {
      question: "Do you provide 24/7 customer support?",
      answer: "Yes, our customer support team is available 24/7 to assist you with any queries or issues during your journey."
    }
  ];

  // Custom fallback for the MobileApp component
  const mobileAppFallback = (
    <div className="bg-primary py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <div className="text-white">
              <div className="h-8 w-48 bg-white/20 animate-pulse rounded mb-2"></div>
              <div className="h-4 w-64 bg-white/20 animate-pulse rounded mb-4"></div>
              <div className="flex justify-start space-x-6 mb-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 mb-2"></div>
                    <div className="h-4 w-16 bg-white/20 animate-pulse rounded"></div>
                  </div>
                ))}
              </div>
              <div className="space-y-2 mb-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-4 w-48 bg-white/20 animate-pulse rounded"></div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-64 h-96 bg-white/20 animate-pulse rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main>
      {/* Enhanced SEO with multiple structured data types */}
      <SchemaData schema={[
        { type: 'organization' },
        { type: 'localBusiness' },
        { type: 'faq', data: faqData }
      ]} />

      {/* Hero Section with Car Image Slider */}
      <SuspenseBoundary fallback={<div className="h-[600px] bg-gray-800 animate-pulse"></div>} delayMs={300}>
        <HeroEnhanced />
      </SuspenseBoundary>

      {/* How It Works Section */}
      <SuspenseBoundary fallback={<div className="h-96 bg-gray-100 animate-pulse"></div>} delayMs={300}>
        <HowItWorks />
      </SuspenseBoundary>

      {/* Featured Vehicles Section */}
      <SuspenseBoundary fallback={<div className="h-96 bg-white animate-pulse"></div>} delayMs={300}>
        <FeaturedCars />
      </SuspenseBoundary>

      {/* Popular Routes Section */}
      <SuspenseBoundary fallback={<div className="h-96 bg-gray-100 animate-pulse"></div>} delayMs={300}>
        <PopularRoutes />
      </SuspenseBoundary>

      {/* Testimonials Section */}
      <SuspenseBoundary fallback={<div className="h-96 bg-gray-200 animate-pulse"></div>} delayMs={300}>
        <Testimonials />
      </SuspenseBoundary>

      {/* Mobile App Section */}
      <SuspenseBoundary fallback={mobileAppFallback} delayMs={300}>
        <MobileApp />
      </SuspenseBoundary>

      <FloatingActionButton />
    </main>
  );
}
