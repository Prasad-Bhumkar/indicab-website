"use client";

import { Button } from '@/components/ui/button';
import {
    Calendar,
    Car,
    CheckCircle2,
    ChevronDown,
    Clock,
    Route,
    Users
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useBookingContext } from '../../../context/BookingContext';
import { createBooking } from '../../../services/booking/api';

// Vehicle types with their base rates and capacity
const vehicles = [
    { id: 'sedan', name: 'Sedan', baseRate: 12, capacity: 4, image: '/images/sedan.png' },
    { id: 'suv', name: 'SUV', baseRate: 16, capacity: 6, image: '/images/suv.png' },
    { id: 'luxury', name: 'Luxury', baseRate: 22, capacity: 4, image: '/images/luxury.png' },
    { id: 'tempo', name: 'Tempo Traveller', baseRate: 18, capacity: 12, image: '/images/tempo.png' },
];

// Major Indian cities
const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
    'Pune', 'Jaipur', 'Ahmedabad', 'Surat', 'Lucknow', 'Kanpur',
    'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Patna',
    'Mysore', 'Pondicherry', 'Digha', 'Goa', 'Agra', 'Varanasi'
];

// Popular route distances (in km)
const routeDistances: { [key: string]: number } = {
    'Mumbai-Pune': 150,
    'Delhi-Jaipur': 280,
    'Bangalore-Mysore': 145,
    'Chennai-Pondicherry': 170,
    'Kolkata-Digha': 190,
    'Mumbai-Goa': 590,
    'Delhi-Agra': 230,
    'Bangalore-Hyderabad': 570,
    'Chennai-Bangalore': 350,
    'Mumbai-Nashik': 170,
    'Delhi-Varanasi': 820,
    'Hyderabad-Vijayawada': 270,
};

// Default distance for routes not in the predefined list (in km)
const _DEFAULT_DISTANCE = 200;

// Helper function to get route distance
const _getRouteDistance = (source: string, destination: string): number => {
    const _routeKey = `${source}-${destination}`;
    const _reverseRouteKey = `${destination}-${source}`;

    return routeDistances[_routeKey] || routeDistances[_reverseRouteKey] || _DEFAULT_DISTANCE;
};

// Utility function to format currency
const formatCurrency = (_amount: number): string => {
    return `₹${_amount.toLocaleString('en-IN')}`;
};

