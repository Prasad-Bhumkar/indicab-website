'use client';

import { useState } from 'react';

import { Calendar, Car, Clock, DollarSign, MapPin, Star, User } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { trackDriverStatus, trackUserAction } from '@/lib/analytics';

interface Trip {
    _id: string;
    date: Date;
    pickup: string;
    dropoff: string;
    duration: number;
    fare: number;
    rating: number;
}

interface Vehicle {
    _id: string;
    name: string;
    registrationNumber: string;
    type: string;
}

interface Driver {
    _id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    rating: number;
    totalTrips: number;
    totalEarnings: number;
    currentVehicle?: Vehicle;
    tripHistory: Trip[];
}

interface DriverDetailsProps {
    driver: Driver;
}

export default function DriverDetails({ driver }: DriverDetailsProps) {
    const [status, setStatus] = useState(driver.status);

    const handleStatusChange = async (newStatus: string) => {
        try {
            const response = await fetch(`/api/drivers/${driver._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                setStatus(newStatus);
                
                // Track status change
                trackDriverStatus(driver._id, newStatus);
                
                // Track user action
                trackUserAction('driver_status_updated', {
                    driver_id: driver._id,
                    driver_name: driver.name,
                    old_status: status,
                    new_status: newStatus
                });
            }
        } catch (error) {
            console.error('Failed to update driver status:', error);
            
            // Track error
            trackUserAction('driver_status_update_failed', {
                driver_id: driver._id,
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            active: 'bg-green-100 text-green-800',
            on_duty: 'bg-blue-100 text-blue-800',
            off_duty: 'bg-gray-100 text-gray-800',
            suspended: 'bg-red-100 text-red-800'
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800'
            }`}>
                {status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </span>
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Driver Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Driver Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-sm font-medium text-gray-500">Name</div>
                            <div className="flex items-center mt-1">
                                <User className="h-4 w-4 text-gray-500 mr-2" />
                                <span>{driver.name}</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">Contact</div>
                            <div className="mt-1">
                                <div>{driver.email}</div>
                                <div className="text-gray-500">{driver.phone}</div>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">Rating</div>
                            <div className="flex items-center mt-1">
                                <Star className="h-4 w-4 text-yellow-400 mr-2" />
                                <span>{driver.rating.toFixed(1)} / 5.0</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">Total Trips</div>
                            <div className="mt-1">{driver.totalTrips}</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">Total Earnings</div>
                            <div className="flex items-center mt-1">
                                <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                                <span>₹{driver.totalEarnings}</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">Status</div>
                            <div className="mt-2">
                                <Select
                                    value={status}
                                    onValueChange={handleStatusChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="on_duty">On Duty</SelectItem>
                                        <SelectItem value="off_duty">Off Duty</SelectItem>
                                        <SelectItem value="suspended">Suspended</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {driver.currentVehicle && (
                        <div className="pt-4 border-t">
                            <div className="text-sm font-medium text-gray-500">Current Vehicle</div>
                            <div className="flex items-center mt-2">
                                <Car className="h-4 w-4 text-gray-500 mr-2" />
                                <div>
                                    <div className="font-medium">{driver.currentVehicle.name}</div>
                                    <div className="text-sm text-gray-500">
                                        {driver.currentVehicle.registrationNumber} • {driver.currentVehicle.type}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Trip History */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Trips</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {driver.tripHistory.map((trip) => (
                            <div key={trip._id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                <div className="p-2 bg-white rounded-full">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="font-medium">
                                            {new Date(trip.date).toLocaleDateString()}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            <Clock className="h-4 w-4 inline mr-1" />
                                            {trip.duration} mins
                                        </div>
                                    </div>
                                    <div className="mt-2 space-y-1">
                                        <div className="flex items-center text-sm">
                                            <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                                            <span>{trip.pickup}</span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                                            <span>{trip.dropoff}</span>
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between text-sm">
                                        <div className="flex items-center">
                                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                            <span>{trip.rating.toFixed(1)}</span>
                                        </div>
                                        <div className="font-medium">
                                            ₹{trip.fare}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 