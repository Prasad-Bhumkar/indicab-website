import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BookingStats() {
  // Mock data for demonstration
  const stats = {
    total: 1200,
    completed: 1100,
    cancelled: 80,
    revenue: 250000,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Total Bookings</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Completed</div>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Cancelled</div>
            <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Total Revenue</div>
            <div className="text-2xl font-bold text-blue-600">₹{stats.revenue.toLocaleString()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 