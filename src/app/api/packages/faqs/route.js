import faqs from '@/data/faqs.json';

export async function GET() {
    try {
        return Response.json(faqs);
    } catch (_error) {
        return Response.json(
            { error: 'Failed to fetch FAQs' },
            { status: 500 }
        );
    }
}
