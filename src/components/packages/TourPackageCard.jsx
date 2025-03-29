'use client';

import PackageCard from './PackageCard';
import { Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function TourPackageCard({ package: pkg }) {
  return (
    <PackageCard 
      package={pkg}
      actionText="View Details"
      actionHref={`/packages/${pkg.id}`}
      badgeText={pkg.type}
    >
      <div className="relative h-60 mb-4">
        <div className="absolute inset-0 bg-gray-800 opacity-10 z-10 rounded-t-lg"></div>
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="flex items-center text-sm text-gray-600 mb-4">
        <Calendar className="h-4 w-4 mr-1" />
        <span>{pkg.duration}</span>
      </div>

      <h4 className="font-medium text-gray-800 mb-2">Key Attractions:</h4>
      <div className="space-y-1 mb-6">
        {pkg.attractions.map((attraction, index) => (
          <div key={index} className="flex items-start">
            <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 text-sm">{attraction}</span>
          </div>
        ))}
      </div>
    </PackageCard>
  );
}