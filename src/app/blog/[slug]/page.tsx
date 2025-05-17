import React from "react";
import { blogPosts, getBlogPostBySlug, getRelatedBlogPosts } from './BlogData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Define the type for the params object
type BlogPostParams = {
    slug: string;
};

type Props = {
    params: BlogPostParams;
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // Fetch the blog post to generate metadata
    const post = await getBlogPostBySlug(params.slug);

    if (!post) {
        return {
            title: 'Blog Post Not Found | IndiCab',
            description: 'The blog post you are looking for could not be found.',
        };
    }

    return {
        title: `${post.title} | IndiCab Blog`,
        description: post.excerpt,
        keywords: post.tags,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.image],
            type: 'article',
        },
    };
}

// Use async function to properly handle the dynamic params
export default async function BlogPostPage({ params }: Props): JSX.Element {
    // Fetch the blog post with await
    const post = await getBlogPostBySlug(params.slug);

    // Get related posts
    const relatedPosts = post ? await getRelatedBlogPosts(post.id, 2) : [];

    if (!post) {
        return (
            <>
                <Header />
                <main className="container mx-auto px-4 py-10">
                    <div className="flex flex-col items-center justify-center min-h-[50vh]">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
                        <p className="text-gray-600 mb-6">The blog post you are looking for could not be found.</p>
                        <Link href="/blog" className="flex items-center text-primary hover:underline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to all blog posts
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <Link href="/blog" className="flex items-center text-primary hover:underline mb-6">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to all blog posts
                    </Link>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

                    <div className="flex items-center text-gray-600 mb-6">
                        <div className="flex items-center mr-4">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{post.views} views</span>
                        </div>
                    </div>

                    <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                        />
                    </div>

                    <div className="flex items-center mb-8">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                            <span className="text-xl font-bold text-primary">{post.author[0]}</span>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">{post.author}</h3>
                            <p className="text-sm text-gray-600">{post.authorTitle}</p>
                        </div>
                    </div>

                    <div className="prose max-w-none mb-8">
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>

                    <div className="flex flex-wrap gap-2 mb-10">
                        {post.tags.map((tag): JSX.Element => (
                            <span
                                key={tag}
                                className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                            >
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                            </span>
                        ))}
                    </div>

                    {relatedPosts.length > 0 && (
                        <div className="border-t border-gray-200 pt-8 mt-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {relatedPosts.map((relatedPost): JSX.Element => (
                                    <Link
                                        key={relatedPost.id}
                                        href={`/blog/${relatedPost.slug}`}
                                        className="group"
                                    >
                                        <div className="relative w-full h-48 rounded-lg overflow-hidden mb-3">
                                            <Image
                                                src={relatedPost.image}
                                                alt={relatedPost.title}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2">
                                            {relatedPost.title}
                                        </h3>
                                        <p className="text-gray-600">{relatedPost.excerpt.substring(0, 100)}...</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
