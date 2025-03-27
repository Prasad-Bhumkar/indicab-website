"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, X } from 'lucide-react';
import { Button } from '../../ui/button';
import { routes, Route } from '../../data/routes';
import { debounce } from 'lodash';

interface RouteSearchProps {
  className?: string;
}

const RouteSearch = ({ className = '' }: RouteSearchProps) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Route[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      if (!term || term.length < 2) {
        setSearchResults([]);
        return;
      }

      try {
        const normalizedTerm = term.toLowerCase();
        const results = routes.filter((route) =>
          route.from.toLowerCase().includes(normalizedTerm) ||
          route.to.toLowerCase().includes(normalizedTerm) ||
          `${route.from.toLowerCase()} to ${route.to.toLowerCase()}`.includes(normalizedTerm)
        ).slice(0, 6); // Limit to 6 results

        setSearchResults(results);
      } catch (error) {
        console.error('Error searching routes:', error);
        setSearchResults([]);
        alert('An error occurred while searching for routes. Please try again.'); // User feedback
      }
    }, 300),
    []
  );

  // Update search results when term changes
  useEffect(() => {
    if (!mounted) return;
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch, mounted]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  // Handle route selection
  const handleRouteSelect = (routeId: number) => {
    const route = searchResults.find(r => r.id === routeId);
    if (route) {
      // Generate a slug from route.from and route.to
      const slug = `${route.from.toLowerCase()}-to-${route.to.toLowerCase()}`.replace(/\s+/g, '-');
      router.push(`/oneway/${slug}`);
    }
    setShowResults(false);
    setSearchTerm('');
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setShowResults(false);
  };

  // Return a skeleton UI during SSR
  if (!mounted) {
    return (
      <div className={`relative ${className}`}>
        <div className="relative">
          <div className="w-full h-9 bg-white dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600"></div>
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
          <input
            aria-label="Search for routes"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for routes (e.g., Delhi to Mumbai)"
          className="w-full py-2 pl-10 pr-8 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary text-gray-800 dark:text-white"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-300" />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100" />
          </button>
        )}
      </div>

      {showResults && searchResults.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-[300px] overflow-y-auto">
          <div className="p-2">
            {searchResults.map((route) => (
              <button
                key={route.id}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200"
                onClick={() => handleRouteSelect(route.id)}
              >
                <MapPin className="h-4 w-4 text-primary" />
                <span>
                  <span className="font-medium">{route.from}</span>
                  <span className="text-gray-500 dark:text-gray-400"> to </span>
                  <span className="font-medium">{route.to}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {showResults && searchTerm.length >= 2 && searchResults.length === 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
          <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
            No routes found matching "{searchTerm}"
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteSearch;
