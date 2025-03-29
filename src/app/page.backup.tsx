
'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import ErrorBoundary from '@components/common/ErrorBoundary';
import LoadingSpinner from '@components/ui/LoadingSpinner';

// Dynamic imports with loading states
const HeroEnhanced = dynamic(
  () => import('@components/features/marketing/hero/HeroEnhanced'),
  { 
    loading: () => <LoadingSpinner className="h-[600px]" />,
    ssr: false 
  }
);

const FeaturedCars = dynamic(
  () => import('@components/features/booking/FeaturedCars'),
  { 
    loading: () => <LoadingSpinner className="h-96" /> 
  }
);

const PopularRoutes = dynamic(
  () => import('@components/features/marketing/PopularRoutes'),
  { 
    loading: () => <LoadingSpinner className="h-96" /> 
  }
);

const HowItWorks = dynamic(
  () => import('@components/features/marketing/HowItWorks'),
  { 
    loading: () => <LoadingSpinner className="h-96" /> 
  }
);

export default function HomePage() {
  return (
    <main className="space-y-20 pb-20" role="main">
      <ErrorBoundary fallback={<div className="h-[600px] flex items-center justify-center bg-gray-100">Failed to load hero section</div>}>
        <Suspense fallback={<LoadingSpinner className="h-[600px]" />}>
          <HeroEnhanced />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<div className="py-16 bg-white text-center">Failed to load featured cars</div>}>
        <Suspense fallback={<LoadingSpinner className="h-96" />}>
          <FeaturedCars />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<div className="py-16 bg-gray-50 text-center">Failed to load popular routes</div>}>
        <Suspense fallback={<LoadingSpinner className="h-96" />}>
          <PopularRoutes />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<div className="py-16 bg-white text-center">Failed to load how it works section</div>}>
        <Suspense fallback={<LoadingSpinner className="h-96" />}>
          <HowItWorks />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
