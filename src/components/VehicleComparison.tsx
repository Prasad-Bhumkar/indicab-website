"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  Users,
  Briefcase,
  Fuel,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
  SearchIcon,
  Filter,
  ShieldCheck,
  Zap,
  Truck,
  Clock,
  Star,
  AlertTriangle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

interface VehicleFeature {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
}

interface Vehicle {
  id: string;
  name: string;
  type: string;
  image: string;
  passengers: number;
  luggage: 'Small' | 'Medium' | 'Large' | 'X-Large';
  fuel: 'Petrol' | 'Diesel' | 'CNG' | 'Electric';
  pricePerKm: number;
  transmission: 'Manual' | 'Automatic';
  ac: boolean;
  features: string[];
  recommended: boolean;
  rating: number;
  reviewCount: number;
}

const vehicles: Vehicle[] = [
  {
    id: 'tiago',
    name: 'Tata Tiago',
    type: 'Hatchback',
    image: '/images/cars/tata-tiago.png',
    passengers: 4,
    luggage: 'Small',
    fuel: 'Petrol',
    pricePerKm: 12,
    transmission: 'Manual',
    ac: true,
    features: ['Air Conditioning', 'Music System', 'Power Windows'],
    recommended: false,
    rating: 4.2,
    reviewCount: 176
  },
  {
    id: 'swift-dzire',
    name: 'Maruti Suzuki Swift Dzire',
    type: 'Sedan',
    image: '/images/cars/swift-dzire.png',
    passengers: 4,
    luggage: 'Medium',
    fuel: 'Petrol',
    pricePerKm: 14,
    transmission: 'Manual',
    ac: true,
    features: ['Air Conditioning', 'Music System', 'Power Windows', 'Central Locking', 'USB Charging'],
    recommended: true,
    rating: 4.5,
    reviewCount: 320
  },
  {
    id: 'hyundai-aura',
    name: 'Hyundai Aura',
    type: 'Sedan',
    image: '/images/cars/hyundai-aura.png',
    passengers: 4,
    luggage: 'Medium',
    fuel: 'Petrol',
    pricePerKm: 13,
    transmission: 'Automatic',
    ac: true,
    features: ['Air Conditioning', 'Music System', 'Power Windows', 'Central Locking', 'Rear AC Vents'],
    recommended: false,
    rating: 4.3,
    reviewCount: 215
  },
  {
    id: 'ertiga',
    name: 'Maruti Suzuki Ertiga',
    type: 'MPV',
    image: '/images/cars/ertiga.png',
    passengers: 7,
    luggage: 'Large',
    fuel: 'CNG',
    pricePerKm: 16,
    transmission: 'Manual',
    ac: true,
    features: ['Air Conditioning', 'Music System', 'Power Windows', 'Central Locking', 'Rear AC Vents', 'Third Row Seating'],
    recommended: true,
    rating: 4.4,
    reviewCount: 290
  },
  {
    id: 'innova',
    name: 'Toyota Innova Crysta',
    type: 'SUV',
    image: '/images/cars/innova.png',
    passengers: 7,
    luggage: 'X-Large',
    fuel: 'Diesel',
    pricePerKm: 22,
    transmission: 'Automatic',
    ac: true,
    features: ['Air Conditioning', 'Music System', 'Power Windows', 'Central Locking', 'Rear AC Vents', 'Third Row Seating', 'Leather Seats', 'Premium Interiors'],
    recommended: false,
    rating: 4.7,
    reviewCount: 410
  }
];

const allFeatures: VehicleFeature[] = [
  { id: 'passengers', name: 'Seating Capacity', icon: Users, description: 'Maximum number of passengers the vehicle can accommodate' },
  { id: 'luggage', name: 'Luggage Space', icon: Briefcase, description: 'Amount of space available for luggage' },
  { id: 'fuel', name: 'Fuel Type', icon: Fuel, description: 'Type of fuel used by the vehicle' },
  { id: 'transmission', name: 'Transmission', icon: Zap, description: 'Type of transmission system' },
  { id: 'ac', name: 'Air Conditioning', icon: ShieldCheck, description: 'Availability of air conditioning' },
  { id: 'price', name: 'Price per KM', icon: Truck, description: 'Cost per kilometer of travel' },
  { id: 'rating', name: 'User Rating', icon: Star, description: 'Rating based on user reviews' },
];

interface VehicleComparisonProps {
  initialDistance?: number;
  preselectedVehicleIds?: string[];
}

