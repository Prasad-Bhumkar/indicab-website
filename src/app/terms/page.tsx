"use client";

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Shield, Book, AlertTriangle, Clipboard, FileText } from 'lucide-react';

export default function TermsPage(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8 text-center">
                            <h1 className="text-2xl md:text-3xl font-bold mb-4">Terms and Conditions</h1>
                            <p className="text-gray-600">Last updated: March 22, 2025</p>
                        </div>

                        <Card className="p-8 mb-8">
                            <div className="prose prose-lg max-w-none">
                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                                        <Book className="h-5 w-5 text-primary mr-2" />
                                        Introduction
                                    </h2>
                                    <p className="mb-4">
                                        Welcome to IndiCab. These Terms and Conditions govern your use of our website, mobile applications, and services. By accessing or using IndiCab's services, you agree to be bound by these Terms and Conditions. Please read them carefully.
                                    </p>
                                    <p>
                                        If you do not agree with any part of these terms, please do not use our services. The Company reserves the right to modify these terms at any time, and such modifications shall be effective immediately upon posting on the website or application.
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                                        <Shield className="h-5 w-5 text-primary mr-2" />
                                        User Accounts
                                    </h2>
                                    <p className="mb-4">
                                        To use certain features of our service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account details and password. You agree to accept responsibility for all activities that occur under your account.
                                    </p>
                                    <p className="mb-4">
                                        You must provide accurate, current, and complete information during the registration process. If we have reasonable grounds to suspect that your information is inaccurate, incomplete, or outdated, we may suspend or terminate your account and refuse your current or future use of our services.
                                    </p>
                                    <p>
                                        You may not share your account credentials with any third party. You agree to notify us immediately of any unauthorized access to or use of your username or password or any other breach of security.
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                                        <Clipboard className="h-5 w-5 text-primary mr-2" />
                                        Booking and Cancellation
                                    </h2>
                                    <p className="mb-4">
                                        <strong>Booking:</strong> When you make a booking through our platform, you enter into a direct agreement with the driver or transportation service provider. We act as an intermediary facilitating this transaction.
                                    </p>
                                    <p className="mb-4">
                                        <strong>Confirmation:</strong> A booking is only confirmed once you receive a confirmation notification from us, either through the app, SMS, or email.
                                    </p>
                                    <p className="mb-4">
                                        <strong>Cancellation by User:</strong> If you need to cancel a confirmed booking, the following cancellation fees may apply:
                                    </p>
                                    <ul className="list-disc pl-6 mb-4">
                                        <li>Cancellation more than 24 hours before pickup: No charge</li>
                                        <li>Cancellation between 12-24 hours before pickup: 25% of the total fare</li>
                                        <li>Cancellation between 1-12 hours before pickup: 50% of the total fare</li>
                                        <li>Cancellation less than 1 hour before pickup or no-show: 100% of the total fare</li>
                                    </ul>
                                    <p className="mb-4">
                                        <strong>Cancellation by Driver:</strong> In the rare event that a driver cancels a confirmed booking, we will make every effort to find an alternative driver for you. If no alternative is available, you will receive a full refund of any pre-paid amount.
                                    </p>
                                    <p>
                                        <strong>Modification:</strong> Modifications to existing bookings are subject to availability and may incur additional charges if there is a change in the fare.
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                                        <FileText className="h-5 w-5 text-primary mr-2" />
                                        Payment Terms
                                    </h2>
                                    <p className="mb-4">
                                        <strong>Fare:</strong> The fare displayed at the time of booking is an estimate based on the information provided. The final fare may vary due to additional waiting time, route changes, or other variables.
                                    </p>
                                    <p className="mb-4">
                                        <strong>Payment Methods:</strong> We accept various payment methods including credit/debit cards, net banking, UPI, and cash. For certain bookings, we may require a partial or full advance payment.
                                    </p>
                                    <p className="mb-4">
                                        <strong>Additional Charges:</strong> Additional charges may apply for:
                                    </p>
                                    <ul className="list-disc pl-6 mb-4">
                                        <li>Toll taxes and state permit fees</li>
                                        <li>Waiting time beyond the allowed free period</li>
                                        <li>Additional kilometers beyond the package limit</li>
                                        <li>Driver night allowance for late-night journeys</li>
                                        <li>Special requests like child seats or luggage carriers</li>
                                    </ul>
                                    <p>
                                        <strong>Refunds:</strong> Refunds for eligible cancellations or service issues will be processed within 5-7 business days, depending on your payment method and bank processing times.
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                                        <AlertTriangle className="h-5 w-5 text-primary mr-2" />
                                        User Conduct and Responsibilities
                                    </h2>
                                    <p className="mb-4">
                                        As a user of our services, you agree to:
                                    </p>
                                    <ul className="list-disc pl-6 mb-4">
                                        <li>Provide accurate information when making a booking</li>
                                        <li>Be present at the pickup location at the scheduled time</li>
                                        <li>Treat drivers with respect and courtesy</li>
                                        <li>Not engage in any illegal, harmful, or disruptive behavior during the journey</li>
                                        <li>Not transport illegal or dangerous items</li>
                                        <li>Comply with all applicable laws and regulations</li>
                                        <li>Wear seatbelts and follow safety instructions</li>
                                        <li>Pay all charges incurred in connection with your booking</li>
                                    </ul>
                                    <p>
                                        We reserve the right to refuse service, terminate accounts, or cancel bookings if users engage in inappropriate behavior or violate these terms.
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold mb-4">Liability</h2>
                                    <p className="mb-4">
                                        <strong>Service Limitations:</strong> While we strive to provide reliable and quality service, we cannot guarantee that our services will be uninterrupted, timely, secure, or error-free.
                                    </p>
                                    <p className="mb-4">
                                        <strong>Personal Property:</strong> We are not responsible for any loss or damage to personal property during the journey. It is your responsibility to ensure you have all your belongings when exiting the vehicle.
                                    </p>
                                    <p>
                                        <strong>Limitation of Liability:</strong> To the maximum extent permitted by law, IndiCab and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from or in connection with your use of our services.
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold mb-4">Privacy Policy</h2>
                                    <p className="mb-4">
                                        Our Privacy Policy describes how we collect, use, and disclose information about you. By using our services, you consent to the collection and use of information as described in our Privacy Policy.
                                    </p>
                                    <p>
                                        For more information, please refer to our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold mb-4">Intellectual Property</h2>
                                    <p className="mb-4">
                                        The Service and its original content, features, and functionality are and will remain the exclusive property of IndiCab and its licensors. The Service is protected by copyright, trademark, and other laws.
                                    </p>
                                    <p>
                                        Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of IndiCab.
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold mb-4">Governing Law</h2>
                                    <p className="mb-4">
                                        These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                                    </p>
                                    <p>
                                        Any disputes arising under these Terms will be subject to the exclusive jurisdiction of the courts located in Delhi, India.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                                    <p className="mb-4">
                                        If you have any questions about these Terms, please contact us at:
                                    </p>
                                    <p className="mb-1">IndiCab PRIVATE LIMITED</p>
                                    <p className="mb-1">123 Business Park, Sector 14</p>
                                    <p className="mb-1">New Delhi, 110001</p>
                                    <p className="mb-1">Email: legal@indicab.com</p>
                                    <p>Phone: +91 11 4015 4754</p>
                                </div>
                            </div>
                        </Card>

                        <div className="flex justify-center">
                            <Link href="/" className="text-primary hover:underline flex items-center">
                                <svg className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