const PricingCalculator: React.FC<PricingCalculatorProps> = (props) => {
    const { dispatch } = useBookingContext();

    // Form state
    const [source, setSource] = useState('Mumbai');
    const [destination, setDestination] = useState('Pune');
    const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);
    const [isOneWay, setIsOneWay] = useState(true);
    const [passengers, setPassengers] = useState(2);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    // Results state
    const [distance, setDistance] = useState(0);
    const [baseFare, setBaseFare] = useState(0);
    const [tollCharges, setTollCharges] = useState(0);
    const [gst, setGst] = useState(0);
    const [totalFare, setTotalFare] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Calculate the fare when form inputs change
    useEffect(() => {
        // Get distance between cities
        const routeDistance = _getRouteDistance(source, destination);
        setDistance(routeDistance);

        // Calculate base fare (rate per km * distance)
        const calculatedBaseFare = selectedVehicle.baseRate * routeDistance;
        setBaseFare(calculatedBaseFare);

        // Estimate toll charges (approximately 5% of base fare)
        const estimatedTolls = Math.round(calculatedBaseFare * 0.05);
        setTollCharges(estimatedTolls);

        // GST (5% on transport services)
        const calculatedGST = Math.round((calculatedBaseFare + estimatedTolls) * 0.05);
        setGst(calculatedGST);

        // Total fare
        const calculatedTotal = calculatedBaseFare + estimatedTolls + calculatedGST;
        // If round trip, multiply by 1.8 (10% discount on return journey)
        const _finalTotal = isOneWay ? calculatedTotal : Math.round(calculatedTotal * 1.8);
        setTotalFare(_finalTotal);
    }, [source, destination, selectedVehicle, isOneWay]);

    // Set current date as default
    useEffect(() => {
        const current = new Date();
        const _year = current.getFullYear();
        const _month = String(current.getMonth() + 1).padStart(2, '0');
        const _day = String(current.getDate()).padStart(2, '0');
        setDate(`${_year}-${_month}-${_day}`);

        const _hours = String(current.getHours()).padStart(2, '0');
        const _minutes = String(current.getMinutes()).padStart(2, '0');
        setTime(`${_hours}:${_minutes}`);
    }, []);

    // Handle form submission
    const _handleCalculate = async (_e: React.FormEvent) => {
        _e.preventDefault();
        setShowResults(true);
        setIsBooking(true);
        setError(null);

        try {
            const _bookingData = {
                pickupLocation: source,
                dropLocation: destination,
                pickupDate: `${date}T${time}`,
                returnDate: isOneWay ? undefined : `${date}T${time}`,
                vehicleType: selectedVehicle.name,
                passengers: passengers,
                contactName: 'John Doe', // Placeholder, should be from user input or auth context
                contactPhone: '+911234567890', // Placeholder
                contactEmail: 'john.doe@example.com', // Placeholder
                isRoundTrip: !isOneWay,
                paymentMethod: 'card', // Placeholder, should be selectable by user
                promoCode: undefined,
                fare: totalFare,
                customerId: 'current-user-id', // Replace with actual user ID from auth context
                status: 'pending' as const
            };

            const _createdBooking = await createBooking(_bookingData);
            dispatch({ type: 'SET_BOOKING', payload: _createdBooking });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Booking failed');
        } finally {
            setIsBooking(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Form section */}
            <div className="p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-green-800 mb-6">Estimate Your Fare</h2>

                <form onSubmit={_handleCalculate}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
                                Pickup City
                            </label>
                            <div className="relative">
                                <select
                                    id="source"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                                    value={source}
                                    onChange={(_e) => setSource(_e.target.value)}
                                    required
                                >
                                    {cities.map((city): JSX.Element => (
                                        <option key={`source-${city}`} value={city}>{city}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                                Drop City
                            </label>
                            <div className="relative">
                                <select
                                    id="destination"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                                    value={destination}
                                    onChange={(_e) => setDestination(_e.target.value)}
                                    required
                                >
                                    {cities.map((city): JSX.Element => (
                                        <option key={`dest-${city}`} value={city}>{city}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Journey Type
                        </label>
                        <div className="flex border border-gray-300 rounded-md overflow-hidden">
                            <button
                                type="button"
                                className={`flex-1 py-2 px-4 text-center ${isOneWay ? 'bg-green-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                onClick={() => setIsOneWay(true)}
                            >
                                One Way
                            </button>
                            <button
                                type="button"
                                className={`flex-1 py-2 px-4 text-center ${!isOneWay ? 'bg-green-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                onClick={() => setIsOneWay(false)}
                            >
                                Round Trip
                            </button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Vehicle Type
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {vehicles.map((vehicle): JSX.Element => (
                                <div
                                    key={vehicle.id}
                                    className={`border rounded-md p-2 cursor-pointer flex flex-col items-center justify-center transition-colors ${selectedVehicle.id === vehicle.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'
                                        }`}
                                    onClick={() => setSelectedVehicle(vehicle)}
                                >
                                    <Car className="h-8 w-8 mb-1 text-green-700" />
                                    <span className="text-sm font-medium">{vehicle.name}</span>
                                    <span className="text-xs text-gray-500">{vehicle.capacity} seats</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                                Date
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="date"
                                    id="date"
                                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    value={date}
                                    onChange={(_e) => setDate(_e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                                Time
                            </label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="time"
                                    id="time"
                                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    value={time}
                                    onChange={(_e) => setTime(_e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">
                                Passengers
                            </label>
                            <div className="relative">
                                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="number"
                                    id="passengers"
                                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    value={passengers}
                                    onChange={(_e) => setPassengers(Math.max(1, Math.min(parseInt(_e.target.value) || 1, selectedVehicle.capacity)))}
                                    min="1"
                                    max={selectedVehicle.capacity}
                                    required
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Max capacity: {selectedVehicle.capacity} passengers
                            </p>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 text-red-600 font-medium">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-md font-medium transition-colors"
                        disabled={isBooking}
                    >
                        {isBooking ? 'Booking...' : 'Book Now'}
                    </Button>
                </form>
            </div>

            {/* Results section */}
            <div className="bg-gray-50 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-gray-200">
                <h2 className="text-2xl font-bold text-green-800 mb-6">Fare Estimate</h2>

                {!showResults ? (
                    <div className="flex flex-col items-center justify-center h-[300px] text-center text-gray-500">
                        <Route className="h-16 w-16 mb-4 text-gray-300" />
                        <p className="text-lg mb-2">Enter journey details to get fare estimate</p>
                        <p className="text-sm">Our calculator provides accurate fare estimates for your intercity travel</p>
                    </div>
                ) : (
                    <div>
                        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                <div>
                                    <span className="block text-sm text-gray-500">From</span>
                                    <span className="font-medium">{source}</span>
                                </div>
                                <Route className="text-green-500 mx-4" size={20} />
                                <div className="text-right">
                                    <span className="block text-sm text-gray-500">To</span>
                                    <span className="font-medium">{destination}</span>
                                </div>
                            </div>

                            <div className="py-3 border-b border-gray-100">
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-600">Distance</span>
                                    <span className="font-medium">{distance} km</span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-600">Vehicle</span>
                                    <span className="font-medium">{selectedVehicle.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Journey Type</span>
                                    <span className="font-medium">{isOneWay ? 'One Way' : 'Round Trip'}</span>
                                </div>
                            </div>

                            <div className="pt-3">
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-600">Base Fare ({selectedVehicle.baseRate}/km)</span>
                                    <span>{formatCurrency(baseFare)}</span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-600">Estimated Toll Charges</span>
                                    <span>{formatCurrency(tollCharges)}</span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-600">GST (5%)</span>
                                    <span>{formatCurrency(gst)}</span>
                                </div>
                                {!isOneWay && (
                                    <div className="flex justify-between mb-1 text-green-600">
                                        <span>Return Trip (10% discount)</span>
                                        <span>Applied</span>
                                    </div>
                                )}
                                <div className="flex justify-between mt-3 pt-3 border-t border-gray-100 text-lg font-bold">
                                    <span>Total Estimated Fare</span>
                                    <span className="text-green-700">{formatCurrency(totalFare)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 rounded-lg p-4">
                            <h3 className="text-green-800 font-medium mb-2 flex items-center">
                                <CheckCircle2 className="mr-2" size={18} />
                                Fare Inclusions
                            </h3>
                            <ul className="text-sm text-gray-700 space-y-1 ml-6 list-disc">
                                <li>All taxes and fees</li>
                                <li>Experienced driver</li>
                                <li>Fuel charges</li>
                                <li>Estimated toll charges</li>
                                <li>24/7 customer support</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PricingCalculator;
