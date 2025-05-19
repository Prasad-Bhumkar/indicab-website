"use client";

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '../../ui/Card';

const testimonials = [
    {
        id: 1,
        name: 'Rajesh Kumar',
        location: 'Delhi',
        image: '/assets/avatars/user-1.jpg',
        rating: 5,
        date: 'May 15, 2023',
        comment: 'Excellent service! The driver was very professional and the car was clean and comfortable. Will definitely use IndiCab again for my future trips.',
        route: 'Delhi to Agra'
    },
    {
        id: 2,
        name: 'Priya Singh',
        location: 'Mumbai',
        image: '/assets/avatars/user-2.jpg',
        rating: 5,
        date: 'June 2, 2023',
        comment: 'I was impressed with the quality of service. The booking process was simple, the driver arrived on time, and the journey was comfortable. Highly recommended!',
        route: 'Mumbai to Pune'
    },
    {
        id: 3,
        name: 'Vikram Patel',
        location: 'Bangalore',
        image: '/assets/avatars/user-3.jpg',
        rating: 4,
        date: 'July 10, 2023',
        comment: 'Great experience! The driver was knowledgeable about the route and suggested some good stops along the way. The car was also very comfortable for our family of four.',
        route: 'Bangalore to Mysore'
    },
    {
        id: 4,
        name: 'Anita Sharma',
        location: 'Chennai',
        image: '/assets/avatars/user-4.jpg',
        rating: 5,
        date: 'August 18, 2023',
        comment: 'Fantastic service from start to finish. The driver was punctual, courteous, and drove safely. The car was spacious and comfortable. Will definitely book again!',
        route: 'Chennai to Pondicherry'
    },
    {
        id: 5,
        name: 'Mohit Agarwal',
        location: 'Jaipur',
        image: '/assets/avatars/user-5.jpg',
        rating: 5,
        date: 'September 5, 2023',
        comment: 'One of the best cab services I\'ve used. The driver was friendly and professional, and the journey was smooth. The pricing was also very transparent with no hidden charges.',
        route: 'Delhi to Jaipur'
    }
];

const Testimonials: React.FC<TestimonialsProps> = (props) => {
    const [current, setCurrent] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const nextSlide = () => {
        setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
    };

    const _prevSlide = () => {
        setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
    };

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        if (autoplay) {
            timeoutRef.current = setTimeout(() => {
                nextSlide();
            }, 5000);
        }

        return () => {
            resetTimeout();
        };
    }, [current, autoplay]);

    // Show 1 card on mobile, 3 on desktop
    const _visibleTestimonials = () => {
        const result = [];
        const count = testimonials.length;

        // On mobile, just show 1
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            return [testimonials[current]];
        }

        // On desktop, show 3 - the current one and one on each side
        for (let i = -1; i <= 1; i++) {
            const index = (current + i + count) % count;
            result.push(testimonials[index]);
        }

        return result;
    };

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-2">What Our Customers Say</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Read testimonials from our satisfied customers who have experienced our comfortable and reliable cab services
                    </p>
                </div>

                <div className="relative">
                    {/* Navigation buttons */}
                    <button
                        onClick={_prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 hidden md:block p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                        aria-label="Previous testimonial"
                        onMouseEnter={() => setAutoplay(false)}
                        onMouseLeave={() => setAutoplay(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 hidden md:block p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                        aria-label="Next testimonial"
                        onMouseEnter={() => setAutoplay(false)}
                        onMouseLeave={() => setAutoplay(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Testimonial cards */}
                    <div className="flex justify-center gap-4 flex-wrap md:flex-nowrap">
                        {_visibleTestimonials().map((testimonial, index): JSX.Element => (
                            <motion.div
                                key={testimonial.id}
                                className="w-full md:w-1/3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                layout
                            >
                                <Card className="h-full p-6 shadow-md hover:shadow-lg transition-shadow">
                                    <div className="flex items-center mb-4">
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-800">{testimonial.name}</div>
                                            <div className="text-sm text-gray-500">{testimonial.location}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center mb-4">
                                        {[...Array(5)].map((_, i): JSX.Element => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                        <span className="ml-2 text-xs text-gray-500">{testimonial.date}</span>
                                    </div>

                                    <div className="relative mb-4">
                                        <Quote className="absolute -top-2 -left-2 h-6 w-6 text-primary/20" />
                                        <p className="text-gray-600 text-sm pl-4">{testimonial.comment}</p>
                                    </div>

                                    <div className="mt-auto pt-4 border-t">
                                        <div className="text-xs text-gray-500">Route:</div>
                                        <div className="text-sm font-medium text-primary">{testimonial.route}</div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile indicators */}
                    <div className="flex justify-center mt-6 md:hidden">
                        {testimonials.map((_, index): JSX.Element => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`h-2 w-2 mx-1 rounded-full transition-colors ${current === index ? 'bg-primary' : 'bg-gray-300'
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="text-center mt-12">
                    <div className="inline-flex items-center justify-center px-4 py-2 border border-primary text-primary rounded-md bg-white">
                        <span className="text-3xl font-bold mr-2">4.8</span>
                        <div className="text-left">
                            <div className="flex">
                                {[...Array(5)].map((_, i): JSX.Element => (
                                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                            <span className="text-xs text-gray-500">Based on 10,000+ reviews</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
