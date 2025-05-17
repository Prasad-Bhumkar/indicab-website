"use client";

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Calendar, MapPin, Car, CheckCircle, XCircle } from 'lucide-react';
import { Button } from 'components/ui/button';
import { fetchBookings, cancelBooking, modifyBooking } from '../services/bookingService';
import { toast } from 'react-hot-toast';
import { Booking as BookingType } from '@/lib/types';

type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

interface BookingHistoryProps {
    bookings: BookingType[];
    onCancel: (id: string) => void;
}

const _BookingHistory: React.FC<BookingHistoryProps> = ({ bookings, onCancel }): JSX.Element => {
    const [bookingsState, setBookings] = useState<BookingType[]>(bookings);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cancellingId, setCancellingId] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState<BookingStatus | 'all'>('all');

    const _filteredBookings = useMemo(() => {
        return activeFilter === 'all'
            ? bookingsState
            : bookingsState.filter(booking => booking.status === activeFilter);
    }, [activeFilter, bookingsState]);

    const refreshBookings = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const _userId = '123'; // In a real app, get from auth context
            const _data = await fetchBookings(_userId);
            setBookings(_data);
        } catch (_err) {
            setError('Failed to load bookings');
            console.error('Error fetching bookings:', _err);
        } finally {
            setLoading(false);
        }
    }, []);

    const _handleCancel = useCallback(async (bookingId: string) => {
        setCancellingId(bookingId);
        try {
            await cancelBooking(bookingId);
            toast.success('Booking cancelled successfully');
            await refreshBookings();
        } catch (error) {
            console.error('Error cancelling booking:', error);
            toast.error('Failed to cancel booking');
        } finally {
            setCancellingId(null);
        }
    }, [refreshBookings]);

    const _handleModify = useCallback(async (bookingId: string, _changes: Partial<BookingType>) => {
        try {
            const _updatedBooking = await modifyBooking(bookingId, _changes);
            toast.success('Booking updated successfully');
            setBookings(_prev => _prev.map(b => b.id === bookingId ? _updatedBooking : b));
        } catch (error) {
            console.error('Error modifying booking:', error);
            toast.error('Failed to modify booking');
        }
    }, []);

    if (loading) return <div>Loading bookings...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex space-x-2 overflow-x-auto pb-2">
                <Button
                    variant={activeFilter === 'all' ? 'default' : 'outline'}
                    onClick={() => setActiveFilter('all')}
                >
                    All Bookings
                </Button>
                <Button
                    variant={activeFilter === 'upcoming' ? 'default' : 'outline'}
                    onClick={() => setActiveFilter('upcoming')}
                >
                    Upcoming
                </Button>
                <Button
                    variant={activeFilter === 'completed' ? 'default' : 'outline'}
                    onClick={() => setActiveFilter('completed')}
                >
                    Completed
                </Button>
                <Button
                    variant={activeFilter === 'cancelled' ? 'default' : 'outline'}
                    onClick={() => setActiveFilter('cancelled')}
                >
                    Cancelled
                </Button>
            </div>

            <div className="space-y-4">
                {_filteredBookings.map((booking): JSX.Element => (
                    <div key={booking.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium flex items-center">
                                    {booking.status === 'completed' && (
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    )}
                                    {booking.status === 'cancelled' && (
                                        <XCircle className="h-4 w-4 text-red-500 mr-2" />
                                    )}
                                    {booking.id}
                                </h3>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    <span>{booking.date} at {booking.time}</span>
                                </div>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs ${booking.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : booking.status === 'cancelled'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}>
                                {booking.status}
                            </span>
                        </div>

                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start">
                                <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium text-sm">Route</h4>
                                    <p className="text-gray-600 text-sm mt-1">
                                        {booking.origin} → {booking.destination}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <Car className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium text-sm">Vehicle</h4>
                                    <p className="text-gray-600 text-sm mt-1">
                                        {booking.carType} • {booking.fare}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {booking.driver && booking.status === 'upcoming' && (
                            <div className="mt-3 pt-3 border-t">
                                <h4 className="font-medium text-sm mb-2">Driver Details</h4>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm">{booking.driver.name}</p>
                                        <p className="text-gray-500 text-xs">{booking.driver.contact}</p>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        Contact
                                    </Button>
                                </div>
                            </div>
                        )}

                        {booking.status === 'upcoming' && (
                            <div className="mt-4 flex space-x-2">
                                <Button variant="outline" size="sm" className="flex-1" onClick={() => _handleModify(booking.id, { /* changes */ })}>
                                    Modify
                                </Button>
                                <Button variant="destructive" size="sm" className="flex-1" onClick={() => _handleCancel(booking.id)}>
                                    {cancellingId === booking.id ? 'Cancelling...' : 'Cancel'}
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default _BookingHistory;
