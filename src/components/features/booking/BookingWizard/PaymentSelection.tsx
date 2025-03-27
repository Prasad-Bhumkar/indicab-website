"use client";

import React, { useEffect } from 'react';
import { BookingFormData } from './';
import { CreditCard, Smartphone, Banknote, Tag, ChevronDown } from 'lucide-react';

interface PaymentSelectionProps {
  formData: BookingFormData;
  updateFormData: (data: Partial<BookingFormData>) => void;
  setIsValid: (isValid: boolean) => void;
}

export default function PaymentSelection({
  formData,
  updateFormData,
  setIsValid
}: PaymentSelectionProps) {
  // Payment methods
  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit / Debit Card',
      description: 'Pay securely with your card',
      icon: CreditCard,
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      description: 'Pay using Google Pay, PhonePe, Paytm, etc.',
      icon: Smartphone,
    },
    {
      id: 'cash',
      name: 'Cash on Arrival',
      description: 'Pay in cash to the driver',
      icon: Banknote,
    },
  ];

  // Calculate fare breakdown
  const calculateFareBreakdown = () => {
    const basePrice = formData.basePrice || 0;
    const tax = formData.tax || Math.round(basePrice * 0.05);
    const discount = formData.discount || 0;
    const totalPrice = formData.totalPrice || Math.round(basePrice + tax - discount);

    updateFormData({
      tax,
      discount,
      totalPrice
    });

    return { basePrice, tax, discount, totalPrice };
  };

  // Handle payment method selection
  const handlePaymentMethodChange = (method: 'card' | 'upi' | 'cash') => {
    updateFormData({ paymentMethod: method });
  };

  // Apply promo code
  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ promoCode: e.target.value });
  };

  const applyPromoCode = () => {
    // Simple promo code logic (just for demo)
    if (formData.promoCode === 'FIRST10') {
      const discount = Math.round(formData.basePrice * 0.1);
      updateFormData({
        discount,
        totalPrice: formData.basePrice + formData.tax - discount
      });
    }
  };

  // Initialize form validation
  useEffect(() => {
    calculateFareBreakdown();
    setIsValid(!!formData.paymentMethod);
  }, [formData.basePrice, formData.paymentMethod]);

  const fareBreakdown = calculateFareBreakdown();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
        Payment Method
      </h3>
      <p className="text-gray-500 dark:text-gray-400">
        Choose how you want to pay for your ride
      </p>

      <div className="grid gap-6">
        {/* Payment methods */}
        <div className="grid gap-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.id}
                className={`flex items-center border rounded-lg p-4 cursor-pointer transition-colors ${
                  formData.paymentMethod === method.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => handlePaymentMethodChange(method.id as 'card' | 'upi' | 'cash')}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  formData.paymentMethod === method.id
                    ? 'bg-primary/10 text-primary'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="ml-4 flex-grow">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">{method.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{method.description}</p>
                </div>
                <div className="flex-shrink-0 ml-2">
                  <div className={`w-5 h-5 rounded-full border ${
                    formData.paymentMethod === method.id
                      ? 'border-primary bg-primary'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                  }`}>
                    {formData.paymentMethod === method.id && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Card details (if card is selected) */}
        {formData.paymentMethod === 'card' && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Note: Card details will be collected securely at the next step
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              We support all major cards including Visa, Mastercard, RuPay, and American Express
            </p>
          </div>
        )}

        {/* UPI details (if UPI is selected) */}
        {formData.paymentMethod === 'upi' && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              A UPI payment link will be sent to your phone before the trip
            </p>
          </div>
        )}

        {/* Cash details (if cash is selected) */}
        {formData.paymentMethod === 'cash' && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Please keep exact change ready for the driver
            </p>
          </div>
        )}

        {/* Promo code */}
        <div>
          <label
            htmlFor="promoCode"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Promo Code (Optional)
          </label>
          <div className="flex space-x-2">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="promoCode"
                name="promoCode"
                value={formData.promoCode || ''}
                onChange={handlePromoCodeChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 uppercase"
                placeholder="Enter promo code"
              />
            </div>
            <button
              type="button"
              onClick={applyPromoCode}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Apply
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Try code "FIRST10" for 10% off your first ride
          </p>
        </div>

        {/* Fare breakdown */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mt-4">
          <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Fare Breakdown</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Base Fare</span>
              <span className="text-gray-900 dark:text-gray-100">₹{fareBreakdown.basePrice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Taxes & Fees (5%)</span>
              <span className="text-gray-900 dark:text-gray-100">₹{fareBreakdown.tax}</span>
            </div>
            {fareBreakdown.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600 dark:text-green-400">Discount</span>
                <span className="text-green-600 dark:text-green-400">-₹{fareBreakdown.discount}</span>
              </div>
            )}
            <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2 flex justify-between font-medium">
              <span className="text-gray-800 dark:text-gray-200">Total Amount</span>
              <span className="text-primary text-lg">₹{fareBreakdown.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Payment notes */}
        <div className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
          <p>• Toll charges, if any, are not included and will be paid by the passenger directly</p>
          <p>• If your trip duration exceeds the estimate, additional charges may apply</p>
          <p>• A 5% cancellation fee applies for cancellations within 1 hour of the pickup time</p>
        </div>
      </div>
    </div>
  );
}
