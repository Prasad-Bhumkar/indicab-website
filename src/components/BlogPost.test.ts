import { render, screen } from '@testing-library/react';
import BlogPost from './BlogPost';
import '@testing-library/jest-dom';

// Mock the necessary dependencies
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, className }: { src: string, alt: string, className?: string }) => (
    <img src={src} alt={alt} className={className} />
  ),
}));

describe('BlogPost Component', () => {
  const mockPost = {
    id: 1,
    title: 'Test Blog Post',
    excerpt: 'This is a test blog post excerpt',
    content: '<p>This is the blog post content</p>',
    image: '/test-image.jpg',
    date: 'March 23, 2025',
    views: '100',
    slug: 'test-blog-post',
    author: 'Test Author',
    authorTitle: 'Test Title',
    tags: ['test', 'blog']
  };

  const mockRelatedPosts = [
    {
      id: 2,
      title: 'Related Post 1',
      image: '/related-1.jpg',
      date: 'March 22, 2025',
      slug: 'related-post-1'
    },
    {
      id: 3,
      title: 'Related Post 2',
      image: '/related-2.jpg',
      date: 'March 21, 2025',
      slug: 'related-post-2'
    }
  ];

  it('renders the blog post correctly', () => {
    render(
      <BlogPost
        post={mockPost}
        relatedPosts={mockRelatedPosts}
      />
    );

    // Check if the title is rendered
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();

    // Check if the author is rendered
    expect(screen.getByText(mockPost.author)).toBeInTheDocument();

    // Check if the date is rendered
    expect(screen.getByText(mockPost.date)).toBeInTheDocument();

    // Check if the tags are rendered
    mockPost.tags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });

    // Check if related posts are rendered
    expect(screen.getByText(mockRelatedPosts[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockRelatedPosts[1].title)).toBeInTheDocument();
  });

  it('renders a message when there are no related posts', () => {
    render(
      <BlogPost
        post={mockPost}
        relatedPosts={[]}
      />
    );

    expect(screen.getByText('No related posts found')).toBeInTheDocument();
  });
});
