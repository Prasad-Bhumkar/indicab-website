"use client";

import React, { useState } from 'react';

import * as Sentry from '@sentry/nextjs';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Check, ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';


import { BookingConfirmation } from './BookingConfirmation';
import DateTimeSelection from './DateTimeSelection';
import PassengerDetails from './PassengerDetails';
import PaymentSelection from './PaymentSelection';
import RouteSelection from './RouteSelection';
import VehicleSelection from './VehicleSelection';

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

    // Group booking
    isGroupBooking: boolean;
    groupSize?: number;

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
    isGroupBooking: false,
    groupSize: 1,
    paymentMethod: 'card',
    basePrice: 0,
    tax: 0,
    discount: 0,
    totalPrice: 0,
};

const _validateStep = (step: number, data: BookingFormData): string | null => {
    switch (step) {
        case 0: // Route selection
            if (!data.pickup || !data.dropoff) {
                return 'Please select both pickup and drop-off locations';
            }
            if (data.pickup === data.dropoff) {
                return 'Pickup and drop-off locations cannot be the same';
            }
            break;
        case 1: // Vehicle selection
            if (!data.vehicleType) {
                return 'Please select a vehicle type';
            }
            break;
        case 2: // Date & Time
            const _selectedDate = new Date(data.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (!data.date || !data.time) {
                return 'Please select both date and time';
            }
            if (_selectedDate < today) {
                return 'Please select a future date';
            }
            break;
        case 3: // Passenger details
            if (!data.name || !data.phone || !data.email) {
                return 'Please fill in all passenger details';
            }
            const _emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const _phoneRegex = /^[0-9]{10}$/;

            if (!_emailRegex.test(data.email)) {
                return 'Please enter a valid email address';
            }
            if (!_phoneRegex.test(data.phone)) {
                return 'Please enter a valid 10-digit phone number';
            }
            break;
    }
    return null;
};

export default function BookingWizard(): JSX.Element {
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
        setFormData(_prev => ({ ..._prev, ...data }));
    };

    // Go to next step
    const _goToNextStep = () => {
        const validationError = _validateStep(currentStep, formData);
        if (validationError) {
            setError(validationError);
            return;
        }

        if (currentStep < bookingSteps.length - 1) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setCurrentStep(currentStep + 1);
            setHighestStepVisited(Math.max(highestStepVisited, currentStep + 1));
            setIsStepValid(false);
            setError(null);
        }
    };

    // Go to previous step
    const _goToPreviousStep = () => {
        if (currentStep > 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setCurrentStep(currentStep - 1);
            setError(null);
        }
    };

    // Go to specific step (only if already visited)
    const _goToStep = (step: number) => {
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
            // Call the real API endpoint
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const _errorData = await response.json();
                throw new Error(_errorData.message || 'Failed to create booking');
            }

            const data = await response.json();
            setBookingId(data.bookingId);
            setIsComplete(true);
            setCurrentStep(bookingSteps.length - 1);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unexpected error occurred');
            console.error('Error submitting booking:', error);

            // Log error to Sentry
            Sentry.captureException(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Animation variants
    const _stepVariants = {
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

    const handleError = (error: Error) => {
        console.error('Booking error:', error);
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    };

    // Share booking handler
    const shareBooking = () => {
        // Implement sharing logic here, e.g., copy booking link to clipboard or share via Web Share API
        if (bookingId) {
            const shareUrl = `${window.location.origin}/booking/${bookingId}`;
            if (navigator.share) {
                navigator.share({
                    title: 'My Booking',
                    text: 'Check out my cab booking details!',
                    url: shareUrl,
                }).catch((_err) => {
                    // Handle share error (user cancelled, etc.)
                    console.error('Share failed:', _err);
                });
            } else {
                navigator.clipboard.writeText(shareUrl);
                alert('Booking link copied to clipboard!');
            }
        }
    };

    // Render current step content
    const _renderStepContent = (): JSX.Element => {
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
                        shareBooking={shareBooking}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div
            className="bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 max-w-4xl mx-auto transition-all"
            role="region"
            aria-label="Booking wizard"
        >
            {/* Header */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100" id="booking-wizard-title">
                    Book Your Cab
                </h2>
                <p className="text-gray-500 dark:text-gray-400" id="booking-wizard-description">
                    Complete the steps below to book your ride
                </p>
            </div>

            {/* Progress bar */}
            <div className="px-6 pt-6">
                <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={progressPercentage}
                        aria-labelledby="booking-progress-label"
                    >
                        <span id="booking-progress-label" className="sr-only">
                            Step {currentStep + 1} of {bookingSteps.length}, {progressPercentage}% complete
                        </span>
                        <motion.div
                            className="absolute h-full bg-primary rounded-full"
                            initial={{ width: '0%' }}
                            animate={{ width: `${progressPercentage}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    {/* Step indicators */}
                    <div className="flex justify-between mt-4" role="tablist">
                        {bookingSteps.map((step, index): JSX.Element => (
                            <div
                                key={step.id}
                                className="flex flex-col items-center"
                                style={{ width: `${100 / bookingSteps.length}%` }}
                            >
                                <motion.button
                                    className={`w-9 h-9 rounded-full flex items-center justify-center font-medium text-sm mb-2 transition-all ${index < currentStep
                                        ? 'bg-primary text-white shadow-md'
                                        : index === currentStep
                                            ? 'bg-primary/20 text-primary border-2 border-primary shadow-md'
                                            : index <= highestStepVisited
                                                ? 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-500'
                                                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                                        }`}
                                    onClick={() => _goToStep(index)}
                                    disabled={index > highestStepVisited}
                                    whileHover={index <= highestStepVisited ? { scale: 1.05 } : {}}
                                    whileTap={index <= highestStepVisited ? { scale: 0.95 } : {}}
                                    role="tab"
                                    id={`step-${step.id}-tab`}
                                    aria-controls={`step-${step.id}-content`}
                                    aria-selected={currentStep === index}
                                    aria-disabled={index > highestStepVisited}
                                >
                                    {index < currentStep ? <Check className="h-5 w-5" aria-hidden="true" /> : index + 1}
                                    <span className="sr-only">{step.title}</span>
                                </motion.button>
                                <span className={`text-xs font-medium whitespace-nowrap ${index <= currentStep
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
                            role="alert"
                        >
                            <AlertCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                            <p>{error}</p>
                        </motion.div>
                    )}

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={_stepVariants}
                            transition={{ duration: 0.3 }}
                            className="min-h-[300px]"
                            role="tabpanel"
                            id={`step-${bookingSteps[currentStep].id}-content`}
                            aria-labelledby={`step-${bookingSteps[currentStep].id}-tab`}
                        >
                            {_renderStepContent()}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation buttons */}
                {!isComplete && (
                    <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                                variant="outline"
                                onClick={_goToPreviousStep}
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
                                    onClick={_goToNextStep}
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
        </div>
    );
}
