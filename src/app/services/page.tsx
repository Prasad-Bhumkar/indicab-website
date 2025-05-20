"use client";

import {
    Briefcase,
    Building2,
    Car,
    Clock,
    Crown,
    Gift,
    Plane,
    Settings,
    ShieldCheck,
    Users
} from 'lucide-react';
import Image from 'next/image'; // Importing Image component
import Link from 'next/link';

import _Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import { Card } from '@/components/ui';
import { Button } from '@/components/ui/button';

// Service types data
const _serviceTypes = [
    {
        id: 'intercity',
        title: 'Intercity Travel',
        icon: <Car className="h-8 w-8 text-primary mb-4" />,
        description: 'Comfortable and reliable cab service for traveling between cities.',
        features: [
            'One-way and round trips available',
            'Multiple vehicle options',
            'Experienced drivers familiar with routes',
            'Transparent pricing with no hidden charges',
            '24/7 customer support during the journey'
        ],
        cta: 'Book Intercity Cab'
    },
    {
        id: 'airport',
        title: 'Airport Transfers',
        icon: <Plane className="h-8 w-8 text-primary mb-4" />,
        description: 'Hassle-free airport pickup and drop services for a smooth travel experience.',
        features: [
            'Meet and greet at airport arrivals',
            'Flight tracking to adjust for delays',
            'Complimentary waiting time',
            'Assistance with luggage',
            'Pre-booking available for peace of mind'
        ],
        cta: 'Book Airport Transfer'
    },
    {
        id: 'corporate',
        title: 'Corporate Travel',
        icon: <Briefcase className="h-8 w-8 text-primary mb-4" />,
        description: 'Tailored transportation solutions for businesses and corporate clients.',
        features: [
            'Corporate accounts with monthly billing',
            'Employee travel management',
            'GST invoicing available',
            'Dedicated account manager',
            'Customized packages for regular travel'
        ],
        cta: 'Enquire About Corporate Services'
    },
    {
        id: 'tourPackages',
        title: 'Tour Packages',
        icon: <Gift className="h-8 w-8 text-primary mb-4" />,
        description: 'Curated tour packages for exploring popular destinations with experienced drivers.',
        features: [
            'Full-day and multi-day tour options',
            'Local sightseeing expertise',
            'Customizable itineraries',
            'Hotel recommendations and bookings',
            'Group discounts available'
        ],
        cta: 'Explore Tour Packages'
    }
];

// Vehicle types
const _vehicleTypes = [
    {
        name: 'Economy',
        description: 'Affordable and comfortable cars for basic travel needs.',
        capacity: '4 passengers, 2 luggage',
        idealFor: 'Solo travelers, Small families, Budget trips',
        examples: 'Swift Dzire, Honda Amaze',
        image: '/images/cars/swift/swift-blue.jpg'
    },
    {
        name: 'Premium Sedan',
        description: 'Spacious sedans offering added comfort for longer journeys.',
        capacity: '4 passengers, 3 luggage',
        idealFor: 'Business travelers, Family trips, Long journeys',
        examples: 'Honda City, Maruti Ciaz',
        image: '/images/cars/swift/swift-red.jpg'
    },
    {
        name: 'SUV',
        description: 'Robust vehicles with ample space for passengers and luggage.',
        capacity: '6-7 passengers, 4 luggage',
        idealFor: 'Group travels, Family vacations, Hilly terrain',
        examples: 'Toyota Innova, Maruti Ertiga',
        image: '/images/cars/toyota/innova-white.jpg'
    },
    {
        name: 'Luxury',
        description: 'Premium vehicles offering ultimate comfort and style.',
        capacity: '4 passengers, 3 luggage',
        idealFor: 'Business executives, Special occasions, Premium travel',
        examples: 'Mercedes E-Class, BMW 5 Series',
        image: '/images/cars/toyota/innova-zenix.jpg'
    }
];

// Additional services
const _additionalServices = [
    {
        icon: <ShieldCheck className="h-6 w-6 text-primary" />,
        title: 'Safety Features',
        description: 'GPS tracking, SOS button, verified drivers, and regular vehicle inspections for your safety.'
    },
    {
        icon: <Clock className="h-6 w-6 text-primary" />,
        title: 'Scheduled Bookings',
        description: 'Plan your trips in advance with our scheduled booking feature.'
    },
    {
        icon: <Crown className="h-6 w-6 text-primary" />,
        title: 'Premium Membership',
        description: 'Join our premium membership program for exclusive benefits, discounts, and priority booking.'
    },
    {
        icon: <Building2 className="h-6 w-6 text-primary" />,
        title: 'Hotel Partnerships',
        description: 'Get special discounts at partner hotels when you book through IndiCab.'
    },
    {
        icon: <Settings className="h-6 w-6 text-primary" />,
        title: 'Customized Packages',
        description: 'Tailor your travel experience with our customizable packages.'
    },
    {
        icon: <Users className="h-6 w-6 text-primary" />,
        title: 'Group Bookings',
        description: 'Special rates and multiple vehicles for group travel and events.'
    }
];

