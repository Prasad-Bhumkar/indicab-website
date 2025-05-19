'use client';

import { MapPin, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Booking {
    _id: string;
    user: {
        name: string;
        email: string;
    };
    vehicle: {
        name: string;
        type: string;
    };
    startDate: Date;
    endDate: Date;
    status: string;
    totalAmount: number;
}

interface BookingsTableProps {
    bookings: Booking[];
    currentPage: number;
    totalPages: number;
}

export default function BookingsTable({ bookings, currentPage, totalPages }: BookingsTableProps) {
    const router = useRouter();

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            pending: 'bg-yellow-100 text-yellow-800',
            confirmed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
            completed: 'bg-blue-100 text-blue-800'
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800'
            }`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(window.location.search);
        params.set('page', page.toString());
        router.push(`/admin/bookings?${params.toString()}`);
    };

    return (
        <Card>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="py-3 px-4 text-left font-medium text-gray-500">Customer</th>
                                <th className="py-3 px-4 text-left font-medium text-gray-500">Vehicle</th>
                                <th className="py-3 px-4 text-left font-medium text-gray-500">Date</th>
                                <th className="py-3 px-4 text-left font-medium text-gray-500">Amount</th>
                                <th className="py-3 px-4 text-left font-medium text-gray-500">Status</th>
                                <th className="py-3 px-4 text-left font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center">
                                            <User className="h-3 w-3 text-gray-500 mr-1" />
                                            {booking.user.name}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">{booking.vehicle.name}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center">
                                            <MapPin className="h-3 w-3 text-gray-500 mr-1" />
                                            {new Date(booking.startDate).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 font-medium">₹{booking.totalAmount}</td>
                                    <td className="py-3 px-4">{getStatusBadge(booking.status)}</td>
                                    <td className="py-3 px-4">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => router.push(`/admin/bookings/${booking._id}`)}
                                        >
                                            View Details
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between p-4 border-t">
                    <div className="text-sm text-gray-500">
                        Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 