"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Button } from '../../ui/Button';
import { MapPin, Star, Calendar, Clock, MessageSquare, Heart, Share, Car, X, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Route, VehicleType, Amenity } from '../../data/routes';

// Dynamic import for the map component to avoid SSR issues
const _RouteMapView = dynamic(() => import('./RouteMapView'), {
    ssr: false,
    loading: () => <div className="h-60 bg-gray-100 animate-pulse rounded-md flex items-center justify-center">Loading map...</div>
});

// Review interface
interface Review {
    id: number;
    userId: number;
    userName: string;
    userAvatar: string;
    rating: number;
    comment: string;
    date: string;
}

// Route interface with reviews
interface RouteWithReviews {
    id: number;
    from: string;
    to: string;
    description: string;
    price: string;
    image: string;
    distance: string;
    duration: string;
    popular: boolean;
    fromCoordinates: [number, number];
    toCoordinates: [number, number];
    reviews: Review[];
    vehicleTypes: VehicleType[];
    amenities: Amenity[];
}

interface RouteDetailsProps {
    route: RouteWithReviews;
    isOpen: boolean;
    onClose: () => void;
    onFavoriteToggle: (routeId: number) => void;
    isFavorite: boolean;
}

// Star rating component
const StarRating = ({ rating }: { rating: number }): JSX.Element => {
    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star): JSX.Element => (
                <Star
                    key={star}
                    className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                />
            ))}
        </div>
    );
};

