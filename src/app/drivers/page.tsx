import React from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActionButton from '@/components/FloatingActionButton';
import Link from 'next/link';
import Image from 'next/image';
import DriverApplicationForm from '@/components/DriverApplicationForm';
import { CheckCircle, Star, CreditCard, Clock, Shield } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Join IndiCab as a Driver Partner | Driver Application',
    description: 'Apply to become an IndiCab driver partner. Enjoy flexible working hours, competitive earnings, and consistent rides across major Indian cities.',
    keywords: ['driver application', 'cab driver jobs', 'driver partner', 'taxi driver opportunity', 'flexible driving jobs'],
    openGraph: {
        title: 'Join IndiCab as a Driver Partner | Driver Application',
        description: 'Apply to become an IndiCab driver partner. Enjoy flexible working hours, competitive earnings, and consistent rides.',
        images: ['/indicab-logo.png'],
        type: 'website',
    },
};

export default function Drivers(): JSX.Element {
    return (
        <main>
            <Header />

            <div className="bg-gradient-to-b from-green-800 to-green-700 py-16 text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Drive with IndiCab</h1>
                            <p className="text-xl mb-6">Join India's most trusted intercity cab service network and boost your income</p>
                            <div className="w-20 h-1 bg-orange-500 rounded-full mb-6"></div>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <CheckCircle className="text-orange-400 mr-3 mt-1 flex-shrink-0" />
                                    <p>Access to consistent rides across 50+ cities in India</p>
                                </div>
                                <div className="flex items-start">
                                    <CheckCircle className="text-orange-400 mr-3 mt-1 flex-shrink-0" />
                                    <p>Weekly payments with zero payment delays</p>
                                </div>
                                <div className="flex items-start">
                                    <CheckCircle className="text-orange-400 mr-3 mt-1 flex-shrink-0" />
                                    <p>Flexible working hours to suit your schedule</p>
                                </div>
                                <div className="flex items-start">
                                    <CheckCircle className="text-orange-400 mr-3 mt-1 flex-shrink-0" />
                                    <p>24/7 support for all driver partners</p>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block relative h-96">
                            <Image
                                src="/images/driver-hero.jpg"
                                alt="IndiCab Driver Partner"
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Why Drive with IndiCab?</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CreditCard className="h-8 w-8 text-green-700" />
                        </div>
                        <h3 className="text-xl font-bold text-green-800 mb-2">Better Earnings</h3>
                        <p className="text-gray-600">
                            Earn up to ₹45,000 per month with consistent intercity rides and additional incentives for excellent service.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="h-8 w-8 text-green-700" />
                        </div>
                        <h3 className="text-xl font-bold text-green-800 mb-2">Flexible Hours</h3>
                        <p className="text-gray-600">
                            Choose your own working hours and accept rides according to your convenience. Work full-time or part-time.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Star className="h-8 w-8 text-green-700" />
                        </div>
                        <h3 className="text-xl font-bold text-green-800 mb-2">Growth Opportunities</h3>
                        <p className="text-gray-600">
                            Build your ratings and reputation to access premium rides, special incentives, and career advancement.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield className="h-8 w-8 text-green-700" />
                        </div>
                        <h3 className="text-xl font-bold text-green-800 mb-2">Safety & Support</h3>
                        <p className="text-gray-600">
                            Driver safety is our priority with 24/7 emergency assistance, health insurance benefits, and road support.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-green-800 mb-3">Apply to Become a Driver Partner</h2>
                        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                            Fill out the form below to start your application. Our team will review your information and contact you within 48 hours.
                        </p>

                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <DriverApplicationForm />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center text-green-800 mb-12">What Our Driver Partners Say</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex text-orange-400 mb-4">
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                        </div>
                        <p className="text-gray-600 mb-4">
                            "Since joining IndiCab, my monthly income has increased by 40%. The consistent intercity bookings and weekly payment system have really helped me provide better for my family."
                        </p>
                        <div className="flex items-center">
                            <div className="bg-green-100 h-12 w-12 rounded-full flex items-center justify-center text-green-800 font-bold text-xl mr-3">
                                RK
                            </div>
                            <div>
                                <p className="font-medium">Rajesh Kumar</p>
                                <p className="text-sm text-gray-500">Driver Partner for 2 years</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex text-orange-400 mb-4">
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                        </div>
                        <p className="text-gray-600 mb-4">
                            "The flexibility of choosing my own rides and working hours is what I value most. I can now spend more time with my family while still earning a good income. The IndiCab team is always supportive."
                        </p>
                        <div className="flex items-center">
                            <div className="bg-green-100 h-12 w-12 rounded-full flex items-center justify-center text-green-800 font-bold text-xl mr-3">
                                SP
                            </div>
                            <div>
                                <p className="font-medium">Sunil Patil</p>
                                <p className="text-sm text-gray-500">Driver Partner for 1.5 years</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex text-orange-400 mb-4">
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                        </div>
                        <p className="text-gray-600 mb-4">
                            "The driver app is very easy to use, and the navigation system helps me reach destinations without any hassle. The bonus incentives for maintaining high ratings are a great motivation."
                        </p>
                        <div className="flex items-center">
                            <div className="bg-green-100 h-12 w-12 rounded-full flex items-center justify-center text-green-800 font-bold text-xl mr-3">
                                VT
                            </div>
                            <div>
                                <p className="font-medium">Vijay Tiwari</p>
                                <p className="text-sm text-gray-500">Driver Partner for 3 years</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-green-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Frequently Asked Questions</h2>

                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold text-green-700 mb-2">What are the requirements to become an IndiCab driver?</h3>
                            <p className="text-gray-600">
                                You need to be at least 21 years old, have a valid Indian driving license with minimum 3 years of experience, clean driving record, commercial vehicle registration, and vehicle insurance. Your car should not be more than 7 years old.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold text-green-700 mb-2">How much can I earn as an IndiCab driver?</h3>
                            <p className="text-gray-600">
                                Earnings vary based on the number of rides, distance, and city, but our driver partners typically earn between ₹25,000 to ₹45,000 per month. Top-performing drivers with excellent ratings can earn even more through incentives.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold text-green-700 mb-2">How often will I get paid?</h3>
                            <p className="text-gray-600">
                                IndiCab processes payments weekly. All earnings from Monday to Sunday are transferred to your bank account by Tuesday of the following week. You can track your earnings in real-time through the driver app.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold text-green-700 mb-2">What if I don't own a car?</h3>
                            <p className="text-gray-600">
                                IndiCab has partnered with several vehicle financing companies to help you get a car at affordable rates. We also have a car leasing program for eligible drivers. Contact our support team for more details.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold text-green-700 mb-2">How long does the application process take?</h3>
                            <p className="text-gray-600">
                                Once you submit your application, our team will review it within 48 hours. The entire process, including document verification and vehicle inspection, usually takes 5-7 days before you can start accepting rides.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            <FloatingActionButton />
        </main>
    );
}
