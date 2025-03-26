"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  User,
  Car,
  TrendingUp,
  BadgeIndianRupee,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users
} from 'lucide-react';

// Sample data
const stats = [
  {
    title: 'Total Bookings',
    value: '1,248',
    change: '+12.5%',
    trend: 'up',
    icon: <Calendar className="h-5 w-5 text-green-500" />
  },
  {
    title: 'Active Drivers',
    value: '78',
    change: '+5.2%',
    trend: 'up',
    icon: <User className="h-5 w-5 text-blue-500" />
  },
  {
    title: 'Total Revenue',
    value: '₹8.2L',
    change: '+18.7%',
    trend: 'up',
    icon: <BadgeIndianRupee className="h-5 w-5 text-orange-500" />
  },
  {
    title: 'Available Vehicles',
    value: '92',
    change: '-3.5%',
    trend: 'down',
    icon: <Car className="h-5 w-5 text-purple-500" />
  }
];

const recentBookings = [
  {
    id: 'BK-7829',
    customerName: 'Vikram Singh',
    from: 'Mumbai',
    to: 'Pune',
    date: 'Today, 2:30 PM',
    amount: '₹2,850',
    status: 'Confirmed',
    driverName: 'Rajesh Kumar',
    vehicleType: 'Sedan'
  },
  {
    id: 'BK-7828',
    customerName: 'Priya Patel',
    from: 'Bangalore',
    to: 'Mysore',
    date: 'Today, 12:15 PM',
    amount: '₹3,200',
    status: 'In Progress',
    driverName: 'Sunil Verma',
    vehicleType: 'SUV'
  },
  {
    id: 'BK-7827',
    customerName: 'Aditya Sharma',
    from: 'Delhi',
    to: 'Agra',
    date: 'Today, 10:00 AM',
    amount: '₹4,500',
    status: 'Completed',
    driverName: 'Mohan Singh',
    vehicleType: 'Premium Sedan'
  },
  {
    id: 'BK-7826',
    customerName: 'Neha Gupta',
    from: 'Chennai',
    to: 'Pondicherry',
    date: 'Yesterday, 4:45 PM',
    amount: '₹3,100',
    status: 'Cancelled',
    driverName: 'Not Assigned',
    vehicleType: 'Sedan'
  },
  {
    id: 'BK-7825',
    customerName: 'Rahul Mehta',
    from: 'Hyderabad',
    to: 'Warangal',
    date: 'Yesterday, 1:30 PM',
    amount: '₹2,750',
    status: 'Completed',
    driverName: 'Ajay Patil',
    vehicleType: 'Sedan'
  }
];

const activeDrivers = [
  {
    id: 'DRV-423',
    name: 'Rajesh Kumar',
    avatar: '/images/avatars/user-1.jpg',
    location: 'Mumbai',
    status: 'On Trip',
    rating: 4.8,
    tripCount: 368,
    vehicle: 'Toyota Innova',
    onlineHours: 6.5
  },
  {
    id: 'DRV-389',
    name: 'Mohan Singh',
    avatar: '/images/avatars/user-2.jpg',
    location: 'Delhi',
    status: 'Available',
    rating: 4.9,
    tripCount: 412,
    vehicle: 'Honda City',
    onlineHours: 4.2
  },
  {
    id: 'DRV-401',
    name: 'Sunil Verma',
    avatar: '/images/avatars/user-3.jpg',
    location: 'Bangalore',
    status: 'On Trip',
    rating: 4.7,
    tripCount: 287,
    vehicle: 'Maruti Ertiga',
    onlineHours: 7.5
  },
  {
    id: 'DRV-398',
    name: 'Ajay Patil',
    avatar: '/images/avatars/user-4.jpg',
    location: 'Hyderabad',
    status: 'Offline',
    rating: 4.6,
    tripCount: 245,
    vehicle: 'Tata Nexon',
    onlineHours: 0
  }
];

export default function AdminDashboard() {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Confirmed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Confirmed
        </span>;
      case 'In Progress':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="w-3 h-3 mr-1" />
          In Progress
        </span>;
      case 'Completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Completed
        </span>;
      case 'Cancelled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="w-3 h-3 mr-1" />
          Cancelled
        </span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {status}
        </span>;
    }
  };

  const getDriverStatusBadge = (status: string) => {
    switch(status) {
      case 'Available':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Available
        </span>;
      case 'On Trip':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <Car className="w-3 h-3 mr-1" />
          On Trip
        </span>;
      case 'Offline':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <AlertCircle className="w-3 h-3 mr-1" />
          Offline
        </span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {status}
        </span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Today
          </Button>
          <Button className="bg-green-700 hover:bg-green-800 text-white" size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
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
                    {stat.trend === 'up' ?
                      <TrendingUp className="w-3 h-3 mr-1" /> :
                      <TrendingUp className="w-3 h-3 mr-1 transform rotate-180" />
                    }
                    {stat.change} from last month
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Recent Bookings */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Latest cab bookings across all cities</CardDescription>
              </div>
              <Button variant="ghost" className="text-green-700 hover:text-green-800 hover:bg-green-50">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-2 text-left font-medium text-gray-500">Booking ID</th>
                      <th className="py-3 px-2 text-left font-medium text-gray-500">Customer</th>
                      <th className="py-3 px-2 text-left font-medium text-gray-500">Route</th>
                      <th className="py-3 px-2 text-left font-medium text-gray-500">Amount</th>
                      <th className="py-3 px-2 text-left font-medium text-gray-500">Status</th>
                      <th className="py-3 px-2 text-left font-medium text-gray-500">Driver</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2">{booking.id}</td>
                        <td className="py-3 px-2">{booking.customerName}</td>
                        <td className="py-3 px-2">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 text-gray-500 mr-1" />
                            {booking.from} to {booking.to}
                            <span className="text-xs text-gray-500 ml-2">{booking.date}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 font-medium">{booking.amount}</td>
                        <td className="py-3 px-2">{getStatusBadge(booking.status)}</td>
                        <td className="py-3 px-2">
                          {booking.driverName !== 'Not Assigned' ? (
                            <span className="flex items-center">
                              <User className="h-3 w-3 text-gray-500 mr-1" />
                              {booking.driverName}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs">Not Assigned</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Drivers */}
        <div>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Active Drivers</CardTitle>
                <CardDescription>Currently online drivers</CardDescription>
              </div>
              <Button variant="ghost" className="text-green-700 hover:text-green-800 hover:bg-green-50">
                <Users className="h-4 w-4 mr-1" />
                All Drivers
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeDrivers.map((driver) => (
                  <div key={driver.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          src={driver.avatar}
                          alt={driver.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{driver.name}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Car className="h-3 w-3 mr-1" />
                          {driver.vehicle}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="mb-1">
                        {getDriverStatusBadge(driver.status)}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 justify-end">
                        <MapPin className="h-3 w-3 mr-1" />
                        {driver.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
