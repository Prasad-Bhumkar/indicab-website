"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const _popularDestinations = [
    {
        id: 1,
        name: 'Delhi to Agra',
        description: 'Visit the iconic Taj Mahal',
        price: '₹2,499',
        image: '/images/taj-mahal.jpg',
        carImage: '/images/cars/swift/swift-blue.jpg',
        isPopular: false
    },
    {
        id: 2,
        name: 'Mumbai to Pune',
        description: 'Quick getaway to Pune',
        price: '₹1,999',
        image: '/images/pune.jpg',
        carImage: '/images/cars/swift/swift-red.jpg',
        isPopular: false
    },
    {
        id: 3,
        name: 'Bangalore to Mysore',
        description: 'Explore the royal Mysore Palace',
        price: '₹1,899',
        image: '/images/mysore-palace.jpg',
        carImage: '/images/cars/swift/swift-yellow.jpg',
        isPopular: true
    },
    {
        id: 4,
        name: 'Delhi to Jaipur',
        description: 'Journey to the Pink City',
        price: '₹2,899',
        image: '/images/jaipur.jpg',
        carImage: '/images/cars/ertiga/ertiga-white.jpg',
        isPopular: false
    },
    {
        id: 5,
        name: 'Chennai to Pondicherry',
        description: 'Coastal drive to French colony',
        price: '₹2,299',
        image: '/images/pondicherry.jpg',
        carImage: '/images/cars/toyota/innova-white.jpg',
        isPopular: false
    },
    {
        id: 6,
        name: 'Kolkata to Digha',
        description: 'Beach getaway from Kolkata',
        price: '₹2,199',
        image: '/images/digha.jpg',
        carImage: '/images/cars/toyota/innova-zenix.jpg',
        isPopular: false
    }
];

// ImageWithLoading component to handle image loading state
const ImageWithLoading = ({ src, alt, priority }: { src: string; alt: string; priority?: boolean }): JSX.Element => {
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
                priority={priority}
                // unoptimized
                crossOrigin="anonymous"
                className="w-full h-full object-cover rounded-sm"
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
};

const _PopularRides = (): JSX.Element => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Show skeleton UI while not mounted
        return (
            <section className="py-2 bg-white">
                <div className="container mx-auto px-4">
                    <div className="mb-3">
                        <div className="h-5 w-40 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                    <div className="space-y-4">
                        {[...Array(3)].map((_, _i): JSX.Element => (
                            <div key={_i} className="border-b pb-4 last:border-b-0">
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <div className="h-4 w-32 bg-gray-200 animate-pulse rounded mb-2"></div>
                                            <div className="h-3 w-40 bg-gray-200 animate-pulse rounded"></div>
                                        </div>
                                    </div>
                                    <div className="my-2 h-[120px] w-full bg-gray-200 animate-pulse rounded-sm"></div>
                                    <div className="flex justify-between items-center">
                                        <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center my-3">
                        <div className="h-4 w-28 bg-gray-200 animate-pulse rounded mx-auto"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-2 bg-white">
            <div className="container mx-auto px-4">
                <div className="mb-3">
                    <h2 className="text-sm font-medium">
                        Popular <span className="text-orange-500">Rides</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {_popularDestinations.map((destination): JSX.Element => (
                        <div
                            key={destination.id}
                            className="border-b pb-4 last:border-b-0"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-1">
                                    <div>
                                        <h3 className="font-medium text-sm">{destination.name}</h3>
                                        <p className="text-gray-500 text-[10px]">{destination.description}</p>
                                    </div>

                                    {destination.isPopular && (
                                        <div className="bg-red-500 text-white text-[10px] py-0.5 px-1.5 rounded">
                                            Popular
                                        </div>
                                    )}
                                </div>

                                <div className="my-2 grid grid-cols-2 gap-2">
                                    <div className="h-[120px] w-full bg-gray-100 relative overflow-hidden rounded-sm" style={{ position: 'relative' }}>
                                        <ImageWithLoading
                                            src={destination.image}
                                            alt={destination.name}
                                            priority={destination.id <= 2}
                                        />
                                    </div>
                                    <div className="h-[120px] w-full bg-gray-100 relative overflow-hidden rounded-sm">
                                        <ImageWithLoading
                                            src={destination.carImage}
                                            alt={`Car for ${destination.name}`}
                                            priority={destination.id <= 2}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-sm text-primary">{destination.price}</span>
                                    <Link
                                        href={`/booking?from=${destination.name.split(' to ')[0]}&to=${destination.name.split(' to ')[1]}`}
                                        className="text-white bg-orange-500 text-[10px] px-2 py-1 rounded"
                                        prefetch={true}
                                    >
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center my-3">
                    <Link
                        href="/routes"
                        className="inline-flex items-center justify-center text-[10px] text-primary"
                        prefetch={true}
                    >
                        View All Routes
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default _PopularRides;
