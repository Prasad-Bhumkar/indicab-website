'use client';

import Image from 'next/image';
import { Button } from '@components/ui/button'; // Updated import
import LoadingSpinner from '@components/ui/LoadingSpinner';

export default function HeroSection() {
  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="relative h-full w-full">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1586016413664-864c0dd76f53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Professional driver ready for your journey"
              className="absolute h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
          Premium Car Rental Services
        </h1>
        <p className="mt-6 max-w-2xl text-lg sm:text-xl">
          Experience hassle-free travel with our professional drivers and well-maintained vehicles
        </p>
        <Button
          className="mt-8 px-8 py-3 text-lg font-semibold"
          variant="default" // Updated variant
          size="lg"
        >
          Book Now
        </Button>
      </div>
    </section>
  );
}
