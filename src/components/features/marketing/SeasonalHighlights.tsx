"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { Cloud, Sun, Droplets, Wind, ChevronRight, ChevronLeft } from 'lucide-react';

interface Season {
  id: string;
  name: string;
  icon: React.ReactNode;
  months: string;
  description: string;
}

interface Highlight {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'HILL_STATION' | 'FORT' | 'TEMPLE' | 'BEACH' | 'WATERFALL';
  bestTime: string;
  slug: string;
  season: 'summer' | 'monsoon' | 'winter' | 'all';
}

const seasons: Season[] = [
  {
    id: 'summer',
    name: 'Summer',
    icon: <Sun className="h-5 w-5 text-amber-500" />,
    months: 'March to June',
    description: 'Escape the heat with visits to hill stations and coastal areas.'
  },
  {
    id: 'monsoon',
    name: 'Monsoon',
    icon: <Droplets className="h-5 w-5 text-blue-500" />,
    months: 'July to September',
    description: 'Experience lush green landscapes, waterfalls, and scenic drives.'
  },
  {
    id: 'winter',
    name: 'Winter',
    icon: <Cloud className="h-5 w-5 text-gray-500" />,
    months: 'October to February',
    description: 'Perfect time for sightseeing, hiking, and outdoor activities.'
  },
  {
    id: 'all',
    name: 'Year Round',
    icon: <Wind className="h-5 w-5 text-indigo-500" />,
    months: 'Any Time',
    description: 'These destinations can be visited throughout the year.'
  }
];

const highlights: Highlight[] = [
  {
    id: '1',
    title: 'Mahabaleshwar',
    description: 'Famous hill station with panoramic views and strawberry farms.',
    image: '/images/mahabaleshwar.jpg',
    type: 'HILL_STATION',
    bestTime: 'October to June',
    slug: 'mahabaleshwar',
    season: 'winter'
  },
  {
    id: '2',
    title: 'Lonavala',
    description: 'Popular hill station with scenic views, waterfalls, and caves.',
    image: '/images/lonavala-new.jpg',
    type: 'HILL_STATION',
    bestTime: 'October to May',
    slug: 'lonavala',
    season: 'winter'
  },
  {
    id: '3',
    title: 'Raigad Fort',
    description: 'Historic fortress and capital of the Maratha Empire with stunning views.',
    image: '/images/raigad.jpg',
    type: 'FORT',
    bestTime: 'November to March',
    slug: 'raigad-fort',
    season: 'winter'
  },
  {
    id: '4',
    title: 'Shirdi',
    description: 'Home to the famous Sai Baba Temple, a major pilgrimage site.',
    image: '/images/shirdi.jpg',
    type: 'TEMPLE',
    bestTime: 'All year',
    slug: 'shirdi',
    season: 'all'
  },
  {
    id: '5',
    title: 'Lavasa',
    description: 'Planned city with Mediterranean-style architecture and lakeside views.',
    image: '/images/lavasa.jpg',
    type: 'HILL_STATION',
    bestTime: 'July to March',
    slug: 'lavasa',
    season: 'monsoon'
  },
  {
    id: '6',
    title: 'Khadakwasla Dam',
    description: 'Scenic dam with boating facilities and surrounding greenery.',
    image: '/images/khadakwasla.jpg',
    type: 'WATERFALL',
    bestTime: 'July to September',
    slug: 'khadakwasla',
    season: 'monsoon'
  },
];

export function SeasonalHighlights() {
  const [currentSeason, setCurrentSeason] = useState<string>('');
  const [filteredHighlights, setFilteredHighlights] = useState<Highlight[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  // Determine the current season based on the date
  useEffect(() => {
    const date = new Date();
    const month = date.getMonth() + 1; // getMonth is 0-indexed

    let seasonId;
    if (month >= 3 && month <= 6) {
      seasonId = 'summer';
    } else if (month >= 7 && month <= 9) {
      seasonId = 'monsoon';
    } else {
      seasonId = 'winter';
    }

    setCurrentSeason(seasonId);
    filterHighlights(seasonId);
  }, []);

  const filterHighlights = (seasonId: string) => {
    setCurrentSeason(seasonId);
    const filtered = highlights.filter(highlight =>
      highlight.season === seasonId || highlight.season === 'all'
    );
    setFilteredHighlights(filtered);
    setActiveSlide(0); // Reset slide when changing filter
  };

  const nextSlide = () => {
    if (activeSlide < Math.ceil(filteredHighlights.length / 3) - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      setActiveSlide(0); // Loop back to the beginning
    }
  };

  const prevSlide = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    } else {
      // Go to the last slide
      setActiveSlide(Math.ceil(filteredHighlights.length / 3) - 1);
    }
  };

  // Get current visible destinations (3 at a time)
  const visibleHighlights = filteredHighlights.slice(activeSlide * 3, activeSlide * 3 + 3);

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Seasonal Highlights</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Maharashtra offers unique experiences in every season. Discover the best destinations to visit right now.
          </p>
        </div>

        {/* Season Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {seasons.map((season) => (
            <button
              aria-label={`Filter highlights for ${season.name}`}
              key={season.id}
              onClick={() => filterHighlights(season.id)}
              className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
                currentSeason === season.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {season.icon}
              <span>{season.name}</span>
            </button>
          ))}
        </div>

        {/* Current Season Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md mb-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            {seasons.find(s => s.id === currentSeason)?.icon}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {seasons.find(s => s.id === currentSeason)?.name} Season
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">{seasons.find(s => s.id === currentSeason)?.months}</span> —
                {seasons.find(s => s.id === currentSeason)?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Destination Cards */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleHighlights.map((highlight) => (
              <div
                key={highlight.id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    onError={(e) => {
                      e.currentTarget.src = '/images/default-image.jpg'; // Fallback image
                    }}
                    src={highlight.image}
                    alt={highlight.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-primary/90 text-white text-xs font-medium py-1 px-2 m-2 rounded-full">
                    {highlight.type.replace('_', ' ')}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{highlight.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{highlight.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Best time: <span className="font-medium">{highlight.bestTime}</span>
                    </span>
                    <Link ref={`/maharashtra-tours/${highlight.slug}`} href={'/'}>
                      <Button variant="outline" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary">
                        Explore
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          {filteredHighlights.length > 3 && (
            <div className="flex justify-center mt-6 gap-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
