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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-80 dark:text-gray-100 mb-4">
              Compare Vehicles for Your Maharashtra Tour
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose the perfect vehicle for your journey by comparing features, capacity, and prices.
              Find the best match for your specific travel needs.
            </p>
          </motion.div>

          {/* Rest of the component remains the same */}
          {/* ... */}
        </div>
      </main>
      <Footer />
    </>
  );
}