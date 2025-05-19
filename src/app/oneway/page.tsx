import { ArrowRight, Clock, MapPin, Search } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import FloatingActionButton from '@/components/shared/FloatingActionButton';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Intercity Cab Services | One-Way Routes | IndiCab',
    description: 'Book reliable one-way cab services between major Indian cities. Affordable fares, experienced drivers, and comfortable vehicles for intercity travel.',
    keywords: ['one-way cab service', 'intercity travel', 'taxi booking', 'cab between cities', 'India cab service'],
    openGraph: {
        title: 'Intercity Cab Services | One-Way Routes | IndiCab',
        description: 'Book reliable one-way cab services between major Indian cities.',
        images: ['/images/taj-mahal.jpg'],
        type: 'website',
    },
};

// Popular routes data - same as in [route]/page.tsx
const _popularRoutes = [
    {
        id: 'delhi-to-agra',
        from: 'Delhi',
        to: 'Agra',
        distance: '233 km',
        travelTime: '3-4 hours',
        fare: '₹2,499',
        description: 'Travel from Delhi to Agra to visit the iconic Taj Mahal and other historical monuments.',
        image: '/images/taj-mahal.jpg',
    },
    {
        id: 'mumbai-to-pune',
        from: 'Mumbai',
        to: 'Pune',
        distance: '150 km',
        travelTime: '2.5-3 hours',
        fare: '₹1,999',
        description: 'Travel comfortably from Mumbai to Pune via the Mumbai-Pune Expressway with our reliable cab service.',
        image: '/images/pune.jpg',
    },
    {
        id: 'bangalore-to-mysore',
        from: 'Bangalore',
        to: 'Mysore',
        distance: '150 km',
        travelTime: '3-3.5 hours',
        fare: '₹1,899',
        description: 'Travel from Bangalore to Mysore and explore the cultural heritage and royal palaces of the city.',
        image: '/images/mysore-palace.jpg',
    },
    {
        id: 'delhi-to-jaipur',
        from: 'Delhi',
        to: 'Jaipur',
        distance: '280 km',
        travelTime: '4-5 hours',
        fare: '₹2,899',
        description: 'Travel from Delhi to Jaipur, the Pink City, and explore its rich history, culture, and architectural marvels.',
        image: '/images/jaipur.jpg',
    },
    {
        id: 'chennai-to-pondicherry',
        from: 'Chennai',
        to: 'Pondicherry',
        distance: '170 km',
        travelTime: '3-3.5 hours',
        fare: '₹2,299',
        description: 'Travel from Chennai to Pondicherry (Puducherry) and experience the unique French colonial charm of this coastal town.',
        image: '/images/pondicherry.jpg',
    },
    {
        id: 'kolkata-to-digha',
        from: 'Kolkata',
        to: 'Digha',
        distance: '185 km',
        travelTime: '3.5-4 hours',
        fare: '₹2,199',
        description: 'Travel from Kolkata to Digha, a popular beach destination, and enjoy the scenic coastline of the Bay of Bengal.',
        image: '/images/digha.jpg',
    }
];

// Major cities for the search section
const majorCities = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata',
    'Hyderabad', 'Pune', 'Jaipur', 'Ahmedabad', 'Lucknow'
];

