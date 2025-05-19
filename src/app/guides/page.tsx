import { ChevronRight, MapPin } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import FloatingActionButton from '@/components/shared/FloatingActionButton';

export const metadata: Metadata = {
    title: 'IndiCab City Guides | Travel Information for Major Indian Cities',
    description: 'Explore detailed city guides for popular destinations across India. Information on attractions, local transportation, weather, cuisine, and travel tips.',
    keywords: ['city guides', 'India travel', 'tourist information', 'travel tips', 'local attractions', 'Indian cities'],
    openGraph: {
        title: 'IndiCab City Guides | Travel Information for Major Indian Cities',
        description: 'Explore detailed city guides for popular destinations across India.',
        images: ['/indicab-logo.png'],
        type: 'website',
    },
};

// Sample city data - would typically come from a database or API
const _cityGuides = [
    {
        id: 'mumbai',
        name: 'Mumbai',
        image: '/images/pune.jpg', // Using existing project images
        description: 'The City of Dreams - India\'s financial capital and home to Bollywood',
        attractions: ['Gateway of India', 'Marine Drive', 'Elephanta Caves'],
        slug: 'mumbai'
    },
    {
        id: 'delhi',
        name: 'Delhi',
        image: '/images/taj-mahal.jpg',
        description: 'The heart of India with centuries of history and spectacular architecture',
        attractions: ['Red Fort', 'India Gate', 'Qutub Minar'],
        slug: 'delhi'
    },
    {
        id: 'jaipur',
        name: 'Jaipur',
        image: '/images/jaipur.jpg',
        description: 'The Pink City known for its stunning palaces and rich cultural heritage',
        attractions: ['Amber Fort', 'Hawa Mahal', 'City Palace'],
        slug: 'jaipur'
    },
    {
        id: 'bangalore',
        name: 'Bangalore',
        image: '/images/mysore-palace.jpg',
        description: 'India\'s Silicon Valley with perfect weather and beautiful gardens',
        attractions: ['Lalbagh Botanical Garden', 'Bangalore Palace', 'Cubbon Park'],
        slug: 'bangalore'
    },
    {
        id: 'chennai',
        name: 'Chennai',
        image: '/images/pondicherry.jpg',
        description: 'The cultural capital of South India with beautiful beaches and temples',
        attractions: ['Marina Beach', 'Kapaleeswarar Temple', 'Fort St. George'],
        slug: 'chennai'
    },
    {
        id: 'kolkata',
        name: 'Kolkata',
        image: '/images/digha.jpg',
        description: 'The City of Joy with colonial architecture and rich Bengali culture',
        attractions: ['Victoria Memorial', 'Howrah Bridge', 'Park Street'],
        slug: 'kolkata'
    },
    {
        id: 'hyderabad',
        name: 'Hyderabad',
        image: '/images/mysore-palace.jpg',
        description: 'The City of Nizams with a blend of traditional and modern attractions',
        attractions: ['Charminar', 'Golconda Fort', 'Ramoji Film City'],
        slug: 'hyderabad'
    },
    {
        id: 'goa',
        name: 'Goa',
        image: '/images/pune.jpg',
        description: 'India\'s beach paradise with Portuguese influence and vibrant nightlife',
        attractions: ['Calangute Beach', 'Basilica of Bom Jesus', 'Fort Aguada'],
        slug: 'goa'
    }
];

export default function CityGuides(): JSX.Element {
    return (
        <main>
            <Header />

            <div className="bg-gradient-to-b from-green-800 to-green-700 py-16 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">IndiCab City Guides</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-6">
                        Explore detailed information about popular destinations across India
                    </p>
                    <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto" />
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Introduction */}
                <div className="max-w-4xl mx-auto mb-12 text-center">
                    <h2 className="text-3xl font-bold text-green-800 mb-4">Plan Your Journey with Confidence</h2>
                    <p className="text-gray-600 mb-6">
                        Our city guides provide essential information for travelers including top attractions,
                        local transportation, accommodation options, weather insights, and authentic culinary experiences.
                        Whether you're planning a business trip or a leisure vacation, these guides will help you
                        make the most of your stay in India's vibrant cities.
                    </p>
                    <p className="text-gray-600">
                        Each guide also includes suggested itineraries and insider tips from our experienced drivers who know these cities best.
                    </p>
                </div>

                {/* City Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    {_cityGuides.map((city): JSX.Element => (
                        <Link key={city.id} href={`/guides/${city.slug}`} className="group">
                            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                                <div className="relative h-48">
                                    <Image
                                        src={city.image}
                                        alt={city.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-25" />
                                    <div className="absolute bottom-0 left-0 p-4">
                                        <h3 className="text-xl font-bold text-white mb-1">{city.name}</h3>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-600 mb-3">{city.description}</p>
                                    <div className="space-y-1 mb-4">
                                        {city.attractions.map((_attraction, _index): JSX.Element => (
                                            <div key={_index} className="flex items-start">
                                                <MapPin className="h-4 w-4 text-green-600 mt-1 mr-1 flex-shrink-0" />
                                                <span className="text-sm text-gray-700">{_attraction}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="text-green-600 font-medium flex items-center text-sm group-hover:text-green-700">
                                            Explore guide
                                            <ChevronRight className="ml-1 h-4 w-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="bg-gray-50 rounded-lg p-8 text-center max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Need Transportation During Your Trip?</h2>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Book a reliable and comfortable IndiCab to explore these amazing destinations.
                        Our drivers are locals who can provide personalized recommendations and insights
                        to enhance your travel experience.
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
                    >
                        Book a Cab Now
                    </Link>
                </div>
            </div>

            <Footer />
            <FloatingActionButton />
        </main>
    );
}
