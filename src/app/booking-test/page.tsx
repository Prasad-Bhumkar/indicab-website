'use client'
import { BookingProvider } from '../../context/BookingContext'
import BookingTest from '../../components/BookingTest'
import { useState, useEffect } from 'react'

export default function BookingTestPage(): JSX.Element {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Simulate fetching booking data
        const _fetchBookingData = async () => {
            try {
                // Simulate API call
                await new Promise((_resolve, reject) => setTimeout(_resolve, 1000));
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch booking data. Please try again later.');
            }
        };

        _fetchBookingData();
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
