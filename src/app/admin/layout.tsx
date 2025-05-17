"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    ChevronRight,
    Menu,
    X,
    Home,
    Users,
    Car,
    Calendar,
    BarChart3,
    Settings,
    LogOut,
    Bell,
    User
} from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}): JSX.Element {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const _pathname = usePathname();

    const _toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const _navItems = [
        { name: 'Dashboard', href: '/admin', icon: <Home className="w-5 h-5" /> },
        { name: 'Bookings', href: '/admin/bookings', icon: <Calendar className="w-5 h-5" /> },
        { name: 'Drivers', href: '/admin/drivers', icon: <Users className="w-5 h-5" /> },
        { name: 'Vehicles', href: '/admin/vehicles', icon: <Car className="w-5 h-5" /> },
        { name: 'Reports', href: '/admin/reports', icon: <BarChart3 className="w-5 h-5" /> },
        { name: 'Settings', href: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
    ];

    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            {/* Sidebar */}
            <div
                className={`bg-green-800 text-white transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-20'
                    } flex flex-col fixed inset-y-0 z-50`}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-green-700">
                    {sidebarOpen && (
                        <div className="flex items-center text-xl font-bold">
                            IndiCab Admin
                        </div>
                    )}
                    <button
                        onClick={_toggleSidebar}
                        className={`p-1 rounded-md focus:outline-none ${sidebarOpen ? 'ml-auto' : 'mx-auto'}`}
                    >
                        {sidebarOpen ? <ChevronRight className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 pt-5 pb-4 overflow-y-auto">
                    <ul className="space-y-1 px-2">
                        {_navItems.map((item): JSX.Element => {
                            const _isActive = _pathname === item.href;
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center px-3 py-2 rounded-md ${_isActive
                                                ? 'bg-green-700 text-white'
                                                : 'text-green-100 hover:bg-green-700 hover:text-white'
                                            }`}
                                    >
                                        <span className="flex-shrink-0">{item.icon}</span>
                                        {sidebarOpen && <span className="ml-3">{item.name}</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* User */}
                <div className="p-4 border-t border-green-700">
                    <Link
                        href="/"
                        className="flex items-center text-green-100 hover:text-white"
                    >
                        <LogOut className="w-5 h-5" />
                        {sidebarOpen && <span className="ml-3">Log Out</span>}
                    </Link>
                </div>
            </div>

            {/* Main content */}
            <div className={`flex flex-col flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
                {/* Top header */}
                <header className="bg-white shadow-sm z-10">
                    <div className="h-16 px-4 flex items-center justify-between">
                        <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
                        <div className="flex items-center space-x-4">
                            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                                <Bell className="w-6 h-6" />
                            </button>
                            <div className="flex items-center">
                                <span className="mr-2 text-sm font-medium text-gray-700">Admin User</span>
                                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                    <User className="w-5 h-5 text-green-700" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    );
}
