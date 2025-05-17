"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '../ui/card';
import { Button } from '../ui/Button';
import { CarTaxiFront, ArrowRight, RotateCw, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const Hero = () => {
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

  const [activeTab, setActiveTab] = useState('one-way');
  const [mounted, setMounted] = useState(false);

  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

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
      <section className="bg-primary relative pt-2 pb-16 md:pt-4 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="text-white mb-4 md:mb-6">
            <div className="h-6 w-32 bg-white/20 animate-pulse rounded mb-2"></div>
            <div className="flex flex-wrap gap-1 mt-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 w-24 bg-white/20 animate-pulse rounded"></div>
              ))}
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-white p-4 md:p-6 rounded-sm shadow-lg">
              <div className="h-5 w-56 bg-gray-200 animate-pulse rounded mb-4"></div>
              <div className="space-y-3">
                <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="h-10 bg-primary/20 animate-pulse rounded"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gray-100/20"></div>
      </section>
    );
  }

  return (
    <section className="bg-primary relative pt-2 pb-16 md:pt-4 md:pb-20">
      <div className="container mx-auto px-4">
        <div className="text-white mb-4 md:mb-6">
          <motion.h1
            className="text-sm sm:text-base font-bold mb-2 uppercase"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white">SERVICE OF </span>
            <span className="text-orange-500">TRUSTED</span>
            <br />
            <span className="text-white">INDIAN </span>
            <span className="text-orange-500">DRIVERS</span>
          </motion.h1>

          <div className="flex flex-wrap gap-1 mt-2">
            <Button
              variant="outline"
              className={`flex items-center gap-1 rounded-sm py-1 h-8 px-3 text-[10px] sm:text-xs border-none ${activeTab === 'one-way' ? 'bg-orange-500' : 'bg-white/20'}`}
              onClick={() => setActiveTab('one-way')}
            >
              <CarTaxiFront className="h-3 w-3" />
              <span>ONE WAY</span>
            </Button>
            <Button
              variant="outline"
              className={`flex items-center gap-1 rounded-sm py-1 h-8 px-3 text-[10px] sm:text-xs border-none ${activeTab === 'round' ? 'bg-orange-500' : 'bg-white/20'}`}
              onClick={() => setActiveTab('round')}
            >
              <RotateCw className="h-3 w-3" />
              <span>ROUND TRIP</span>
            </Button>
            <Button
              variant="outline"
              className={`flex items-center gap-1 rounded-sm py-1 h-8 px-3 text-[10px] sm:text-xs border-none ${activeTab === 'rental' ? 'bg-orange-500' : 'bg-white/20'}`}
              onClick={() => setActiveTab('rental')}
            >
              <Clock className="h-3 w-3" />
              <span>RENTAL</span>
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-4 md:p-6 shadow-lg bg-white w-full max-w-md mx-auto rounded-sm border-none">
            <h2 className="text-sm md:text-base font-medium mb-4 text-gray-800 flex items-center">
              <span className="mr-2">Book Your {activeTab === 'one-way' ? 'One Way' : activeTab === 'round' ? 'Round Trip' : 'Rental'} Ride</span>
              {activeTab === 'one-way' && <CarTaxiFront className="h-4 w-4 text-primary" />}
              {activeTab === 'round' && <RotateCw className="h-4 w-4 text-primary" />}
              {activeTab === 'rental' && <Clock className="h-4 w-4 text-primary" />}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-700">Pickup City</label>
                <div className="relative">
                  <select
                    name="pickupCity"
                    value={formData.pickupCity}
                    onChange={handleFormChange}
                    className={`w-full pl-3 pr-2 py-2 border rounded-sm text-sm bg-white appearance-none ${errors.pickupCity ? 'border-red-500' : 'border-gray-200'}`}
                  >
                    <option value="">Select Pickup City</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Jaipur">Jaipur</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                {errors.pickupCity && <p className="text-red-500 text-xs mt-1">{errors.pickupCity}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-gray-700">Drop City</label>
                <div className="relative">
                  <select
                    name="dropCity"
                    value={formData.dropCity}
                    onChange={handleFormChange}
                    className={`w-full pl-3 pr-2 py-2 border rounded-sm text-sm bg-white appearance-none ${errors.dropCity ? 'border-red-500' : 'border-gray-200'}`}
                  >
                    <option value="">Select Drop City</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Jaipur">Jaipur</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                {errors.dropCity && <p className="text-red-500 text-xs mt-1">{errors.dropCity}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-700">Travel Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="travelDate"
                      value={formData.travelDate}
                      onChange={handleFormChange}
                      className={`w-full pl-3 pr-2 py-2 border rounded-sm text-sm bg-white appearance-none ${errors.travelDate ? 'border-red-500' : 'border-gray-200'}`}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  {errors.travelDate && <p className="text-red-500 text-xs mt-1">{errors.travelDate}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-700">Pickup Time</label>
                  <div className="relative">
                    <select
                      name="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleFormChange}
                      className="w-full pl-3 pr-2 py-2 border border-gray-200 rounded-sm text-sm bg-white appearance-none"
                    >
                      {Array.from({ length: 24 }).map((_, i) => (
                        <option key={i} value={`${i < 10 ? '0' + i : i}:00`}>
                          {`${i < 10 ? '0' + i : i}:00`} {i < 12 ? 'AM' : 'PM'}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {activeTab === 'round' && (
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-700">Return Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleFormChange}
                      className={`w-full pl-3 pr-2 py-2 border rounded-sm text-sm bg-white appearance-none ${errors.returnDate ? 'border-red-500' : 'border-gray-200'}`}
                      min={formData.travelDate || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  {errors.returnDate && <p className="text-red-500 text-xs mt-1">{errors.returnDate}</p>}
                </div>
              )}

              {activeTab === 'rental' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-700">Cab Type</label>
                    <div className="relative">
                      <select
                        name="cabType"
                        value={formData.cabType}
                        onChange={handleFormChange}
                        className="w-full pl-3 pr-2 py-2 border border-gray-200 rounded-sm text-sm bg-white appearance-none"
                      >
                        <option value="compact">Compact</option>
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="luxury">Luxury</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-700">Hours</label>
                    <div className="relative">
                      <select
                        name="hours"
                        value={formData.hours}
                        onChange={handleFormChange}
                        className="w-full pl-3 pr-2 py-2 border border-gray-200 rounded-sm text-sm bg-white appearance-none"
                      >
                        <option value="4">4 Hours</option>
                        <option value="8">8 Hours</option>
                        <option value="12">12 Hours</option>
                        <option value="24">24 Hours</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
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
                className="w-full bg-primary hover:bg-primary/90 text-white py-2 h-10 transition-all rounded-sm text-sm font-medium uppercase flex items-center justify-center gap-2"
              >
                BOOK CAB
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-10 bg-[url('/images/grass-bg.png')] bg-repeat-x bg-bottom">
      </div>
    </section>
  );
};

export default Hero;