export default function RouteDetails({
    route,
    isOpen,
    onClose,
    onFavoriteToggle,
    isFavorite
}: RouteDetailsProps): JSX.Element {
    const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'map'>('details');
    const [newReview, setNewReview] = useState({ rating: 0, comment: '' });

    // Calculate average rating
    const averageRating = route.reviews.length > 0
        ? route.reviews.reduce((_sum, review) => _sum + review.rating, 0) / route.reviews.length
        : 0;

    const _handleFavoriteClick = () => {
        onFavoriteToggle(route.id);
    };

    // Add route to comparison
    const _handleCompareClick = () => {
        // Create the URL with the compare parameter
        const url = new URL(window.location.href);
        url.pathname = '/routes';
        url.searchParams.set('compare', route.id.toString());

        // Navigate to the routes page with comparison param
        window.location.href = url.toString();
    };

    const _handleSubmitReview = (_e: React.FormEvent) => {
        _e.preventDefault();
        // In a real app, this would submit the review to the backend
        alert('Review submitted! This would save to a database in a real application.');
        setNewReview({ rating: 0, comment: '' });
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => onClose()}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        {route.from} to {route.to}
                    </DialogTitle>
                    <DialogDescription>
                        {route.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="relative h-48 mb-4 rounded-md overflow-hidden">
                    <Image
                        src={route.image}
                        alt={`${route.from} to ${route.to}`}
                        fill
                        className="object-cover"
                        // unoptimized
                        crossOrigin="anonymous"
                    />
                    {route.popular && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs py-0.5 px-2 rounded">
                            Popular
                        </div>
                    )}
                </div>

                <div className="flex space-x-2 mb-4 border-b">
                    <button
                        className={`px-4 py-2 text-sm font-medium ${activeTab === 'details'
                                ? 'border-b-2 border-primary text-primary'
                                : 'text-gray-600'
                            }`}
                        onClick={() => setActiveTab('details')}
                    >
                        Details
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium ${activeTab === 'reviews'
                                ? 'border-b-2 border-primary text-primary'
                                : 'text-gray-600'
                            }`}
                        onClick={() => setActiveTab('reviews')}
                    >
                        Reviews ({route.reviews.length})
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium ${activeTab === 'map'
                                ? 'border-b-2 border-primary text-primary'
                                : 'text-gray-600'
                            }`}
                        onClick={() => setActiveTab('map')}
                    >
                        Map View
                    </button>
                </div>

                {activeTab === 'details' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center mb-2">
                                    <MapPin className="h-4 w-4 text-primary mr-1" />
                                    <span className="text-sm text-gray-600">{route.distance} journey</span>
                                </div>
                                <div className="flex items-center mb-2">
                                    <Clock className="h-4 w-4 text-primary mr-1" />
                                    <span className="text-sm text-gray-600">Approximately {route.duration}</span>
                                </div>
                                <div className="flex items-center mb-2">
                                    <Car className="h-4 w-4 text-primary mr-1" />
                                    <span className="text-sm text-gray-600">
                                        Available in: {route.vehicleTypes.join(', ')}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                    <span className="text-sm text-gray-600">
                                        {averageRating.toFixed(1)} ({route.reviews.length} reviews)
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-primary mb-2">{route.price}</div>
                                <Link
                                    href={`/booking?from=${route.from}&to=${route.to}`}
                                    className="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary/90 transition-colors inline-block"
                                    prefetch={true}
                                >
                                    Book Now
                                </Link>
                            </div>
                        </div>

                        <div className="flex justify-center space-x-4 border-t border-b py-3 mt-4">
                            <Button
                                variant="ghost"
                                className={`flex items-center ${isFavorite ? 'text-red-500' : 'text-gray-600'}`}
                                onClick={_handleFavoriteClick}
                            >
                                <Heart className={`h-4 w-4 mr-1 ${isFavorite ? 'fill-red-500' : ''}`} />
                                {isFavorite ? 'Saved' : 'Save'}
                            </Button>
                            <Button
                                variant="ghost"
                                className="flex items-center text-gray-600"
                                onClick={_handleCompareClick}
                            >
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Compare
                            </Button>
                            <Button
                                variant="ghost"
                                className="flex items-center text-gray-600"
                                onClick={() => {
                                    navigator.share?.({
                                        title: `${route.from} to ${route.to} Cab Ride`,
                                        text: `Check out this cab ride from ${route.from} to ${route.to}`,
                                        url: window.location.href
                                    }).catch(() => {
                                        // Fallback for browsers that don't support navigator.share
                                        alert(`Share this link: ${window.location.href}`);
                                    });
                                }}
                            >
                                <Share className="h-4 w-4 mr-1" />
                                Share
                            </Button>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                            <h3 className="font-medium mb-2">Route Information</h3>
                            <p className="text-sm text-gray-600 mb-3">
                                Enjoy a comfortable journey from {route.from} to {route.to}. Our experienced drivers will ensure you reach your destination safely and on time. The cab is equipped with air conditioning, bottled water, and sanitized regularly for your comfort and safety.
                            </p>

                            <div className="mb-3">
                                <h4 className="font-medium mb-2 text-sm">Vehicle Types:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {route.vehicleTypes.map((type): JSX.Element => (
                                        <span key={type} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <h4 className="font-medium mb-2 text-sm">Amenities:</h4>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {route.amenities.map((amenity): JSX.Element => (
                                    <span key={amenity} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full flex items-center">
                                        <CheckCircle2 className="h-3 w-3 mr-1" />
                                        {amenity}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium">Customer Reviews</h3>
                                <div className="flex items-center mt-1">
                                    <StarRating rating={Math.round(averageRating)} />
                                    <span className="ml-2 text-sm text-gray-600">
                                        {averageRating.toFixed(1)} out of 5 ({route.reviews.length} reviews)
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 max-h-[300px] overflow-y-auto">
                            {route.reviews.length > 0 ? (
                                route.reviews.map((review): JSX.Element => (
                                    <div key={review.id} className="border-b pb-3">
                                        <div className="flex items-start">
                                            <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
                                                <Image
                                                    src={review.userAvatar}
                                                    alt={review.userName}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                    crossOrigin="anonymous"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="font-medium text-sm">{review.userName}</h4>
                                                    <span className="text-xs text-gray-500">{review.date}</span>
                                                </div>
                                                <div className="my-1">
                                                    <StarRating rating={review.rating} />
                                                </div>
                                                <p className="text-sm text-gray-700">{review.comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <MessageSquare className="h-12 w-12 mx-auto text-gray-300" />
                                    <p className="mt-2 text-gray-500">No reviews yet</p>
                                </div>
                            )}
                        </div>

                        <div className="border-t pt-4">
                            <h3 className="font-medium mb-2">Write a Review</h3>
                            <form onSubmit={_handleSubmitReview}>
                                <div className="mb-3">
                                    <label className="block text-sm font-medium mb-1">Rating</label>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star): JSX.Element => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setNewReview({ ...newReview, rating: star })}
                                                className="mr-1"
                                            >
                                                <Star
                                                    className={`w-6 h-6 ${star <= newReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="block text-sm font-medium mb-1">Comment</label>
                                    <textarea
                                        value={newReview.comment}
                                        onChange={(_e) => setNewReview({ ...newReview, comment: _e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        rows={3}
                                        required
                                        placeholder="Share your experience..."
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="bg-primary text-white"
                                    disabled={newReview.rating === 0 || !newReview.comment.trim()}
                                >
                                    Submit Review
                                </Button>
                            </form>
                        </div>
                    </div>
                )}

                {activeTab === 'map' && (
                    <div className="h-[400px] rounded-md overflow-hidden border">
                        <_RouteMapView
                            fromCoordinates={route.fromCoordinates}
                            toCoordinates={route.toCoordinates}
                            fromCity={route.from}
                            toCity={route.to}
                        />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
