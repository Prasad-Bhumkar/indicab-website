"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CarTaxiFront, Calendar, MapPin, ArrowRight, RotateCw, Clock, Star, ShieldCheck, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroEnhanced = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    pickupCity: '',
    dropCity: '',
    travelDate: '',
    returnDate: '',
    pickupTime: '10:00',
    cabType: 'sedan',
    hours: '4'
  });

  const [errors, setErrors] = useState({
    pickupCity: '',
    dropCity: '',
    travelDate: '',
    returnDate: ''
  });

  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('one-way');
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Background images for the hero slider
  const bgImages = [
    '/images/cars/swift/swift-blue.jpg',
    '/images/cars/toyota/innova-white.jpg',
    '/images/cars/swift/swift-red.jpg',
    '/images/cars/toyota/innova-zenix.jpg'
  ];

  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Background image slider effect
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setCurrentBgIndex(prev => (prev + 1) % bgImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [mounted, bgImages.length]);

  // Set default travelDate to today if not already set
  useEffect(() => {
    if (mounted && !formData.travelDate) {
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, travelDate: today }));
    }
  }, [formData.travelDate, mounted]);

  // When changing tabs, reset errors
  useEffect(() => {
    setErrors({
      pickupCity: '',
      dropCity: '',
      travelDate: '',
      returnDate: ''
    });
  }, [activeTab]);

  const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      pickupCity: '',
      dropCity: '',
      travelDate: '',
      returnDate: ''
    };

    let isValid = true;

    if (!formData.pickupCity) {
      newErrors.pickupCity = 'Pickup city is required';
      isValid = false;
    }

    if (!formData.dropCity) {
      newErrors.dropCity = 'Drop city is required';
      isValid = false;
    }

    if (formData.pickupCity && formData.dropCity && formData.pickupCity === formData.dropCity) {
      newErrors.dropCity = 'Pickup and drop cities cannot be the same';
      isValid = false;
    }

    if (!formData.travelDate) {
      newErrors.travelDate = 'Travel date is required';
      isValid = false;
    }

    if (activeTab === 'round' && !formData.returnDate) {
      newErrors.returnDate = 'Return date is required';
      isValid = false;
    }

    if (activeTab === 'round' && formData.travelDate && formData.returnDate &&
        new Date(formData.returnDate) < new Date(formData.travelDate)) {
      newErrors.returnDate = 'Return date must be after travel date';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Build URL with parameters based on active tab
    let bookingUrl = `/booking?from=${formData.pickupCity}&to=${formData.dropCity}&date=${formData.travelDate}&time=${formData.pickupTime}`;

    if (activeTab === 'round') {
      bookingUrl += `&type=round&returnDate=${formData.returnDate}`;
    } else if (activeTab === 'rental') {
      bookingUrl += `&type=rental&hours=${formData.hours}&cabType=${formData.cabType}`;
    } else {
      bookingUrl += '&type=one-way';
    }

    router.push(bookingUrl);
  };

  // If not mounted, return a skeleton UI to prevent hydration issues
  if (!mounted) {
    return (
      <section className="bg-gray-900 relative h-[600px] md:h-[650px] overflow-hidden">
        <div className="h-full w-full bg-gray-800 animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="h-8 w-48 bg-gray-700 animate-pulse rounded"></div>
              <div className="h-16 w-64 bg-gray-700 animate-pulse rounded"></div>
              <div className="h-10 w-32 bg-gray-700 animate-pulse rounded"></div>
            </div>
            <div className="bg-white/10 p-6 rounded-lg animate-pulse h-96 w-full"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[600px] md:h-[650px] overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        {bgImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={img}
              alt="Hero Background"
              fill
              sizes="100vw"
              priority={index === 0}
              style={{ objectFit: 'cover' }}
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center h-full">
          <motion.div
            className="text-white space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex space-x-2">
              <span className="inline-flex items-center px-3 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
                <Star className="h-3 w-3 mr-1" /> 4.8/5 Rating
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full">
                <ShieldCheck className="h-3 w-3 mr-1" /> Trusted Drivers
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="text-white">Your Journey, </span>
              <br />
              <span className="text-orange-500">Our Commitment</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-md">
              Book outstation cabs for one-way and round trips across India with experienced drivers and premium cars.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="p-2 bg-white/10 rounded-full mr-3">
                  <BadgeCheck className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Verified Drivers</p>
                  <p className="text-xs text-white/70">5+ years experience</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="p-2 bg-white/10 rounded-full mr-3">
                  <ShieldCheck className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Safe Travel</p>
                  <p className="text-xs text-white/70">24/7 support</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-lg p-5 shadow-xl border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-full">
              {/* Custom Tabs */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <button
                  onClick={() => setActiveTab('one-way')}
                  className={`flex items-center justify-center py-2 px-3 rounded text-sm font-medium ${
                    activeTab === 'one-way'
                      ? 'bg-primary text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <CarTaxiFront className="h-4 w-4 mr-2" />
                  One Way
                </button>
                <button
                  onClick={() => setActiveTab('round')}
                  className={`flex items-center justify-center py-2 px-3 rounded text-sm font-medium ${
                    activeTab === 'round'
                      ? 'bg-primary text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <RotateCw className="h-4 w-4 mr-2" />
                  Round Trip
                </button>
                <button
                  onClick={() => setActiveTab('rental')}
                  className={`flex items-center justify-center py-2 px-3 rounded text-sm font-medium ${
                    activeTab === 'rental'
                      ? 'bg-primary text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Hourly Rental
                </button>
              </div>

              <div className="p-1">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1 text-white">Pickup City</label>
                      <div className="relative">
                        <select
                          name="pickupCity"
                          value={formData.pickupCity}
                          onChange={handleFormChange}
                          className={`w-full pl-3 pr-2 py-3 border rounded-md text-sm bg-white/10 text-white appearance-none ${errors.pickupCity ? 'border-red-500' : 'border-white/20'}`}
                        >
                          <option value="" className="bg-gray-900">Select Pickup City</option>
                          <option value="Delhi" className="bg-gray-900">Delhi</option>
                          <option value="Mumbai" className="bg-gray-900">Mumbai</option>
                          <option value="Bangalore" className="bg-gray-900">Bangalore</option>
                          <option value="Chennai" className="bg-gray-900">Chennai</option>
                          <option value="Kolkata" className="bg-gray-900">Kolkata</option>
                          <option value="Hyderabad" className="bg-gray-900">Hyderabad</option>
                          <option value="Pune" className="bg-gray-900">Pune</option>
                          <option value="Jaipur" className="bg-gray-900">Jaipur</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                      {errors.pickupCity && <p className="text-red-500 text-xs mt-1">{errors.pickupCity}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium mb-1 text-white">Drop City</label>
                      <div className="relative">
                        <select
                          name="dropCity"
                          value={formData.dropCity}
                          onChange={handleFormChange}
                          className={`w-full pl-3 pr-2 py-3 border rounded-md text-sm bg-white/10 text-white appearance-none ${errors.dropCity ? 'border-red-500' : 'border-white/20'}`}
                        >
                          <option value="" className="bg-gray-900">Select Drop City</option>
                          <option value="Delhi" className="bg-gray-900">Delhi</option>
                          <option value="Mumbai" className="bg-gray-900">Mumbai</option>
                          <option value="Bangalore" className="bg-gray-900">Bangalore</option>
                          <option value="Chennai" className="bg-gray-900">Chennai</option>
                          <option value="Kolkata" className="bg-gray-900">Kolkata</option>
                          <option value="Hyderabad" className="bg-gray-900">Hyderabad</option>
                          <option value="Pune" className="bg-gray-900">Pune</option>
                          <option value="Jaipur" className="bg-gray-900">Jaipur</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                      {errors.dropCity && <p className="text-red-500 text-xs mt-1">{errors.dropCity}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1 text-white">Travel Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          name="travelDate"
                          value={formData.travelDate}
                          onChange={handleFormChange}
                          className={`w-full pl-3 pr-2 py-3 border rounded-md text-sm bg-white/10 text-white appearance-none ${errors.travelDate ? 'border-red-500' : 'border-white/20'}`}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      {errors.travelDate && <p className="text-red-500 text-xs mt-1">{errors.travelDate}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium mb-1 text-white">Pickup Time</label>
                      <div className="relative">
                        <select
                          name="pickupTime"
                          value={formData.pickupTime}
                          onChange={handleFormChange}
                          className="w-full pl-3 pr-2 py-3 border border-white/20 rounded-md text-sm bg-white/10 text-white appearance-none"
                        >
                          {Array.from({ length: 24 }).map((_, i) => (
                            <option key={i} value={`${i < 10 ? '0' + i : i}:00`} className="bg-gray-900">
                              {`${i < 10 ? '0' + i : i}:00`} {i < 12 ? 'AM' : 'PM'}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {activeTab === 'round' && (
                    <div>
                      <label className="block text-xs font-medium mb-1 text-white">Return Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          name="returnDate"
                          value={formData.returnDate}
                          onChange={handleFormChange}
                          className={`w-full pl-3 pr-2 py-3 border rounded-md text-sm bg-white/10 text-white appearance-none ${errors.returnDate ? 'border-red-500' : 'border-white/20'}`}
                          min={formData.travelDate || new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      {errors.returnDate && <p className="text-red-500 text-xs mt-1">{errors.returnDate}</p>}
                    </div>
                  )}

                  {activeTab === 'rental' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1 text-white">Cab Type</label>
                        <div className="relative">
                          <select
                            name="cabType"
                            value={formData.cabType}
                            onChange={handleFormChange}
                            className="w-full pl-3 pr-2 py-3 border border-white/20 rounded-md text-sm bg-white/10 text-white appearance-none"
                          >
                            <option value="compact" className="bg-gray-900">Compact</option>
                            <option value="sedan" className="bg-gray-900">Sedan</option>
                            <option value="suv" className="bg-gray-900">SUV</option>
                            <option value="luxury" className="bg-gray-900">Luxury</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1 text-white">Hours</label>
                        <div className="relative">
                          <select
                            name="hours"
                            value={formData.hours}
                            onChange={handleFormChange}
                            className="w-full pl-3 pr-2 py-3 border border-white/20 rounded-md text-sm bg-white/10 text-white appearance-none"
                          >
                            <option value="4" className="bg-gray-900">4 Hours</option>
                            <option value="8" className="bg-gray-900">8 Hours</option>
                            <option value="12" className="bg-gray-900">12 Hours</option>
                            <option value="24" className="bg-gray-900">24 Hours</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 h-12 transition-all rounded-md text-sm font-medium uppercase flex items-center justify-center gap-2"
                  >
                    BOOK YOUR RIDE
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroEnhanced;
