"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ChevronRight, Car, ArrowRight } from 'lucide-react';

const popularRoutes = [
  {
    id: 1,
    from: 'Delhi',
    to: 'Agra',
    image: '/images/taj-mahal.jpg',
    carImage: '/images/cars/swift/swift-blue.jpg',
    distance: '233 km',
    time: '3.5 hrs',
    price: '₹2,499',
    description: 'Visit the iconic Taj Mahal',
    popular: true
  },
  {
    id: 2,
    from: 'Mumbai',
    to: 'Pune',
    image: '/images/pune.jpg',
    carImage: '/images/cars/swift/swift-red.jpg',
    distance: '150 km',
    time: '2.5 hrs',
    price: '₹1,999',
    description: 'Quick getaway to Pune',
    popular: false
  },
  {
    id: 3,
    from: 'Bangalore',
    to: 'Mysore',
    image: '/images/mysore-palace.jpg',
    carImage: '/images/cars/ertiga/ertiga-white.jpg',
    distance: '145 km',
    time: '3 hrs',
    price: '₹1,899',
    description: 'Explore the royal Mysore Palace',
    popular: true
  },
  {
    id: 4,
    from: 'Delhi',
    to: 'Jaipur',
    image: '/images/jaipur.jpg',
    carImage: '/images/cars/toyota/innova-white.jpg',
    distance: '281 km',
    time: '4.5 hrs',
    price: '₹2,899',
    description: 'Journey to the Pink City',
    popular: false
  },
  {
    id: 5,
    from: 'Chennai',
    to: 'Pondicherry',
    image: '/images/pondicherry.jpg',
    carImage: '/images/cars/toyota/innova-zenix.jpg',
    distance: '170 km',
    time: '3 hrs',
    price: '₹2,299',
    description: 'Coastal drive to French colony',
    popular: false
  },
  {
    id: 6,
    from: 'Kolkata',
    to: 'Digha',
    image: '/images/digha.jpg',
    carImage: '/images/cars/toyota/innova-2021.jpg',
    distance: '185 km',
    time: '3.5 hrs',
    price: '₹2,199',
    description: 'Beach getaway from Kolkata',
    popular: false
  }
];

const PopularRoutes = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            Popular <span className="text-orange-500">Routes</span>
          </h2>
          <Link
            href="/routes"
            className="flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
          >
            View All Routes
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {popularRoutes.map((route) => (
            <motion.div
              key={route.id}
              variants={itemVariants}
              className="group"
            >
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={route.image}
                    alt={`${route.from} to ${route.to}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  {route.popular && (
                    <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs py-1 px-3 font-medium">
                      Popular
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="flex items-center text-white mb-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="text-sm font-medium">{route.from}</span>
                          <ArrowRight className="h-3 w-3 mx-1" />
                          <span className="text-sm font-medium">{route.to}</span>
                        </div>
                        <h3 className="text-white text-lg font-bold">{route.description}</h3>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded py-1 px-2">
                        <span className="text-white font-bold">{route.price}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Car className="h-4 w-4 text-primary mr-1" />
                      <span>{route.distance}</span>
                      <span className="mx-2">•</span>
                      <span>{route.time}</span>
                    </div>
                    <div className="relative h-8 w-12 rounded overflow-hidden">
                      <Image
                        src={route.carImage}
                        alt="Car"
                        fill
                        sizes="48px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <Link
                      href={`/booking?from=${route.from}&to=${route.to}`}
                      prefetch={false}
                    >
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PopularRoutes;
