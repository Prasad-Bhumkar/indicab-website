"use client";

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Car, Search, MapPin, Filter, ArrowRight, X, Heart, Map, CheckCircle2 } from 'lucide-react';
import { _Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Image from 'next/image';
import RouteDetails from '@/components/RouteDetails';
import { useFavorites } from '@/context/FavoritesContext';
import { routes } from '@/data/routes';
import type { Route as DataRoute } from '@/data/routes';
import { Review, VehicleType, Amenity } from '@/types/routes';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

// Update type references to use DataRoute instead of Route
type Route = DataRoute;

// Add MapViewProps interface at the top of the file
interface MapViewProps {
  routes: Route[];
  onRouteSelect: (routeId: number) => void;
}

// Dynamic import for MapView to avoid SSR issues
const _MapView = dynamic<MapViewProps>(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-gray-100 animate-pulse rounded-md flex items-center justify-center">Loading map...</div>
});

// ImageWithLoading component to handle image loading state
const _ImageWithLoading = ({ src, alt }: { src: string; alt: string }): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-sm" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{
          objectFit: "cover",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out"
        }}
        unoptimized
        crossOrigin="anonymous"
        className="w-full h-full object-cover rounded-sm"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

// Extract RouteCard component
const RouteCard = React.memo(({ 
  route, 
  onRouteSelect, 
  onToggleFavorite, 
  onToggleComparison,
  isCompared,
  isFavorite
}: {
  route: Route;
  onRouteSelect: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  onToggleComparison: (id: number) => void;
  isCompared: boolean;
  isFavorite: boolean;
}): JSX.Element => (
  <Card className="overflow-hidden hover:shadow-md transition-shadow">
    <div
      className="relative h-40 cursor-pointer"
      onClick={() => onRouteSelect(route.id)}
    >
      <_ImageWithLoading src={route.image} alt={`${route.from} to ${route.to}`} />
      {route.popular && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs py-0.5 px-2 rounded">
          Popular
        </div>
      )}
      <button
        className="absolute top-2 left-2 bg-white p-1.5 rounded-full shadow-sm"
        onClick={(_e) => {
          _e.stopPropagation();
          onToggleFavorite(route.id);
        }}
      >
        <Heart
          className={`h-4 w-4 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-500'}`}
        />
      </button>
    </div>

    <div className="p-4">
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <MapPin className="h-3 w-3 text-primary mr-1" />
        <span>{route.from}</span>
        <ArrowRight className="h-3 w-3 mx-1" />
        <span>{route.to}</span>
      </div>

      <h3
        className="font-medium text-lg mb-1 cursor-pointer hover:text-primary"
        onClick={() => onRouteSelect(route.id)}
      >
        {route.from} to {route.to}
      </h3>
      <p className="text-sm text-gray-600 mb-2">{route.description}</p>

      <div className="flex flex-wrap gap-1 mb-2">
        {route.vehicleTypes.map((type: VehicleType): JSX.Element => (
          <span key={`${route.id}-${type}`} className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
            {type}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {route.amenities.slice(0, 3).map((amenity: Amenity): JSX.Element => (
          <span key={`${route.id}-${amenity}`} className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
            {amenity}
          </span>
        ))}
        {route.amenities.length > 3 && (
          <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
            +{route.amenities.length - 3}
          </span>
        )}
      </div>

      <div className="flex justify-between items-center text-sm mb-3">
        <div className="flex items-center">
          <Car className="h-4 w-4 text-gray-500 mr-1" />
          <span>{route.distance}</span>
        </div>
        <div>{route.duration}</div>
      </div>

      <div className="flex justify-between items-center">
        <span className="font-bold text-primary text-lg">{route.price}</span>
        <div className="flex space-x-1">
          <button
            onClick={(_e) => {
              _e.stopPropagation();
              onToggleComparison(route.id);
            }}
            className={`text-xs px-2 py-1 rounded ${
              isCompared
                ? 'bg-primary/20 text-primary'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isCompared ? 'Added' : 'Compare'}
          </button>
          <Link
            href={`/booking?from=${route.from}&to=${route.to}`}
            className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary/90 transition-colors"
            prefetch={true}
          >
            Book
          </Link>
        </div>
      </div>
    </div>
  </Card>
));

RouteCard.displayName = 'RouteCard';

// RoutesContent component that uses useSearchParams
function RoutesContent(): JSX.Element {
  const searchParams = useSearchParams();

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [fromCity, setFromCity] = useState<string>('');
  const [toCity, setToCity] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 4000]);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'distance' | 'duration' | 'rating'>('price-asc');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<VehicleType[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>([]);

  // State for route details modal
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);

  // State for route comparison
  const [compareRoutes, setCompareRoutes] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  // Get favorites from context
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // Check for compare parameter in URL
  useEffect(() => {
    const compareParam = searchParams.get('compare');
    if (compareParam) {
      const routeId = parseInt(compareParam);
      if (!isNaN(routeId) && routes.some((route: Route) => route.id === routeId)) {
        setCompareRoutes([routeId]);
      }
    }

    // Check for highlight parameter to open route details
    const highlightParam = searchParams.get('highlight');
    if (highlightParam) {
      const routeId = parseInt(highlightParam);
      if (!isNaN(routeId) && routes.some((route: Route) => route.id === routeId)) {
        setSelectedRoute(routeId);
      }
    }
  }, [searchParams]);

  // All available vehicle types
  const _allVehicleTypes: VehicleType[] = ['Hatchback', 'Sedan', 'SUV', 'Luxury', 'Electric'];

  // All available amenities
  const _allAmenities: Amenity[] = ['WiFi', 'Water', 'Entertainment', 'Charging', 'AC', 'Luggage Space', 'Child Seat'];

  // City list for filter dropdown
  const cities = useMemo(() => {
    return Array.from(new Set([
      ...routes.map((route: Route) => route.from),
      ...routes.map((route: Route) => route.to)
    ])).sort();
  }, []);

  // Calculate average rating for each route
  const getAverageRating = (routeId: number) => {
    const route = routes.find((_r: Route) => _r.id === routeId);
    if (!route || route.reviews.length === 0) return 0;

    return route.reviews.reduce((_sum: number, _review: Review) => _sum + _review.rating, 0) / route.reviews.length;
  };

  // Toggle vehicle type selection
  const _toggleVehicleType = (vehicleType: VehicleType) => {
    setSelectedVehicleTypes((prev: VehicleType[]) =>
      prev.includes(vehicleType)
        ? prev.filter((type: VehicleType) => type !== vehicleType)
        : [...prev, vehicleType]
    );
  };

  // Toggle amenity selection
  const _toggleAmenity = (amenity: Amenity) => {
    setSelectedAmenities((prev: Amenity[]) =>
      prev.includes(amenity)
        ? prev.filter((type: Amenity) => type !== amenity)
        : [...prev, amenity]
    );
  };

  // Toggle route comparison
  const _toggleRouteComparison = (routeId: number) => {
    setCompareRoutes((prev: number[]) =>
      prev.includes(routeId)
        ? prev.filter((id: number) => id !== routeId)
        : [...prev, routeId]
    );
  };

  // Filter and sort routes
  const filteredRoutes = useMemo(() => {
    return routes.filter(route => {
      const _searchMatch = searchTerm.toLowerCase() === '' ||
        route.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.to.toLowerCase().includes(searchTerm.toLowerCase());

      // City filters
      const _fromCityMatch = !fromCity || route.from === fromCity;
      const _toCityMatch = !toCity || route.to === toCity;

      // Price range filter
      const _priceMatch = parseFloat(route.price.toString()) >= priceRange[0] && 
                        parseFloat(route.price.toString()) <= priceRange[1];

      // Vehicle type filter
      const _vehicleTypeMatch = selectedVehicleTypes.length === 0 ||
        selectedVehicleTypes.some(type => route.vehicleTypes.includes(type));

      // Amenities filter
      const _amenitiesMatch = selectedAmenities.length === 0 ||
        selectedAmenities.every(amenity => route.amenities.includes(amenity));

      // Favorites filter
      const _favoritesMatch = !showFavoritesOnly || isFavorite(route.id);

      return _searchMatch && _fromCityMatch && _toCityMatch && _priceMatch &&
        _vehicleTypeMatch && _amenitiesMatch && _favoritesMatch;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return parseFloat(a.price.toString()) - parseFloat(b.price.toString());
        case 'price-desc':
          return parseFloat(b.price.toString()) - parseFloat(a.price.toString());
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        case 'duration':
          return a.duration.localeCompare(b.duration);
        case 'rating':
          return getAverageRating(b.id) - getAverageRating(a.id);
        default:
          return 0;
      }
    });
  }, [
    searchTerm,
    fromCity,
    toCity,
    priceRange,
    selectedVehicleTypes,
    selectedAmenities,
    showFavoritesOnly,
    sortBy,
    isFavorite,
    getAverageRating
  ]);

  // Reset filters
  const resetFilters = () => {
    setFromCity('');
    setToCity('');
    setSearchTerm('');
    setPriceRange([1000, 4000]);
    setSortBy('price-asc');
    setShowFavoritesOnly(false);
    setSelectedVehicleTypes([]);
    setSelectedAmenities([]);
  };

  // Handle price range changes
  const _handleMinPriceChange = (_e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(_e.target.value);
    setPriceRange([value, priceRange[1]]);
  };

  const _handleMaxPriceChange = (_e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(_e.target.value);
    setPriceRange([priceRange[0], value]);
  };

  // Handle view mode toggle
  const _toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'map' : 'grid');
  };

  // Handle route selection
  const openRouteDetails = (routeId: number) => {
    setSelectedRoute(routeId);
  };

  const _closeRouteDetails = () => {
    setSelectedRoute(null);
  };

  // Get selected route data
  const selectedRouteData = selectedRoute !== null
    ? routes.find(route => route.id === selectedRoute)
    : null;

  // Get data for routes being compared
  const comparisonRoutesData = routes.filter(route => compareRoutes.includes(route.id));

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Routes</h1>
        <div className="flex space-x-2">
          {compareRoutes.length > 0 && (
            <_Button
              variant="outline"
              onClick={() => setShowComparison(!showComparison)}
              className="text-sm flex items-center"
            >
              <CheckCircle2 className="h-4 w-4 mr-1" />
              {showComparison ? 'Hide Comparison' : `Compare (${compareRoutes.length})`}
            </_Button>
          )}

          <_Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="text-sm flex items-center"
          >
            <Filter className="h-4 w-4 mr-1" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </_Button>

          <_Button
            variant="outline"
            onClick={_toggleViewMode}
            className="text-sm flex items-center"
          >
            {viewMode === 'grid' ? (
              <>
                <Map className="h-4 w-4 mr-1" />
                Map View
              </>
            ) : (
              <>
                <Car className="h-4 w-4 mr-1" />
                Grid View
              </>
            )}
          </_Button>
        </div>
      </div>

      {/* Comparison View */}
      {showComparison && compareRoutes.length > 0 && (
        <Card className="mb-6 p-4 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Route Comparison</h2>
            <_Button
              variant="outline"
              size="sm"
              onClick={() => {
                setShowComparison(false);
                setCompareRoutes([]);
              }}
            >
              Clear All
            </_Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-2 border-b font-medium">Feature</th>
                  {comparisonRoutesData.map((route: Route): JSX.Element => (
                    <th key={`header-${route.id}`} className="text-left p-2 border-b font-medium">
                      {route.from} to {route.to}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-b">Price</td>
                  {comparisonRoutesData.map((route: Route): JSX.Element => (
                    <td key={`price-${route.id}`} className="p-2 border-b font-semibold text-primary">
                      {route.price}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2 border-b">Distance</td>
                  {comparisonRoutesData.map((route: Route): JSX.Element => (
                    <td key={`distance-${route.id}`} className="p-2 border-b">
                      {route.distance}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2 border-b">Duration</td>
                  {comparisonRoutesData.map((route: Route): JSX.Element => (
                    <td key={`duration-${route.id}`} className="p-2 border-b">
                      {route.duration}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2 border-b">Vehicle Types</td>
                  {comparisonRoutesData.map((route: Route): JSX.Element => (
                    <td key={`vehicle-${route.id}`} className="p-2 border-b">
                      {route.vehicleTypes.map((type: VehicleType): JSX.Element => (
                        <span key={`${route.id}-${type}`} className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                          {type}
                        </span>
                      ))}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2 border-b">Amenities</td>
                  {comparisonRoutesData.map((route: Route): JSX.Element => (
                    <td key={`amenities-${route.id}`} className="p-2 border-b">
                      {route.amenities.slice(0, 3).map((amenity: Amenity): JSX.Element => (
                        <span key={`${route.id}-${amenity}`} className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                          {amenity}
                        </span>
                      ))}
                      {route.amenities.length > 3 && (
                        <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                          +{route.amenities.length - 3}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2 border-b">Rating</td>
                  {comparisonRoutesData.map((route: Route): JSX.Element => (
                    <td key={`rating-${route.id}`} className="p-2 border-b">
                      {getAverageRating(route.id).toFixed(1)} / 5
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2">Reviews</td>
                  {comparisonRoutesData.map((route: Route): JSX.Element => (
                    <td key={`reviews-${route.id}`} className="p-2">
                      {route.reviews.length} reviews
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2"></td>
                  {comparisonRoutesData.map((route: Route): JSX.Element => (
                    <td key={`actions-${route.id}`} className="p-2">
                      <Link
                        href={`/booking?from=${route.from}&to=${route.to}`}
                        className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary/90 transition-colors inline-block"
                      >
                        Book Now
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Search and filters */}
      <Card className={`mb-6 p-4 transition-all duration-300 ${showFilters ? 'max-h-[800px]' : 'max-h-16'} overflow-hidden`}>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search for routes or destinations..."
            value={searchTerm}
            onChange={(_e) => setSearchTerm(_e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">From City</label>
              <select
                value={fromCity}
                onChange={(_e) => setFromCity(_e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Any City</option>
                {cities.map(city => (
                  <option key={`from-${city}`} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">To City</label>
              <select
                value={toCity}
                onChange={(_e) => setToCity(_e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Any City</option>
                {cities.map(city => (
                  <option key={`to-${city}`} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Min Price</label>
              <input
                type="range"
                min="1000"
                max="4000"
                step="100"
                value={priceRange[0]}
                onChange={_handleMinPriceChange}
                className="w-full"
              />
              <div className="text-xs text-gray-600 mt-1">₹{priceRange[0]}</div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Max Price</label>
              <input
                type="range"
                min="1000"
                max="4000"
                step="100"
                value={priceRange[1]}
                onChange={_handleMaxPriceChange}
                className="w-full"
              />
              <div className="text-xs text-gray-600 mt-1">₹{priceRange[1]}</div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(_e) => setSortBy(_e.target.value as 'price-asc' | 'price-desc' | 'distance' | 'duration' | 'rating')}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="distance">Distance</option>
                <option value="duration">Duration</option>
                <option value="rating">Rating: High to Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Vehicle Type</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {_allVehicleTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => _toggleVehicleType(type)}
                    className={`text-xs px-2 py-1 rounded-full ${
                      selectedVehicleTypes.includes(type)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Amenities</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {_allAmenities.map(amenity => (
                  <button
                    key={amenity}
                    onClick={() => _toggleAmenity(amenity)}
                    className={`text-xs px-2 py-1 rounded-full ${
                      selectedAmenities.includes(amenity)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="favoritesOnly"
                  checked={showFavoritesOnly}
                  onChange={(_e) => setShowFavoritesOnly(_e.target.checked)}
                  className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                />
                <label htmlFor="favoritesOnly" className="ml-2 block text-sm">
                  Saved Routes Only
                </label>
              </div>

              <_Button
                variant="outline"
                className="text-sm text-gray-600"
                onClick={resetFilters}
              >
                Reset Filters
              </_Button>
            </div>
          </div>
        )}
      </Card>

      {/* Results count */}
      <div className="mb-4 text-sm text-gray-600">
        Found {filteredRoutes.length} routes
      </div>

      {/* Routes view (grid or map) */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredRoutes.map((route: Route) => (
            <RouteCard
              key={route.id}
              route={route}
              onRouteSelect={openRouteDetails}
              onToggleFavorite={toggleFavorite}
              onToggleComparison={_toggleRouteComparison}
              isCompared={compareRoutes.includes(route.id)}
              isFavorite={isFavorite(route.id)}
            />
          ))}
        </div>
      ) : (
        <div className="h-[600px] mb-8 rounded-lg overflow-hidden border">
          <_MapView routes={filteredRoutes} onRouteSelect={openRouteDetails} />
        </div>
      )}

      {/* Empty state */}
      {filteredRoutes.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-1">No routes found</h3>
          <p className="text-sm text-gray-500 mb-4">Try adjusting your filters or search term</p>
          <_Button variant="outline" onClick={resetFilters}>
            Reset Filters
          </_Button>
        </div>
      )}

      {/* Route details modal */}
      {selectedRouteData && (
        <RouteDetails
          route={selectedRouteData}
          isOpen={selectedRoute !== null}
          onClose={_closeRouteDetails}
          onFavoriteToggle={toggleFavorite}
          isFavorite={isFavorite(selectedRouteData.id)}
        />
      )}
    </div>
  );
}

// Main page component that wraps the content with Suspense
export default function RoutesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50 py-6">
        <Suspense fallback={
          <div className="container mx-auto px-4 flex justify-center py-20">
            <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <RoutesContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
