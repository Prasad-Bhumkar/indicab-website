"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { initSectionTransitions } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, CalendarClock, Building2, Users, BadgeCheck, Briefcase, ShieldCheck, CreditCard } from 'lucide-react';

// Premium car options for business travel
const _premiumCars = [
    {
        id: 'innova-crysta',
        name: 'Toyota Innova Crysta',
        image: '/images/cars/toyota/innova-white.jpg',
        description: 'Premium MPV with exceptional comfort and space for business travelers',
        capacity: '6-7 passengers',
        features: [
            'Leather seats',
            'Climate control',
            'Ample luggage space',
            'USB charging ports',
            'Smooth ride quality'
        ],
        pricePerDay: '₹3,999'
    },
    {
        id: 'innova-zenix',
        name: 'Toyota Innova Zenix',
        image: '/images/cars/toyota/innova-zenix.jpg',
        description: 'Luxury MPV with top-tier amenities for a premium business travel experience',
        capacity: '6-7 passengers',
        features: [
            'Premium leather upholstery',
            'Multi-zone climate control',
            'Advanced entertainment system',
            'Extra-quiet cabin',
            'Enhanced safety features'
        ],
        pricePerDay: '₹4,499'
    },
    {
        id: 'corolla-altis',
        name: 'Toyota Corolla Altis',
        image: '/images/cars/toyota/innova-2021.jpg', // Using Innova image as placeholder
        description: 'Executive sedan with elegant styling and refined comfort for business executives',
        capacity: '4-5 passengers',
        features: [
            'Premium interiors',
            'Fuel efficiency',
            'Smooth ride quality',
            'Advanced safety features',
            'Sophisticated styling'
        ],
        pricePerDay: '₹3,499'
    }
];

// Business travel packages
const _businessPackages = [
    {
        id: 'daily',
        name: 'Daily Business',
        description: 'Perfect for day-long business meetings and short corporate visits',
        duration: '12 hours, 100 km limit',
        price: '₹2,999 onwards',
        features: ['Chauffeur waiting', 'Corporate billing', 'Priority booking', 'Complimentary water']
    },
    {
        id: 'weekly',
        name: 'Weekly Corporate',
        description: 'Ideal for business delegates visiting for conferences or multi-day meetings',
        duration: '5 days, 500 km limit',
        price: '₹14,999 onwards',
        features: ['Dedicated chauffeur', 'Airport transfers included', 'Corporate billing', 'Schedule flexibility']
    },
    {
        id: 'monthly',
        name: 'Monthly Executive',
        description: 'Comprehensive solution for companies with regular transportation needs',
        duration: '30 days, 3000 km limit',
        price: 'Custom pricing',
        features: ['Multiple vehicle options', 'Dedicated account manager', 'Custom invoicing', 'Priority support']
    }
];

// Corporate benefits
const _corporateBenefits = [
    {
        icon: <Building2 className="h-8 w-8 text-primary" />,
        title: 'Corporate Accounts',
        description: 'Set up a corporate account with monthly billing, detailed reports, and GST invoicing'
    },
    {
        icon: <BadgeCheck className="h-8 w-8 text-primary" />,
        title: 'Premium Fleet',
        description: 'Access to our premium fleet of well-maintained vehicles for executive travel'
    },
    {
        icon: <CreditCard className="h-8 w-8 text-primary" />,
        title: 'Transparent Billing',
        description: 'Clear, itemized billing with custom invoicing options to suit your company policies'
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary" />,
        title: 'Safety Assured',
        description: 'All drivers are background verified and trained for professional corporate service'
    },
    {
        icon: <CalendarClock className="h-8 w-8 text-primary" />,
        title: 'Priority Scheduling',
        description: 'Preferential booking and scheduling for urgent business travel needs'
    },
    {
        icon: <Users className="h-8 w-8 text-primary" />,
        title: 'Dedicated Manager',
        description: 'A dedicated account manager to handle all your transportation requirements'
    }
];

