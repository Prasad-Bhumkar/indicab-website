"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/layout/header/Header';
import _Footer from '../../components/layout/footer/Footer';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
    Phone,
    Mail,
    MessageCircle,
    Search,
    ChevronDown,
    ChevronUp,
    HelpCircle,
    Car,
    Calendar,
    CreditCard,
    AlertTriangle,
    MapPin,
    Shield,
    UserCheck
} from 'lucide-react';

// FAQ categories and questions
const faqCategories = [
    {
        name: 'Booking',
        icon: <Calendar className="h-5 w-5" />,
        questions: [
            {
                question: 'How do I book an intercity cab?',
                answer: 'You can book an intercity cab through our website or mobile app. Simply enter your pickup and drop locations, select the date and time, choose a car type, and confirm your booking. You\'ll receive a confirmation via SMS and email.'
            },
            {
                question: 'Can I book a cab for someone else?',
                answer: 'Yes, you can book a cab for someone else. During the booking process, you can add the passenger\'s details in the notes section, and our driver will contact them directly.'
            },
            {
                question: 'How far in advance should I book?',
                answer: 'We recommend booking at least 24 hours in advance to ensure availability, especially during peak seasons. However, we also accept last-minute bookings subject to driver availability.'
            },
            {
                question: 'Can I schedule a round trip?',
                answer: 'Yes, you can schedule a round trip by selecting the "Round Trip" option during booking. You can specify your return date and time, and the same driver will be assigned for your return journey.'
            }
        ]
    },
    {
        name: 'Pricing',
        icon: <CreditCard className="h-5 w-5" />,
        questions: [
            {
                question: 'How is the fare calculated?',
                answer: 'Our fares are calculated based on the distance between your pickup and drop locations, the type of vehicle selected, and any additional charges such as toll taxes, state permits, and driver allowances. You\'ll see a transparent breakdown before confirming your booking.'
            },
            {
                question: 'Are there any hidden charges?',
                answer: 'No, there are no hidden charges. All applicable charges are clearly shown in the fare breakup before you confirm your booking. Additional costs may only apply if you change your itinerary during the journey or extend the waiting time.'
            },
            {
                question: 'Do you offer any discounts or promotions?',
                answer: 'Yes, we regularly offer discounts and promotions for our loyal customers. You can check the "Offers" section in our app or website for current promotions. We also have corporate packages for business travel.'
            },
            {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major payment methods including credit/debit cards, net banking, UPI, and digital wallets. You can also pay in cash directly to the driver at the end of your journey.'
            }
        ]
    },
    {
        name: 'Ride & Services',
        icon: <Car className="h-5 w-5" />,
        questions: [
            {
                question: 'What types of vehicles do you offer?',
                answer: 'We offer various vehicle types to suit different needs, including Compact cars, Premium Sedans, SUVs, and Luxury vehicles. Each category has different seating capacity and luggage space to accommodate your requirements.'
            },
            {
                question: 'Can I make stops during my journey?',
                answer: 'Yes, you can make stops during your journey. Simply inform your driver about planned stops. For longer stops (more than 30 minutes), additional waiting charges may apply as per our policy.'
            },
            {
                question: 'What if my travel plans change?',
                answer: 'You can modify or cancel your booking through our app or website. Modifications are subject to driver availability. For cancellations, please refer to our cancellation policy for applicable charges.'
            },
            {
                question: 'Do you provide child seats?',
                answer: 'Yes, we can arrange child seats upon request. Please mention this requirement while booking or contact our customer support at least 24 hours before your journey to ensure availability.'
            }
        ]
    },
    {
        name: 'Safety & Support',
        icon: <Shield className="h-5 w-5" />,
        questions: [
            {
                question: 'How do you ensure safety during the journey?',
                answer: 'All our drivers undergo thorough background verification and training. Our vehicles are regularly maintained and equipped with GPS tracking. We also have a 24/7 emergency support line and in-app SOS feature for immediate assistance.'
            },
            {
                question: 'What happens if there\'s a breakdown?',
                answer: 'In case of a vehicle breakdown, our driver will immediately arrange for an alternative vehicle to ensure your journey continues with minimal disruption. Our support team will keep you updated throughout the process.'
            },
            {
                question: 'How can I report an issue with my ride?',
                answer: 'You can report any issues through our app\'s "Help" section, by emailing support@indicab.com, or by calling our 24/7 customer service at +91 9876 543 210. All complaints are addressed within 24 hours.'
            },
            {
                question: 'Is my personal information secure?',
                answer: 'Yes, we take data privacy very seriously. Your personal information is encrypted and stored securely. We never share your details with third parties without your consent, in accordance with our privacy policy.'
            }
        ]
    }
];

