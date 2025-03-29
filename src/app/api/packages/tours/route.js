import tourPackages from '@/data/tour-packages.json';

export async function GET() {
  try {
    return Response.json(tourPackages);
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch tour packages' },
      { status: 500 }
    );
  }
}