export default function OnewayRoutesPage(): JSX.Element {
    return (
        <>
            <Header />
            <main className="min-h-screen pt-6 pb-16">
                <div className="container mx-auto px-4">
                    <div className="bg-gradient-to-r from-primary via-primary/90 to-green-700 text-white rounded-xl p-6 md:p-10 mb-12">
                        <h1 className="text-2xl md:text-3xl font-bold mb-4">One-Way Cab Services Between Cities</h1>
                        <p className="text-lg md:text-xl opacity-90 max-w-3xl mb-6">
                            Book reliable and comfortable cab services for one-way travel between major Indian cities. Enjoy fixed prices, experienced drivers, and hassle-free journeys.
                        </p>

                        <div className="bg-white rounded-lg p-4 shadow-lg max-w-3xl">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                    <label className="block text-gray-700 text-sm font-medium mb-1">
                                        Pickup City
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <select className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                                            <option value="">Select pickup city</option>
                                            {majorCities.map((city): JSX.Element => (
                                                <option key={`from-${city}`} value={city}>{city}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <label className="block text-gray-700 text-sm font-medium mb-1">
                                        Drop City
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <select className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                                            <option value="">Select drop city</option>
                                            {majorCities.map((city): JSX.Element => (
                                                <option key={`to-${city}`} value={city}>{city}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:self-end">
                                    <Link href="/booking">
                                        <Button className="w-full bg-primary hover:bg-primary/90 flex items-center gap-2">
                                            <Search className="h-4 w-4" />
                                            Find Cabs
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-8">Popular One-Way Routes</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {_popularRoutes.map((route): JSX.Element => (
                            <Link
                                key={route.id}
                                href={`/oneway/${route.id}`}
                                className="group"
                            >
                                <div className="rounded-lg overflow-hidden border border-gray-200 transition-all group-hover:shadow-md h-full">
                                    <div className="relative h-48">
                                        <Image
                                            src={route.image}
                                            alt={`${route.from} to ${route.to}`}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4">
                                            <div className="flex items-center text-white mb-1">
                                                <span className="font-medium">{route.from}</span>
                                                <ArrowRight className="h-3 w-3 mx-2" />
                                                <span className="font-medium">{route.to}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center text-sm text-gray-500 mb-2">
                                            <MapPin className="h-4 w-4 mr-1" />
                                            <span>{route.distance}</span>
                                            <span className="mx-2">•</span>
                                            <Clock className="h-4 w-4 mr-1" />
                                            <span>{route.travelTime}</span>
                                        </div>
                                        <p className="text-gray-600 mb-3 line-clamp-2 text-sm">{route.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-primary font-semibold">{route.fare}</span>
                                            <span className="text-sm text-gray-500 group-hover:text-primary transition-colors">View Details →</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 md:p-10">
                        <h2 className="text-2xl font-bold mb-4">Why Choose IndiCab for Intercity Travel?</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white p-5 rounded-lg">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold mb-2">Reliable Service</h3>
                                <p className="text-gray-600 text-sm">Punctual pickups, professional drivers, and well-maintained vehicles for a comfortable journey.</p>
                            </div>

                            <div className="bg-white p-5 rounded-lg">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold mb-2">Transparent Pricing</h3>
                                <p className="text-gray-600 text-sm">Fixed prices with no hidden charges. What you see is what you pay.</p>
                            </div>

                            <div className="bg-white p-5 rounded-lg">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold mb-2">Easy Booking</h3>
                                <p className="text-gray-600 text-sm">Book your intercity cab with just a few clicks. Instant confirmations and hassle-free process.</p>
                            </div>

                            <div className="bg-white p-5 rounded-lg">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold mb-2">24/7 Support</h3>
                                <p className="text-gray-600 text-sm">Our customer service team is available round the clock to assist you with any queries.</p>
                            </div>
                        </div>

                        <Link href="/contact">
                            <Button className="bg-primary hover:bg-primary/90">
                                Contact Us for Assistance
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-12">
                        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

                        <div className="space-y-4">
                            <div className="bg-white p-5 rounded-lg border border-gray-200">
                                <h3 className="font-semibold mb-2">What is a one-way cab service?</h3>
                                <p className="text-gray-600">A one-way cab service allows you to book a cab for traveling from one city to another without having to pay for the return journey. You only pay for the distance traveled in one direction.</p>
                            </div>

                            <div className="bg-white p-5 rounded-lg border border-gray-200">
                                <h3 className="font-semibold mb-2">Can I book a one-way cab for any route?</h3>
                                <p className="text-gray-600">We offer one-way cab services between major cities in India. While we've listed popular routes on this page, you can check availability for other routes by using our search function or contacting our customer support.</p>
                            </div>

                            <div className="bg-white p-5 rounded-lg border border-gray-200">
                                <h3 className="font-semibold mb-2">What types of vehicles are available for one-way trips?</h3>
                                <p className="text-gray-600">We offer a range of vehicles including sedans, SUVs, and premium cars. You can choose the vehicle type based on your comfort requirements and the number of passengers.</p>
                            </div>

                            <div className="bg-white p-5 rounded-lg border border-gray-200">
                                <h3 className="font-semibold mb-2">How is the fare calculated for one-way trips?</h3>
                                <p className="text-gray-600">The fare is calculated based on the distance between the cities, the type of vehicle selected, and other factors like tolls and permits. We offer transparent pricing with no hidden charges.</p>
                            </div>

                            <div className="bg-white p-5 rounded-lg border border-gray-200">
                                <h3 className="font-semibold mb-2">Can I make stops during my journey?</h3>
                                <p className="text-gray-600">Yes, you can request the driver to make stops during your journey. However, significant detours might incur additional charges. It's best to discuss your requirements with the driver at the beginning of your journey.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <FloatingActionButton />
        </>
    );
}
