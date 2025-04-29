'use client'
import { BookingProvider } from '../../context/BookingContext'
import BookingTest from '../../components/BookingTest'
import { useState, useEffect } from 'react'

export default function BookingTestPage() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching booking data
    const fetchBookingData = async () => {
      try {
        // Simulate API call
        await new Promise((resolve, reject) => setTimeout(resolve, 1000));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch booking data. Please try again later.');
      }
    };

    fetchBookingData();
  }, []);

  return (
    <BookingProvider>
      {error ? (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        ) : (
          <BookingTest />
        )}
    </BookingProvider>
  );
}