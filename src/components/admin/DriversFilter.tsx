'use client';

import { useCallback, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { trackFilterChange, trackSearch } from '@/lib/analytics';

export default function DriversFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

    const handleFilterChange = useCallback((value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('status', value);
        router.push(`?${params.toString()}`);
        trackFilterChange('status', value);
    }, [router, searchParams]);

    const handleSearch = useCallback((value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set('search', value);
        } else {
            params.delete('search');
        }
        router.push(`?${params.toString()}`);
        trackSearch(value, { status: searchParams.get('status') || 'all' });
    }, [router, searchParams]);

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
                <Input
                    placeholder="Search drivers..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        handleSearch(e.target.value);
                    }}
                    className="max-w-sm"
                />
            </div>
            <div className="flex items-center gap-2">
                <Select
                    value={searchParams.get('status') || 'all'}
                    onValueChange={handleFilterChange}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Drivers</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="on_duty">On Duty</SelectItem>
                        <SelectItem value="off_duty">Off Duty</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
} 