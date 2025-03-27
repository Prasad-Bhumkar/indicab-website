"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Briefcase,
  Fuel,
  Check,
  X,
  SearchIcon,
  Filter,
  Star,
  AlertTriangle
} from 'lucide-react';
import { Button } from '../../ui/button'; // Corrected import statement
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
  // Vehicle data here...
];

const allFeatures: VehicleFeature[] = [
  { id: 'passengers', name: 'Seating Capacity', icon: Users, description: 'Maximum number of passengers the vehicle can accommodate' },
  { id: 'luggage', name: 'Luggage Space', icon: Briefcase, description: 'Amount of space available for luggage' },
  { id: 'fuel', name: 'Fuel Type', icon: Fuel, description: 'Type of fuel used by the vehicle' },
  { id: 'transmission', name: 'Transmission', icon: Fuel, description: 'Type of transmission system' },
  { id: 'ac', name: 'Air Conditioning', icon: Check, description: 'Availability of air conditioning' },
  { id: 'price', name: 'Price per KM', icon: Fuel, description: 'Cost per kilometer of travel' },
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
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>(preselectedVehicleIds.length > 0 ? preselectedVehicleIds : vehicles.filter(v => v.recommended).map(v => v.id));
  const [filterType, setFilterType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter vehicles based on type and search query
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesType = !filterType || vehicle.type === filterType;
    const matchesSearch = !searchQuery || vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) || vehicle.type.toLowerCase().includes(searchQuery.toLowerCase());
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
  const selectedVehiclesData = vehicles.filter(vehicle => selectedVehicles.includes(vehicle.id));

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Compare Vehicles</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Find the perfect vehicle for your Maharashtra tour by comparing features, capacity, and prices side by side.</p>
        </div>

        {/* Vehicle selection grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVehicles.map((vehicle) => (
            <motion.div key={vehicle.id} className="p-4 border rounded-lg cursor-pointer transition-colors" onClick={() => toggleVehicleSelection(vehicle.id)}>
              <img src={vehicle.image} alt={vehicle.name} className="h-16 object-contain" />
              <h4 className="font-medium text-gray-900 dark:text-gray-100">{vehicle.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{vehicle.type}</p>
            </motion.div>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No vehicles match your search criteria</p>
          </div>
        )}
      </div>
    </section>
  );
}
