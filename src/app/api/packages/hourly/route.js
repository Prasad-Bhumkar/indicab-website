import hourlyPackages from '@/data/hourly-packages.json';

export async function GET() {
  try {
    return Response.json(hourlyPackages);
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch hourly packages' },
      { status: 500 }
    );
  }
}