// Type definitions for blog posts
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  views: string;
  slug: string;
  author: string;
  authorTitle: string;
  tags: string[];
}

export interface RelatedPost {
  id: number;
  title: string;
  image: string;
  date: string;
  slug: string;
}
