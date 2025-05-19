import { CalendarDays, Car, MapPin } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import FloatingActionButton from '@/components/shared/FloatingActionButton';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Tourist Places in Maharashtra | IndiCab',
    description: 'Explore the best tourist destinations in Maharashtra. Book IndiCab for comfortable rides to popular and offbeat places across Maharashtra.',
    keywords: ['maharashtra tourism', 'tourist places', 'mumbai sightseeing', 'pune tourism', 'aurangabad caves', 'mahabaleshwar', 'lonavala'],
};

export default function MaharashtraTourism(): JSX.Element {
    // Tourist places organized by regions in Maharashtra
    const touristPlacesByRegion = {
        'Mumbai': [
            'Gateway of India', 'Marine Drive', 'Chhatrapati Shivaji Terminus',
            'Haji Ali Dargah', 'Colaba Causeway', 'Elephanta Caves'
        ],
        'Pune': [
            'Shaniwar Wada', 'Aga Khan Palace', 'Sinhagad Fort',
            'Pataleshwar Cave Temple', 'Osho Ashram'
        ],
        'Aurangabad': [
            'Ajanta Caves', 'Ellora Caves', 'Bibi Ka Maqbara',
            'Daulatabad Fort', 'Panchakki', 'Sunheri Mahal'
        ],
        'Mahabaleshwar': [
            'Pratapgarh Fort', 'Venna Lake', 'Mahabaleshwar Temple',
            'Krishnabai Temple', 'Lingamala Falls', 'Arthur\'s Seat'
        ],
        'Hill Stations': [
            'Lonavala', 'Khandala', 'Bhushi Dam', 'Tiger\'s Leap',
            'Matheran', 'Chikhaldara', 'Amboli', 'Bhandardara'
        ],
        'Nashik': [
            'Trimbakeshwar Temple', 'Mukti Dham', 'Kalaram Temple',
            'Panchvati', 'Saptashrungi Temple'
        ],
        'Coastal Maharashtra': [
            'Alibaug Beach', 'Kihim Beach', 'Ganpatipule',
            'Harihareshwar', 'Murud Janjira Fort', 'Ratnagiri'
        ],
        'Offbeat Destinations': [
            'Kaas Plateau', 'Tadoba - Andhari Tiger Reserve',
            'Malshej Ghat', 'Raigad Fort', 'Karnala Bird Sanctuary',
            'Koynanagar', 'Gheru', 'Kalavantin Durg'
        ]
    };

    // Popular tourist spots for featured section with images
    const _popularDestinations = [
        {
            name: 'Gateway of India',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg/800px-Mumbai_03-2016_30_Gateway_of_India.jpg',
            description: 'Iconic monument in Mumbai overlooking the Arabian Sea'
        },
        {
            name: 'Ajanta Caves',
            image: 'https://smarthistory.org/wp-content/uploads/2022/07/Ajanta-caves-scaled.jpg',
            description: 'Ancient Buddhist rock-cut cave monuments with paintings and sculptures'
        },
        {
            name: 'Ellora Caves',
            image: 'https://breathedreamgo.com/wp-content/uploads/2010/03/India-for-Beginners-custom-tours-5.jpg',
            description: 'UNESCO World Heritage site featuring Hindu, Buddhist and Jain temples'
        },
        {
            name: 'Mahabaleshwar',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Boats_On_Venna_Lake.jpg/1200px-Boats_On_Venna_Lake.jpg',
            description: 'Hill station with scenic viewpoints and strawberry farms'
        },
        {
            name: 'Lonavala',
            image: 'https://images.articlesfactory.com/750x0/f8ba60a8-ccd2-4326-9f6d-08641cc3d07d.webp',
            description: 'Popular hill station with waterfalls, lakes and forts'
        },
        {
            name: 'Alibaug Beach',
            image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/1a/9b/0a/alibaug-beach.jpg?w=1200&h=-1&s=1',
            description: 'Coastal town with beaches and historical forts'
        },
        {
            name: 'Trimbakeshwar Temple',
            image: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Trimbakeshwar_Temple.jpg',
            description: 'Ancient Hindu temple dedicated to Lord Shiva'
        },
        {
            name: 'Kaas Plateau',
            image: 'https://www.holidify.com/images/cmsuploads/compressed/kaas_20181123161609.jpg',
            description: 'UNESCO World Heritage site known as the Valley of Flowers'
        }
    ];

    return (
        <>
            <Header />
            <main className="min-h-screen py-8">
                <div className="container mx-auto px-4">
                    <div className="bg-gradient-to-r from-primary/20 to-transparent rounded-xl p-8 mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Tourist Places in Maharashtra</h1>
                        <p className="text-lg text-gray-700 max-w-3xl mb-6">
                            Explore the diverse beauty of Maharashtra - from bustling cities to serene beaches,
                            ancient caves to lush hill stations. Book IndiCab for a comfortable journey to these amazing destinations.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <select className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-md text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                                        <option value="">Select a tourist destination</option>
                                        {Object.values(touristPlacesByRegion).flat().sort().map((place): JSX.Element => (
                                            <option key={place} value={place}>{place}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <Link href="/booking" className="sm:w-auto">
                                <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 px-6 py-3 flex items-center gap-2">
                                    <Car className="h-4 w-4" />
                                    Book a Cab
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-6">Popular Tourist Destinations</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                        {_popularDestinations.map((place): JSX.Element => (
                            <Link
                                key={place.name}
                                href={`/booking?destination=${place.name.toLowerCase().replace(/ /g, '-')}`}
                                className="group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <div className="aspect-video relative bg-gray-100">
                                    <Image
                                        src={place.image}
                                        alt={place.name}
                                        fill
                                        className="object-cover transition-transform group-hover:scale-105 duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                                    <div className="absolute bottom-3 left-3 z-20">
                                        <h3 className="text-lg font-semibold text-white">{place.name}</h3>
                                    </div>
                                </div>
                                <div className="p-4 bg-white">
                                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{place.description}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Car className="h-4 w-4 mr-1" />
                                            <span>Cab services available</span>
                                        </div>
                                        <div className="flex items-center text-sm text-primary font-medium group-hover:underline">
                                            Book now
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {Object.entries(touristPlacesByRegion).map(([region, places]): JSX.Element => (
                        <div key={region} className="mb-10">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b border-gray-200 pb-2">
                                {region}
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {places.map((place): JSX.Element => (
                                    <Link
                                        key={place}
                                        href={`/booking?destination=${place.toLowerCase().replace(/ /g, '-')}`}
                                        className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-primary/5 hover:border-primary/30 transition-colors"
                                    >
                                        <MapPin className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                                        <span className="text-sm">{place}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="bg-gray-50 rounded-xl p-6 mt-10 mb-6">
                        <h2 className="text-xl font-bold mb-4">Plan Your Maharashtra Trip</h2>
                        <p className="text-gray-600 mb-4">
                            Maharashtra offers a diverse range of experiences - from historical monuments to natural wonders.
                            IndiCab provides reliable transportation to all these destinations with experienced drivers who know the best routes.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 mt-6">
                            <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                <CalendarDays className="h-6 w-6 text-primary mb-2" />
                                <h3 className="font-semibold mb-2">Weekend Getaways</h3>
                                <p className="text-sm text-gray-600">
                                    Perfect short trips from Mumbai and Pune to nearby destinations like Lonavala, Mahabaleshwar, and Alibaug.
                                </p>
                            </div>
                            <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                <MapPin className="h-6 w-6 text-primary mb-2" />
                                <h3 className="font-semibold mb-2">Heritage Tours</h3>
                                <p className="text-sm text-gray-600">
                                    Explore the rich history with tours to Ajanta & Ellora Caves, forts, and ancient temples.
                                </p>
                            </div>
                            <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                <Car className="h-6 w-6 text-primary mb-2" />
                                <h3 className="font-semibold mb-2">Custom Itineraries</h3>
                                <p className="text-sm text-gray-600">
                                    Create your own custom tour package covering multiple destinations across Maharashtra.
                                </p>
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
