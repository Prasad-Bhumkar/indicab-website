import VehicleDetails from '@/components/admin/VehicleDetails';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { connectDB } from '@/lib/db';
import Vehicle from '@/models/Vehicle';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface VehicleDetailsPageProps {
    params: {
        id: string;
    };
}

export default async function VehicleDetailsPage({ params }: VehicleDetailsPageProps) {
    await connectDB();

    const vehicle = await Vehicle.findById(params.id)
        .populate('currentDriver', 'name email phone')
        .populate({
            path: 'maintenanceHistory',
            options: { sort: { date: -1 }, limit: 10 },
        });

    if (!vehicle) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Vehicle Details</h1>
            </div>

            <Suspense fallback={<LoadingSpinner />}>
                <VehicleDetails vehicle={vehicle} />
            </Suspense>
        </div>
    );
} 