// FAQ section
const _faqs = [
    {
        question: 'How do I book an intercity cab?',
        answer: 'You can book an intercity cab through our website or mobile app. Simply enter your pickup and drop locations, select the date and time, choose a car type, and confirm your booking.'
    },
    {
        question: 'What are the payment options available?',
        answer: 'We accept multiple payment methods including credit/debit cards, net banking, UPI, digital wallets, and cash payments to the driver.'
    },
    {
        question: 'Can I book a cab for someone else?',
        answer: 'Yes, you can book a cab for someone else. During the booking process, you can provide the passenger&apos;s contact details in the notes section.'
    },
    {
        question: 'What is your cancellation policy?',
        answer: 'Our cancellation policy varies based on how much in advance you cancel. Cancellations made 24 hours before the journey are fully refunded. For detailed policy, please refer to our Terms and Conditions.'
    }
];

export default function ServicesPage(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative bg-primary text-white py-16">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h1>
                            <p className="text-lg mb-6">
                                Reliable and comfortable transportation solutions for all your travel needs
                            </p>
                            <Link
                                href="/"
                                className="inline-block bg-white text-primary font-medium py-2 px-6 rounded-md hover:bg-gray-100 transition-colors"
                            >
                                Book a Ride Now
                            </Link>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-black opacity-20" />
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-[url('/images/cloud-bg.png')] bg-repeat-x bg-bottom" />
                </section>

                {/* Main Services Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Transportation Services</h2>
                            <p className="text-gray-600 max-w-3xl mx-auto">
                                IndiCab offers a range of transportation services designed to meet your various travel needs. From city-to-city travel to specialized corporate services, we&apos;ve got you covered.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {_serviceTypes.map((service): JSX.Element => (
                                <Card key={service.id} className="overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex flex-col items-center text-center mb-4">
                                            {service.icon}
                                            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                            <p className="text-gray-600 mb-4">{service.description}</p>
                                        </div>

                                        <ul className="mb-6 space-y-2">
                                            {service.features.map((_feature, _index): JSX.Element => (
                                                <li key={_index} className="flex items-start">
                                                    <div className="text-primary mr-2 mt-1">✓</div>
                                                    <span>{_feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="text-center">
                                            <Link href="/">
                                                <Button className="bg-primary hover:bg-primary/90 text-white">
                                                    {service.cta}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Vehicle Types */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Our Fleet</h2>
                            <p className="text-gray-600 max-w-3xl mx-auto">
                                Choose from our diverse range of vehicles to match your specific requirements and comfort preferences.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {_vehicleTypes.map((vehicle, _index): JSX.Element => (
                                <Card key={_index} className="overflow-hidden">
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold mb-2">{vehicle.name}</h3>
                                        <p className="text-gray-600 text-sm mb-4">{vehicle.description}</p>

                                        <div className="h-40 w-full relative rounded overflow-hidden mb-4">
                                            <Image
                                                src={vehicle.image}
                                                alt={vehicle.name}
                                                fill
                                                style={{ objectFit: "cover" }}
                                                className="hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>

                                        <div className="space-y-3 mb-4">
                                            <div>
                                                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">Capacity</span>
                                                <p className="mt-1 text-sm">{vehicle.capacity}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">Ideal For</span>
                                                <p className="mt-1 text-sm">{vehicle.idealFor}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">Examples</span>
                                                <p className="mt-1 text-sm">{vehicle.examples}</p>
                                            </div>
                                        </div>

                                        <div className="mt-4 text-center">
                                            <Link href="/booking">
                                                <Button variant="outline" className="text-primary border-primary hover:bg-primary/5">
                                                    Book This Car
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Additional Services */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Additional Features</h2>
                            <p className="text-gray-600 max-w-3xl mx-auto">
                                Beyond transportation, we offer a range of features to enhance your travel experience.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {_additionalServices.map((service, _index): JSX.Element => (
                                <Card key={_index} className="p-5 hover:shadow-md transition-shadow">
                                    <div className="flex">
                                        <div className="mr-4">
                                            <div className="p-3 bg-primary/10 rounded-full">
                                                {service.icon}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold mb-2">{service.title}</h3>
                                            <p className="text-gray-600 text-sm">{service.description}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                            <p className="text-gray-600 max-w-3xl mx-auto">
                                Find answers to common questions about our services.
                            </p>
                        </div>

                        <div className="max-w-3xl mx-auto">
                            <div className="space-y-4">
                                {_faqs.map((faq, _index): JSX.Element => (
                                    <Card key={_index} className="p-6">
                                        <h3 className="font-bold mb-2">{faq.question}</h3>
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </Card>
                                ))}
                            </div>

                            <div className="text-center mt-8">
                                <Link href="/help">
                                    <Button className="bg-primary hover:bg-primary/90 text-white">
                                        View All FAQs
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-primary text-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-bold mb-4">Ready to Book Your Ride?</h2>
                            <p className="mb-8">
                                Experience the comfort and reliability of IndiCab services. Book your ride now or contact us for customized solutions.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/"
                                    className="bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                                >
                                    Book a Cab
                                </Link>
                                <Link
                                    href="/contact"
                                    className="bg-transparent border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <_Footer />
        </div>
    );
}
