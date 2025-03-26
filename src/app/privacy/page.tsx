"use client";

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Shield, Lock, FileText, Eye, Database, Server, AlertTriangle } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-gray-600">Last updated: March 22, 2025</p>
            </div>

            <Card className="p-8 mb-8">
              <div className="prose prose-lg max-w-none">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Lock className="h-5 w-5 text-primary mr-2" />
                    Introduction
                  </h2>
                  <p className="mb-4">
                    At IndiCab, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and services.
                  </p>
                  <p>
                    Please read this Privacy Policy carefully. By accessing or using our service, you acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this policy. If you do not agree with our policies, please do not access or use our services.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Database className="h-5 w-5 text-primary mr-2" />
                    Information We Collect
                  </h2>
                  <p className="mb-4">
                    We collect several types of information from and about users of our services, including:
                  </p>

                  <h3 className="text-lg font-medium mt-6 mb-3">Personal Information</h3>
                  <p className="mb-4">
                    When you create an account, make a booking, or use our services, we may collect:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Contact information (name, email address, phone number)</li>
                    <li>Account credentials (username and password)</li>
                    <li>Billing information (credit card details, billing address)</li>
                    <li>Travel information (pickup and drop locations, preferred vehicle type, travel dates)</li>
                    <li>Profile information (profile picture, saved addresses)</li>
                  </ul>

                  <h3 className="text-lg font-medium mt-6 mb-3">Usage Information</h3>
                  <p className="mb-4">
                    We automatically collect certain information about how you interact with our services:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Device information (device type, operating system, browser type)</li>
                    <li>Log data (IP address, access times, pages viewed)</li>
                    <li>Location data (with your permission)</li>
                    <li>Usage patterns and preferences</li>
                    <li>Communication history with our customer support</li>
                  </ul>

                  <h3 className="text-lg font-medium mt-6 mb-3">Location Information</h3>
                  <p>
                    With your consent, we collect precise location information from your device. This information is essential for providing our cab booking services, including matching you with nearby drivers, estimating arrival times, and tracking your ride progress.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Eye className="h-5 w-5 text-primary mr-2" />
                    How We Use Your Information
                  </h2>
                  <p className="mb-4">
                    We use the information we collect for various purposes, including:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li><strong>Providing our Services:</strong> Processing bookings, connecting you with drivers, facilitating payments, and managing your account.</li>
                    <li><strong>Improving our Services:</strong> Analyzing usage patterns to enhance our platform, troubleshooting issues, and developing new features.</li>
                    <li><strong>Communication:</strong> Sending booking confirmations, ride updates, receipts, support messages, and promotional content.</li>
                    <li><strong>Safety and Security:</strong> Verifying accounts, preventing fraud, and addressing potential security incidents.</li>
                    <li><strong>Personalization:</strong> Customizing your experience based on your preferences and past usage.</li>
                    <li><strong>Legal Compliance:</strong> Fulfilling legal obligations, enforcing our terms, and protecting our rights.</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Server className="h-5 w-5 text-primary mr-2" />
                    Information Sharing and Disclosure
                  </h2>
                  <p className="mb-4">
                    We may share your information with:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li><strong>Drivers and Service Providers:</strong> We share relevant booking details with drivers assigned to your ride. We also work with third-party service providers who help us provide, improve, and promote our services.</li>
                    <li><strong>Payment Processors:</strong> We share payment information with secure payment processing services to facilitate transactions.</li>
                    <li><strong>Business Partners:</strong> We may share information with business partners offering complementary services, such as hotels or tour operators, with your consent.</li>
                    <li><strong>Legal Requirements:</strong> We may disclose information in response to legal requests, court orders, or to comply with applicable laws.</li>
                    <li><strong>Business Transfers:</strong> If IndiCab is involved in a merger, acquisition, or asset sale, your information may be transferred as a business asset.</li>
                  </ul>
                  <p className="mb-4">
                    <strong>We do not sell your personal information to third parties for marketing purposes.</strong>
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Shield className="h-5 w-5 text-primary mr-2" />
                    Data Security
                  </h2>
                  <p className="mb-4">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Encryption of sensitive data both in transit and at rest</li>
                    <li>Secure networks and servers with access controls</li>
                    <li>Regular security assessments and audits</li>
                    <li>Employee training on data protection practices</li>
                    <li>Incident response procedures</li>
                  </ul>
                  <p>
                    However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FileText className="h-5 w-5 text-primary mr-2" />
                    Your Data Rights
                  </h2>
                  <p className="mb-4">
                    Depending on your location, you may have certain rights regarding your personal information:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li><strong>Access:</strong> You can request access to the personal information we hold about you.</li>
                    <li><strong>Correction:</strong> You can request correction of inaccurate or incomplete information.</li>
                    <li><strong>Deletion:</strong> You can request deletion of your personal information in certain circumstances.</li>
                    <li><strong>Restriction:</strong> You can request that we restrict processing of your data in certain situations.</li>
                    <li><strong>Data Portability:</strong> You can request a copy of your data in a structured, commonly used, and machine-readable format.</li>
                    <li><strong>Objection:</strong> You can object to processing of your personal data in certain circumstances.</li>
                  </ul>
                  <p className="mb-4">
                    To exercise these rights, please contact us using the information provided at the end of this policy. We will respond to your request within the timeframe specified by applicable law.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
                  <p className="mb-4">
                    We use cookies and similar tracking technologies to track activity on our service and store certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
                  </p>
                  <p className="mb-4">
                    You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
                  </p>
                  <p>
                    We use cookies for various purposes, including remembering your preferences, analyzing how you use our service, and providing personalized content.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Children's Privacy</h2>
                  <p className="mb-4">
                    Our services are not intended for use by children under the age of 18. We do not knowingly collect personally identifiable information from children under 18. If you are a parent or guardian and you believe your child has provided us with personal information, please contact us so that we can take necessary actions.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Changes to This Privacy Policy</h2>
                  <p className="mb-4">
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top.
                  </p>
                  <p>
                    You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 text-primary mr-2" />
                    International Data Transfers
                  </h2>
                  <p className="mb-4">
                    Your information may be transferred to and processed in countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country.
                  </p>
                  <p>
                    However, we will take appropriate measures to ensure that your personal information remains protected in accordance with this Privacy Policy and applicable data protection laws.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                  <p className="mb-4">
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <p className="mb-1">IndiCab PRIVATE LIMITED</p>
                  <p className="mb-1">123 Business Park, Sector 14</p>
                  <p className="mb-1">New Delhi, 110001</p>
                  <p className="mb-1">Email: privacy@indicab.com</p>
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