// Common troubleshooting issues
const _troubleshootingIssues = [
    {
        issue: 'App login problems',
        solution: 'Try resetting your password, check your internet connection, clear app cache, or reinstall the app. If problems persist, contact our tech support.'
    },
    {
        issue: 'Driver not arriving',
        solution: 'Check your pickup location is correctly marked, ensure your phone is reachable, and verify the booking time. You can also track your driver in real-time through the app.'
    },
    {
        issue: 'Payment failure',
        solution: 'Verify your payment method has sufficient funds, check for any bank restrictions, or try an alternative payment method. Our customer support can assist with payment issues.'
    },
    {
        issue: 'Booking cancellation',
        solution: 'Cancellations can be made through the app or website. Refund timelines depend on your payment method and how far in advance you cancel.'
    },
    {
        issue: 'Lost items',
        solution: 'Report lost items immediately through our app or customer support. If found, we will arrange for return delivery or pickup at your convenience.'
    }
];

// Contact channels
const _contactChannels = [
    {
        icon: <Phone className="h-8 w-8 text-primary" />,
        title: '24/7 Helpline',
        details: [
            '+91 9876 543 210',
            '+91 1140 154 754'
        ],
        action: {
            text: 'Call Now',
            link: 'tel:+919876543210'
        }
    },
    {
        icon: <Mail className="h-8 w-8 text-primary" />,
        title: 'Email Support',
        details: [
            'support@indicab.com',
            'Response within 24 hours'
        ],
        action: {
            text: 'Send Email',
            link: 'mailto:support@indicab.com'
        }
    },
    {
        icon: <MessageCircle className="h-8 w-8 text-primary" />,
        title: 'Live Chat',
        details: [
            'Available 24/7',
            'Instant assistance'
        ],
        action: {
            text: 'Start Chat',
            link: '#'
        }
    },
    {
        icon: <MapPin className="h-8 w-8 text-primary" />,
        title: 'City Offices',
        details: [
            'Visit us in major cities',
            'Book in person'
        ],
        action: {
            text: 'Find Offices',
            link: '/contact'
        }
    }
];

