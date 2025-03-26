'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Eye } from 'lucide-react';
import { BlogPost as BlogPostType, RelatedPost } from '@/types/blog';

interface BlogPostProps {
  post: BlogPostType;
  relatedPosts: RelatedPost[];
}

const BlogPost: React.FC<BlogPostProps> = ({ post, relatedPosts }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/blog" className="inline-flex items-center text-green-700 hover:text-green-800 mb-6">
        <ArrowLeft size={16} className="mr-2" />
        Back to Blog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-80 w-full mb-6">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>

          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Calendar size={16} className="mr-1" />
            <span className="mr-4">{post.date}</span>
            <Eye size={16} className="mr-1" />
            <span>{post.views} views</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">{post.title}</h1>

          <div className="flex items-center mb-6">
            <div className="bg-green-100 h-12 w-12 rounded-full flex items-center justify-center text-green-800 font-bold text-xl mr-3">
              {post.author.split(' ').map((name) => name[0]).join('')}
            </div>
            <div>
              <p className="font-medium">{post.author}</p>
              <p className="text-sm text-gray-500">{post.authorTitle}</p>
            </div>
          </div>

          <div className="prose prose-green max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

          <div className="border-t border-b py-4 my-8">
            <p className="text-sm text-gray-500 mb-2">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-green-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-green-800 mb-4">Book a Cab</h3>
            <p className="text-gray-600 mb-4">Planning to visit? Book an IndiCab for a comfortable journey.</p>
            <Link
              href="/"
              className="block text-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              Book Now
            </Link>
          </div>

          <div>
            <h3 className="text-xl font-bold text-green-800 mb-4">Related Articles</h3>
            {relatedPosts.length > 0 ? (
              relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="flex mb-4 pb-4 border-b last:border-b-0">
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-green-800 hover:text-orange-500 transition-colors">
                      <Link href={`/blog/${relatedPost.slug}`}>
                        {relatedPost.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-gray-500">{relatedPost.date}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No related posts found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
