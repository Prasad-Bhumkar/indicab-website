import React from "react";

"use client";

import dynamic from 'next/dynamic';

// Dynamically import the map components to avoid SSR issues
const _MapWithNoSSR = dynamic(
    () => import('./MapComponent'),
    {
        ssr: false,
        loading: (): JSX.Element => (
            <div className="flex items-center justify-center h-full bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto" />
                    <p className="mt-2 text-gray-600">Loading map...</p>
                </div>
            </div>
        )
    }
);

export default function ContactMap(): JSX.Element {
    return <_MapWithNoSSR />;
}
