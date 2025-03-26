"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import {
  Users,
  Target,
  Award,
  ThumbsUp,
  Shield,
  Clock,
  MapPin,
  Car,
  Phone,
  Mail,
  MessageCircle,
  Eye
} from 'lucide-react';

// Team member data
const teamMembers = [
  {
    name: 'Rahul Sharma',
    position: 'Founder & CEO',
    image: '/images/team/rahul.jpg',
    bio: 'With over 15 years in the transportation industry, Rahul founded IndiCab with a vision to transform intercity travel in India.'
  },
  {
    name: 'Priya Patel',
    position: 'Chief Operations Officer',
    image: '/images/team/priya.jpg',
    bio: 'Priya oversees all operations, ensuring our service quality meets the highest standards across all cities we serve.'
  },
  {
    name: 'Amit Singh',
    position: 'Chief Technology Officer',
    image: '/images/team/amit.jpg',
    bio: 'Leading our technical team, Amit is responsible for our cutting-edge booking platform and driver applications.'
  },
  {
    name: 'Neha Gupta',
    position: 'Customer Experience Director',
    image: '/images/team/neha.jpg',
    bio: 'Neha ensures every customer journey is smooth from booking to destination, heading our customer support team.'
  }
];

// Company values
const companyValues = [
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: 'Safety First',
    description: 'Every ride is equipped with real-time tracking, verified drivers, and 24/7 emergency support.'
  },
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
    title: 'Reliability',
    description: 'Punctuality is our promise. We ensure on-time pickups and transparent ETAs.'
  },
  {
    icon: <ThumbsUp className="h-6 w-6 text-primary" />,
    title: 'Customer Satisfaction',
    description: 'Your comfort is our priority, from clean vehicles to courteous drivers.'
  },
  {
    icon: <MapPin className="h-6 w-6 text-primary" />,
    title: 'Local Expertise',
    description: 'Our drivers are local experts who know the best routes and hidden shortcuts.'
  },
  {
    icon: <Award className="h-6 w-6 text-primary" />,
    title: 'Quality Service',
    description: 'Well-maintained vehicles and professional drivers ensure a premium experience.'
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: 'Community Focus',
    description: 'We empower local drivers while connecting communities across India.'
  }
];

