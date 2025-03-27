"use client";

import { useState, useEffect } from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { routes, Route } from '../../data/routes';
import { Card } from '../../ui/card';
import { MapPin, Heart, ArrowRight, Car } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Number of recommended routes to show
const RECOMMENDED_COUNT = 3;

export default function RouteRecommendations() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [recommendedRoutes, setRecommendedRoutes] = useState<Route[]>([]);
  const [viewedRoutes, setViewedRoutes] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after the first render
  useEffect(() => {
    setMounted(true);
  }, []);

  // Record a route as viewed
  const recordRouteView = (routeId: number) => {
    if (!viewedRoutes.includes(routeId)) {
      setViewedRoutes([routeId, ...viewedRoutes].slice(0, 10)); // Keep only the 10 most recently viewed
    }
  };

  // Generate recommendations based on favorites and viewed history
  useEffect(() => {
    if (!mounted) return;

    // If no favorites or viewed routes, recommend popular routes
    if (favorites.length === 0 && viewedRoutes.length === 0) {
      const popularRoutes = routes.filter(route => route.popular).slice(0, RECOMMENDED_COUNT);
      setRecommendedRoutes(popularRoutes);
      return;
    }

    // Exclude routes that are already in favorites
    const candidateRoutes = routes.filter(route => !favorites.includes(route.id));

    // Get the routes that match user's viewed or favorited cities
    const userRoutes = [...favorites, ...viewedRoutes];
    const userRoutesData = routes.filter(route => userRoutes.includes(route.id));

    const fromCities = userRoutesData.map(route => route.from);
    const toCities = userRoutesData.map(route => route.to);

    // Score routes based on preference matches
    const scoredRoutes = candidateRoutes.map(route => {
      let score = 0;

      // Score for matching from city
      if (fromCities.includes(route.from)) {
        score += 3;
      }

      // Score for matching to city
      if (toCities.includes(route.to)) {
        score += 3;
      }

      // Score for popularity
      if (route.popular) {
        score += 1;
      }

      return { route, score };
    });

    // Sort by score and take top recommendations
    const sortedRoutes = scoredRoutes
      .sort((a, b) => b.score - a.score)
      .map(item => item.route)
      .slice(0, RECOMMENDED_COUNT);

    // If we don't have enough recommendations, add popular routes
    if (sortedRoutes.length < RECOMMENDED_COUNT) {
      const missingCount = RECOMMENDED_COUNT - sortedRoutes.length;
      const popularRoutes = routes
        .filter(route =>
          route.popular &&
          !favorites.includes(route.id) &&
          !sortedRoutes.some(r => r.id === route.id)
        )
        .slice(0, missingCount);

      setRecommendedRoutes([...sortedRoutes, ...popularRoutes]);
    } else {
      setRecommendedRoutes(sortedRoutes);
    }
  }, [favorites, viewedRoutes, mounted]);

  // Show a default UI during server rendering and when not mounted
  if (!mounted) {
    return (
      <div className="container mx-auto px-4 mt-8">
        <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(RECOMMENDED_COUNT)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-36 bg-gray-200 animate-pulse"></div>
              <div className="p-3">
                <div className="h-4 bg-gray-200 w-3/4 mb-2 animate-pulse"></div>
                <div className="h-5 bg-gray-200 w-1/2 mb-2 animate-pulse"></div>
                <div className="flex justify-between items-center">
                  <div className="h-3 bg-gray-200 w-1/3 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 w-1/4 animate-pulse"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (recommendedRoutes.length === 0) {
    return null; // Don't render anything if no recommendations
  }

  return (
    <div className="container mx-auto px-4 mt-8">
      <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendedRoutes.map(route => (
          <Card key={route.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <Link href={`/routes?highlight=${route.id}`} onClick={() => recordRouteView(route.id)}>
              <div className="relative h-36">
                <Image
                  src={route.image}
                  alt={`${route.from} to ${route.to}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                  // unoptimized
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover"
                />
                <button
                  className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(route.id);
                  }}
                >
                  <Heart
                    className={`h-4 w-4 ${isFavorite(route.id) ? 'text-red-500 fill-red-500' : 'text-gray-500'}`}
                  />
                </button>
              </div>
            </Link>

            <div className="p-3">
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <MapPin className="h-3 w-3 text-primary mr-1" />
                <span>{route.from}</span>
                <ArrowRight className="h-3 w-3 mx-1" />
                <span>{route.to}</span>
              </div>

              <h3 className="font-medium mb-2 line-clamp-1" title={route.description}>
                {route.description}
              </h3>

              <div className="flex justify-between items-center">
                <div className="flex items-center text-xs text-gray-500">
                  <Car className="h-3 w-3 mr-1" />
                  <span>{route.distance}</span>
                  <span className="mx-1">•</span>
                  <span>{route.duration}</span>
                </div>
                <span className="font-semibold text-primary">{route.price}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
