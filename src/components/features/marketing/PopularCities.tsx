"use client";

import React from 'react';

import Link from 'next/link';

const _cities = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata',
    'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
    'Chandigarh', 'Goa', 'Udaipur', 'Kochi', 'Amritsar'
];

const _PopularCities = (): JSX.Element => {
    return (
        <section className="py-2 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-sm font-medium mb-3">
                    Our <span className="text-primary">Service Cities</span>
                </h2>

                <div className="flex flex-wrap justify-center gap-x-1 gap-y-1">
                    {_cities.map((city): JSX.Element => (
                        <Link
                            href={`/?city=${city.toLowerCase()}`}
                            key={city}
                            className="text-[10px] border border-gray-200 px-2 py-1 rounded-sm min-w-[70px] text-center"
                        >
                            {city}
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-3 flex items-center justify-center gap-4">
                    <Link
                        href="/cities"
                        className="inline-flex items-center justify-center text-[10px] text-primary"
                    >
                        View All Cities &gt;
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link
                        href="/maharashtra"
                        className="inline-flex items-center justify-center text-[10px] text-primary font-medium"
                    >
                        Explore Maharashtra &gt;
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default _PopularCities;
