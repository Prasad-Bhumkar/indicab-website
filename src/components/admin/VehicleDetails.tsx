'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Car, MapPin, User } from 'lucide-react';
import { useState } from 'react';

interface MaintenanceRecord {
    _id: string;
    date: Date;
    type: string;
    description: string;
    cost: number;
    technician: string;
}

interface Driver {
    _id: string;
    name: string;
    email: string;
    phone: string;
}

interface Vehicle {
    _id: string;
    name: string;
    type: string;
    registrationNumber: string;
    status: string;
    location: string;
    lastMaintenance: Date;
    currentDriver?: Driver;
    maintenanceHistory: MaintenanceRecord[];
}

interface VehicleDetailsProps {
    vehicle: Vehicle;
}

export default function VehicleDetails({ vehicle }: VehicleDetailsProps) {
    const [status, setStatus] = useState(vehicle.status);

    const handleStatusChange = async (newStatus: string) => {
        try {
            const response = await fetch(`/api/vehicles/${vehicle._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                setStatus(newStatus);
                
                // Track status change
                trackVehicleStatus(vehicle._id, newStatus);
                
                // Track user action
                trackUserAction('vehicle_status_updated', {
                    vehicle_id: vehicle._id,
                    vehicle_name: vehicle.name,
                    old_status: status,
                    new_status: newStatus
                });
            }
        } catch (error) {
            console.error('Failed to update vehicle status:', error);
            
            // Track error
            trackUserAction('vehicle_status_update_failed', {
                vehicle_id: vehicle._id,
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            available: 'bg-green-100 text-green-800',
            in_use: 'bg-blue-100 text-blue-800',
            maintenance: 'bg-yellow-100 text-yellow-800',
            offline: 'bg-red-100 text-red-800'
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
            {/* Vehicle Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Vehicle Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-sm font-medium text-gray-500">Name</div>
                            <div className="flex items-center mt-1">
                                <Car className="h-4 w-4 text-gray-500 mr-2" />
                                <span>{vehicle.name}</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">Type</div>
                            <div className="mt-1">{vehicle.type}</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">Registration</div>
                            <div className="mt-1">{vehicle.registrationNumber}</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">Location</div>
                            <div className="flex items-center mt-1">
                                <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                                <span>{vehicle.location}</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">Last Maintenance</div>
                            <div className="flex items-center mt-1">
                                <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                                <span>{new Date(vehicle.lastMaintenance).toLocaleDateString()}</span>
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
                                        <SelectItem value="available">Available</SelectItem>
                                        <SelectItem value="in_use">In Use</SelectItem>
                                        <SelectItem value="maintenance">Maintenance</SelectItem>
                                        <SelectItem value="offline">Offline</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {vehicle.currentDriver && (
                        <div className="pt-4 border-t">
                            <div className="text-sm font-medium text-gray-500">Current Driver</div>
                            <div className="flex items-center mt-2">
                                <User className="h-4 w-4 text-gray-500 mr-2" />
                                <div>
                                    <div className="font-medium">{vehicle.currentDriver.name}</div>
                                    <div className="text-sm text-gray-500">
                                        {vehicle.currentDriver.email} • {vehicle.currentDriver.phone}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Maintenance History */}
            <Card>
                <CardHeader>
                    <CardTitle>Maintenance History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {vehicle.maintenanceHistory.map((record) => (
                            <div key={record._id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                <div className="p-2 bg-white rounded-full">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="font-medium">
                                            {new Date(record.date).toLocaleDateString()}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {record.type}
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <div className="text-sm">{record.description}</div>
                                        <div className="mt-2 flex items-center justify-between text-sm">
                                            <div className="text-gray-500">
                                                Technician: {record.technician}
                                            </div>
                                            <div className="font-medium">
                                                ₹{record.cost}
                                            </div>
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