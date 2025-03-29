'use client';

import PackageCard from './PackageCard';
import { Calendar, MapPin, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface TourPackage {
  id: string;
  title: string;
  price: string;
  duration: string;
  type: string;
  description: string;
  attractions: string[];
  image: string;
}

interface TourPackageCardProps {
  package: TourPackage;
}

export default function TourPackageCard({ package: pkg }: TourPackageCardProps) {
  const [imageError, setImageError] = useState(false);
  
  return (
    <PackageCard 
      package={pkg}
      actionText="View Details"
      actionHref={`/packages/${pkg.id}`}
      badgeText={pkg.type}
    >
      <div className="relative h-60 mb-4 group">
        <div className="absolute inset-0 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={imageError ? '/assets/default-tour.jpg' : pkg.image}
            alt={pkg.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,[base64-encoded-blur-placeholder]"
            quality={80}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-white font-medium text-lg">{pkg.title}</h3>
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-600 mb-4">
        <Calendar className="h-4 w-4 mr-1" />
        <span>{pkg.duration}</span>
      </div>

      <h4 className="font-medium text-gray-800 mb-2">Key Attractions:</h4>
      <div className="space-y-1 mb-6">
        {pkg.attractions.map((attraction: string, index: number) => (
          <div key={index} className="flex items-start">
            <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 text-sm">{attraction}</span>
          </div>
        ))}
      </div>
    </PackageCard>
  );
}