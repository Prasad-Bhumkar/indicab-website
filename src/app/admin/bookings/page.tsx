import BookingsTable from '@/components/admin/BookingsTable';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { connectDB } from '@/lib/db';
import Booking from '@/models/Booking';
import { Suspense } from 'react';

interface BookingsPageProps {
    searchParams: {
        page?: string;
        status?: string;
        date?: string;
    };
}

export default async function BookingsPage({ searchParams }: BookingsPageProps) {
    await connectDB();

    const page = Number(searchParams.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    // Build filter query
    const filter: any = {};
    if (searchParams.status) {
        filter.status = searchParams.status;
    }
    if (searchParams.date) {
        const date = new Date(searchParams.date);
        filter.startDate = {
            $gte: new Date(date.setHours(0, 0, 0, 0)),
            $lt: new Date(date.setHours(23, 59, 59, 999))
        };
    }

    // Fetch bookings with pagination
    const [bookings, total] = await Promise.all([
        Booking.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('user', 'name email')
            .populate('vehicle', 'name type'),
        Booking.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
            </div>

            <Suspense fallback={<LoadingSpinner />}>
                <BookingsFilter />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
                <BookingsTable
                    bookings={bookings}
                    currentPage={page}
                    totalPages={totalPages}
                />
            </Suspense>
        </div>
    );
} 