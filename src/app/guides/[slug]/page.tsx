import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActionButton from '@/components/FloatingActionButton';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, MapPin, Calendar, AlertCircle, Sun, Umbrella, Utensils, LocateIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

// Define the params type
type GuideParams = {
    slug: string;
};

// City guide data (would typically come from a database or API)
const cityGuides = [
    {
        id: 'mumbai',
        name: 'Mumbai',
        image: '/images/pune.jpg', // Using existing project images
        description: 'The City of Dreams - India\'s financial capital and home to Bollywood',
        attractions: ['Gateway of India', 'Marine Drive', 'Elephanta Caves'],
        bestTimeToVisit: 'November to February',
        transportation: 'Local Trains, Metro, Buses, Taxis',
        cuisine: 'Vada Pav, Pav Bhaji, Bombay Sandwich, Seafood',
        weather: 'Tropical climate with humid summers and mild winters',
        dangerZones: 'Avoid isolated areas late at night',
        localTips: 'Use local trains during non-peak hours for a better experience',
        slug: 'mumbai',
        fullContent: `
      <p class="mb-4">Mumbai, formerly known as Bombay, is the financial capital of India and one of the most populous cities in the world. Known for its fast-paced lifestyle, Bollywood film industry, and diverse culture, Mumbai offers a unique blend of traditional and modern experiences.</p>

      <h2 class="text-xl font-bold text-green-800 mt-6 mb-3">Top Attractions</h2>
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2"><strong>Gateway of India</strong> - Iconic monument built during the British Raj, overlooking the Arabian Sea</li>
        <li class="mb-2"><strong>Marine Drive</strong> - A 3.6-kilometer-long boulevard along the coastline, also known as the Queen's Necklace</li>
        <li class="mb-2"><strong>Elephanta Caves</strong> - Ancient cave temples dedicated to Lord Shiva, located on Elephanta Island</li>
        <li class="mb-2"><strong>Chhatrapati Shivaji Terminus</strong> - A historic railway station and UNESCO World Heritage Site</li>
        <li class="mb-2"><strong>Juhu Beach</strong> - Popular beach known for street food and entertainment</li>
      </ul>

      <p class="my-4">Mumbai's vibrant spirit can be experienced through its bustling markets, diverse cuisines, and cultural festivals. The city never sleeps, offering something for everyone at any time of day or night.</p>
    `
    },
    {
        id: 'delhi',
        name: 'Delhi',
        image: '/images/taj-mahal.jpg',
        description: 'The heart of India with centuries of history and spectacular architecture',
        attractions: ['Red Fort', 'India Gate', 'Qutub Minar'],
        bestTimeToVisit: 'October to March',
        transportation: 'Metro, Buses, Auto-rickshaws, Taxis',
        cuisine: 'Chole Bhature, Paratha, Kebabs, Chaat',
        weather: 'Extreme seasons with hot summers and cold winters',
        dangerZones: 'Be cautious in isolated areas and after dark',
        localTips: 'Use the metro to avoid traffic congestion',
        slug: 'delhi',
        fullContent: `
      <p class="mb-4">Delhi, the capital city of India, is a blend of ancient history and modern development. With a history spanning over 5,000 years, the city showcases magnificent monuments from various dynasties that ruled over it.</p>

      <h2 class="text-xl font-bold text-green-800 mt-6 mb-3">Top Attractions</h2>
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2"><strong>Red Fort</strong> - A historic fort that served as the main residence of the Mughal Emperors</li>
        <li class="mb-2"><strong>India Gate</strong> - A war memorial dedicated to the soldiers of the British Indian Army</li>
        <li class="mb-2"><strong>Qutub Minar</strong> - A UNESCO World Heritage Site and one of the tallest minarets in India</li>
        <li class="mb-2"><strong>Humayun's Tomb</strong> - The tomb of the Mughal Emperor Humayun</li>
        <li class="mb-2"><strong>Lotus Temple</strong> - A Bahá'í House of Worship known for its flower-like shape</li>
      </ul>

      <p class="my-4">Delhi's diverse culture is reflected in its cuisine, festivals, and art. The city serves as a gateway to many popular tourist destinations in North India, including Agra and Jaipur.</p>
    `
    },
    {
        id: 'jaipur',
        name: 'Jaipur',
        image: '/images/jaipur.jpg',
        description: 'The Pink City known for its stunning palaces and rich Rajasthani culture',
        attractions: ['Hawa Mahal', 'Amber Fort', 'City Palace'],
        bestTimeToVisit: 'October to March',
        transportation: 'Auto-rickshaws, Taxis, Buses',
        cuisine: 'Dal Baati Churma, Ghewar, Laal Maas',
        weather: 'Hot summers and mild winters',
        dangerZones: 'Watch out for scams in tourist areas',
        localTips: 'Bargain at markets for better prices',
        slug: 'jaipur',
        fullContent: `
      <p class="mb-4">Jaipur, the capital of Rajasthan, is known as the "Pink City" due to the distinctive terracotta pink color of its buildings. Founded in 1727 by Maharaja Sawai Jai Singh II, the city is renowned for its magnificent architecture, vibrant culture, and rich history.</p>

      <h2 class="text-xl font-bold text-green-800 mt-6 mb-3">Top Attractions</h2>
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2"><strong>Hawa Mahal</strong> - The "Palace of Winds" with its unique honeycomb facade</li>
        <li class="mb-2"><strong>Amber Fort</strong> - A majestic fort overlooking Maota Lake</li>
        <li class="mb-2"><strong>City Palace</strong> - A stunning complex of courtyards, gardens, and buildings</li>
        <li class="mb-2"><strong>Jantar Mantar</strong> - An astronomical observation site with massive instruments</li>
        <li class="mb-2"><strong>Jal Mahal</strong> - A palace located in the middle of Man Sagar Lake</li>
      </ul>

      <p class="my-4">Jaipur forms part of the Golden Triangle tourist circuit along with Delhi and Agra. The city is famous for its handicrafts, textiles, and jewelry, making it a shopper's paradise.</p>
    `
    }
];

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: GuideParams }): Promise<Metadata> {
    const city = cityGuides.find((city) => city.slug === params.slug);

    if (!city) {
        return {
            title: 'City Guide Not Found | IndiCab',
            description: 'The city guide you are looking for could not be found.',
        };
    }

    return {
        title: `${city.name} Travel Guide | IndiCab`,
        description: `Explore ${city.name}: ${city.description}. Information on attractions, transportation, weather, cuisine, and travel tips.`,
        keywords: [`${city.name} travel guide`, `${city.name} tourism`, 'city guide', 'travel tips', `visit ${city.name}`],
        openGraph: {
            title: `${city.name} Travel Guide | IndiCab`,
            description: city.description,
            images: [city.image],
            type: 'article',
        },
    };
}

