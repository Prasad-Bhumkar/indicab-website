"use client";

import React from 'react';
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
import VehicleComparison from '@/components/VehicleComparison';
import { motion } from 'framer-motion';
import { Car, ArrowRight, Clock, Percent, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function CompareVehiclesPage() {
  return (
    <>
      <Header />
      <main className="py-10 md:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 mb-16">
          <motion.div
            className="mb-12 max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Compare Vehicles for Your Maharashtra Tour
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose the perfect vehicle for your journey by comparing features, capacity, and prices.
              Find the best match for your specific travel needs.
            </p>
          </motion.div>

          {/* Quick benefits */}
          <motion.div
            className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, staggerChildren: 0.1 }}
          >
            {[
              {
                icon: Car,
                title: 'Multiple Options',
                desc: 'Compare different vehicles side by side'
              },
              {
                icon: Percent,
                title: 'Best Value',
                desc: 'Find the most economical option for your trip'
              },
              {
                icon: Clock,
                title: 'Save Time',
                desc: 'Quick and easy decision making'
              },
              {
                icon: MapPin,
                title: 'Route Based',
                desc: 'Recommendations tailored to your journey'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Vehicle comparison component */}
          <VehicleComparison initialDistance={150} />

          {/* Call to action */}
          <motion.div
            className="mt-16 bg-primary text-white p-8 rounded-xl shadow-md max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-4">Ready to Book Your Journey?</h3>
            <p className="mb-6 opacity-90">
              Once you've found the perfect vehicle for your Maharashtra tour,
              proceed to our easy booking process.
            </p>
            <Link
              href="/booking-wizard"
              className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Book Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
