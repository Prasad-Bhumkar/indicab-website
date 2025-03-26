"use client";

import React, { useEffect } from 'react';
import { BookingFormData } from './index';
import { Calendar, Clock } from 'lucide-react';

interface DateTimeSelectionProps {
  formData: BookingFormData;
  updateFormData: (data: Partial<BookingFormData>) => void;
  setIsValid: (isValid: boolean) => void;
}

export default function DateTimeSelection({
  formData,
  updateFormData,
  setIsValid
}: DateTimeSelectionProps) {
  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  // Calculate max date (6 months from now)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  // Available time slots
  const timeSlots = [
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
  ];

  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ date: e.target.value });
    validateForm(e.target.value, formData.time);
  };

  // Handle time change
  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData({ time: e.target.value });
    validateForm(formData.date, e.target.value);
  };

  // Validate selections
  const validateForm = (date: string, time: string) => {
    setIsValid(!!date && !!time);
  };

  // Initialize validation on component mount
  useEffect(() => {
    validateForm(formData.date, formData.time);
  }, []);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
        Select Date & Time
      </h3>
      <p className="text-gray-500 dark:text-gray-400">
        Choose when you want to travel
      </p>

      <div className="grid gap-6">
        {/* Date selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Pickup Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              value={formData.date}
              onChange={handleDateChange}
              min={today}
              max={maxDateStr}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            />
          </div>
        </div>

        {/* Time selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Pickup Time
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={formData.time}
              onChange={handleTimeChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            >
              <option value="">Select a time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Return date (if round trip) */}
        {formData.isRoundTrip && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Return Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                value={formData.returnDate || ''}
                onChange={(e) => updateFormData({ returnDate: e.target.value })}
                min={formData.date || today}
                max={maxDateStr}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        )}

        {/* Travel date alert */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-md border border-blue-100 dark:border-blue-800 text-sm">
          <p className="flex items-start">
            <span className="mr-2">ℹ️</span>
            <span>
              For same-day bookings, please allow at least 2 hours from your current time.
              For early morning rides (midnight to 6 AM), we recommend booking at least 12 hours in advance.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
