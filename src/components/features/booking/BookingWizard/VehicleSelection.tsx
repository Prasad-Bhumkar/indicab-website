"use client";

import React, { useState, useEffect } from 'react';

import { Car } from 'lucide-react';

import type { BookingFormData } from ".";

// Placeholder vehicle data
const vehicles = [
    {
        id: 'tiago',
        name: 'Tata Tiago',
        type: 'Hatchback',
        capacity: 4,
        luggage: 'Small',
        price: 0, // Base price, will be calculated based on route
        image: '/images/cars/tata-tiago.png',
        features: ['Air Conditioning', 'Music System']
    },
    {
        id: 'dzire',
        name: 'Maruti Suzuki Swift Dzire',
        type: 'Sedan',
        capacity: 4,
        luggage: 'Medium',
        price: 0,
        image: '/images/cars/swift-dzire.png',
        features: ['Air Conditioning', 'Music System', 'Comfortable Seats']
    },
    {
        id: 'ertiga',
        name: 'Maruti Suzuki Ertiga',
        type: 'MPV',
        capacity: 7,
        luggage: 'Large',
        price: 0,
        image: '/images/cars/ertiga.png',
        features: ['Air Conditioning', 'Music System', 'Extra Space', 'Comfortable Seats']
    },
    {
        id: 'innova',
        name: 'Toyota Innova Crysta',
        type: 'SUV',
        capacity: 7,
        luggage: 'X-Large',
        price: 0,
        image: '/images/cars/innova.png',
        features: ['Air Conditioning', 'Music System', 'Premium Interiors', 'Extra Space', 'Comfortable Seats']
    }
];

interface VehicleSelectionProps {
    formData: BookingFormData;
    updateFormData: (data: Partial<BookingFormData>) => void;
    setIsValid: (isValid: boolean) => void;
}

export default function VehicleSelection({
    formData,
    updateFormData,
    setIsValid
}: VehicleSelectionProps): JSX.Element {
    const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

    // Initialize vehicles with prices based on route
    const _vehiclesWithPrices = vehicles.map(vehicle => {
        let priceMultiplier = 1.0;
        switch (vehicle.id) {
            case 'tiago':
                priceMultiplier = 1.0;
                break;
            case 'dzire':
                priceMultiplier = 1.15;
                break;
            case 'ertiga':
                priceMultiplier = 1.45;
                break;
            case 'innova':
                priceMultiplier = 1.85;
                break;
            default:
                priceMultiplier = 1.0;
        }

        return {
            ...vehicle,
            price: Math.round(formData.basePrice * priceMultiplier)
        };
    });

    // Handle vehicle selection
    const _handleVehicleSelect = (vehicleId: string, price: number) => {
        setSelectedVehicle(vehicleId);
        updateFormData({
            vehicleId,
            vehicleType: vehicles.find(_v => _v.id === vehicleId)?.type || '',
            basePrice: price,
            tax: Math.round(price * 0.05),
            totalPrice: Math.round(price * 1.05)
        });
        setIsValid(true);
    };

    // Check if there's a pre-selected vehicle
    useEffect(() => {
        if (formData.vehicleId) {
            setSelectedVehicle(formData.vehicleId);
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [formData.vehicleId]);

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Select Vehicle
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
                Choose a vehicle that suits your needs
            </p>

            <div className="grid gap-4">
                {_vehiclesWithPrices.map((vehicle): JSX.Element => (
                    <div
                        key={vehicle.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedVehicle === vehicle.id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                        onClick={() => _handleVehicleSelect(vehicle.id, vehicle.price)}
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="md:w-1/4 flex justify-center">
                                <img
                                    src={vehicle.image}
                                    alt={vehicle.name}
                                    className="h-24 object-contain"
                                />
                            </div>
                            <div className="md:w-3/4 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{vehicle.name}</h4>
                                        <span className="font-bold text-primary">₹{vehicle.price}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{vehicle.type}</p>
                                    <div className="flex gap-4 text-sm text-gray-700 dark:text-gray-300">
                                        <span className="flex items-center gap-1">
                                            <Car className="h-4 w-4" />
                                            {vehicle.capacity} Seats
                                        </span>
                                        <span>Luggage: {vehicle.luggage}</span>
                                    </div>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {vehicle.features.map((_feature, _index): JSX.Element => (
                                        <span
                                            key={_index}
                                            className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded"
                                        >
                                            {_feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
