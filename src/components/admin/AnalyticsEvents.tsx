'use client';

import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

interface AnalyticsEvent {
    _id: string;
    category: string;
    action: string;
    label?: string;
    value?: number;
    userId?: string;
    userRole?: string;
    userType?: string;
    properties?: Record<string, unknown>;
    timestamp: string;
    createdAt: string;
    updatedAt: string;
}

interface AnalyticsEventsResponse {
    events: AnalyticsEvent[];
    total: number;
    page: number;
    totalPages: number;
}

export default function AnalyticsEvents() {
    const [events, setEvents] = useState<AnalyticsEvent[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        action: '',
        userId: '',
        startDate: '',
        endDate: ''
    });

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: '10',
                ...filters
            });

            const response = await fetch(`/api/analytics/events?${queryParams}`);
            const data: AnalyticsEventsResponse = await response.json();

            setEvents(data.events);
            setTotal(data.total);
            setPage(data.page);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching analytics events:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [page, filters]);

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setPage(1);
    };

    const handleDateChange = (key: 'startDate' | 'endDate', date: Date | null) => {
        setFilters(prev => ({
            ...prev,
            [key]: date ? format(date, 'yyyy-MM-dd') : ''
        }));
        setPage(1);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
                <Input
                    placeholder="Category"
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                />
                <Input
                    placeholder="Action"
                    value={filters.action}
                    onChange={(e) => handleFilterChange('action', e.target.value)}
                />
                <Input
                    placeholder="User ID"
                    value={filters.userId}
                    onChange={(e) => handleFilterChange('userId', e.target.value)}
                />
                <DatePicker
                    selected={filters.startDate ? new Date(filters.startDate) : null}
                    onChange={(date) => handleDateChange('startDate', date)}
                    placeholderText="Start Date"
                />
                <DatePicker
                    selected={filters.endDate ? new Date(filters.endDate) : null}
                    onChange={(date) => handleDateChange('endDate', date)}
                    placeholderText="End Date"
                />
                <Button onClick={() => fetchEvents()}>Apply Filters</Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead>Label</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Properties</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {events.map((event) => (
                            <TableRow key={event._id}>
                                <TableCell>
                                    {format(new Date(event.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                                </TableCell>
                                <TableCell>{event.category}</TableCell>
                                <TableCell>{event.action}</TableCell>
                                <TableCell>{event.label}</TableCell>
                                <TableCell>{event.value}</TableCell>
                                <TableCell>
                                    {event.userId && (
                                        <div>
                                            <div>{event.userId}</div>
                                            {event.userRole && (
                                                <div className="text-sm text-gray-500">
                                                    {event.userRole}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {event.properties && (
                                        <pre className="text-xs">
                                            {JSON.stringify(event.properties, null, 2)}
                                        </pre>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                    Showing {events.length} of {total} events
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
} 