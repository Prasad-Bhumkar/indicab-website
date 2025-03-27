"use client";

import BookingHistory from '../../components/BookingHistory';
import { Suspense } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function BookingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Bookings</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <BookingHistory />
      </Suspense>
    </div>
  );
}