"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/button/button';
import { ChevronLeft, ChevronRight, Users, Briefcase, ShieldCheck } from 'lucide-react';

type CarType = {
  id: string;
  name: string;
  image: string;
  description: string;
  passengers: number;
  luggage: number;
  features: string[];
  price: string;
  category: 'economy' | 'premium' | 'suv' | 'luxury';
};

const cars: CarType[] = [
  {
    id: 'swift-blue',
    name: 'Maruti Suzuki Swift',
    image: '/images/cars/swift/swift-blue.jpg',
    description: 'Compact and fuel-efficient hatchback, perfect for city travel.',
    passengers: 4,
    luggage: 2,
    features: ['AC', 'Music System', 'Power Windows', 'Fuel Efficient'],
    price: '₹1,899/day',
    category: 'economy'
  },
  {
    id: 'swift-red',
    name: 'Maruti Suzuki Swift ZXi',
    image: '/images/cars/swift/swift-red.jpg',
    description: 'Premium variant with enhanced features for comfortable travel.',
    passengers: 4,
    luggage: 2,
    features: ['AC', 'Touchscreen Infotainment', 'Airbags', 'Alloy Wheels'],
    price: '₹2,099/day',
    category: 'economy'
  },
  {
    id: 'swift-yellow',
    name: 'Maruti Suzuki Swift Sport',
    image: '/images/cars/swift/swift-yellow.jpg',
    description: 'Sporty variant with enhanced performance and stylish design.',
    passengers: 4,
    luggage: 2,
    features: ['Sport Mode', 'Premium Audio', 'Climate Control', 'Sport Seats'],
    price: '₹2,299/day',
    category: 'premium'
  },
  {
    id: 'ertiga-white',
    name: 'Maruti Suzuki Ertiga',
    image: '/images/cars/ertiga/ertiga-white.jpg',
    description: 'Spacious MPV perfect for family trips and group travel.',
    passengers: 7,
    luggage: 3,
    features: ['AC', '7 Seater', 'Spacious Cabin', 'Foldable Seats'],
    price: '₹2,699/day',
    category: 'suv'
  },
  {
    id: 'innova-white',
    name: 'Toyota Innova Crysta',
    image: '/images/cars/toyota/innova-white.jpg',
    description: 'Premium MPV with superior comfort and reliable performance.',
    passengers: 7,
    luggage: 4,
    features: ['Premium Interiors', 'Captain Seats', 'Climate Control', 'Cruise Control'],
    price: '₹3,499/day',
    category: 'suv'
  },
  {
    id: 'innova-zenix',
    name: 'Toyota Innova Zenix',
    image: '/images/cars/toyota/innova-zenix.jpg',
    description: 'Luxury MPV with top-tier amenities for a premium travel experience.',
    passengers: 7,
    luggage: 4,
    features: ['Leather Seats', 'Advanced Safety', 'Premium Sound System', 'Panoramic View'],
    price: '₹3,999/day',
    category: 'luxury'
  },
  {
    id: 'innova-2021',
    name: 'Toyota Innova 2021',
    image: '/images/cars/toyota/innova-2021.jpg',
    description: 'Updated model with enhanced features and luxury amenities.',
    passengers: 7,
    luggage: 4,
    features: ['Modern Design', 'Enhanced Safety', 'Premium Comfort', 'Fuel Efficient'],
    price: '₹3,799/day',
    category: 'luxury'
  }
];

const CarShowcase = React.memo((): JSX.Element => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredCars = activeCategory === 'all'
    ? cars
    : cars.filter(car => car.category === activeCategory);

  const carsToShow = 3;
  const totalSlides = Math.ceil(filteredCars.length / carsToShow);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= totalSlides ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const visibleCars = filteredCars.slice(
    currentIndex * carsToShow,
    (currentIndex + 1) * carsToShow
  );

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Our Premium Fleet</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our selection of well-maintained cars for your journey.
            From economy to luxury, we have the perfect vehicle for your needs.
          </p>
        </div>

        <div className="flex justify-center mb-6 space-x-2">
          {['all', 'economy', 'premium', 'suv', 'luxury'].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full transition-all ${
                activeCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
              onClick={() => {
                setActiveCategory(category);
                setCurrentIndex(0);
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="flex justify-between items-center absolute top-1/2 transform -translate-y-1/2 w-full px-4 z-10">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {visibleCars.map((car) => (
              <Card key={car.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-0 right-0 m-3">
                    <span className="px-3 py-1 text-xs uppercase font-semibold bg-primary text-white rounded-full">
                      {car.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">{car.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{car.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="text-sm">{car.passengers} Passengers</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <span className="text-sm">{car.luggage} Luggage</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium text-sm mb-2">Key Features:</h4>
                    <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                      {car.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <ShieldCheck className="h-3 w-3 text-primary mr-1" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <span className="text-lg font-bold text-primary">{car.price}</span>
                    <Link href="/booking">
                      <Button className="bg-primary hover:bg-primary/90">Book Now</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {totalSlides > 1 && (
            <div className="flex justify-center space-x-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    currentIndex === index ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default CarShowcase;