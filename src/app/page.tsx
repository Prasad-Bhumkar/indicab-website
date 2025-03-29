
'use client';

import HeroEnhanced from 'indicab/src/components/features/marketing/hero/HeroEnhanced';
import FeaturedCars from 'indicab/src/components/features/booking/FeaturedCars';
import PopularRoutes from 'indicab/src/components/features/marketing/PopularRoutes';
import HowItWorks from 'indicab/src/components/features/marketing/HowItWorks';

export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">
      <HeroEnhanced />
      <FeaturedCars />
      <PopularRoutes />
      <HowItWorks />
    </div>
  );
}