export default async function GuidePostPage({ params }: { params: GuideParams }): JSX.Element {
    // Find the city guide based on the slug parameter
    const city = cityGuides.find((city) => city.slug === params.slug);

    if (!city) {
        return (
            <>
                <Header />
                <main className="min-h-screen pt-8 pb-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center py-16">
                            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">City Guide Not Found</h1>
                            <p className="text-gray-600 mb-8">The city guide you are looking for could not be found.</p>
                            <Link href="/guides" className="inline-flex items-center text-primary hover:underline">
                                <ChevronLeft className="w-4 h-4 mr-2" />
                                View all city guides
                            </Link>
                        </div>
                    </div>
                </main>
                <Footer />
                <FloatingActionButton />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="min-h-screen pt-8 pb-16">
                <div className="container mx-auto px-4">
                    <Link href="/guides" className="inline-flex items-center text-primary hover:underline mb-6">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to all guides
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
                                <Image
                                    src={city.image}
                                    alt={`${city.name} cityscape`}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    priority
                                />
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{city.name} Travel Guide</h1>
                            <p className="text-lg text-gray-600 mb-6">{city.description}</p>

                            <div className="prose max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: city.fullContent }} />
                            </div>

                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 rounded-lg p-5">
                                    <h3 className="font-semibold text-lg flex items-center mb-3">
                                        <MapPin className="w-5 h-5 text-primary mr-2" />
                                        Top Attractions
                                    </h3>
                                    <ul className="space-y-2">
                                        {city.attractions.map((_attraction, _index): JSX.Element => (
                                            <li key={_index} className="flex items-start">
                                                <span className="text-primary mr-2">•</span>
                                                <span>{_attraction}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-5">
                                    <h3 className="font-semibold text-lg flex items-center mb-3">
                                        <Calendar className="w-5 h-5 text-primary mr-2" />
                                        Best Time to Visit
                                    </h3>
                                    <p>{city.bestTimeToVisit}</p>

                                    <h3 className="font-semibold text-lg flex items-center mt-5 mb-3">
                                        <Sun className="w-5 h-5 text-primary mr-2" />
                                        Weather
                                    </h3>
                                    <p>{city.weather}</p>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-5">
                                    <h3 className="font-semibold text-lg flex items-center mb-3">
                                        <LocateIcon className="w-5 h-5 text-primary mr-2" />
                                        Local Transportation
                                    </h3>
                                    <p>{city.transportation}</p>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-5">
                                    <h3 className="font-semibold text-lg flex items-center mb-3">
                                        <Utensils className="w-5 h-5 text-primary mr-2" />
                                        Local Cuisine
                                    </h3>
                                    <p>{city.cuisine}</p>
                                </div>
                            </div>

                            <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 mt-8">
                                <h3 className="font-semibold text-lg flex items-center mb-3">
                                    <AlertCircle className="w-5 h-5 text-primary mr-2" />
                                    Travel Tips & Safety
                                </h3>
                                <p className="mb-3"><strong>Areas to be cautious:</strong> {city.dangerZones}</p>
                                <p><strong>Local tip:</strong> {city.localTips}</p>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                                <h3 className="text-xl font-semibold mb-4">Book a Cab in {city.name}</h3>
                                <p className="text-gray-600 mb-6">Explore {city.name} comfortably with our reliable cab service. Pre-book for hassle-free travel to all attractions.</p>

                                <Link href={`/booking?from=${city.name}&to=Airport`}>
                                    <Button className="w-full bg-primary hover:bg-primary/90 mb-3">
                                        Airport Transfer
                                    </Button>
                                </Link>

                                <Link href={`/booking?from=${city.name}&to=City Tour`}>
                                    <Button className="w-full bg-primary hover:bg-primary/90 mb-3">
                                        City Tour
                                    </Button>
                                </Link>

                                <Link href={`/booking?from=${city.name}`}>
                                    <Button className="w-full bg-primary hover:bg-primary/90">
                                        Custom Booking
                                    </Button>
                                </Link>

                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <h4 className="font-medium mb-2">Why choose IndiCab in {city.name}:</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-primary mr-2">•</span>
                                            <span>Local drivers with city expertise</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-primary mr-2">•</span>
                                            <span>Fixed pricing with no hidden charges</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-primary mr-2">•</span>
                                            <span>Clean, sanitized vehicles</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-primary mr-2">•</span>
                                            <span>24/7 customer support</span>
                                        </li>
                                    </ul>
                                </div>
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