// FAQ Accordion Component
const _FAQAccordion = ({ question, answer }: { question: string; answer: string }): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 py-4">
            <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium">{question}</span>
                {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-primary" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-primary" />
                )}
            </button>
            {isOpen && (
                <div className="mt-2 text-gray-600">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

export default function HelpPage(): JSX.Element {
    const [activeCategory, setActiveCategory] = useState('Booking');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Array<{ question: string; answer: string; category: string }>>([]);

    // Handle search
    const _handleSearch = (_e: React.FormEvent) => {
        _e.preventDefault();

        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const results: Array<{ question: string; answer: string; category: string }> = [];

        faqCategories.forEach(category => {
            category.questions.forEach(item => {
                if (
                    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
                ) {
                    results.push({
                        question: item.question,
                        answer: item.answer,
                        category: category.name
                    });
                }
            });
        });

        setSearchResults(results);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow">
                {/* Hero section */}
                <section className="bg-primary text-white py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">How Can We Help You?</h1>
                            <p className="text-lg mb-8">
                                Find answers to common questions or get in touch with our support team
                            </p>

                            <form onSubmit={_handleSearch} className="relative max-w-2xl mx-auto">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search for answers, e.g., 'How to book a cab?'"
                                    className="w-full pl-12 pr-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                                    value={searchQuery}
                                    onChange={(_e) => setSearchQuery(_e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white px-4 py-1 rounded-full hover:bg-orange-600 transition-colors"
                                >
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Search Results */}
                {searchResults.length > 0 && (
                    <section className="py-8 bg-gray-50">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl mx-auto">
                                <h2 className="text-xl font-bold mb-4">Search Results ({searchResults.length})</h2>
                                <Card className="p-6">
                                    {searchResults.map((result, index): JSX.Element => (
                                        <div key={index} className="mb-6 last:mb-0">
                                            <div className="flex items-center mb-2">
                                                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full mr-2">
                                                    {result.category}
                                                </span>
                                                <h3 className="font-medium">{result.question}</h3>
                                            </div>
                                            <p className="text-gray-600">{result.answer}</p>
                                            {index < searchResults.length - 1 && <hr className="my-4" />}
                                        </div>
                                    ))}
                                </Card>
                            </div>
                        </div>
                    </section>
                )}

                {/* Contact Options */}
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold mb-8 text-center">Get In Touch</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {_contactChannels.map((channel, index): JSX.Element => (
                                    <Card key={index} className="p-6 text-center hover:shadow-md transition-shadow">
                                        <div className="flex flex-col items-center">
                                            <div className="p-4 bg-primary/10 rounded-full mb-4">
                                                {channel.icon}
                                            </div>
                                            <h3 className="text-lg font-semibold mb-2">{channel.title}</h3>
                                            {channel.details.map((_detail, _idx): JSX.Element => (
                                                <p key={_idx} className="text-gray-600">{_detail}</p>
                                            ))}
                                            <Link
                                                href={channel.action.link}
                                                className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                                            >
                                                {channel.action.text}
                                            </Link>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Category Tabs */}
                                <div className="md:w-1/4">
                                    <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
                                        <h3 className="font-medium mb-4">Categories</h3>
                                        <div className="space-y-2">
                                            {faqCategories.map((category): JSX.Element => (
                                                <button
                                                    key={category.name}
                                                    className={`w-full flex items-center p-2 rounded-md text-left ${activeCategory === category.name
                                                            ? 'bg-primary text-white'
                                                            : 'hover:bg-gray-100'
                                                        }`}
                                                    onClick={() => setActiveCategory(category.name)}
                                                >
                                                    <span className="mr-3">{category.icon}</span>
                                                    <span>{category.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ Questions */}
                                <div className="md:w-3/4">
                                    <Card className="p-6">
                                        <h3 className="font-semibold mb-6 flex items-center">
                                            {faqCategories.find(_cat => _cat.name === activeCategory)?.icon}
                                            <span className="ml-2">{activeCategory} FAQs</span>
                                        </h3>

                                        <div>
                                            {faqCategories
                                                .find(category => category.name === activeCategory)
                                                ?.questions.map((item, index): JSX.Element => (
                                                    <_FAQAccordion
                                                        key={index}
                                                        question={item.question}
                                                        answer={item.answer}
                                                    />
                                                ))}
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Troubleshooting Section */}
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="mb-8 text-center">
                                <h2 className="text-2xl font-bold mb-2">Troubleshooting Guide</h2>
                                <p className="text-gray-600">Quick solutions to common problems</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {_troubleshootingIssues.map((issue, index): JSX.Element => (
                                    <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-start">
                                            <div className="mr-4">
                                                <div className="p-2 bg-orange-100 rounded-full">
                                                    <AlertTriangle className="h-6 w-6 text-orange-500" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-2">{issue.issue}</h3>
                                                <p className="text-gray-600">{issue.solution}</p>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Help Center CTA */}
                <section className="py-16 bg-primary text-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">Still Need Help?</h2>
                            <p className="mb-8">
                                Our dedicated support team is available 24/7 to assist you with any issues or questions.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="tel:+919876543210"
                                    className="bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
                                >
                                    <Phone className="h-5 w-5 mr-2" />
                                    Call Support
                                </Link>
                                <Link
                                    href="/contact"
                                    className="bg-orange-500 text-white px-6 py-3 rounded-md font-medium hover:bg-orange-600 transition-colors flex items-center justify-center"
                                >
                                    <MessageCircle className="h-5 w-5 mr-2" />
                                    Live Chat
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-[url('/images/cloud-bg.png')] bg-repeat-x bg-bottom"></div>
                </section>
            </main>

            <_Footer />
        </div>
    );
}
