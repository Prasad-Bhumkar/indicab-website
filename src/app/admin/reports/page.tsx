import BookingStats from '@/components/admin/BookingStats';
import DriverPerformance from '@/components/admin/DriverPerformance';
import RevenueChart from '@/components/admin/RevenueChart';
import VehicleUtilization from '@/components/admin/VehicleUtilization';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Suspense } from 'react';

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Suspense fallback={<LoadingSpinner />}>
                    <BookingStats />
                </Suspense>
                <Suspense fallback={<LoadingSpinner />}>
                    <DriverPerformance />
                </Suspense>
                <Suspense fallback={<LoadingSpinner />}>
                    <RevenueChart />
                </Suspense>
                <Suspense fallback={<LoadingSpinner />}>
                    <VehicleUtilization />
                </Suspense>
            </div>
        </div>
    );
} 