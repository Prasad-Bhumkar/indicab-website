import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActionButton from '@/components/FloatingActionButton';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, Calendar, Clock, Car, Check, Phone, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Define route parameters type
type RouteParams = {
  route: string;
};

// Popular routes data
const popularRoutes = [
  {
    id: 'delhi-to-agra',
    from: 'Delhi',
    to: 'Agra',
    distance: '233 km',
    travelTime: '3-4 hours',
    fare: '₹2,499',
    description: 'Travel from Delhi to Agra to visit the iconic Taj Mahal and other historical monuments.',
    image: '/images/taj-mahal.jpg',
    highlights: [
      'Visit the iconic Taj Mahal, a UNESCO World Heritage Site',
      'Explore Agra Fort, another UNESCO site with stunning architecture',
      'Professional drivers familiar with the Delhi-Agra route',
      'Air-conditioned vehicles for comfortable travel',
      'Flexible pickup and drop-off locations'
    ],
    faqs: [
      {
        question: 'How long does it take to travel from Delhi to Agra?',
        answer: 'The journey typically takes 3-4 hours, depending on traffic conditions and the specific pickup/drop locations.'
      },
      {
        question: 'Can I book a round trip from Delhi to Agra?',
        answer: 'Yes, you can book a round trip. You can either book a one-way trip now and another one later, or contact our customer service for special round-trip rates.'
      },
      {
        question: 'Are there any good stops between Delhi and Agra?',
        answer: 'You can consider stopping at Mathura, which is famous for being the birthplace of Lord Krishna, or visit the Bharatpur Bird Sanctuary.'
      }
    ]
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
    highlights: [
      'Enjoy scenic views along the Mumbai-Pune Expressway',
      'Visit Lonavala, a popular hill station on the way',
      'Experienced drivers familiar with traffic patterns',
      'Air-conditioned vehicles for a comfortable journey',
      'Door-to-door service with flexible pickup locations'
    ],
    faqs: [
      {
        question: 'How long does it take to travel from Mumbai to Pune?',
        answer: 'The journey typically takes 2.5-3 hours, depending on traffic conditions and specific pickup/drop locations.'
      },
      {
        question: 'Can I request for a stop at Lonavala during my journey?',
        answer: 'Yes, you can request for a stop at Lonavala. Please inform the driver at the beginning of your journey.'
      },
      {
        question: 'What if there is heavy traffic on the expressway?',
        answer: 'Our drivers are familiar with alternative routes and will take the best possible route to ensure you reach your destination without much delay.'
      }
    ]
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
    highlights: [
      'Visit the majestic Mysore Palace, one of India\'s most visited attractions',
      'Explore Chamundi Hills and the famous Chamundeshwari Temple',
      'Comfortable and safe journey with professional drivers',
      'Air-conditioned vehicles for a pleasant experience',
      'Flexible booking options with 24/7 customer support'
    ],
    faqs: [
      {
        question: 'How long does it take to travel from Bangalore to Mysore?',
        answer: 'The journey typically takes 3-3.5 hours, depending on traffic conditions and specific pickup/drop locations.'
      },
      {
        question: 'Are there any interesting places to visit between Bangalore and Mysore?',
        answer: 'Yes, you can visit the Ranganathittu Bird Sanctuary, Srirangapatna (historical town), and Brindavan Gardens.'
      },
      {
        question: 'Is it better to book a cab or take a train/bus from Bangalore to Mysore?',
        answer: 'A cab offers more convenience, comfort, and flexibility compared to trains or buses. You can stop at attractions along the way and have door-to-door service.'
      }
    ]
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
    highlights: [
      'Visit the magnificent Amber Fort with its stunning architecture',
      'Explore Hawa Mahal, the iconic Palace of Winds',
      'Comfortable journey with experienced drivers familiar with the route',
      'Air-conditioned vehicles for a pleasant travel experience',
      'Flexible pickup and drop-off options across Delhi and Jaipur'
    ],
    faqs: [
      {
        question: 'How long does it take to travel from Delhi to Jaipur?',
        answer: 'The journey typically takes 4-5 hours, depending on traffic conditions and specific pickup/drop locations.'
      },
      {
        question: 'What is the best time to visit Jaipur?',
        answer: 'The best time to visit Jaipur is from October to March when the weather is pleasant and ideal for sightseeing.'
      },
      {
        question: 'Can I book a cab for sightseeing in Jaipur after reaching from Delhi?',
        answer: 'Yes, you can book our cab services for local sightseeing in Jaipur. Please contact our customer service for special packages.'
      }
    ]
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
    highlights: [
      'Explore the French Quarter with its colonial architecture and vibrant streets',
      'Visit the serene Auroville and the famous Matrimandir',
      'Enjoy comfortable travel with professional drivers',
      'Air-conditioned vehicles for a pleasant journey',
      'Flexible pickup and drop-off locations across Chennai and Pondicherry'
    ],
    faqs: [
      {
        question: 'How long does it take to travel from Chennai to Pondicherry?',
        answer: 'The journey typically takes 3-3.5 hours, depending on traffic conditions and specific pickup/drop locations.'
      },
      {
        question: 'Is the East Coast Road (ECR) a better route than the national highway?',
        answer: 'The ECR offers scenic coastal views but may take slightly longer. The NH45 is faster but less scenic. Our drivers can take either route based on your preference.'
      },
      {
        question: 'What are the must-visit places in Pondicherry?',
        answer: 'Some must-visit places include Promenade Beach, Aurobindo Ashram, French Quarter, Auroville, Paradise Beach, and Chunnambar Boat House.'
      }
    ]
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
    highlights: [
      'Enjoy the pristine beaches of Digha along the Bay of Bengal',
      'Visit the Marine Aquarium and Research Centre',
      'Comfortable journey with experienced drivers',
      'Air-conditioned vehicles for a pleasant travel experience',
      'Flexible pickup and drop-off locations across Kolkata and Digha'
    ],
    faqs: [
      {
        question: 'How long does it take to travel from Kolkata to Digha?',
        answer: 'The journey typically takes 3.5-4 hours, depending on traffic conditions and specific pickup/drop locations.'
      },
      {
        question: 'What is the best time to visit Digha?',
        answer: 'The best time to visit Digha is from October to February when the weather is pleasant and ideal for beach activities.'
      },
      {
        question: 'Are there any interesting places to stop between Kolkata and Digha?',
        answer: 'You can consider stopping at Kolaghat for a meal, or visit Mandarmani, another beach destination that\'s on the way to Digha.'
      }
    ]
  }
];

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: RouteParams }): Promise<Metadata> {
  const routeInfo = popularRoutes.find(route => route.id === params.route);

  if (!routeInfo) {
    return {
      title: 'Route Not Found | IndiCab',
      description: 'The requested route information could not be found.'
    };
  }

  return {
    title: `${routeInfo.from} to ${routeInfo.to} Cab Service | IndiCab`,
    description: `Travel from ${routeInfo.from} to ${routeInfo.to} (${routeInfo.distance}) with IndiCab's reliable taxi service. Book now for a comfortable journey!`,
    keywords: [`${routeInfo.from} to ${routeInfo.to} cab`, `${routeInfo.from} to ${routeInfo.to} taxi`, 'cab booking', 'taxi service', 'intercity travel'],
    openGraph: {
      title: `${routeInfo.from} to ${routeInfo.to} Cab Service | IndiCab`,
      description: routeInfo.description,
      images: [routeInfo.image],
      type: 'website',
    },
  };
}

