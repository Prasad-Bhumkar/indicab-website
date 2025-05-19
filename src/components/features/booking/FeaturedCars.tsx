"use client";

import { motion } from 'framer-motion';
import { Briefcase, ShieldCheck, Star, Users } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

// Define car data
const _featuredCars = [
    {
        id: 'swift',
        name: 'Maruti Suzuki Swift',
        category: 'Economy',
        color: 'bg-blue-500',
        description: 'Compact and fuel-efficient, perfect for city travel',
        passengers: 4,
        luggage: 2,
        rating: 4.7,
        pricePerKm: '₹9/km',
        features: ['AC', 'Music System', 'Power Windows'],
        slug: 'swift'
    },
    {
        id: 'sedan',
        name: 'Swift Dzire',
        category: 'Sedan',
        color: 'bg-red-500',
        description: 'Comfortable sedan with extra legroom for longer journeys',
        passengers: 4,
        luggage: 3,
        rating: 4.8,
        pricePerKm: '₹12/km',
        features: ['AC', 'Music System', 'Airbags', 'GPS'],
        slug: 'swift-dzire'
    },
    {
        id: 'ertiga',
        name: 'Maruti Suzuki Ertiga',
        category: 'MPV',
        color: 'bg-gray-200',
        description: 'Spacious MPV perfect for family trips with ample luggage space',
        passengers: 7,
        luggage: 4,
        rating: 4.9,
        pricePerKm: '₹15/km',
        features: ['AC', '7 Seater', 'Spacious Cabin', 'Music System'],
        slug: 'ertiga'
    },
    {
        id: 'innova',
        name: 'Toyota Innova',
        category: 'Premium',
        color: 'bg-gray-100',
        description: 'Premium MPV with superior comfort for long distance travel',
        passengers: 7,
        luggage: 5,
        rating: 4.9,
        pricePerKm: '₹18/km',
        features: ['AC', 'Premium Audio', 'Spacious Cabin', 'Airbags'],
        slug: 'innova'
    }
];

const _FeaturedCars = (): JSX.Element => {
    const _containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const _itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-2">Why Choose Our Fleet?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Our vehicles are perfect for Pune&apos;s intercity and local travel needs. Enjoy reliability, comfort, and the expertise of professional drivers.
                    </p>
                </div>

                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-2">Featured Vehicles</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Choose from our fleet of well-maintained vehicles for your journey. Clean, comfortable, and reliable cars tailored for Pune&apos;s unique travel requirements.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={_containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {_featuredCars.map((car): JSX.Element => (
                        <motion.div
                            key={car.id}
                            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                            variants={_itemVariants}
                        >
                            <div className="relative w-full h-48 overflow-hidden">
                                <div className={`w-full h-48 ${car.color} transform group-hover:scale-105 transition-transform duration-500 rounded-t-lg flex items-center justify-center`}>
                                    <span className="text-white text-lg font-semibold">{car.name}</span>
                                </div>
                                <div className="absolute top-0 left-0 m-3">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-500 text-white">
                                        {car.category}
                                    </span>
                                </div>
                                <div className="absolute top-0 right-0 m-3">
                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-black/70 text-white">
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {car.rating}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 bg-white">
                                <h3 className="text-lg font-bold mb-1">{car.name}</h3>
                                <p className="text-gray-600 text-sm mb-3">{car.description}</p>

                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="flex items-center">
                                        <Users className="h-4 w-4 text-primary mr-2" />
                                        <span className="text-sm">{car.passengers} Passengers</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Briefcase className="h-4 w-4 text-primary mr-2" />
                                        <span className="text-sm">{car.luggage} Luggage</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {car.features.map((_feature, _index): JSX.Element => (
                                        <span key={_index} className="inline-flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
                                            <ShieldCheck className="h-3 w-3 text-primary mr-1" /> {_feature}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-primary font-bold">{car.pricePerKm}</span>
                                    <Link 
                                        href={`/booking?car=${car.slug}`}
                                        className="inline-flex items-center justify-center"
                                    >
                                        <Button className="bg-primary hover:bg-primary/90 text-white text-sm">
                                            Book Now
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="text-center mt-10">
                    <Link 
                        href="/services"
                        className="inline-flex items-center justify-center"
                    >
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                            View All Vehicles
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default _FeaturedCars;
