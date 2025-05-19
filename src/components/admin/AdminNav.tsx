'use client';

import { useState } from 'react';

import {
    Activity,
    BarChart3,
    Bell,
    Calendar,
    Car,
    ChevronRight,
    Home,
    LogOut,
    Menu,
    Settings,
    User
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { trackEvent } from '@/utils/analytics';


export default function AdminNav() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [notifications, setNotifications] = useState(0);
    const pathname = usePathname();

    const handleLogout = () => {
        trackEvent({
            category: 'Authentication',
            action: 'Logout',
            label: 'Admin Panel'
        });
    };

    const navItems = [
        {
            title: 'Dashboard',
            href: '/admin',
            icon: <Home className="w-5 h-5" />
        },
        {
            title: 'Bookings',
            href: '/admin/bookings',
            icon: <Calendar className="w-5 h-5" />
        },
        {
            title: 'Drivers',
            href: '/admin/drivers',
            icon: <Users className="w-5 h-5" />
        },
        {
            title: 'Vehicles',
            href: '/admin/vehicles',
            icon: <Car className="w-5 h-5" />
        },
        {
            title: 'Analytics',
            href: '/admin/analytics',
            icon: <BarChart3 className="w-5 h-5" />
        },
        {
            title: 'Events',
            href: '/admin/analytics/events',
            icon: <Activity className="w-5 h-5" />
        },
        {
            title: 'Settings',
            href: '/admin/settings',
            icon: <Settings className="w-5 h-5" />
        }
    ];

    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            {/* Sidebar */}
            <div
                className={`bg-green-800 text-white transition-all duration-300 ease-in-out ${
                    sidebarOpen ? 'w-64' : 'w-20'
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
                        type="button"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className={`p-1 rounded-md focus:outline-none hover:bg-green-700 transition-colors ${
                            sidebarOpen ? 'ml-auto' : 'mx-auto'
                        }`}
                        aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                    >
                        {sidebarOpen ? <ChevronRight className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 pt-5 pb-4 overflow-y-auto">
                    <ul className="space-y-1 px-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                                            isActive
                                                ? 'bg-green-700 text-white'
                                                : 'text-green-100 hover:bg-green-700 hover:text-white'
                                        }`}
                                        onClick={() => trackEvent({
                                            category: 'Navigation',
                                            action: 'Menu Click',
                                            label: item.title
                                        })}
                                    >
                                        <span className="flex-shrink-0">{item.icon}</span>
                                        {sidebarOpen && <span className="ml-3">{item.title}</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* User */}
                <div className="p-4 border-t border-green-700">
                    <Link
                        href="/auth/logout"
                        className="flex items-center text-green-100 hover:text-white transition-colors"
                        onClick={handleLogout}
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
                            <button 
                                type="button"
                                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none relative"
                                onClick={() => trackEvent({
                                    category: 'Notifications',
                                    action: 'View Notifications'
                                })}
                            >
                                <Bell className="w-6 h-6" />
                                {notifications > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {notifications}
                                    </span>
                                )}
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
            </div>
        </div>
    );
} 