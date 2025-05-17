import React from 'react';
import { Shield, Clock, ThumbsUp, MapPin, Award, Users, Car, Target, Eye } from 'lucide-react'; // Importing icons
import { Card } from '@/components/ui/card'; // Updated import statement to use named import

// Team member data


// Company values
const _companyValues = [
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
const _milestones = [
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

export default function AboutPage(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
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
                                <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
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
                                {_companyValues.map((value, _index): JSX.Element => (
                                    <Card key={_index} className="p-6 hover:shadow-md transition-shadow">
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {_milestones.map((milestone, _index): JSX.Element => (
                                        <div key={_index} className="p-4 border rounded-lg">
                                            <h3 className="text-lg font-semibold">{milestone.year}</h3>
                                            <p className="text-gray-600">{milestone.achievement}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
