"use client";

import React from 'react';
import { Phone } from 'lucide-react';

const _HelpDesk = (): JSX.Element => {
    return (
        <section className="py-2 bg-white">
            <div className="container mx-auto flex justify-center items-center">
                <a
                    href="tel:+919876543210"
                    className="inline-flex items-center justify-center text-xs font-medium text-gray-600"
                >
                    <Phone className="mr-1 h-3 w-3 text-orange-500" />
                    <span className="text-orange-500">+91</span> 9876 543 210
                </a>
            </div>
        </section>
    );
};

export default _HelpDesk;
