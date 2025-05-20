import React from "react";

"use client";

import { motion } from "framer-motion";
import { Users, Check, Star, ShieldCheck, Fuel, Menu } from "lucide-react";
import Image from "next/image";

interface Vehicle {
    id: string;
    name: string;
    description: string;
    capacity: string;
    features: string[];
    image: string;
    category?: string;
}

export function FleetShowcase(): JSX.Element {
    const _vehicles: Vehicle[] = [
        {
            id: "tiago",
            name: "Tata Tiago",
            description: "Compact hatchback, ideal for city travel and navigating narrow roads.",
            capacity: "4 passengers",
            features: ["Fuel efficient", "Compact size", "Easy city navigation", "Air conditioning"],
            image: "/images/cars/tata-tiago.png",
            category: "Economy"
        },
        {
            id: "swift-dzire",
            name: "Maruti Suzuki Swift Dzire",
            description: "Popular sedan known for its fuel efficiency and comfort, ideal for city travel and short trips.",
            capacity: "4 passengers",
            features: ["Comfortable seats", "Good trunk space", "Excellent mileage", "Smooth driving experience"],
            image: "/images/cars/swift-dzire.png",
            category: "Sedan"
        },
        {
            id: "hyundai-aura",
            name: "Hyundai Aura",
            description: "A comfortable compact sedan that provides reliable transportation for small groups.",
            capacity: "4 passengers",
            features: ["Refined interiors", "Ample legroom", "Feature-rich dashboard", "Good fuel economy"],
            image: "/images/cars/hyundai-aura.png",
            category: "Sedan"
        },
        {
            id: "ertiga",
            name: "Maruti Suzuki Ertiga",
            description: "A versatile MPV with ample space for passengers and luggage, suitable for family tours.",
            capacity: "7 passengers",
            features: ["Spacious cabin", "Foldable seats", "Large luggage space", "Comfort on long journeys"],
            image: "/images/cars/ertiga.png",
            category: "MPV"
        },
        {
            id: "innova",
            name: "Toyota Innova Crysta",
            description: "Premium MPV offering a comfortable and spacious ride, perfect for longer journeys and group tours.",
            capacity: "7 passengers",
            features: ["Premium interiors", "Powerful engine", "Captain seats option", "Excellent ride quality"],
            image: "/images/cars/innova.png",
            category: "Premium"
        }
    ];

    // Animation variants
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
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
                        Safe &amp; Comfortable
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Our Premium Fleet</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                        Explore Maharashtra in comfort with our well-maintained vehicles.
                        Each car is regularly serviced and sanitized to ensure a safe and pleasant journey.
                    </p>
                </motion.div>

                <motion.div
                    variants={_containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {_vehicles.map((vehicle): JSX.Element => (
                        <motion.div
                            key={vehicle.id}
                            variants={_itemVariants}
                            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 group"
                        >
                            {/* Category Badge */}
                            {vehicle.category && (
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="bg-primary text-white text-xs px-2.5 py-1 rounded-full font-medium">
                                        {vehicle.category}
                                    </span>
                                </div>
                            )}

                            <div className="p-6 bg-gray-50 flex justify-center h-56 relative group-hover:bg-gray-100 transition-colors">
                                <Image
                                    src={vehicle.image}
                                    alt={vehicle.name}
                                    width={280}
                                    height={160}
                                    className="object-contain transform group-hover:scale-105 transition-transform duration-300"
                                    style={{ position: 'relative' }} // Ensuring the image has a relative position
                                />
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                                    {vehicle.name}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-2">{vehicle.description}</p>

                                <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <Users className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                                    <span className="text-gray-700 font-medium">{vehicle.capacity}</span>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-medium text-gray-800 flex items-center gap-2">
                                        <Star className="h-4 w-4 text-secondary" />
                                        Key Features
                                    </h4>
                                    <ul className="grid grid-cols-1 gap-y-2">
                                        {vehicle.features.map((_feature, _i): JSX.Element => (
                                            <li key={_i} className="flex items-center text-sm text-gray-600">
                                                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                                {_feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="px-6 pb-6 pt-2">
                                <div className="flex items-center bg-primary/5 p-3 rounded-lg text-primary text-sm">
                                    <ShieldCheck className="h-5 w-5 mr-2 flex-shrink-0" />
                                    <span>Regularly sanitized and maintained</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-16 bg-gray-50 p-6 rounded-xl border border-gray-200 max-w-3xl mx-auto"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Need a different vehicle?</h3>
                            <p className="text-gray-600">
                                We have more options available. Contact us to inquire about specialized vehicles for your specific needs.
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <a
                                href="tel:+919876543210"
                                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                            >
                                <Menu className="h-4 w-4" />
                                Contact for More Options
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
