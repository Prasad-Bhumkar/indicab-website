import React from "react";

"use client";

import Link from 'next/link';

export default function Header(): JSX.Element {
    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-8">
                    <Link href="/" className="text-xl font-bold">
                        IndiCab
                    </Link>
                    <nav className="hidden md:flex space-x-6">
                        <Link href="/bookings" className="text-sm font-medium hover:text-primary transition-colors">
                            My Bookings
                        </Link>
                    </nav>
                </div>
                <div>
                    <button className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium">
                        Sign In
                    </button>
                </div>
            </div>
        </header>
    );
}
