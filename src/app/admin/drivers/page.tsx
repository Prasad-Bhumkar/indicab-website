import { Suspense } from 'react';

import DriversFilter from '@/components/admin/DriversFilter';
import DriversTable from '@/components/admin/DriversTable';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { connectDB } from '@/lib/db';
import Driver from '@/models/Driver';

interface DriversPageProps {
    searchParams: {
        page?: string;
        status?: string;
        search?: string;
    };
}

export default async function DriversPage({ searchParams }: DriversPageProps) {
    await connectDB();

    const page = Number(searchParams.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    // Build filter query
    const filter: any = {};
    if (searchParams.status) {
        filter.status = searchParams.status;
    }
    if (searchParams.search) {
        filter.$or = [
            { name: { $regex: searchParams.search, $options: 'i' } },
            { email: { $regex: searchParams.search, $options: 'i' } },
            { phone: { $regex: searchParams.search, $options: 'i' } }
        ];
    }

    // Fetch drivers with pagination
    const [drivers, total] = await Promise.all([
        Driver.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('currentVehicle', 'name registrationNumber'),
        Driver.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Drivers</h1>
            </div>

            <Suspense fallback={<LoadingSpinner />}>
                <DriversFilter />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
                <DriversTable
                    drivers={drivers}
                    currentPage={page}
                    totalPages={totalPages}
                />
            </Suspense>
        </div>
    );
} 