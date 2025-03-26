"use client";

import React, { useState, useEffect } from 'react';
import { MapPin, RotateCw, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingFormData } from './index';

// Popular cities for autocomplete
const popularCities = [
  'Mumbai',
  'Pune',
  'Lonavala',
  'Mahabaleshwar',
  'Shirdi',
  'Nashik',
  'Alibaug',
  'Lavasa',
  'Aurangabad',
  'Matheran',
];

// Popular routes
const popularRoutes = [
  {
    from: 'Mumbai',
    to: 'Pune',
    distance: '150 km',
    time: '3 hours',
    price: 2499,
  },
  {
    from: 'Pune',
    to: 'Lonavala',
    distance: '65 km',
    time: '1.5 hours',
    price: 1399,
  },
  {
    from: 'Pune',
    to: 'Mahabaleshwar',
    distance: '120 km',
    time: '3 hours',
    price: 2299,
  },
  {
    from: 'Mumbai',
    to: 'Alibaug',
    distance: '95 km',
    time: '2.5 hours',
    price: 1999,
  },
];

interface RouteSelectionProps {
  formData: BookingFormData;
  updateFormData: (data: Partial<BookingFormData>) => void;
  setIsValid: (isValid: boolean) => void;
}

export default function RouteSelection({
  formData,
  updateFormData,
  setIsValid
}: RouteSelectionProps) {
  const [pickupSuggestions, setPickupSuggestions] = useState<string[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<string[]>([]);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  const [selectedPopularRoute, setSelectedPopularRoute] = useState<typeof popularRoutes[0] | null>(null);

  // Get suggestions based on input
  const getSuggestions = (input: string): string[] => {
    if (!input) return [];
    const inputLower = input.toLowerCase();
    return popularCities.filter(city =>
      city.toLowerCase().includes(inputLower)
    );
  };

  // Handle pickup input change
  const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFormData({ pickup: value });
    setPickupSuggestions(getSuggestions(value));
    setShowPickupSuggestions(true);

    // Reset popular route if pickup changes
    if (selectedPopularRoute && selectedPopularRoute.from !== value) {
      setSelectedPopularRoute(null);
    }

    validateForm(value, formData.dropoff);
  };

  // Handle dropoff input change
  const handleDropoffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFormData({ dropoff: value });
    setDropoffSuggestions(getSuggestions(value));
    setShowDropoffSuggestions(true);

    // Reset popular route if dropoff changes
    if (selectedPopularRoute && selectedPopularRoute.to !== value) {
      setSelectedPopularRoute(null);
    }

    validateForm(formData.pickup, value);
  };

  // Select suggestion for pickup
  const selectPickupSuggestion = (suggestion: string) => {
    updateFormData({ pickup: suggestion });
    setShowPickupSuggestions(false);

    // Check if a popular route matches
    checkForPopularRoute(suggestion, formData.dropoff);
    validateForm(suggestion, formData.dropoff);
  };

  // Select suggestion for dropoff
  const selectDropoffSuggestion = (suggestion: string) => {
    updateFormData({ dropoff: suggestion });
    setShowDropoffSuggestions(false);

    // Check if a popular route matches
    checkForPopularRoute(formData.pickup, suggestion);
    validateForm(formData.pickup, suggestion);
  };

  // Check if input matches a popular route
  const checkForPopularRoute = (pickup: string, dropoff: string) => {
    if (!pickup || !dropoff) return;

    const matchedRoute = popularRoutes.find(
      route => route.from === pickup && route.to === dropoff
    );

    if (matchedRoute) {
      setSelectedPopularRoute(matchedRoute);
      updateFormData({
        basePrice: matchedRoute.price,
        tax: Math.round(matchedRoute.price * 0.05),
        totalPrice: Math.round(matchedRoute.price * 1.05)
      });
    } else {
      setSelectedPopularRoute(null);
    }
  };

  // Swap pickup and dropoff locations
  const swapLocations = () => {
    const newPickup = formData.dropoff;
    const newDropoff = formData.pickup;

    updateFormData({
      pickup: newPickup,
      dropoff: newDropoff
    });

    checkForPopularRoute(newPickup, newDropoff);
  };

  // Toggle round trip option
  const toggleRoundTrip = () => {
    updateFormData({ isRoundTrip: !formData.isRoundTrip });
  };

  // Validate form inputs
  const validateForm = (pickup: string, dropoff: string) => {
    const isValid = !!pickup && !!dropoff && pickup !== dropoff;
    setIsValid(isValid);
  };

  // Initialize validation on component mount
  useEffect(() => {
    validateForm(formData.pickup, formData.dropoff);
  }, []);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
        {bookingSteps[0].title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400">
        {bookingSteps[0].description}
      </p>

      <div className="grid gap-6">
        {/* Route Selection */}
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="flex-1 relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Pickup Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.pickup}
                onChange={handlePickupChange}
                onFocus={() => setShowPickupSuggestions(true)}
                onBlur={() => setTimeout(() => setShowPickupSuggestions(false), 100)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Enter pickup city"
              />

              {/* Suggestions dropdown */}
              {showPickupSuggestions && pickupSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
                  {pickupSuggestions.map((suggestion) => (
                    <div
                      key={suggestion}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-200"
                      onMouseDown={() => selectPickupSuggestion(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Swap button */}
          <div className="flex items-center justify-center mt-6 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={swapLocations}
              className="rounded-full h-10 w-10"
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Drop-off Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.dropoff}
                onChange={handleDropoffChange}
                onFocus={() => setShowDropoffSuggestions(true)}
                onBlur={() => setTimeout(() => setShowDropoffSuggestions(false), 100)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Enter destination city"
              />

              {/* Suggestions dropdown */}
              {showDropoffSuggestions && dropoffSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
                  {dropoffSuggestions.map((suggestion) => (
                    <div
                      key={suggestion}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-200"
                      onMouseDown={() => selectDropoffSuggestion(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Round trip option */}
        <div className="flex items-center">
          <input
            id="roundTrip"
            name="roundTrip"
            type="checkbox"
            checked={formData.isRoundTrip}
            onChange={toggleRoundTrip}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded"
          />
          <label htmlFor="roundTrip" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Round Trip
          </label>
        </div>

        {/* Popular routes */}
        <div className="mt-8">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Popular Routes
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularRoutes.map((route) => (
              <div
                key={`${route.from}-${route.to}`}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedPopularRoute &&
                  selectedPopularRoute.from === route.from &&
                  selectedPopularRoute.to === route.to
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => {
                  updateFormData({
                    pickup: route.from,
                    dropoff: route.to,
                    basePrice: route.price,
                    tax: Math.round(route.price * 0.05),
                    totalPrice: Math.round(route.price * 1.05)
                  });
                  setSelectedPopularRoute(route);
                  setIsValid(true);
                }}
              >
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800 dark:text-gray-200">{route.from} → {route.to}</span>
                  <span className="text-primary font-medium">₹{route.price}</span>
                </div>
                <div className="flex mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <span>{route.distance}</span>
                  <span className="mx-2">•</span>
                  <span>{route.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Route details if a route is selected */}
        {selectedPopularRoute && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Route Details
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Distance</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{selectedPopularRoute.distance}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Estimated Time</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{selectedPopularRoute.time}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Base Fare</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">₹{selectedPopularRoute.price}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Total (incl. taxes)</p>
                <p className="font-medium text-primary">₹{Math.round(selectedPopularRoute.price * 1.05)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
