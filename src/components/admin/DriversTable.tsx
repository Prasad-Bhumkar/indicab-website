'use client';

import { Car, ChevronLeft, ChevronRight, User } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Vehicle {
    _id: string;
    name: string;
    registrationNumber: string;
}

interface Driver {
    _id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    currentVehicle?: Vehicle;
    rating: number;
    totalTrips: number;
}

interface DriversTableProps {
    drivers: Driver[];
    currentPage: number;
    totalPages: number;
}

export default function DriversTable({ drivers, currentPage, totalPages }: DriversTableProps) {
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
        <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Driver</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Current Vehicle</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Total Trips</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {drivers.map((driver) => (
                            <TableRow key={driver._id}>
                                <TableCell>
                                    <div className="flex items-center">
                                        <User className="h-4 w-4 text-gray-500 mr-2" />
                                        <span className="font-medium">{driver.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm">
                                        <div>{driver.email}</div>
                                        <div className="text-gray-500">{driver.phone}</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {driver.currentVehicle ? (
                                        <div className="flex items-center">
                                            <Car className="h-4 w-4 text-gray-500 mr-2" />
                                            <div>
                                                <div className="font-medium">{driver.currentVehicle.name}</div>
                                                <div className="text-sm text-gray-500">
                                                    {driver.currentVehicle.registrationNumber}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="text-gray-500">Not assigned</span>
                                    )}
                                </TableCell>
                                <TableCell>{getStatusBadge(driver.status)}</TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        <span className="font-medium">{driver.rating.toFixed(1)}</span>
                                        <span className="text-gray-500 ml-1">/ 5.0</span>
                                    </div>
                                </TableCell>
                                <TableCell>{driver.totalTrips}</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        asChild
                                    >
                                        <Link href={`/admin/drivers/${driver._id}`}>
                                            View Details
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Pagination */}
                <div className="flex items-center justify-between p-4 border-t">
                    <div className="text-sm text-gray-500">
                        Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === 1}
                            onClick={() => {
                                const params = new URLSearchParams(window.location.search);
                                params.set('page', String(currentPage - 1));
                                window.location.search = params.toString();
                            }}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === totalPages}
                            onClick={() => {
                                const params = new URLSearchParams(window.location.search);
                                params.set('page', String(currentPage + 1));
                                window.location.search = params.toString();
                            }}
                        >
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 