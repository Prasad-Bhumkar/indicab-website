"use client";

import React, { useEffect, useState } from 'react';
import { BookingFormData } from './';
import { User, Mail, Phone, Users, MessageSquare } from 'lucide-react';

interface PassengerDetailsProps {
    formData: BookingFormData;
    updateFormData: (data: Partial<BookingFormData>) => void;
    setIsValid: (_isValid: boolean) => void;
}

export default function PassengerDetails({
    formData,
    updateFormData,
    setIsValid
}: PassengerDetailsProps): JSX.Element {
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Handle input changes
    const handleInputChange = (
        _e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = _e.target;
        updateFormData({ [name]: value });

        // Clear error for this field
        setErrors(_prev => ({ ..._prev, [name]: '' }));
    };

    // Handle number of passengers change
    const _handlePassengersChange = (_e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(_e.target.value, 10);
        updateFormData({ passengers: value });
    };

    // Run validation on every formData change
    useEffect(() => {
        const _validateFormData = () => {
            const newErrors: Record<string, string> = {};

            // Name validation
            if (!formData.name) {
                newErrors.name = 'Name is required';
            }

            // Email validation
            if (!formData.email) {
                newErrors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Email is invalid';
            }

            // Phone validation
            if (!formData.phone) {
                newErrors.phone = 'Phone number is required';
            } else if (!/^[0-9]{10}$/.test(formData.phone)) {
                newErrors.phone = 'Phone number must be 10 digits';
            }

            setErrors(newErrors);
            const _isValid = Object.keys(newErrors).length === 0;
            setIsValid(_isValid);

            return _isValid;
        };

        _validateFormData();
    }, [formData, setIsValid]);

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Passenger Details
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
                Enter your contact information
            </p>

            <div className="grid gap-6">
                {/* Name input */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                        Full Name
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`block w-full pl-10 pr-3 py-2 border ${errors.name
                                    ? 'border-red-500 dark:border-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                                } rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                            placeholder="John Doe"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                        )}
                    </div>
                </div>

                {/* Email input */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`block w-full pl-10 pr-3 py-2 border ${errors.email
                                    ? 'border-red-500 dark:border-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                                } rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                            placeholder="johndoe@example.com"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>
                </div>

                {/* Phone input */}
                <div>
                    <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                        Phone Number
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`block w-full pl-10 pr-3 py-2 border ${errors.phone
                                    ? 'border-red-500 dark:border-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                                } rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                            placeholder="1234567890"
                        />
                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                        )}
                    </div>
                </div>

                {/* Number of passengers */}
                <div>
                    <label
                        htmlFor="passengers"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                        Number of Passengers
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Users className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                            id="passengers"
                            value={formData.passengers}
                            onChange={_handlePassengersChange}
                            aria-label="Number of passengers"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        >
                            {[1, 2, 3, 4, 5, 6, 7].map((num): JSX.Element => (
                                <option key={num} value={num}>
                                    {num} {num === 1 ? 'passenger' : 'passengers'}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Special requests */}
                <div>
                    <label
                        htmlFor="specialRequests"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                        Special Requests (Optional)
                    </label>
                    <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none">
                            <MessageSquare className="h-5 w-5 text-gray-400" />
                        </div>
                        <textarea
                            id="specialRequests"
                            name="specialRequests"
                            value={formData.specialRequests}
                            onChange={handleInputChange}
                            rows={3}
                            aria-label="Special requests"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            placeholder="Any special instructions for the driver..."
                        />
                    </div>
                </div>

                {/* Privacy notice */}
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm">
                    <p className="text-gray-600 dark:text-gray-400">
                        Your contact information will be shared with the driver for communication purposes.
                        We respect your privacy and will handle your data in accordance with our
                        <a href="/privacy" className="text-primary hover:underline ml-1">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
