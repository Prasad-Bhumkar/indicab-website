'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '../../../ui/button/Button';
import LoadingSpinner from '../../../ui/LoadingSpinner';

export default function HeroSection() {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Hero background"
          layout="fill"
          objectFit="cover"
          priority
          className="w-full h-full"
        />
      </div>
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
          Reliable Cab Services in Pune
        </h1>
        <p className="mt-6 max-w-2xl text-lg sm:text-xl">
          Discover hassle-free intercity and local travel with our professional drivers and well-maintained vehicles.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            className="px-8 py-3 text-lg font-semibold"
            variant="default"
            size="lg"
          >
            Book Now
          </Button>
          <Button
            className="px-8 py-3 text-lg font-semibold bg-primary text-white hover:bg-primary-dark"
            variant="outline"
            size="lg"
          >
            Get a Quick Quote
          </Button>
          <Button
            className="px-8 py-3 text-lg font-semibold bg-secondary text-white hover:bg-secondary-dark"
            variant="outline"
            size="lg"
          >
            Explore Our Services
          </Button>
        </div>
      </div>
    </section>
  );
}
