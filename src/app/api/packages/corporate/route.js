import corporatePackages from '@/data/corporate-packages.json';

export async function GET() {
  try {
    return Response.json(corporatePackages);
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch corporate packages' },
      { status: 500 }
    );
  }
}