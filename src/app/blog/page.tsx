import Footer from '@/components/Footer';
import Header from '@/components/Header';
import FloatingActionButton from '@/components/shared/FloatingActionButton';
import { ArrowRight, Calendar, Eye } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'IndiCab Blog - Travel Tips, Guides & Destination Stories',
    description: 'Explore travel tips, destination guides, and stories to help plan your next journey across India with IndiCab.',
    keywords: ['travel blog', 'India travel', 'destination guides', 'travel tips', 'road trips', 'tourist attractions'],
    openGraph: {
        title: 'IndiCab Blog - Travel Tips, Guides & Destination Stories',
        description: 'Explore travel tips, destination guides, and stories to help plan your next journey across India.',
        images: ['/indicab-logo.png'],
        type: 'website',
    },
};

const _blogPosts = [
    {
        id: 1,
        title: 'Top 10 Must-Visit Destinations in Rajasthan',
        excerpt: 'Explore the royal state of Rajasthan with our guide to the most magnificent palaces, forts, and cultural sites that you shouldn\'t miss.',
        image: '/images/jaipur.jpg',
        date: 'March 18, 2025',
        views: '3.2K',
        slug: 'top-destinations-rajasthan',
    },
    {
        id: 2,
        title: 'The Ultimate Mumbai to Pune Road Trip Guide',
        excerpt: 'Plan the perfect road trip between Mumbai and Pune with our comprehensive guide covering routes, stops, food joints, and scenic viewpoints.',
        image: '/images/pune.jpg',
        date: 'March 15, 2025',
        views: '4.5K',
        slug: 'mumbai-pune-road-trip',
    },
    {
        id: 3,
        title: 'Exploring the Beaches of Pondicherry',
        excerpt: 'Discover the serene beaches, French architecture, and spiritual ambiance of Pondicherry with our detailed travel guide.',
        image: '/images/pondicherry.jpg',
        date: 'March 10, 2025',
        views: '2.8K',
        slug: 'beaches-of-pondicherry',
    },
    {
        id: 4,
        title: 'Historical Monuments of Delhi You Can\'t Miss',
        excerpt: 'From Qutub Minar to Red Fort, explore the rich historical heritage of Delhi with our guide to its most iconic monuments.',
        image: '/images/taj-mahal.jpg',
        date: 'March 5, 2025',
        views: '3.7K',
        slug: 'delhi-historical-monuments',
    },
    {
        id: 5,
        title: 'Weekend Getaways from Bangalore',
        excerpt: 'Looking for a quick escape from Bangalore? Discover these perfect weekend destinations that are just a few hours drive away.',
        image: '/images/mysore-palace.jpg',
        date: 'February 28, 2025',
        views: '5.1K',
        slug: 'bangalore-weekend-getaways',
    },
    {
        id: 6,
        title: 'Best Street Food Experiences Across India',
        excerpt: 'A culinary journey through India\'s most famous street food destinations that every food lover must experience at least once.',
        image: '/images/digha.jpg',
        date: 'February 22, 2025',
        views: '6.3K',
        slug: 'indian-street-food-guide',
    }
];

export default function Blog(): JSX.Element {
    return (
        <main>
            <Header />

            <div className="bg-gradient-to-b from-green-800 to-green-700 py-16 text-white">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">IndiCab Travel Blog</h1>
                    <p className="text-xl md:text-2xl mb-6">Discover travel tips, destination guides, and stories from across India</p>
                    <div className="w-20 h-1 bg-orange-500 rounded-full"></div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {_blogPosts.map((post): JSX.Element => (
                        <div key={post.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                            <div className="relative h-48 w-full">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center text-sm text-gray-500 mb-3">
                                    <Calendar size={16} className="mr-1" />
                                    <span className="mr-4">{post.date}</span>
                                    <Eye size={16} className="mr-1" />
                                    <span>{post.views} views</span>
                                </div>
                                <h2 className="text-xl font-bold mb-2 text-green-800 hover:text-orange-500 transition-colors">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium"
                                >
                                    Read More
                                    <ArrowRight size={16} className="ml-1" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8 text-green-800">Subscribe to Our Newsletter</h2>
                    <div className="max-w-md mx-auto">
                        <form className="flex flex-col md:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                        <p className="text-sm text-gray-500 mt-3 text-center">
                            Get the latest travel tips and destination guides delivered to your inbox.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
            <FloatingActionButton />
        </main>
    );
}
