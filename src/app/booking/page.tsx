"use client";

import React, { useState, Suspense, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { ArrowRight, Car, Clock, Calendar, MapPin, Info, CheckCircle, AlertCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import BookingSuccess from '@/components/BookingSuccess';
import RideTracker from '@/components/RideTracker';

type CarOption = {
  id: string;
  name: string;
  description: string;
  capacity: string;
  fare: string;
  image: string;
};

type FormError = {
  date?: string;
  time?: string;
  general?: string;
};

const carOptions: CarOption[] = [
  {
    id: 'compact',
    name: 'Compact',
    description: 'Economic, basic car for short trips',
    capacity: '4 people',
    fare: '₹1,899',
    image: '/images/cars/swift/swift-blue.jpg'
  },
  {
    id: 'sedan',
    name: 'Premium Sedan',
    description: 'Comfortable sedan with extra legroom',
    capacity: '4 people',
    fare: '₹2,499',
    image: '/images/cars/swift/swift-red.jpg'
  },
  {
    id: 'suv',
    name: 'SUV',
    description: 'Spacious SUV for family travel',
    capacity: '6 people',
    fare: '₹2,899',
    image: '/images/cars/toyota/innova-white.jpg'
  },
  {
    id: 'luxury',
    name: 'Luxury',
    description: 'Premium luxury car for business travel',
    capacity: '4 people',
    fare: '₹3,999',
    image: '/images/cars/toyota/innova-zenix.jpg'
  }
];

function BookingContent() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || 'Delhi';
  const to = searchParams.get('to') || 'Agra';

  const [selectedCar, setSelectedCar] = useState<string>('sedan');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState<string>('09:00');
  const [bookingSuccessful, setBookingSuccessful] = useState<boolean>(false);
  const [showTracker, setShowTracker] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormError>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  // Validation functions
  const validateDate = useCallback((dateString: string): string | undefined => {
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!dateString) {
      return "Date is required";
    }

    if (selectedDate < today) {
      return "Date cannot be in the past";
    }

    // Check if date is more than 3 months in the future
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

    if (selectedDate > threeMonthsLater) {
      return "Date cannot be more than 3 months in the future";
    }

    return undefined;
  }, []);

  const validateTime = useCallback((timeString: string, dateString: string): string | undefined => {
    if (!timeString) {
      return "Time is required";
    }

    const selectedDate = new Date(dateString);
    const today = new Date();
    const selectedDateTime = new Date(dateString);

    // Parse the time string (HH:MM)
    const [hours, minutes] = timeString.split(':').map(Number);
    selectedDateTime.setHours(hours, minutes);

    // If booking for today, time must be at least 1 hour from now
    if (selectedDate.toDateString() === today.toDateString()) {
      const oneHourFromNow = new Date();
      oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);

      if (selectedDateTime < oneHourFromNow) {
        return "Time must be at least 1 hour from now for same-day bookings";
      }
    }

    return undefined;
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormError = {};

    const dateError = validateDate(date);
    if (dateError) {
      newErrors.date = dateError;
    }

    const timeError = validateTime(time, date);
    if (timeError) {
      newErrors.time = timeError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [date, time, validateDate, validateTime]);

  // Validate form on input change
  useEffect(() => {
    // Only validate if there were previous errors (don't show errors right away)
    if (Object.keys(errors).length > 0) {
      validateForm();
    }
  }, [date, time, errors, validateForm]);

  // Find price based on route
  const getPriceForRoute = () => {
    // Look through popularDestinations in the format "City1 to City2"
    const routeString = `${from} to ${to}`;
    if (routeString === "Delhi to Agra") return "₹2,499";
    if (routeString === "Mumbai to Pune") return "₹1,999";
    if (routeString === "Bangalore to Mysore") return "₹1,899";
    if (routeString === "Delhi to Jaipur") return "₹2,899";
    if (routeString === "Chennai to Pondicherry") return "₹2,299";
    if (routeString === "Kolkata to Digha") return "₹2,199";

    // Default price
    return "₹2,499";
  };

  const getSelectedCarPrice = () => {
    const car = carOptions.find(car => car.id === selectedCar);
    return car ? car.fare : "₹2,499";
  };

  const handleBooking = () => {
    // Validate the form before processing
    const isValid = validateForm();
    setIsFormValid(isValid);

    if (isValid) {
      // Simulate booking process
      setBookingSuccessful(true);
    } else {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[data-error="${firstErrorField}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  };

  const handleCloseBookingSuccess = () => {
    setBookingSuccessful(false);
  };

  const handleTrackRide = () => {
    setBookingSuccessful(false);
    setShowTracker(true);
  };

  const handleCloseTracker = () => {
    setShowTracker(false);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-800">Book Your Ride</h1>
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <span>{from}</span>
          <ArrowRight className="h-3 w-3 mx-2" />
          <span>{to}</span>
        </div>
      </div>

      {!isFormValid && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Please fix the following errors:</p>
            <ul className="list-disc list-inside mt-1">
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <Card className="mb-4 p-4">
        <h2 className="text-lg font-medium mb-3">Select Car Type</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {carOptions.map((car) => (
            <Card
              key={car.id}
              className={`overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                selectedCar === car.id ? 'border-primary ring-2 ring-primary/20' : ''
              }`}
              onClick={() => setSelectedCar(car.id)}
            >
              <div className="p-4">
                <div className="h-40 w-full relative rounded overflow-hidden mb-3">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{car.name}</h3>
                  {selectedCar === car.id && (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
                <p className="text-gray-500 text-sm mb-2">{car.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{car.capacity}</span>
                  </div>
                  <span className="font-semibold text-primary">{car.fare}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="mb-4 p-4">
        <h2 className="text-lg font-medium mb-3">Ride Details</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Pickup & Drop</label>
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex items-start">
                <div className="mr-3">
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <MapPin className="h-3 w-3 text-white" />
                  </div>
                  <div className="h-10 border-l border-dashed border-gray-300 mx-auto"></div>
                  <div className="h-6 w-6 rounded-full bg-red-500 flex items-center justify-center">
                    <MapPin className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div>
                    <h4 className="font-medium">{from}</h4>
                    <p className="text-sm text-gray-500">Pickup location</p>
                  </div>
                  <div className="mt-6">
                    <h4 className="font-medium">{to}</h4>
                    <p className="text-sm text-gray-500">Drop location</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div data-error="date">
              <label className="block text-sm font-medium mb-1">
                Date
                {errors.date && (
                  <span className="text-red-500 text-xs ml-1">*</span>
                )}
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 border ${errors.date ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 ${errors.date ? 'focus:ring-red-200' : 'focus:ring-primary/20'}`}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                )}
              </div>
            </div>

            <div data-error="time">
              <label className="block text-sm font-medium mb-1">
                Time
                {errors.time && (
                  <span className="text-red-500 text-xs ml-1">*</span>
                )}
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 border ${errors.time ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 ${errors.time ? 'focus:ring-red-200' : 'focus:ring-primary/20'}`}
                />
                {errors.time && (
                  <p className="text-red-500 text-xs mt-1">{errors.time}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-4 p-4">
        <h2 className="text-lg font-medium mb-3">Fare Summary</h2>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Base Fare</span>
            <span>{getSelectedCarPrice()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tax</span>
            <span>₹199</span>
          </div>
          <div className="border-t border-gray-200 my-2 pt-2">
            <div className="flex justify-between items-center font-bold">
              <span>Total Fare</span>
              <span className="text-primary">{getSelectedCarPrice()}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <Info className="h-3 w-3 mr-1" />
              Pay directly to the driver
            </p>
          </div>
        </div>
      </Card>

      <Button
        className="w-full bg-primary hover:bg-primary/90 text-white py-3"
        onClick={handleBooking}
      >
        Confirm Booking
      </Button>

      {bookingSuccessful && (
        <BookingSuccess
          origin={from}
          destination={to}
          date={`${date} at ${time}`}
          carType={carOptions.find(car => car.id === selectedCar)?.name || "Premium Sedan"}
          fare={getSelectedCarPrice()}
          onClose={handleCloseBookingSuccess}
          onTrackRide={handleTrackRide}
        />
      )}

      {showTracker && (
        <RideTracker
          origin={from}
          destination={to}
          onClose={handleCloseTracker}
        />
      )}
    </div>
  );
}

const BookingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50 pt-4 pb-6">
        <Suspense fallback={
          <div className="container mx-auto px-4 flex justify-center py-20">
            <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <BookingContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default BookingPage;
