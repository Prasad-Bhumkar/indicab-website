<<<<<<< HEAD
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/footer/Footer';
import { motion } from 'framer-motion';

interface TourDestination {
  id: string;
  name: string;
  description: string;
  distance: string;
  duration: string;
  attractions: string[];
  bestTime: string;
  image: string;
  baseCity: 'Pune' | 'Mumbai';
}

const MaharashtraTours = () => {
  const pileVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const destinations: TourDestination[] = [
    {
      id: 'lonavala',
      name: 'Lonavala',
      description: 'A picturesque hill station known for its stunning viewpoints, caves, and waterfalls.',
      distance: '65 km from Pune',
      duration: '1.5 hours drive',
      attractions: ['Tiger Point', 'Bhushi Dam', 'Karla Caves', 'Lohagad Fort'],
      bestTime: 'July to March',
      image: '/images/lonavala-new.jpg',
      baseCity: 'Pune',
    },
    {
      id: 'lavasa',
      name: 'Lavasa',
      description: 'A planned hill city with European-inspired architecture set against the backdrop of lush green hills.',
      distance: '60 km from Pune',
      duration: '1.5 hours drive',
      attractions: ['Lavasa Waterfront', 'Temghar Dam', 'Bamboosa', 'Lakeshore'],
      bestTime: 'September to March',
      image: '/images/lavasa.jpg',
      baseCity: 'Pune',
    },
    {
      id: 'sinhagad-fort',
      name: 'Sinhagad Fort',
      description: 'A historic fortress offering panoramic views of surrounding valleys and countryside.',
      distance: '30 km from Pune',
      duration: '1 hour drive',
      attractions: ['Kalyan Darwaza', 'Pune Darwaza', 'Tanaji Monument', 'Ancient temples'],
      bestTime: 'June to February',
      image: '/images/sinhagad.jpg',
      baseCity: 'Pune',
    },
    {
      id: 'khandala',
      name: 'Khandala',
      description: 'A twin hill station to Lonavala known for its scenic beauty, clouds, and valley views.',
      distance: '70 km from Pune, 80 km from Mumbai',
      duration: '1.5 hours drive',
      attractions: ['Duke\'s Nose', 'Khandala View Point', 'Amrutanjan Point', 'Reversing Station'],
      bestTime: 'October to May',
      image: '/images/lonavala-new.jpg',  // Reusing similar image
      baseCity: 'Pune',
    },
    {
      id: 'mahabaleshwar',
      name: 'Mahabaleshwar',
      description: 'A hill station with lush green forests, strawberry farms, and panoramic viewpoints.',
      distance: '120 km from Pune',
      duration: '3 hours drive',
      attractions: ['Venna Lake', 'Pratapgad Fort', 'Arthur\'s Seat', 'Mapro Garden'],
      bestTime: 'March to June, September to January',
      image: '/images/mahabaleshwar.jpg',
      baseCity: 'Pune',
    },
    {
      id: 'alibaug',
      name: 'Alibaug',
      description: 'A coastal town known for its beaches, historic forts, and seafood.',
      distance: '95 km from Mumbai',
      duration: '2.5 hours drive',
      attractions: ['Alibaug Beach', 'Kolaba Fort', 'Kashid Beach', 'Murud-Janjira Fort'],
      bestTime: 'November to March',
      image: '/public/assets/images/shirdi.jpg', // Reusing image
      baseCity: 'Mumbai',
    },
    {
      id: 'matheran',
      name: 'Matheran',
      description: 'Asia\'s only automobile-free hill station offering scenic trails and viewpoints.',
      distance: '80 km from Mumbai',
      duration: '2 hours drive',
      attractions: ['Charlotte Lake', 'Echo Point', 'Panorama Point', 'One Tree Hill'],
      bestTime: 'October to May',
      image: '/images/matheran.jpg',
      baseCity: 'Mumbai',
    },
  ];

  return (
    <>
      <Header />
      <div className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Explore Maharashtra with Our Tours</h1>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Discover the beauty of Maharashtra with our comfortable car tours. We specialize in day trips and weekend getaways
            within 100km of Pune and Mumbai, taking you to breathtaking hill stations, historic forts, and scenic locations.
          </p>

          <div className="mb-16">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">How Our Tours Work</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-5 rounded-lg">
                  <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-3">1</div>
                  <h3 className="font-medium text-lg mb-2">Choose Your Destination</h3>
                  <p className="text-gray-600">Select from our popular destinations around Pune and Mumbai, or request a custom itinerary.</p>
                </div>
                <div className="bg-blue-50 p-5 rounded-lg">
                  <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-3">2</div>
                  <h3 className="font-medium text-lg mb-2">Select Your Vehicle</h3>
                  <p className="text-gray-600">Choose from our fleet of comfortable cars based on your group size and preference.</p>
                </div>
                <div className="bg-blue-50 p-5 rounded-lg">
                  <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-3">3</div>
                  <h3 className="font-medium text-lg mb-2">Enjoy Your Tour</h3>
                  <p className="text-gray-600">Relax and enjoy as our experienced drivers take you on a memorable journey.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-center mb-2">Popular Tour Destinations</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
              Explore these handpicked destinations perfect for day trips and weekend getaways
            </p>

            <div className="flex mb-8 justify-center">
              <button className="mx-2 px-6 py-2 bg-blue-600 text-white rounded-full">All Destinations</button>
              <button className="mx-2 px-6 py-2 bg-white hover:bg-blue-50 text-gray-700 rounded-full border border-gray-200">From Pune</button>
              <button className="mx-2 px-6 py-2 bg-white hover:bg-blue-50 text-gray-700 rounded-full border border-gray-200">From Mumbai</button>
            </div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={pileVariants}
              initial="hidden"
              animate="show"
            >
              {destinations.map(destination => (
                <motion.div
                  key={destination.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                  variants={itemVariants}
                >
                  <div className="relative h-48">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="font-bold text-xl">{destination.name}</h3>
                      <p className="text-sm opacity-90">{destination.distance}</p>
                    </div>
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-3 py-1 m-2 rounded-full">
                      From {destination.baseCity}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 mb-3">{destination.description}</p>

                    <div className="mb-3">
                      <h4 className="font-medium text-gray-700 mb-1">Top Attractions:</h4>
                      <ul className="text-sm text-gray-600">
                        {destination.attractions.map((attraction, i) => (
                          <li key={i} className="mb-1 flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {attraction}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        <strong>Best time to visit:</strong> {destination.bestTime}
                      </div>
                      <Link
                        href={`/booking?destination=${destination.id}`}
                        className="bg-green-600 hover:bg-green-700 text-white py-1.5 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                      >
                        Book Tour
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 md:p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Plan Your Custom Maharashtra Tour</h2>
            <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
              Looking for a personalized tour experience? We can create custom itineraries based on your interests,
              time availability, and group size. Contact us to plan your perfect Maharashtra exploration.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition-colors duration-200"
            >
              Inquire About Custom Tours
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MaharashtraTours;
=======
>>>>>>> a221f754dfc85ba9d53030c8d6d50408b6346969
