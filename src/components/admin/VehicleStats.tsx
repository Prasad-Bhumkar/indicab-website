'use client';

import { useEffect, useState } from 'react';

import { connectDB } from '@/lib/db';
import Vehicle from '@/models/Vehicle';

export function VehicleStats() {
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        maintenance: 0,
        available: 0
    });

    useEffect(() => {
        async function fetchStats() {
            try {
                await connectDB();
                const total = await Vehicle.countDocuments();
                const active = await Vehicle.countDocuments({ status: 'active' });
                const maintenance = await Vehicle.countDocuments({ status: 'maintenance' });
                const available = await Vehicle.countDocuments({ status: 'available' });
                
                setStats({ total, active, maintenance, available });
            } catch (error) {
                console.error('Failed to fetch vehicle stats:', error);
            }
        }

        fetchStats();
    }, []);

    return (
        <div>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">
                {stats.available} available, {stats.maintenance} in maintenance
            </p>
        </div>
    );
} 