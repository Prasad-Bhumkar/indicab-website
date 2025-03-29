'use client';

import PackageCard from './PackageCard';
import { Clock, MapPin, CheckCircle } from 'lucide-react';

interface Package {
  id: string;
  title: string;
  price?: string;
  time: string;
  distance: string;
  description?: string;
  features: string[];
}

export default function HourlyPackageCard({ package: pkg }: { package: Package }) {
  return (
    <PackageCard package={pkg}>
      <div className="space-y-2 mb-6">
        {pkg.features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 text-sm">{feature}</span>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between text-sm">
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-green-700 mr-1" />
          <span>{pkg.time}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-4 w-4 text-green-700 mr-1" />
          <span>{pkg.distance}</span>
        </div>
      </div>
    </PackageCard>
  );
}