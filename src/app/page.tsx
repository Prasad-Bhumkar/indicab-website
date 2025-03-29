'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import ErrorBoundary from '@components/common/ErrorBoundary';
import LoadingSpinner from '@components/ui/LoadingSpinner';

const HeroSection = dynamic(
  () => import('@components/features/marketing/hero/HeroSection'),
  { loading: () => <LoadingSpinner className="h-[600px]" /> }
);

const FeaturedCars = dynamic(
  () => import('@components/features/booking/FeaturedCars'),
  { loading: () => <LoadingSpinner className="h-[500px]" /> }
);

const PopularRoutes = dynamic(
  () => import('@components/features/marketing/PopularRoutes'),
  { loading: () => <LoadingSpinner className="h-[400px]" /> }
);

const HowItWorks = dynamic(
  () => import('@components/features/marketing/HowItWorks'),
  { loading: () => <LoadingSpinner className="h-[300px]" /> }
);

export default function HomePage() {
  return (
    <main className="space-y-20 pb-20" role="main">
      <ErrorBoundary fallback={<div className="h-[600px] flex items-center justify-center">Failed to load hero section</div>}>
        <Suspense fallback={<LoadingSpinner className="h-[600px]" />}>
          <HeroSection />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<div className="h-[500px] flex items-center justify-center">Failed to load featured cars</div>}>
        <Suspense fallback={<LoadingSpinner className="h-[500px]" />}>
          <FeaturedCars />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<div className="h-[400px] flex items-center justify-center">Failed to load popular routes</div>}>
        <Suspense fallback={<LoadingSpinner className="h-[400px]" />}>
          <PopularRoutes />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<div className="h-[300px] flex items-center justify-center">Failed to load how it works</div>}>
        <Suspense fallback={<LoadingSpinner className="h-[300px]" />}>
          <HowItWorks />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
