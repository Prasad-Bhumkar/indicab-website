import React from "react";

'use client';

import Link from 'next/link';
// import { Button } from '@components/ui/Button';
import { Car } from 'lucide-react';

export default function NotFound(): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
            <div className="text-center">
                <div className="mb-4">
                    <Car className="h-16 w-16 text-primary mx-auto" />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
                <p className="text-gray-600 mb-8">Sorry, we couldn't find the page you're looking for.</p>
                <Link href="/" passHref>
                    <a className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded inline-block">
                        Go back home
                    </a>
                </Link>
            </div>
        </div>
    );
}
