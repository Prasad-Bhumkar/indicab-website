import type { Metadata } from 'next';

type RouteMetadataParams = {
    from: string;
    to: string;
    description?: string;
    price?: string;
    duration?: string;
    distance?: string;
};

/**
 * Generates metadata for route pages including dynamic OG images
 *
 * @param params The route parameters
 * @returns Metadata object for the route page
 */
export function generateRouteMetadata({
    from,
    to,
    description,
    price,
    duration,
    distance
}: RouteMetadataParams): Metadata {
    // Create a title based on the route
    const title = `${from} to ${to} Cab Service | IndiCab`;

    // Create a description based on the route details
    const metaDescription = description ||
        `Book reliable cab service from ${from} to ${to}. ${distance ? `Distance: ${distance}.` : ''
        } ${duration ? `Duration: ${duration}.` : ''
        } ${price ? `Starting at ${price}.` : ''
        } Best drivers, comfortable vehicles, and 24/7 support.`;

    // Base URL for the OG image API
    const _baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'https://indicab.example.com';

    // Create the dynamic OG image URL with route parameters
    const ogImageUrl = new URL(`${_baseUrl}/api/og`);
    ogImageUrl.searchParams.set('from', from);
    ogImageUrl.searchParams.set('to', to);

    return {
        title,
        description: metaDescription,
        keywords: `${from} to ${to}, cab service, taxi, outstation cab, one way cab, ${from} ${to} taxi`,
        openGraph: {
            title,
            description: metaDescription,
            url: `https://indicab.example.com/oneway/${from.toLowerCase()}-to-${to.toLowerCase()}`,
            siteName: 'IndiCab',
            images: [
                {
                    url: ogImageUrl.toString(),
                    width: 1200,
                    height: 630,
                    alt: `${from} to ${to} Cab Service`,
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: metaDescription,
            images: [ogImageUrl.toString()],
            creator: '@indicab',
        },
    };
}
