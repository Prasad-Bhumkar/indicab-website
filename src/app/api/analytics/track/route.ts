import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { cacheManager } from '@/utils/performance';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

interface AnalyticsEvent {
    category: string;
    action: string;
    userId?: string;
    userRole?: string;
    timestamp: string;
    [key: string]: unknown;
}

interface GroupedEvent {
    count: number;
    lastTimestamp: string;
    examples: AnalyticsEvent[];
}

interface GroupedEvents {
    [key: string]: GroupedEvent;
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        const { events } = await request.json();

        // Validate events
        if (!Array.isArray(events)) {
            return new NextResponse('Invalid events format', { status: 400 });
        }

        // Add session data to events
        const enrichedEvents = events.map(event => ({
            ...event,
            userId: session?.user?.id,
            userRole: session?.user?.role,
            timestamp: new Date().toISOString()
        }));

        // Store events in cache for real-time analytics
        const analyticsCache = cacheManager.get('analytics_events') || [];
        cacheManager.set('analytics_events', [...analyticsCache, ...enrichedEvents], 3600); // Cache for 1 hour

        // TODO: Store events in database
        // await storeEventsInDatabase(enrichedEvents);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error tracking analytics:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // Get events from cache
        const events = cacheManager.get('analytics_events') || [];

        // Group events by category and action
        const groupedEvents = events.reduce((acc: GroupedEvents, event: AnalyticsEvent) => {
            const key = `${event.category}:${event.action}`;
            if (!acc[key]) {
                acc[key] = {
                    count: 0,
                    lastTimestamp: event.timestamp,
                    examples: []
                };
            }
            acc[key].count++;
            acc[key].lastTimestamp = event.timestamp;
            if (acc[key].examples.length < 5) {
                acc[key].examples.push(event);
            }
            return acc;
        }, {});

        return NextResponse.json(groupedEvents);
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
} 