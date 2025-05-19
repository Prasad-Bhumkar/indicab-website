"use client";

import { Check } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Simple mobile app card component that doesn't use any images
const MobileApp: React.FC<MobileAppProps> = (props): JSX.Element => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const _appFeatures = [
        "Book cabs with just a few taps",
        "Track your driver in real-time",
        "Save favorite routes",
        "Easy payments",
        "24/7 customer support",
        "Exclusive mobile-only discounts"
    ];

    // Show skeleton UI while not mounted
    if (!mounted) {
        return (
            <section className="bg-primary py-6" id="mobileApp">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-6 md:mb-0">
                            <div className="text-white">
                                <div className="h-8 w-48 bg-white/20 animate-pulse rounded mb-2"></div>
                                <div className="h-4 w-64 bg-white/20 animate-pulse rounded mb-4"></div>
                                <div className="flex justify-start space-x-6 mb-6">
                                    {[1, 2, 3].map((_i): JSX.Element => (
                                        <div key={_i} className="flex flex-col items-center">
                                            <div className="w-10 h-10 rounded-full bg-white/20 mb-2"></div>
                                            <div className="h-4 w-16 bg-white/20 animate-pulse rounded"></div>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-2 mb-4">
                                    {[1, 2, 3, 4].map((_i): JSX.Element => (
                                        <div key={_i} className="h-4 w-48 bg-white/20 animate-pulse rounded"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                            <div className="w-64 h-96 bg-white/20 animate-pulse rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-primary py-6" id="mobileApp">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-6 md:mb-0">
                        <div className="text-white">
                            <h2 className="font-bold text-2xl mb-2">IndiCab Mobile App</h2>
                            <p className="text-white/90 mb-4">Book your rides on the go with our easy-to-use mobile application</p>

                            <div className="flex justify-start space-x-6 mb-6">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-white/20 mb-2 flex items-center justify-center">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 3V7M16 3V7M3 11H21M5 5H19C20.1046 5 21 5.89543 21 7V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V7C3 5.89543 3.89543 5 5 5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <span className="text-sm">Book</span>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-white/20 mb-2 flex items-center justify-center">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <span className="text-sm">Rate</span>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-white/20 mb-2 flex items-center justify-center">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 7a3 3 0 100 6 3 3 0 000-6z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <span className="text-sm">Track</span>
                                </div>
                            </div>

                            <div className="space-y-2 mb-4">
                                {_appFeatures.map((_feature, _index): JSX.Element => (
                                    <div key={_index} className="flex items-center">
                                        <Check className="h-4 w-4 mr-2 text-orange-500" />
                                        <span className="text-sm">{_feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="bg-white text-primary font-medium rounded-lg py-1 px-4 text-xs flex items-center justify-center hover:bg-white/90 transition-colors"
                                >
                                    Google Play
                                </a>
                                <a
                                    href="#"
                                    className="bg-white text-primary font-medium rounded-lg py-1 px-4 text-xs flex items-center justify-center hover:bg-white/90 transition-colors"
                                >
                                    App Store
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2 flex justify-center">
                        <div className="relative w-64 h-[420px] bg-white/10 rounded-xl overflow-hidden border-4 border-white/20">
                            <div className="absolute top-0 left-0 right-0 h-12 bg-white/10 flex items-center justify-center">
                                <div className="w-24 h-4 bg-white/40 rounded-full"></div>
                            </div>
                            <div className="pt-16 px-4 flex flex-col items-center">
                                <div className="w-full h-12 bg-orange-500/20 rounded-lg mb-4 flex items-center justify-center">
                                    <span className="text-white text-xs">Book Your Ride</span>
                                </div>
                                <div className="w-full h-20 bg-white/10 rounded-lg mb-3"></div>
                                <div className="w-full h-16 bg-white/10 rounded-lg mb-3"></div>
                                <div className="w-full h-16 bg-white/10 rounded-lg mb-3"></div>
                                <div className="w-full h-12 bg-orange-500 rounded-lg mb-3 flex items-center justify-center">
                                    <span className="text-white text-xs font-medium">BOOK NOW</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MobileApp;
