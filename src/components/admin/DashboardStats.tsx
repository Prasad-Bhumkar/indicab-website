import { Calendar } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

interface DashboardStatsProps {
    totalBookings: number;
    totalUsers: number;
    totalVehicles: number;
}

export default function DashboardStats({
    totalBookings,
    totalUsers,
    totalVehicles
}: DashboardStatsProps) {
    const stats = [
        {
            title: 'Total Bookings',
            value: totalBookings,
            icon: <Calendar className="w-6 h-6 text-green-600" />,
            trend: 'up',
            change: '12%'
        },
        {
            title: 'Total Users',
            value: totalUsers,
            icon: <Users className="w-6 h-6 text-blue-600" />,
            trend: 'up',
            change: '8%'
        },
        {
            title: 'Total Vehicles',
            value: totalVehicles,
            icon: <Car className="w-6 h-6 text-purple-600" />,
            trend: 'up',
            change: '5%'
        }
    ];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => (
                <Card key={index}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                <p className="text-3xl font-bold">{stat.value}</p>
                            </div>
                            <div className="p-2 bg-gray-50 rounded-full">
                                {stat.icon}
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className={`text-xs font-medium ${
                                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                            }`}>
                                <span className="flex items-center">
                                    {stat.trend === 'up' ? '↑' : '↓'} {stat.change} from last month
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
} 