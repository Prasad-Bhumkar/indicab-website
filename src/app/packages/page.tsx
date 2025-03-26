"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActionButton from '@/components/FloatingActionButton';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, Building2, Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';

const cities = [
  'All Cities',
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Chennai',
  'Hyderabad',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur'
];

const hourlyPackages = [
  {
    id: 'hourly-4',
    title: '4-Hour Package',
    price: '₹1,299',
    time: '4 hours',
    distance: '40 km',
    description: 'Perfect for short meetings, shopping trips, or brief city exploration',
    features: [
      'Available in all major cities',
      'Multiple car options (Sedan/SUV)',
      'Waiting time included',
      'Professional chauffeur',
      'Complimentary water bottles'
    ],
    availableCities: ['All Cities', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune']
  },
  {
    id: 'hourly-8',
    title: '8-Hour Package',
    price: '₹2,199',
    time: '8 hours',
    distance: '80 km',
    description: 'Ideal for full-day business meetings, family outings, or city exploration',
    features: [
      'Available in all major cities',
      'Multiple car options (Sedan/SUV)',
      'Waiting time included',
      'Professional chauffeur',
      'Complimentary water bottles',
      'Free cancellation up to 24 hours'
    ],
    availableCities: ['All Cities', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad']
  },
  {
    id: 'hourly-12',
    title: '12-Hour Package',
    price: '₹2,999',
    time: '12 hours',
    distance: '120 km',
    description: 'Comprehensive package for full-day activities with extended hours',
    features: [
      'Available in all major cities',
      'Multiple car options (Sedan/SUV/Premium)',
      'Waiting time included',
      'Professional chauffeur',
      'Complimentary water bottles and snacks',
      'Free cancellation up to 24 hours',
      'Multiple stops allowed'
    ],
    availableCities: ['All Cities', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Jaipur']
  }
];

const tourPackages = [
  {
    id: 'mumbai-city',
    title: 'Mumbai City Tour',
    price: '₹3,499',
    duration: 'Full day (10 hours)',
    type: 'Day Tour',
    description: 'Explore the highlights of Mumbai with our guided city tour',
    attractions: [
      'Gateway of India',
      'Marine Drive',
      'Hanging Gardens',
      'Dharavi Slum Tour (optional)',
      'Bollywood Film City (optional)'
    ],
    image: '/images/mumbai.jpg'
  },
  {
    id: 'delhi-agra',
    title: 'Delhi-Agra Taj Mahal Tour',
    price: '₹6,999',
    duration: '2 days, 1 night',
    type: 'Multi-day',
    description: 'Visit the magnificent Taj Mahal with an overnight Delhi-Agra tour',
    attractions: [
      'Taj Mahal',
      'Agra Fort',
      'Fatehpur Sikri',
      'Delhi Red Fort',
      'India Gate'
    ],
    image: '/images/taj-mahal.jpg'
  },
  {
    id: 'jaipur-tour',
    title: 'Jaipur Pink City Tour',
    price: '₹4,299',
    duration: 'Full day (10 hours)',
    type: 'Day Tour',
    description: 'Discover the royal heritage of Jaipur with our comprehensive city tour',
    attractions: [
      'Amber Fort',
      'Hawa Mahal',
      'City Palace',
      'Jantar Mantar',
      'Albert Hall Museum'
    ],
    image: '/images/jaipur.jpg'
  },
  {
    id: 'golden-triangle',
    title: 'Golden Triangle Tour',
    price: '₹18,999',
    duration: '4 days, 3 nights',
    type: 'Multi-day',
    description: 'Experience India\'s famous Golden Triangle covering Delhi, Agra and Jaipur',
    attractions: [
      'Delhi historical sites',
      'Taj Mahal & Agra Fort',
      'Jaipur palaces and forts',
      'Cultural experiences',
      'Local cuisine tastings'
    ],
    image: '/images/taj-mahal.jpg'
  }
];

const corporatePackages = [
  {
    id: 'corp-daily',
    title: 'Corporate Daily Commute',
    description: 'Regular employee transportation services with fixed routes and schedules',
    features: [
      'Dedicated corporate account manager',
      'Fleet of well-maintained vehicles',
      'Trained and verified drivers',
      'Real-time tracking',
      'Monthly billing with GST invoices',
      'Special rates for regular bookings'
    ]
  },
  {
    id: 'corp-events',
    title: 'Corporate Events & Conferences',
    description: 'Transportation solutions for corporate events, conferences, and team outings',
    features: [
      'Multiple vehicle types available',
      'Coordination for large groups',
      'Branded vehicles option',
      'Customized pickup and drop schedules',
      'On-site transportation manager',
      'Flexible payment options'
    ]
  },
  {
    id: 'corp-airport',
    title: 'Airport Corporate Services',
    description: 'Premium airport transfer services for executives and business clients',
    features: [
      'Flight tracking',
      'Meet & greet services',
      'Premium vehicle options',
      'Professional chauffeurs in formal attire',
      'Extended waiting time',
      'Priority booking'
    ]
  }
];

const faqs = [
  {
    question: 'How do I book a package?',
    answer: 'You can book any package through our website or mobile app. Simply select the package you\'re interested in, choose your preferred date, time, and vehicle type, and proceed to checkout.'
  },
  {
    question: 'What happens if I exceed the package time or distance limit?',
    answer: 'Additional charges apply for extra hours or kilometers beyond the package limit. The extra hour rate is approximately 15% of the base package hourly rate, and extra kilometers are charged at ₹12-15 per km depending on the vehicle type.'
  },
  {
    question: 'Can I customize a tour package?',
    answer: 'Yes, we offer customization options for all our tour packages. You can add or remove attractions, extend the duration, or upgrade your vehicle. Contact our customer service to create a personalized itinerary.'
  },
  {
    question: 'Do you provide guides for the tour packages?',
    answer: 'Our tour packages include a knowledgeable driver who can provide basic information about the destinations. Professional guides can be arranged at an additional cost upon request.'
  },
  {
    question: 'How can businesses sign up for corporate packages?',
    answer: 'Businesses can contact our corporate sales team through the website or by calling our corporate helpline. We\'ll assign a dedicated account manager who will understand your requirements and propose suitable packages.'
  }
];

export default function Packages() {
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [activeTab, setActiveTab] = useState('hourly');

  const filteredHourlyPackages = hourlyPackages.filter(
    pkg => pkg.availableCities.includes(selectedCity)
  );

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-green-800 to-green-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Packages</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-6">
            Choose from our range of flexible packages designed for every travel need
          </p>
          <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto"></div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-2 space-x-4">
            <button
              onClick={() => setActiveTab('hourly')}
              className={`px-4 py-2 font-medium whitespace-nowrap ${
                activeTab === 'hourly'
                  ? 'text-green-700 border-b-2 border-green-700'
                  : 'text-gray-600 hover:text-green-700'
              }`}
            >
              Hourly Packages
            </button>
            <button
              onClick={() => setActiveTab('tour')}
              className={`px-4 py-2 font-medium whitespace-nowrap ${
                activeTab === 'tour'
                  ? 'text-green-700 border-b-2 border-green-700'
                  : 'text-gray-600 hover:text-green-700'
              }`}
            >
              Tour Packages
            </button>
            <button
              onClick={() => setActiveTab('corporate')}
              className={`px-4 py-2 font-medium whitespace-nowrap ${
                activeTab === 'corporate'
                  ? 'text-green-700 border-b-2 border-green-700'
                  : 'text-gray-600 hover:text-green-700'
              }`}
            >
              Corporate Solutions
            </button>
          </div>
        </div>
      </div>

      {/* Hourly Packages Section */}
      {activeTab === 'hourly' && (
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center text-green-800 mb-6">Hourly Rental Packages</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
              Flexible hourly packages with professional drivers for all your local travel needs.
              Perfect for meetings, shopping, or exploring the city at your own pace.
            </p>

            {/* City Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {cities.map(city => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-4 py-1 rounded-full text-sm ${
                    selectedCity === city
                      ? 'bg-green-600 text-white'
                      : 'bg-green-50 text-green-800 hover:bg-green-100'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHourlyPackages.map(pkg => (
              <Card key={pkg.id} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="bg-green-50 p-6">
                  <div className="text-center">
                    <p className="text-sm text-green-700 uppercase tracking-wide font-medium">Hourly Rental</p>
                    <h3 className="text-2xl font-bold text-green-800 mt-1">{pkg.title}</h3>
                    <p className="text-3xl font-bold text-green-800 mt-2 mb-1">{pkg.price}</p>
                    <p className="text-gray-600 text-sm">Base package price</p>
                  </div>

                  <div className="flex justify-between mt-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-green-700 mr-1" />
                      <span>{pkg.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-green-700 mr-1" />
                      <span>{pkg.distance}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4">{pkg.description}</p>

                  <div className="space-y-2 mb-6">
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Link href="/booking" className="block w-full">
                      <Button className="w-full bg-green-700 hover:bg-green-800">
                        Book This Package
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tour Packages Section */}
      {activeTab === 'tour' && (
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center text-green-800 mb-6">Tour Packages</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
              Discover India's most beautiful destinations with our curated tour packages.
              Choose from day tours or multi-day adventures with experienced drivers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {tourPackages.map(pkg => (
              <Card key={pkg.id} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-60">
                  <div className="absolute inset-0 bg-gray-800 opacity-10 z-10 rounded-t-lg"></div>
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium z-20">
                    {pkg.type}
                  </div>
                  <div className="w-full h-full relative">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-green-800">{pkg.title}</h3>
                    <p className="text-xl font-bold text-green-800">{pkg.price}</p>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{pkg.duration}</span>
                  </div>

                  <p className="text-gray-600 mb-4">{pkg.description}</p>

                  <h4 className="font-medium text-gray-800 mb-2">Key Attractions:</h4>
                  <div className="space-y-1 mb-6">
                    {pkg.attractions.map((attraction, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{attraction}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex space-x-3">
                    <Link href={`/packages/${pkg.id}`} className="block flex-1">
                      <Button variant="outline" className="w-full border-green-700 text-green-700 hover:bg-green-50">
                        View Details
                      </Button>
                    </Link>
                    <Link href="/booking" className="block flex-1">
                      <Button className="w-full bg-green-700 hover:bg-green-800">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Corporate Solutions Section */}
      {activeTab === 'corporate' && (
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center text-green-800 mb-6">Corporate Transportation Solutions</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
              Reliable transportation services designed for businesses of all sizes.
              Streamline your corporate travel with our dedicated solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {corporatePackages.map(pkg => (
              <Card key={pkg.id} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="p-8 text-center border-b">
                  <Briefcase className="h-12 w-12 mx-auto text-green-700 mb-3" />
                  <h3 className="text-xl font-bold text-green-800 mb-2">{pkg.title}</h3>
                  <p className="text-gray-600">{pkg.description}</p>
                </div>

                <div className="p-6">
                  <h4 className="font-medium text-gray-800 mb-4">Features:</h4>
                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Link href="/contact" className="block w-full">
                      <Button className="w-full bg-green-700 hover:bg-green-800">
                        Get Custom Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-green-50 rounded-lg p-8 text-center">
            <Building2 className="h-12 w-12 mx-auto text-green-700 mb-3" />
            <h3 className="text-2xl font-bold text-green-800 mb-3">Need a Customized Corporate Solution?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Our corporate travel specialists can create a tailored transportation plan that meets your company's exact requirements and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-green-700 hover:bg-green-800">
                  Contact Our Corporate Team
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50">
                  Download Corporate Brochure
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Frequently Asked Questions</h2>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-green-700 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/help">
              <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50">
                View All FAQs
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingActionButton />
    </main>
  );
}
