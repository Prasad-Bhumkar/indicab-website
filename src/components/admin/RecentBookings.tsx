'use client';

import { MapPin, User } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Booking {
    id: string;
    customerName: string;
    pickupLocation: string;
    dropoffLocation: string;
    status: string;
    createdAt: string;
}

interface RecentBookingsProps {
    bookings: Booking[];
}

export default function RecentBookings({ bookings }: RecentBookingsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="flex items-center justify-between p-4 border rounded-lg"
                        >
                            <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                    <User className="w-4 h-4" />
                                    <span className="font-medium">{booking.customerName}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                    <MapPin className="w-4 h-4" />
                                    <span>{booking.pickupLocation}</span>
                                </div>
                            </div>
                            <Button variant="outline" asChild>
                                <Link href={`/admin/bookings/${booking.id}`}>View Details</Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
} 