export default function BusinessTravelPage(): JSX.Element {
    // Initialize section transitions
    useEffect(() => {
        const cleanup = initSectionTransitions();
        return () => cleanup && cleanup();
    }, []);

    return (
        <div className="bg-white dark:bg-gray-900">
            {/* Hero Section */}
            <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/cars/toyota/innova-zenix.jpg"
                        alt="Business Travel"
                        fill
                        priority
                        style={{ objectFit: 'cover' }}
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                            Business Travel Solutions
                        </h1>
                        <p className="text-lg text-white/90 mb-8">
                            Premium transportation services tailored for corporate clients, business executives, and professional needs.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="#premium-cars">
                                <Button className="bg-primary hover:bg-primary/90 text-white font-medium">
                                    View Premium Fleet
                                </Button>
                            </Link>
                            <Link href="#corporate-packages">
                                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                                    Corporate Packages
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Corporate Benefits */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800 section-transition">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 dark:text-white">Why Choose IndiCab for Business</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            We understand the unique requirements of corporate travel and offer specialized services to meet your business needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {_corporateBenefits.map((benefit, _index): JSX.Element => (
                            <Card key={_index} className="p-6 dark:bg-gray-700 hover:shadow-md transition-shadow">
                                <div className="flex flex-col items-center text-center">
                                    <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
                                        {benefit.icon}
                                    </div>
                                    <h3 className="font-bold text-xl mb-2 dark:text-white">{benefit.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Premium Cars Section */}
            <section id="premium-cars" className="py-16 bg-white dark:bg-gray-900 section-transition">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 dark:text-white">Premium Fleet for Executives</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Choose from our range of premium vehicles designed to provide comfort, style, and a professional image for your business travel.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {_premiumCars.map((car): JSX.Element => (
                            <Card key={car.id} className="overflow-hidden dark:bg-gray-800 hover:shadow-lg transition-all duration-300">
                                <div className="relative h-56">
                                    <Image
                                        src={car.image}
                                        alt={car.name}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="transition-transform duration-500 hover:scale-105"
                                    />
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 dark:text-white">{car.name}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{car.description}</p>

                                    <div className="flex items-center mb-4">
                                        <Users className="h-5 w-5 text-primary mr-2" />
                                        <span className="text-sm dark:text-gray-300">{car.capacity}</span>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="font-medium text-sm mb-2 dark:text-gray-200">Key Features:</h4>
                                        <ul className="space-y-1">
                                            {car.features.map((_feature, _idx): JSX.Element => (
                                                <li key={_idx} className="flex items-start">
                                                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                                                    <span className="text-sm text-gray-600 dark:text-gray-300">{_feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <div className="font-bold text-primary">{car.pricePerDay}</div>
                                        <Link href="/booking">
                                            <Button className="bg-primary hover:bg-primary/90">Book Now</Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Corporate Packages */}
            <section id="corporate-packages" className="py-16 bg-gray-50 dark:bg-gray-800 section-transition">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 dark:text-white">Corporate Travel Packages</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Flexible packages designed to accommodate various business travel needs with competitive pricing and premium service.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {_businessPackages.map((pkg): JSX.Element => (
                            <Card key={pkg.id} className="p-6 dark:bg-gray-700 hover:shadow-lg transition-all duration-300">
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold mb-1 dark:text-white">{pkg.name}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">{pkg.description}</p>
                                </div>

                                <div className="py-4 mb-4 border-y border-gray-100 dark:border-gray-600">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Duration:</span>
                                        <span className="font-medium dark:text-white">{pkg.duration}</span>
                                    </div>
                                    <div className="font-bold text-xl text-primary">{pkg.price}</div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-medium text-sm mb-2 dark:text-gray-200">Includes:</h4>
                                    <ul className="space-y-1">
                                        {pkg.features.map((_feature, _idx): JSX.Element => (
                                            <li key={_idx} className="flex items-start">
                                                <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                                                <span className="text-sm text-gray-600 dark:text-gray-300">{_feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-auto">
                                    <Link href="/contact">
                                        <Button className="w-full bg-primary hover:bg-primary/90">Enquire Now</Button>
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary dark:bg-primary/90 text-white section-transition">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to Streamline Your Corporate Travel?</h2>
                        <p className="text-xl text-white/90 mb-8">
                            Set up a corporate account today and experience premium transportation tailored to your business needs.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contact">
                                <Button className="bg-white text-primary hover:bg-gray-100 font-medium">
                                    Contact Sales Team
                                </Button>
                            </Link>
                            <Link href="/booking">
                                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                                    Book a Service
                                </Button>
                            </Link>
                        </div>

                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div>
                                <Briefcase className="h-10 w-10 mx-auto mb-3 text-white/80" />
                                <h3 className="font-bold mb-1">Corporate Billing</h3>
                                <p className="text-white/80 text-sm">
                                    Simplified monthly billing with detailed usage reports
                                </p>
                            </div>
                            <div>
                                <BadgeCheck className="h-10 w-10 mx-auto mb-3 text-white/80" />
                                <h3 className="font-bold mb-1">Verified Chauffeurs</h3>
                                <p className="text-white/80 text-sm">
                                    Professional drivers with corporate service training
                                </p>
                            </div>
                            <div>
                                <CreditCard className="h-10 w-10 mx-auto mb-3 text-white/80" />
                                <h3 className="font-bold mb-1">GST Compliance</h3>
                                <p className="text-white/80 text-sm">
                                    All invoices are GST compliant for easy accounting
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
