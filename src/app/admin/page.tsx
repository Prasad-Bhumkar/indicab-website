import { DriverStats } from '@/components/admin/DriverStats';
import { RecentBookings } from '@/components/admin/RecentBookings';
import { VehicleStats } from '@/components/admin/VehicleStats';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Card, CardContent } from '@/components/ui/card';
import { connectDB } from '@/lib/db';
import Vehicle from '@/models/Vehicle';
import { Calendar, Car, CheckCircle, Users } from 'lucide-react';
import { Suspense } from 'react';

async function getStats() {
    try {
        await connectDB();
        const totalVehicles = await Vehicle.countDocuments();
        const activeVehicles = await Vehicle.countDocuments({ status: 'active' });
        const maintenanceVehicles = await Vehicle.countDocuments({ status: 'maintenance' });
        
        return {
            totalVehicles,
            activeVehicles,
            maintenanceVehicles
        };
    } catch (error) {
        console.error('Failed to fetch stats:', error);
        return {
            totalVehicles: 0,
            activeVehicles: 0,
            maintenanceVehicles: 0
        };
    }
}

export default async function AdminPage() {
    const stats = await getStats();

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
                        <Car className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalVehicles}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats.activeVehicles} active, {stats.maintenanceVehicles} in maintenance
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <Suspense fallback={<LoadingSpinner />}>
                            <DriverStats />
                        </Suspense>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Vehicle Status</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <Suspense fallback={<LoadingSpinner />}>
                            <VehicleStats />
                        </Suspense>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Recent Bookings</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <Suspense fallback={<LoadingSpinner />}>
                            <RecentBookings />
                        </Suspense>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 