// Milestones
const milestones = [
  { year: '2015', achievement: 'Founded in Delhi with just 10 cars' },
  { year: '2016', achievement: 'Expanded to Mumbai and Bangalore' },
  { year: '2017', achievement: 'Launched our mobile app' },
  { year: '2018', achievement: 'Reached 100,000 completed trips' },
  { year: '2019', achievement: 'Expanded to 10 major cities across India' },
  { year: '2020', achievement: 'Implemented enhanced safety protocols during pandemic' },
  { year: '2021', achievement: 'Reached 1 million completed rides' },
  { year: '2022', achievement: 'Introduced electric vehicles to our fleet' },
  { year: '2023', achievement: 'Expanded to 25 cities across India' },
  { year: '2024', achievement: 'Launched premium intercity services' }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero section */}
        <section className="relative bg-primary text-white py-16">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">About IndiCab</h1>
              <p className="text-lg mb-6">
                India's trusted intercity cab service connecting people and places since 2015
              </p>
              <div className="flex justify-center space-x-4">
                <div className="flex items-center">
                  <Car className="h-5 w-5 mr-2" />
                  <span>1M+ Rides</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>25+ Cities</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>10K+ Drivers</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-[url('/images/cloud-bg.png')] bg-repeat-x bg-bottom"></div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Our Story</h2>
                <div className="w-20 h-1 bg-primary mx-auto"></div>
              </div>

              <div className="mb-8">
                <p className="text-gray-700 mb-4">
                  IndiCab was born out of a simple yet powerful vision: to make intercity travel in India safer, more reliable, and more comfortable for everyone. Founded in 2015 by Rahul Sharma, a transportation industry veteran, IndiCab started with just 10 cars in Delhi.
                </p>
                <p className="text-gray-700 mb-4">
                  What began as a small operation has grown into India's leading intercity cab service, now operating in 25 cities across the country. Our journey has been driven by a commitment to excellence and a deep understanding of the unique challenges of Indian roads and travel needs.
                </p>
                <p className="text-gray-700">
                  Today, we're proud to have completed over 1 million rides, connecting families, business travelers, and tourists to destinations across India. With a network of over 10,000 carefully selected and trained drivers, we continue to expand our services while maintaining our core values of safety, reliability, and customer satisfaction.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Target className="h-5 w-5 text-primary mr-2" />
                    Our Mission
                  </h3>
                  <p className="text-gray-700">
                    To provide the safest, most reliable intercity transportation service in India, connecting people and places with comfort and care. We aim to transform how India travels between cities by offering a service that people can trust completely.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Eye className="h-5 w-5 text-primary mr-2" />
                    Our Vision
                  </h3>
                  <p className="text-gray-700">
                    To become the most trusted name in Indian transportation, known for excellence, innovation, and customer care. We envision a future where intercity travel is no longer stressful but is instead an enjoyable part of the journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Our Values</h2>
                <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
                <p className="text-gray-600">The principles that guide every decision we make</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {companyValues.map((value, index) => (
                  <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 bg-primary/10 rounded-full mb-4">
                        {value.icon}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Company Milestones */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Our Journey</h2>
                <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Key milestones in our growth over the years</p>
              </div>

              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-0 md:left-1/2 top-0 h-full w-px bg-gray-300 transform -translate-x-1/2"></div>

                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                    <div key={index} className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="flex-1 md:text-right px-6 md:px-12">
                        {index % 2 === 0 ? (
                          <div className="md:pl-12">
                            <h3 className="text-xl font-bold text-primary mb-1">{milestone.year}</h3>
                            <p className="text-gray-700">{milestone.achievement}</p>
                          </div>
                        ) : (
                          <div className="md:pr-12">
                            <h3 className="text-xl font-bold text-primary mb-1">{milestone.year}</h3>
                            <p className="text-gray-700">{milestone.achievement}</p>
                          </div>
                        )}
                      </div>

                      {/* Center dot */}
                      <div className="absolute left-0 md:left-1/2 top-0 w-5 h-5 bg-primary rounded-full transform -translate-x-1/2 md:mt-1"></div>

                      <div className="flex-1 px-6 md:px-12">
                        {/* Empty div for layout */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Our Leadership Team</h2>
                <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Meet the people driving IndiCab forward</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/3 h-48 md:h-auto relative bg-gray-200">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                          <Users className="h-12 w-12" />
                        </div>
                      </div>
                      <div className="p-6 flex-1">
                        <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                        <p className="text-primary text-sm mb-3">{member.position}</p>
                        <p className="text-gray-600 text-sm">{member.bio}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Get In Touch</h2>
                <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Have questions? We'd love to hear from you</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="p-6 text-center">
                  <div className="flex flex-col items-center">
                    <div className="p-3 bg-primary/10 rounded-full mb-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                    <p className="text-gray-600">+91 9876 543 210</p>
                    <p className="text-gray-600">+91 1140 154 754</p>
                  </div>
                </Card>

                <Card className="p-6 text-center">
                  <div className="flex flex-col items-center">
                    <div className="p-3 bg-primary/10 rounded-full mb-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                    <p className="text-gray-600">info@indicab.com</p>
                    <p className="text-gray-600">support@indicab.com</p>
                  </div>
                </Card>

                <Card className="p-6 text-center">
                  <div className="flex flex-col items-center">
                    <div className="p-3 bg-primary/10 rounded-full mb-4">
                      <MessageCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                    <p className="text-gray-600">Available 24/7</p>
                    <Link href="/contact" className="text-primary hover:underline mt-2">
                      Start Chat
                    </Link>
                  </div>
                </Card>
              </div>

              <div className="mt-12 text-center">
                <Link
                  href="/contact"
                  className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
