'use client';

import dynamic from 'next/dynamic';

const BookingWizard = dynamic(
    () => import('./BookingWizard'),
    {
        ssr: false,
        loading: () => (
            <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 max-w-4xl mx-auto p-8 flex justify-center">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-32 mb-4" />
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-48 mb-2.5" />
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-40 mb-2.5" />
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md w-full mt-6" />
                </div>
            </div>
        )
    }
);

export default function BookingWizardWrapper() {
    return <BookingWizard />;
} 