export function VehicleComparison({
  initialDistance = 100,
  preselectedVehicleIds = []
}: VehicleComparisonProps) {
  const [distance, setDistance] = useState(initialDistance);
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>(
    preselectedVehicleIds.length > 0
      ? preselectedVehicleIds
      : vehicles.filter(v => v.recommended).map(v => v.id)
  );
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter vehicles based on type and search query
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesType = !filterType || vehicle.type === filterType;
    const matchesSearch = !searchQuery ||
      vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Handle vehicle selection
  const toggleVehicleSelection = (vehicleId: string) => {
    if (selectedVehicles.includes(vehicleId)) {
      setSelectedVehicles(selectedVehicles.filter(id => id !== vehicleId));
    } else {
      if (selectedVehicles.length < 3) {
        setSelectedVehicles([...selectedVehicles, vehicleId]);
      } else {
        alert('You can compare up to 3 vehicles at a time');
      }
    }
  };

  // Clear all selected vehicles
  const clearSelection = () => {
    setSelectedVehicles([]);
  };

  // Get the selected vehicles data
  const selectedVehiclesData = vehicles.filter(vehicle =>
    selectedVehicles.includes(vehicle.id)
  );

  // Get unique vehicle types for filter
  const vehicleTypes = Array.from(new Set(vehicles.map(vehicle => vehicle.type)));

  // Calculate price based on distance
  const calculatePrice = (pricePerKm: number) => {
    return Math.round(pricePerKm * distance);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Compare Vehicles
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find the perfect vehicle for your Maharashtra tour by comparing features,
            capacity, and prices side by side.
          </p>
        </div>

        {/* Distance slider */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
            Estimate journey distance
          </h3>
          <div className="max-w-3xl mx-auto">
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={distance}
              onChange={(e) => setDistance(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">10 km</span>
              <span className="text-sm font-medium text-primary">{distance} km</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">500 km</span>
            </div>
            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Common distances:
              <button
                className="ml-2 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                onClick={() => setDistance(65)}
              >
                Pune-Lonavala (65 km)
              </button>
              <button
                className="ml-2 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                onClick={() => setDistance(150)}
              >
                Mumbai-Pune (150 km)
              </button>
              <button
                className="ml-2 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                onClick={() => setDistance(170)}
              >
                Pune-Mahabaleshwar (170 km)
              </button>
            </div>
          </div>
        </div>

        {/* Comparison table */}
        {selectedVehicles.length > 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-4 border-b border-gray-200 dark:border-gray-700">
              <div className="p-4 text-left font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900">
                Features
              </div>
              {selectedVehiclesData.map((vehicle) => (
                <div key={vehicle.id} className="p-4 text-center relative">
                  <button
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    onClick={() => toggleVehicleSelection(vehicle.id)}
                    title="Remove from comparison"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="h-20 mx-auto object-contain"
                  />
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 mt-2">
                    {vehicle.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{vehicle.type}</p>
                  {vehicle.recommended && (
                    <span className="inline-block mt-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
              ))}
              {/* Empty columns if less than 3 vehicles */}
              {[...Array(3 - selectedVehiclesData.length)].map((_, index) => (
                <div key={`empty-${index}`} className="p-4 text-center border-l border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                  <div className="h-20 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                    <button
                      className="text-primary hover:text-primary/80 text-sm font-medium"
                      onClick={() => {
                        document.getElementById('vehicle-selector')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      + Add Vehicle
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Table body */}
            <div>
              {/* Base features */}
              {allFeatures.map((feature) => {
                const FeatureIcon = feature.icon;
                return (
                  <div key={feature.id} className="grid grid-cols-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="p-4 flex items-center bg-gray-50 dark:bg-gray-900">
                      <FeatureIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <div className="font-medium text-gray-800 dark:text-gray-200">{feature.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{feature.description}</div>
                      </div>
                    </div>
                    {selectedVehiclesData.map((vehicle) => {
                      let featureValue: React.ReactNode;

                      switch(feature.id) {
                        case 'passengers':
                          featureValue = (
                            <div className="flex items-center justify-center gap-1">
                              <Users className="h-4 w-4 text-gray-400" />
                              <span>{vehicle.passengers} Passengers</span>
                            </div>
                          );
                          break;
                        case 'luggage':
                          featureValue = vehicle.luggage;
                          break;
                        case 'fuel':
                          featureValue = (
                            <div className="flex items-center justify-center gap-1">
                              <Fuel className="h-4 w-4 text-gray-400" />
                              <span>{vehicle.fuel}</span>
                            </div>
                          );
                          break;
                        case 'transmission':
                          featureValue = vehicle.transmission;
                          break;
                        case 'ac':
                          featureValue = vehicle.ac ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-red-500 mx-auto" />
                          );
                          break;
                        case 'price':
                          featureValue = (
                            <div>
                              <div className="font-bold text-primary">
                                ₹{calculatePrice(vehicle.pricePerKm)}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                ₹{vehicle.pricePerKm}/km × {distance}km
                              </div>
                            </div>
                          );
                          break;
                        case 'rating':
                          featureValue = (
                            <div>
                              <div className="flex items-center justify-center">
                                <span className="font-medium mr-1">{vehicle.rating}</span>
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                ({vehicle.reviewCount} reviews)
                              </div>
                            </div>
                          );
                          break;
                        default:
                          featureValue = '-';
                      }

                      return (
                        <div key={`${vehicle.id}-${feature.id}`} className="p-4 text-center text-gray-800 dark:text-gray-200">
                          {featureValue}
                        </div>
                      );
                    })}
                    {/* Empty columns if less than 3 vehicles */}
                    {[...Array(3 - selectedVehiclesData.length)].map((_, index) => (
                      <div key={`empty-${feature.id}-${index}`} className="p-4 text-center bg-gray-50/50 dark:bg-gray-900/50" />
                    ))}
                  </div>
                );
              })}

              {/* Additional features */}
              <div className="grid grid-cols-4 border-b border-gray-200 dark:border-gray-700">
                <div className="p-4 bg-gray-50 dark:bg-gray-900">
                  <div className="font-medium text-gray-800 dark:text-gray-200">Additional Features</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Other features and amenities
                  </div>
                </div>
                {selectedVehiclesData.map((vehicle) => (
                  <div key={`${vehicle.id}-features`} className="p-4 text-center text-gray-800 dark:text-gray-200">
                    <ul className="space-y-1 text-sm">
                      {vehicle.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-500 mr-1 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {/* Empty columns if less than 3 vehicles */}
                {[...Array(3 - selectedVehiclesData.length)].map((_, index) => (
                  <div key={`empty-features-${index}`} className="p-4 text-center bg-gray-50/50 dark:bg-gray-900/50" />
                ))}
              </div>

              {/* Book now row */}
              <div className="grid grid-cols-4 bg-gray-50 dark:bg-gray-900">
                <div className="p-4">
                  <div className="font-medium text-gray-800 dark:text-gray-200">Book Now</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Proceed to booking
                  </div>
                </div>
                {selectedVehiclesData.map((vehicle) => (
                  <div key={`${vehicle.id}-book`} className="p-4 text-center">
                    <Link href={`/booking-wizard?vehicle=${vehicle.id}&distance=${distance}`}>
                      <Button className="bg-primary hover:bg-primary/90 text-white">
                        Book {vehicle.name}
                      </Button>
                    </Link>
                  </div>
                ))}
                {/* Empty columns if less than 3 vehicles */}
                {[...Array(3 - selectedVehiclesData.length)].map((_, index) => (
                  <div key={`empty-book-${index}`} className="p-4 text-center bg-gray-50/50 dark:bg-gray-900/50" />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center">
            <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              No Vehicles Selected
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Please select at least one vehicle to compare features and prices.
            </p>
          </div>
        )}

        {/* Vehicle selector */}
        <div id="vehicle-selector" className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              Select vehicles to compare ({selectedVehicles.length}/3)
            </h3>

            <div className="flex gap-4 mt-4 sm:mt-0">
              {/* Search bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search vehicle..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Filter dropdown */}
              <div className="relative">
                <select
                  value={filterType || ''}
                  onChange={(e) => setFilterType(e.target.value || null)}
                  className="pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-primary focus:border-primary appearance-none"
                >
                  <option value="">All Types</option>
                  {vehicleTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Clear selection button */}
              {selectedVehicles.length > 0 && (
                <button
                  onClick={clearSelection}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Clear selection
                </button>
              )}
            </div>
          </div>

          {/* Vehicle grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVehicles.map((vehicle) => {
              const isSelected = selectedVehicles.includes(vehicle.id);
              return (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    isSelected ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => toggleVehicleSelection(vehicle.id)}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <div className={`w-5 h-5 rounded-full border ${
                        isSelected ? 'border-primary bg-primary' : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {isSelected && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{vehicle.name}</h4>
                        <span className="text-sm text-primary font-medium">₹{vehicle.pricePerKm}/km</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{vehicle.type}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-center">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="h-16 object-contain"
                    />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-y-1 gap-x-2 text-xs">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Users className="h-3 w-3 mr-1" /> {vehicle.passengers} Seats
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Briefcase className="h-3 w-3 mr-1" /> {vehicle.luggage}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Fuel className="h-3 w-3 mr-1" /> {vehicle.fuel}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Star className="h-3 w-3 mr-1" /> {vehicle.rating}
                    </div>
                  </div>
                  {vehicle.recommended && (
                    <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium flex items-center justify-center">
                      <Check className="h-3 w-3 mr-1" /> Recommended for {distance}km trips
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {filteredVehicles.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No vehicles match your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
