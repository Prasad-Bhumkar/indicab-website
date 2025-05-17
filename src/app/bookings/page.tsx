"use client";

import _BookingHistory from '../../components/features/booking/BookingHistory';
import { Suspense } from 'react';
import _LoadingSpinner from '../../components/LoadingSpinner';

export default function BookingsPage(): JSX.Element {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Your Bookings</h1>
            <Suspense fallback={<_LoadingSpinner />}>
                <_BookingHistory />
            </Suspense>
        </div>
    );
}
