import VehiclesFilter from '@/components/admin/VehiclesFilter';
import VehiclesTable from '@/components/admin/VehiclesTable';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { connectDB } from '@/lib/db';
import Vehicle from '@/models/Vehicle';
import { Suspense } from 'react';

interface VehiclesPageProps {
    searchParams: {
        status?: string;
        type?: string;
        search?: string;
    };
}

export default async function VehiclesPage({ searchParams }: VehiclesPageProps) {
    await connectDB();

    const query: any = {};
    if (searchParams.status) query.status = searchParams.status;
    if (searchParams.type) query.type = searchParams.type;
    if (searchParams.search) {
        query.$or = [
            { name: { $regex: searchParams.search, $options: 'i' } },
            { registrationNumber: { $regex: searchParams.search, $options: 'i' } },
        ];
    }

    const vehicles = await Vehicle.find(query)
        .populate('currentDriver', 'name email phone')
        .sort({ createdAt: -1 });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Vehicles</h1>
            </div>

            <VehiclesFilter />

            <Suspense fallback={<LoadingSpinner />}>
                <VehiclesTable vehicles={vehicles} />
            </Suspense>
        </div>
    );
} 