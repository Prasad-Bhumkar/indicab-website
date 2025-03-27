"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '../ui/card';
import Image from 'next/image';
import { MapPin, Info } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  type: 'HILL_STATION' | 'FORT' | 'TEMPLE' | 'BEACH' | 'CAVE' | 'CITY' | 'DAM' | 'WILDLIFE';
  location: {
    x: number; // percentage coordinates for the map
    y: number;
  };
  shortDescription: string;
  image: string;
  slug: string;
}

const destinations: Destination[] = [
  {
    id: 'lonavala',
    name: 'Lonavala',
    type: 'HILL_STATION',
    location: { x: 25, y: 50 },
    shortDescription: 'Popular hill station with scenic views, waterfalls, and caves',
    image: '/images/lonavala-new.jpg',
    slug: 'lonavala'
  },
  {
    id: 'mahabaleshwar',
    name: 'Mahabaleshwar',
    type: 'HILL_STATION',
    location: { x: 15, y: 65 },
    shortDescription: 'Expansive mountain plateau with panoramic viewpoints and strawberry farms',
    image: '/images/mahabaleshwar.jpg',
    slug: 'mahabaleshwar'
  },
  {
    id: 'shirdi',
    name: 'Shirdi',
    type: 'TEMPLE',
    location: { x: 55, y: 40 },
    shortDescription: 'Home to the famous Sai Baba Temple, a major pilgrimage site',
    image: '/images/shirdi.jpg',
    slug: 'shirdi'
  },
  {
    id: 'aurangabad',
    name: 'Aurangabad',
    type: 'CITY',
    location: { x: 70, y: 45 },
    shortDescription: 'Gateway to Ajanta & Ellora caves, rich in Mughal heritage',
    image: '/images/aurangabad.jpg',
    slug: 'aurangabad'
  },
  {
    id: 'raigad',
    name: 'Raigad Fort',
    type: 'FORT',
    location: { x: 20, y: 75 },
    shortDescription: 'Historic fortress and capital of the Maratha Empire',
    image: '/images/raigad.jpg',
    slug: 'raigad-fort'
  }
];

export function MaharashtraMap() {
  const [hoveredDestination, setHoveredDestination] = useState<Destination | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isClient, setIsClient] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePinHover = (destination: Destination) => {
    setHoveredDestination(destination);
  };

  const handlePinClick = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  const navigateToDestination = (slug: string) => {
    router.push(`/maharashtra-tours/${slug}`);
  };

  // Return early if we're server-side rendering
  if (!isClient) {
    return <div className="h-[500px] bg-gray-100 rounded-lg animate-pulse"></div>;
  }

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      {/* Maharashtra map background */}
      <div className="relative w-full h-full">
<Image
  src="/public/assets/images/maharashtra-map.svg"
  alt="Maharashtra Map"
  fill
  className="object-contain p-4" // Removed conflicting position style
/>


        {/* Map pins for destinations */}
        {destinations.map((destination) => (
          <button
            key={destination.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 group z-10 ${
              selectedDestination?.id === destination.id ? 'scale-125' : ''
            }`}
            style={{ left: `${destination.location.x}%`, top: `${destination.location.y}%` }}
            onMouseEnter={() => handlePinHover(destination)}
            onMouseLeave={() => setHoveredDestination(null)}
            onClick={() => handlePinClick(destination)}
          >
            <div className="flex flex-col items-center">
              <div className={`
                w-5 h-5 rounded-full flex items-center justify-center
                ${selectedDestination?.id === destination.id
                  ? 'bg-secondary text-white'
                  : 'bg-primary text-white'
                }
                shadow-md transition-transform duration-300 group-hover:scale-125
              `}>
                <MapPin className="h-3 w-3" />
              </div>
              <span className="text-xs font-medium mt-1 text-gray-800 dark:text-gray-200 bg-white/80 dark:bg-gray-800/80 px-1 rounded">
                {destination.name}
              </span>
            </div>
          </button>
        ))}

        {/* Tooltip for hovered destination */}
        {hoveredDestination && !selectedDestination && (
          <div
            ref={tooltipRef}
            className="absolute z-20 bg-white dark:bg-gray-800 rounded-md shadow-lg p-3 max-w-xs"
            style={{
              left: `${hoveredDestination.location.x}%`,
              top: `${hoveredDestination.location.y - 20}%`,
              transform: 'translate(-50%, -100%)'
            }}
          >
            <h4 className="font-semibold text-gray-900 dark:text-white">{hoveredDestination.name}</h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{hoveredDestination.shortDescription}</p>
          </div>
        )}
      </div>

      {/* Selected destination details */}
      {selectedDestination && (
        <Card className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm z-30 shadow-lg">
          <div className="flex gap-4">
            <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={selectedDestination.image}
                alt={selectedDestination.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selectedDestination.name}</h3>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                  {selectedDestination.type.replace('_', ' ')}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {selectedDestination.shortDescription}
              </p>
              <div className="mt-3 flex gap-3">
                <button
                  className="px-3 py-1.5 text-xs font-medium rounded bg-primary text-white hover:bg-primary/90 transition-colors"
                  onClick={() => navigateToDestination(selectedDestination.slug)}
                >
                  Explore
                </button>
                <button
                  className="px-3 py-1.5 text-xs font-medium rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setSelectedDestination(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
