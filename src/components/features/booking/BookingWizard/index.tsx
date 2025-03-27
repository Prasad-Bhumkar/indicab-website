"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import { Button } from '../../ui/button';
import RouteSelection from '../RouteSelection';
import VehicleSelection from '../VehicleSelection';
import DateTimeSelection from '../DateTimeSelection';
import PassengerDetails from '../PassengerDetails';
import PaymentSelection from '../PaymentSelection';
import BookingConfirmation from '../BookingConfirmation';

// Step interface
export interface BookingStep {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

// Steps in our booking wizard
const bookingSteps: BookingStep[] = [
  {
    id: 'route',
    title: 'Route',
    description: 'Select your pickup and drop-off locations',
  },
  {
    id: 'vehicle',
    title: 'Vehicle',
    description: 'Choose your preferred vehicle type',
  },
  {
    id: 'date-time',
    title: 'Date & Time',
    description: 'Select when you want to travel',
  },
  {
    id: 'passenger',
    title: 'Passenger Details',
    description: 'Enter your contact information',
  },
  {
    id: 'payment',
    title: 'Payment',
    description: 'Choose your payment method',
  },
  {
    id: 'confirmation',
    title: 'Confirmation',
    description: 'Review and confirm your booking',
  },
];

// Booking form data interface
export interface BookingFormData {
  // Route selection
  pickup: string;
  dropoff: string;
  isRoundTrip: boolean;
  returnDate?: string;

  // Vehicle selection
  vehicleType: string;
  vehicleId: string;

  // Date and time selection
  date: string;
  time: string;

  // Passenger details
  name: string;
  email: string;
  phone: string;
  passengers: number;
  specialRequests: string;

  // Payment details
  paymentMethod: 'card' | 'upi' | 'cash';
  promoCode?: string;

  // Pricing
  basePrice: number;
  tax: number;
  discount: number;
  totalPrice: number;
}

// Default form data
const defaultFormData: BookingFormData = {
  pickup: '',
  dropoff: '',
  isRoundTrip: false,
  vehicleType: '',
  vehicleId: '',
  date: '',
  time: '',
  name: '',
  email: '',
  phone: '',
  passengers: 1,
  specialRequests: '',
  paymentMethod: 'card',
  basePrice: 0,
  tax: 0,
  discount: 0,
  totalPrice: 0,
};

export default function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<BookingFormData>(defaultFormData);
  const [isStepValid, setIsStepValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [highestStepVisited, setHighestStepVisited] = useState(0);

  // Calculate progress percentage
  const progressPercentage = ((currentStep) / (bookingSteps.length - 1)) * 100;

  // Update form data
  const updateFormData = (data: Partial<BookingFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  // Go to next step
  const goToNextStep = () => {
    if (currentStep < bookingSteps.length - 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentStep(currentStep + 1);
      setHighestStepVisited(Math.max(highestStepVisited, currentStep + 1));
      setIsStepValid(false);
      setError(null);
    }
  };

  // Go to previous step
  const goToPreviousStep = () => {
    if (currentStep > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  // Go to specific step (only if already visited)
  const goToStep = (step: number) => {
    if (step <= highestStepVisited) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentStep(step);
      setError(null);
    }
  };

  // Submit booking
  const submitBooking = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate API validation check
      if (!formData.name || !formData.email || !formData.phone) {
        throw new Error('Please complete all required fields');
      }

      // Generate a random booking ID
      const generatedBookingId = `IND${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingId(generatedBookingId);
      setIsComplete(true);
      setCurrentStep(bookingSteps.length - 1);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      console.error('Error submitting booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  // Reset booking form
  const resetBooking = () => {
    setFormData(defaultFormData);
    setCurrentStep(0);
    setHighestStepVisited(0);
    setIsStepValid(false);
    setIsComplete(false);
    setBookingId(null);
    setError(null);
  };

  // Render current step content
  const renderStepContent = () => {
    switch (bookingSteps[currentStep].id) {
      case 'route':
        return (
          <RouteSelection
            formData={formData}
            updateFormData={updateFormData}
            setIsValid={setIsStepValid}
          />
        );
      case 'vehicle':
        return (
          <VehicleSelection
            formData={formData}
            updateFormData={updateFormData}
            setIsValid={setIsStepValid}
          />
        );
      case 'date-time':
        return (
          <DateTimeSelection
            formData={formData}
            updateFormData={updateFormData}
            setIsValid={setIsStepValid}
          />
        );
      case 'passenger':
        return (
          <PassengerDetails
            formData={formData}
            updateFormData={updateFormData}
            setIsValid={setIsStepValid}
          />
        );
      case 'payment':
        return (
          <PaymentSelection
            formData={formData}
            updateFormData={updateFormData}
            setIsValid={setIsStepValid}
          />
        );
      case 'confirmation':
        return (
          <BookingConfirmation
            formData={formData}
            bookingId={bookingId}
            isComplete={isComplete}
            isSubmitting={isSubmitting}
            submitBooking={submitBooking}
            resetBooking={resetBooking}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 max-w-4xl mx-auto transition-all">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Book Your Cab
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Complete the steps below to book your ride
        </p>
      </div>

      {/* Progress bar */}
      <div className="px-6 pt-6">
        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="absolute h-full bg-primary rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Step indicators */}
        <div className="flex justify-between mt-4">
          {bookingSteps.map((step, index) => (
            <div
              key={step.id}
              className="flex flex-col items-center"
              style={{ width: `${100 / bookingSteps.length}%` }}
            >
              <motion.button
                className={`w-9 h-9 rounded-full flex items-center justify-center font-medium text-sm mb-2 transition-all ${
                  index < currentStep
                    ? 'bg-primary text-white shadow-md'
                    : index === currentStep
                      ? 'bg-primary/20 text-primary border-2 border-primary shadow-md'
                      : index <= highestStepVisited
                        ? 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-500'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                }`}
                onClick={() => goToStep(index)}
                disabled={index > highestStepVisited}
                whileHover={index <= highestStepVisited ? { scale: 1.05 } : {}}
                whileTap={index <= highestStepVisited ? { scale: 0.95 } : {}}
              >
                {index < currentStep ? <Check className="h-5 w-5" /> : index + 1}
              </motion.button>
              <span className={`text-xs font-medium whitespace-nowrap ${
                index <= currentStep
                  ? 'text-primary'
                  : index <= highestStepVisited
                    ? 'text-gray-600 dark:text-gray-300'
                    : 'text-gray-400 dark:text-gray-500'
              }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="p-6">
        {error && (
          <motion.div
            className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p>{error}</p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={stepVariants}
            transition={{ duration: 0.3 }}
            className="min-h-[300px]"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      {!isComplete && (
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              onClick={goToPreviousStep}
              disabled={currentStep === 0 || isSubmitting}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          </motion.div>

          {currentStep < bookingSteps.length - 1 ? (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={goToNextStep}
                disabled={!isStepValid || isSubmitting}
                className="bg-primary hover:bg-primary/90 text-white flex items-center gap-1 px-6"
              >
                Continue
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          ) : (
            !isComplete && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={submitBooking}
                  disabled={!isStepValid || isSubmitting}
                  className="bg-primary hover:bg-primary/90 text-white px-6"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>Complete Booking</>
                  )}
                </Button>
              </motion.div>
            )
          )}
        </div>
      )}
    </div>
  );
}
