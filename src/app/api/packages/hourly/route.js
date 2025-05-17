import hourlyPackages from '@/data/hourly-packages.json';

export async function GET() {
    try {
        return Response.json(hourlyPackages);
    } catch (_error) {
        return Response.json(
            { error: 'Failed to fetch hourly packages' },
            { status: 500 }
        );
    }
}