export default function OnewayRoutePage({ params }: { params: RouteParams }): JSX.Element {
  const routeInfo = popularRoutes.find(route => route.id === params.route);

  if (!routeInfo) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-6 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden mb-6">
                <Image
                  src={routeInfo.image}
                  alt={`${routeInfo.from} to ${routeInfo.to} cab service`}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center text-white mb-2">
                    <MapPin className="h-5 w-5 mr-1" />
                    <span className="font-medium">{routeInfo.from}</span>
                    <ArrowRight className="h-4 w-4 mx-2" />
                    <span className="font-medium">{routeInfo.to}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    {routeInfo.from} to {routeInfo.to} Cab Service
                  </h1>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-primary/5 rounded-lg p-4 flex items-center border border-primary/10">
                  <MapPin className="h-6 w-6 text-primary mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Distance</h3>
                    <p className="font-semibold">{routeInfo.distance}</p>
                  </div>
                </div>
                <div className="bg-primary/5 rounded-lg p-4 flex items-center border border-primary/10">
                  <Clock className="h-6 w-6 text-primary mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Travel Time</h3>
                    <p className="font-semibold">{routeInfo.travelTime}</p>
                  </div>
                </div>
                <div className="bg-primary/5 rounded-lg p-4 flex items-center border border-primary/10">
                  <Car className="h-6 w-6 text-primary mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Starting Fare</h3>
                    <p className="font-semibold">{routeInfo.fare}</p>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none mb-8">
                <h2>About {routeInfo.from} to {routeInfo.to} Route</h2>
                <p className="text-lg">{routeInfo.description}</p>

                <h3>Why Choose IndiCab for {routeInfo.from} to {routeInfo.to} Travel</h3>
                <ul>
                  {routeInfo.highlights.map((_highlight, _index): JSX.Element => (
                    <li key={_index}>{_highlight}</li>
                  ))}
                </ul>

                <h3>Frequently Asked Questions</h3>
                <div className="space-y-4 not-prose">
                  {routeInfo.faqs.map((faq, _index): JSX.Element => (
                    <div key={_index} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-2">Book Your Trip</h2>
                <p className="text-gray-600 mb-4">
                  {routeInfo.from} to {routeInfo.to} | {routeInfo.distance}
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                    <p className="text-sm">Sanitized cabs for a safe journey</p>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                    <p className="text-sm">Experienced drivers familiar with the route</p>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                    <p className="text-sm">Flexible pickup and drop-off locations</p>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                    <p className="text-sm">24/7 customer support during your trip</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Base Fare:</span>
                    <span>{routeInfo.fare}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>*Final fare may vary based on specific pickup/drop points</span>
                  </div>
                </div>

                <Link
                  href={`/booking?from=${routeInfo.from}&to=${routeInfo.to}`}
                  className="w-full"
                >
                  <Button className="w-full bg-primary hover:bg-primary/90 mb-3">
                    Book Now
                  </Button>
                </Link>

                <div className="flex items-center justify-center text-sm text-gray-600 mt-4">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>Need help? Call us at <a href="tel:+919876543210" className="text-primary font-medium">+91 9876 543 210</a></span>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-lg flex items-start">
                  <Info className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-600">
                    <p className="font-medium text-gray-700 mb-1">Looking for a round trip?</p>
                    <p>Contact our customer support for special round-trip packages and discounts.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Explore Other Popular Routes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularRoutes
                .filter(route => route.id !== params.route)
                .slice(0, 3)
                .map(route => (
                  <Link
                    key={route.id}
                    href={`/oneway/${route.id}`}
                    className="group"
                  >
                    <div className="rounded-lg overflow-hidden border border-gray-200 transition-all group-hover:shadow-md">
                      <div className="relative h-48">
                        <Image
                          src={route.image}
                          alt={`${route.from} to ${route.to}`}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">
                          {route.from} to {route.to}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{route.distance}</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{route.travelTime}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-primary font-semibold">{route.fare}</span>
                          <span className="text-sm text-gray-500">View Details →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingActionButton />
    </>
  );
}
