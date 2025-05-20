"use client";

import React, { useState, useMemo } from 'react';

import { motion } from 'framer-motion';
import {
    Users,
    Briefcase,
    Fuel,
    Check,
    Star
} from 'lucide-react';

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

const _vehicles: Vehicle[] = [
    // Vehicle data here...
];

interface VehicleComparisonProps {
    initialDistance?: number;
    preselectedVehicleIds?: string[];
}

export function VehicleComparison({
    preselectedVehicleIds = []
}: VehicleComparisonProps): JSX.Element {
    const [selectedVehicles, setSelectedVehicles] = useState<string[]>(preselectedVehicleIds);
    const [filterType, setFilterType] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Memoize filtered vehicles
    const filteredVehicles = useMemo(() => {
        return _vehicles.filter(vehicle => {
            const _matchesType = !filterType || vehicle.type === filterType;
            const _matchesSearch = !searchQuery ||
                vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                vehicle.type.toLowerCase().includes(searchQuery.toLowerCase());
            return _matchesType && _matchesSearch;
        });
    }, [filterType, searchQuery]);

    // Handle vehicle selection
    const _toggleVehicleSelection = (vehicleId: string) => {
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

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Compare Vehicles</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Find the perfect vehicle for your Maharashtra tour by comparing features, capacity, and prices side by side.</p>
                </div>

                {/* Vehicle selection grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredVehicles.map((vehicle): JSX.Element => (
                        <motion.div key={vehicle.id} className="p-4 border rounded-lg cursor-pointer transition-colors" onClick={() => _toggleVehicleSelection(vehicle.id)}>
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
