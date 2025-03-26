"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Car, Map, Calendar } from 'lucide-react';
import Image from 'next/image';

const steps = [
  {
    id: 1,
    title: 'Choose Your Route',
    description: 'Select your pickup and drop-off locations, along with your preferred date and time.',
    icon: <Search className="h-8 w-8 text-orange-500" />,
    delay: 0
  },
  {
    id: 2,
    title: 'Select Your Car',
    description: 'Browse our range of vehicles and choose the one that best suits your needs and budget.',
    icon: <Car className="h-8 w-8 text-orange-500" />,
    delay: 0.1
  },
  {
    id: 3,
    title: 'Book Your Ride',
    description: 'Confirm your booking details and make a secure payment to reserve your ride.',
    icon: <Calendar className="h-8 w-8 text-orange-500" />,
    delay: 0.2
  },
  {
    id: 4,
    title: 'Enjoy Your Trip',
    description: 'Relax and enjoy your journey with our experienced and professional drivers.',
    icon: <Map className="h-8 w-8 text-orange-500" />,
    delay: 0.3
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/5 rounded-full"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Booking your intercity cab is simple and convenient with our easy 4-step process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: step.delay }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {step.id}
              </div>

              <div className="mb-4 bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                {step.icon}
              </div>

              <h3 className="text-lg font-bold mb-2 text-center">{step.title}</h3>
              <p className="text-gray-600 text-center text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-4">Why Choose IndiCab?</h3>

                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs">✓</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-base">Experienced Drivers</h4>
                      <p className="text-gray-600 text-sm">Our drivers have 5+ years of experience and are trained for long-distance travel.</p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs">✓</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-base">Transparent Pricing</h4>
                      <p className="text-gray-600 text-sm">No hidden charges or surprise fees. What you see is what you pay.</p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs">✓</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-base">24/7 Customer Support</h4>
                      <p className="text-gray-600 text-sm">Our support team is always available to assist you with any queries.</p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs">✓</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-base">Well-Maintained Fleet</h4>
                      <p className="text-gray-600 text-sm">Our vehicles undergo regular maintenance and sanitization for a safe journey.</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>

            <div className="relative h-96 md:h-auto">
              <Image
                src="/images/cars/toyota/innova-zenix.jpg"
                alt="IndiCab service"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="bg-white/90 px-6 py-4 rounded-lg max-w-xs text-center">
                  <h4 className="font-bold text-lg mb-1">Customer Satisfaction</h4>
                  <p className="text-primary font-bold text-3xl">96%</p>
                  <p className="text-sm text-gray-600">based on 10,000+ reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
