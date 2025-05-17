import { BlogPost } from "@/types/blog";

// Mock blog data - in a real application, this would come from an API or database
export const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: 'Top 10 Must-Visit Destinations in Rajasthan',
        excerpt: "Explore the royal state of Rajasthan with our guide to the most magnificent palaces, forts, and cultural sites that you shouldn't miss.",
        content: `
      <p class="mb-4">Rajasthan, the land of kings, is India's largest state and one of its most vibrant and culturally rich regions. Known for its magnificent forts, opulent palaces, vibrant culture, and delicious cuisine, Rajasthan offers a truly immersive travel experience.</p>

      <h2 class="text-2xl font-bold text-green-800 mt-8 mb-4">1. Jaipur - The Pink City</h2>
      <p class="mb-4">The capital city of Rajasthan, Jaipur is known as the "Pink City" due to the distinctive terracotta pink color of its buildings. The city is home to several magnificent structures, including:</p>
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2">Amber Fort - A majestic fort overlooking Maota Lake</li>
        <li class="mb-2">Hawa Mahal - The iconic "Palace of Winds" with its unique honeycomb facade</li>
        <li class="mb-2">City Palace - A stunning complex of courtyards, gardens, and buildings</li>
        <li class="mb-2">Jantar Mantar - An astronomical observation site with massive instruments</li>
      </ul>

      <h2 class="text-2xl font-bold text-green-800 mt-8 mb-4">2. Udaipur - The City of Lakes</h2>
      <p class="mb-4">Known as the "Venice of the East," Udaipur is built around a series of artificial lakes and is known for its lavish royal residences. Key attractions include:</p>
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2">Lake Palace - A marble palace that appears to float on Lake Pichola</li>
        <li class="mb-2">City Palace - A massive palace complex with eleven separate palaces</li>
        <li class="mb-2">Jag Mandir - A beautiful palace on an island in Lake Pichola</li>
        <li class="mb-2">Sajjangarh Palace - Also known as the Monsoon Palace, offering panoramic views of the city</li>
      </ul>

      <p class="my-6">These are just some of the amazing destinations Rajasthan has to offer. Book an IndiCab for the most comfortable experience exploring these cities.</p>
    `,
        image: '/images/jaipur.jpg',
        date: 'March 18, 2025',
        views: '3.2K',
        slug: 'top-destinations-rajasthan',
        author: 'Priya Sharma',
        authorTitle: 'Travel Expert',
        tags: ['rajasthan', 'travel', 'destinations', 'forts', 'palaces'],
    },
    {
        id: 2,
        title: 'The Ultimate Mumbai to Pune Road Trip Guide',
        excerpt: 'Plan the perfect road trip between Mumbai and Pune with our comprehensive guide covering routes, stops, food joints, and scenic viewpoints.',
        content: `
      <p class="mb-4">The Mumbai to Pune route is one of the most popular road trips in India, offering scenic views, delicious food stops, and various attractions along the way.</p>
      <p class="mb-4">Whether you're driving yourself or booking an IndiCab, this guide will help you make the most of your journey.</p>
    `,
        image: '/images/pune.jpg',
        date: 'March 15, 2025',
        views: '4.5K',
        slug: 'mumbai-pune-road-trip',
        author: 'Rahul Mehta',
        authorTitle: 'Road Trip Enthusiast',
        tags: ['mumbai', 'pune', 'road trip', 'travel guide'],
    },
    {
        id: 3,
        title: 'Exploring the Beaches of Pondicherry',
        excerpt: 'Discover the serene beaches, French architecture, and spiritual ambiance of Pondicherry with our detailed travel guide.',
        content: `
      <p class="mb-4">Pondicherry (now known as Puducherry) offers a unique blend of Indian and French cultures, with beautiful beaches, colonial architecture, and a peaceful atmosphere.</p>
    `,
        image: '/images/pondicherry.jpg',
        date: 'March 10, 2025',
        views: '2.8K',
        slug: 'beaches-of-pondicherry',
        author: 'Deepa Thomas',
        authorTitle: 'Beach Lover',
        tags: ['pondicherry', 'beaches', 'french colony', 'auroville'],
    }
];

/**
 * Fetch a blog post by slug
 * @param slug The blog post slug
 * @returns The blog post or null if not found
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    // Simulate an API request with a timeout
    await new Promise(_resolve => setTimeout(_resolve, 100));

    // Find the blog post with the matching slug
    return blogPosts.find(_post => _post.slug === slug) || null;
}

/**
 * Get related blog posts
 * @param currentPostId The ID of the current blog post
 * @param limit The maximum number of related posts to return
 * @returns An array of related blog posts
 */
export async function getRelatedBlogPosts(currentPostId: number, limit: number = 3): Promise<BlogPost[]> {
    // Simulate an API request with a timeout
    await new Promise(_resolve => setTimeout(_resolve, 100));

    // Find related posts (posts with a different ID than the current post)
    return blogPosts
        .filter(_post => _post.id !== currentPostId)
        .slice(0, limit);
}
