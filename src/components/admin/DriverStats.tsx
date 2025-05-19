'use client';

import { useEffect, useState } from 'react';

import { connectDB } from '@/lib/db';
import Driver from '@/models/Driver';

export function DriverStats() {
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        onDuty: 0
    });

    useEffect(() => {
        async function fetchStats() {
            try {
                await connectDB();
                const total = await Driver.countDocuments();
                const active = await Driver.countDocuments({ status: 'active' });
                const onDuty = await Driver.countDocuments({ status: 'on_duty' });
                
                setStats({ total, active, onDuty });
            } catch (error) {
                console.error('Failed to fetch driver stats:', error);
            }
        }

        fetchStats();
    }, []);

    return (
        <div>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">
                {stats.onDuty} on duty out of {stats.total} total
            </p>
        </div>
    );
} 