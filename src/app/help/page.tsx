"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
  Phone,
  Mail,
  MessageCircle,
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Car,
  Calendar,
  CreditCard,
  AlertTriangle,
  MapPin,
  Shield,
  UserCheck
} from 'lucide-react';

// FAQ categories and questions
const faqCategories = [
  {
    name: 'Booking',
    icon: <Calendar className="h-5 w-5" />,
    questions: [
      {
        question: 'How do I book an intercity cab?',
        answer: 'You can book an intercity cab through our website or mobile app. Simply enter your pickup and drop locations, select the date and time, choose a car type, and confirm your booking. You\'ll receive a confirmation via SMS and email.'
      },
      {
        question: 'Can I book a cab for someone else?',
        answer: 'Yes, you can book a cab for someone else. During the booking process, you can add the passenger\'s details in the notes section, and our driver will contact them directly.'
      },
      {
        question: 'How far in advance should I book?',
        answer: 'We recommend booking at least 24 hours in advance to ensure availability, especially during peak seasons. However, we also accept last-minute bookings subject to driver availability.'
      },
      {
        question: 'Can I schedule a round trip?',
        answer: 'Yes, you can schedule a round trip by selecting the "Round Trip" option during booking. You can specify your return date and time, and the same driver will be assigned for your return journey.'
      }
    ]
  },
  {
    name: 'Pricing',
    icon: <CreditCard className="h-5 w-5" />,
    questions: [
      {
        question: 'How is the fare calculated?',
        answer: 'Our fares are calculated based on the distance between your pickup and drop locations, the type of vehicle selected, and any additional charges such as toll taxes, state permits, and driver allowances. You\'ll see a transparent breakdown before confirming your booking.'
      },
      {
        question: 'Are there any hidden charges?',
        answer: 'No, there are no hidden charges. All applicable charges are clearly shown in the fare breakup before you confirm your booking. Additional costs may only apply if you change your itinerary during the journey or extend the waiting time.'
      },
      {
        question: 'Do you offer any discounts or promotions?',
        answer: 'Yes, we regularly offer discounts and promotions for our loyal customers. You can check the "Offers" section in our app or website for current promotions. We also have corporate packages for business travel.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major payment methods including credit/debit cards, net banking, UPI, and digital wallets. You can also pay in cash directly to the driver at the end of your journey.'
      }
    ]
  },
  {
    name: 'Ride & Services',
    icon: <Car className="h-5 w-5" />,
    questions: [
      {
        question: 'What types of vehicles do you offer?',
        answer: 'We offer various vehicle types to suit different needs, including Compact cars, Premium Sedans, SUVs, and Luxury vehicles. Each category has different seating capacity and luggage space to accommodate your requirements.'
      },
      {
        question: 'Can I make stops during my journey?',
        answer: 'Yes, you can make stops during your journey. Simply inform your driver about planned stops. For longer stops (more than 30 minutes), additional waiting charges may apply as per our policy.'
      },
      {
        question: 'What if my travel plans change?',
        answer: 'You can modify or cancel your booking through our app or website. Modifications are subject to driver availability. For cancellations, please refer to our cancellation policy for applicable charges.'
      },
      {
        question: 'Do you provide child seats?',
        answer: 'Yes, we can arrange child seats upon request. Please mention this requirement while booking or contact our customer support at least 24 hours before your journey to ensure availability.'
      }
    ]
  },
  {
    name: 'Safety & Support',
    icon: <Shield className="h-5 w-5" />,
    questions: [
      {
        question: 'How do you ensure safety during the journey?',
        answer: 'All our drivers undergo thorough background verification and training. Our vehicles are regularly maintained and equipped with GPS tracking. We also have a 24/7 emergency support line and in-app SOS feature for immediate assistance.'
      },
      {
        question: 'What happens if there\'s a breakdown?',
        answer: 'In case of a vehicle breakdown, our driver will immediately arrange for an alternative vehicle to ensure your journey continues with minimal disruption. Our support team will keep you updated throughout the process.'
      },
      {
        question: 'How can I report an issue with my ride?',
        answer: 'You can report any issues through our app\'s "Help" section, by emailing support@indicab.com, or by calling our 24/7 customer service at +91 9876 543 210. All complaints are addressed within 24 hours.'
      },
      {
        question: 'Is my personal information secure?',
        answer: 'Yes, we take data privacy very seriously. Your personal information is encrypted and stored securely. We never share your details with third parties without your consent, in accordance with our privacy policy.'
      }
    ]
  }
];

// Common troubleshooting issues
const troubleshootingIssues = [
  {
    issue: 'App login problems',
    solution: 'Try
