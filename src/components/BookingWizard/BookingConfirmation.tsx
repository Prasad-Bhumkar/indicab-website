"use client";

import React from 'react';
import { BookingFormData } from './index';
import { CheckCircle, Calendar, MapPin, Clock, Car, User, Phone, Mail, CreditCard, Copy, Share2, Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface BookingConfirmationProps {
  formData: BookingFormData;
  bookingId: string | null;
  isComplete: boolean;
  isSubmitting: boolean;
  submitBooking: () => void;
  resetBooking: () => void;
}

export default function BookingConfirmation({
  formData,
  bookingId,
  isComplete,
  isSubmitting,
  submitBooking,
  resetBooking
}: BookingConfirmationProps) {
  // Copy booking ID to clipboard
  const copyBookingId = () => {
    if (bookingId) {
      navigator.clipboard.writeText(bookingId);
      alert('Booking ID copied to clipboard');
    }
  };

  // Share booking details (mock function)
  const shareBooking = () => {
    if (navigator.share) {
      navigator.share({
        title: 'IndiCab Booking',
        text: `My IndiCab booking (${bookingId}) from ${formData.pickup} to ${formData.dropoff} on ${formData.date} at ${formData.time}`,
        url: window.location.href,
      }).catch(err => {
        console.log('Error sharing', err);
      });
    } else {
      alert('Sharing not supported on this browser');
    }
  };

  return (
    <div className="space-y-6">
      {isComplete ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-20 w-20 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Booking Confirmed!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Your cab has been booked successfully. Details have been sent to your email and phone.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 py-2 px-4 rounded-lg inline-flex items-center">
            <span className="font-medium text-gray-700 dark:text-gray-300 mr-2">Booking ID:</span>
            <span className="font-bold text-primary">{bookingId}</span>
            <button
              onClick={copyBookingId}
              className="ml-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Copy booking ID"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      ) : (
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Review Booking
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Please review your booking details before confirmation
          </p>
        </div>
      )}

      <div className={`bg-white dark:bg-gray-900 border ${isComplete ? 'border-green-200 dark:border-green-800' : 'border-gray-200 dark:border-gray-700'} rounded-lg overflow-hidden`}>
        {/* Journey Details */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Journey Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-500 dark:text-gray-400">From</p>
                <p className="font-medium text-gray-800 dark:text-gray-200">{formData.pickup}</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-500 dark:text-gray-400">To</p>
                <p className="font-medium text-gray-800 dark:text-gray-200">{formData.dropoff}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-500 dark:text-gray-400">Date</p>
                <p className="font-medium text-gray-800 dark:text-gray-200">{formData.date}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-500 dark:text-gray-400">Time</p>
                <p className="font-medium text-gray-800 dark:text-gray-200">{formData.time}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Car className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-500 dark:text-gray-400">Vehicle</p>
                <p className="font-medium text-gray-800 dark:text-gray-200">{formData.vehicleType}</p>
              </div>
            </div>
            {formData.isRoundTrip && formData.returnDate && (
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Return Date</p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{formData.returnDate}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Passenger Details */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Passenger Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start">
              <User className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-500 dark:text-gray-400">Name</p>
                <p className="font-medium text-gray-800 dark:text-gray-200">{formData.name}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-500 dark:text-gray-400">Phone</p>
                <p className="font-medium text-gray-800 dark:text-gray-200">{formData.phone}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-medium text-gray-800 dark:text-gray-200">{formData.email}</p>
              </div>
            </div>
            {formData.specialRequests && (
              <div className="col-span-full flex items-start">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Special Requests</p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{formData.specialRequests}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Payment Details */}
        <div className="p-4">
          <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Payment Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start">
              <CreditCard className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-500 dark:text-gray-400">Payment Method</p>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {formData.paymentMethod === 'card' && 'Credit / Debit Card'}
                  {formData.paymentMethod === 'upi' && 'UPI Payment'}
                  {formData.paymentMethod === 'cash' && 'Cash on Arrival'}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Base Fare</p>
                <p className="font-medium text-gray-800 dark:text-gray-200">₹{formData.basePrice}</p>
              </div>
            </div>
            <div className="flex items-start">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Taxes & Fees</p>
                <p className="font-medium text-gray-800 dark:text-gray-200">₹{formData.tax}</p>
              </div>
            </div>
            {formData.discount > 0 && (
              <div className="flex items-start">
                <div>
                  <p className="text-green-600 dark:text-green-400">Discount</p>
                  <p className="font-medium text-green-600 dark:text-green-400">-₹{formData.discount}</p>
                </div>
              </div>
            )}
            <div className="col-span-full border-t border-gray-200 dark:border-gray-700 mt-2 pt-2 flex justify-between">
              <span className="font-medium text-gray-800 dark:text-gray-200">Total Amount</span>
              <span className="font-bold text-primary text-lg">₹{formData.totalPrice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      {isComplete ? (
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          <Button
            variant="outline"
            onClick={resetBooking}
            className="flex items-center gap-1"
          >
            <Car className="h-4 w-4" />
            Book Another Cab
          </Button>
          <Button
            variant="outline"
            onClick={shareBooking}
            className="flex items-center gap-1"
          >
            <Share2 className="h-4 w-4" />
            Share Booking
          </Button>
          <Button
            variant="outline"
            onClick={() => window.print()}
            className="flex items-center gap-1"
          >
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button
            variant="default"
            className="bg-primary hover:bg-primary/90 text-white flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Download Receipt
          </Button>
        </div>
      ) : (
        <div className="flex justify-center mt-6">
          <Button
            onClick={submitBooking}
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Processing...
              </>
            ) : (
              <>Confirm Booking</>
            )}
          </Button>
        </div>
      )}

      {isComplete && (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          <p>Your driver details will be sent to your phone 30 minutes before pickup time.</p>
          <p className="mt-1">For any assistance, contact our 24/7 support at <span className="text-primary">1800-123-4567</span></p>
        </div>
      )}
    </div>
  );
}
