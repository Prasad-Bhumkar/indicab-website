import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActionButton from '@/components/FloatingActionButton';
import Link from 'next/link';
import { MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Service Cities | IndiCab',
    description: 'IndiCab provides reliable cab services in major cities across India. Find your city and book a comfortable ride with professional drivers.',
    keywords: ['cab services', 'taxi service cities', 'IndiCab locations', 'book cab India', 'city cab service'],
};

export default function Cities(): JSX.Element {
    // Major cities grouped by region
    const citiesByRegion = {
        'North India': [
            'Delhi', 'Jaipur', 'Chandigarh', 'Agra', 'Amritsar', 'Lucknow',
            'Dehradun', 'Shimla', 'Manali', 'Haridwar', 'Rishikesh'
        ],
        'South India': [
            'Bangalore', 'Chennai', 'Hyderabad', 'Kochi', 'Mysore',
            'Pondicherry', 'Ooty', 'Coimbatore', 'Madurai', 'Tirupati'
        ],
        'East India': [
            'Kolkata', 'Bhubaneswar', 'Guwahati', 'Patna', 'Ranchi',
            'Darjeeling', 'Gangtok', 'Siliguri', 'Cuttack', 'Shillong'
        ],
        'West India': [
            'Mumbai', 'Pune', 'Ahmedabad', 'Goa', 'Jaisalmer', 'Udaipur',
            'Jodhpur', 'Surat', 'Vadodara', 'Nashik', 'Nagpur'
        ],
        'Central India': [
            'Indore', 'Bhopal', 'Jabalpur', 'Raipur', 'Khajuraho',
            'Gwalior', 'Aurangabad', 'Ujjain', 'Kanpur', 'Allahabad'
        ]
    };

    // Popular cities for featured section
    const _popularCities = [
        'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata',
        'Hyderabad', 'Pune', 'Jaipur', 'Ahmedabad', 'Goa'
    ];

    return (
        <>
            <Header />
            <main className="min-h-screen py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">IndiCab Service Cities</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mb-8">
                        IndiCab provides reliable cab services across major cities in India.
                        Find your city below and book a ride with our professional drivers and well-maintained vehicles.
                    </p>

                    <div className="mb-8 bg-primary/5 border border-primary/10 rounded-xl p-6">
                        <h2 className="text-xl font-semibold mb-4">Find Cabs in Your City</h2>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <select className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                                        <option value="">Select your city</option>
                                        {Object.values(citiesByRegion).flat().sort().map((city): JSX.Element => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <Link href="/booking" className="sm:w-auto">
                                <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 px-6 flex items-center gap-2">
                                    <Search className="h-4 w-4" />
                                    Find Cabs
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-4">Popular Cities</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
                        {_popularCities.map((city): JSX.Element => (
                            <Link
                                key={city}
                                href={`/booking?city=${city.toLowerCase()}`}
                                className="flex items-center p-3 bg-white border border-gray-200 rounded-md hover:border-primary/30 hover:bg-primary/5 shadow-sm transition-all"
                            >
                                <MapPin className="w-5 h-5 text-primary mr-2" />
                                <span className="font-medium">{city}</span>
                            </Link>
                        ))}
                    </div>

                    {Object.entries(citiesByRegion).map(([region, cities]): JSX.Element => (
                        <div key={region} className="mb-10">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b border-gray-200 pb-2">
                                {region}
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {cities.map((city): JSX.Element => (
                                    <Link
                                        key={city}
                                        href={`/booking?city=${city.toLowerCase()}`}
                                        className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                                    >
                                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                                        <span>{city}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
            <FloatingActionButton />
        </>
    );
}
