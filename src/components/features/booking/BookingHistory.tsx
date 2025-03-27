"use client";

import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Car, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from 'components/ui/button';
import { fetchBookings, cancelBooking, modifyBooking, type Booking } from '../services/bookingService';
import { toast } from 'react-hot-toast';

type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

interface Booking {
  id: string;
  date: string;
  time: string;
  origin: string;
  destination: string;
  carType: string;
  fare: string;
  status: BookingStatus;
  driver?: {
    name: string;
    contact: string;
  };
}

const BookingHistory = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [modifyingId, setModifyingId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<BookingStatus | 'all'>('all');

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const userId = '123'; // In a real app, get from auth context
        const data = await fetchBookings(userId);
        setBookings(data);
      } catch (err) {
        setError('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const filteredBookings = activeFilter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === activeFilter);

  const handleCancel = async (bookingId: string) => {
    setCancellingId(bookingId);
    try {
      await cancelBooking(bookingId);
      toast.success('Booking cancelled successfully');
      const userId = '123'; // Replace with actual user ID
      const data = await fetchBookings(userId);
      setBookings(data);
    } catch (error) {
      toast.error('Failed to cancel booking');
    } finally {
      setCancellingId(null);
    }
  };

  const handleModify = async (bookingId: string, changes: Partial<Booking>) => {
    setModifyingId(bookingId);
    try {
      const updatedBooking = await modifyBooking(bookingId, changes);
      toast.success('Booking updated successfully');
      setBookings(bookings.map(b => b.id === bookingId ? updatedBooking : b));
    } catch (error) {
      toast.error('Failed to modify booking');
    } finally {
      setModifyingId(null);
    }
  };

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
        {filteredBookings.map((booking) => (
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
              <span className={`px-2 py-1 rounded text-xs ${
                booking.status === 'completed' 
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
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleModify(booking.id, { /* changes */ })}>
                  Modify
                </Button>
                <Button variant="destructive" size="sm" className="flex-1" onClick={() => handleCancel(booking.id)}>
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

export default BookingHistory;