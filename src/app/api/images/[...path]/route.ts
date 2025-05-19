import fs from 'fs';
import path from 'path';

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';


// Create a new ratelimiter that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
});

const PLACEHOLDER_IMAGES = {
  car: '/images/placeholder/car-placeholder.jpg',
  location: '/images/placeholder/location-placeholder.jpg',
  background: '/images/placeholder/background-placeholder.jpg',
};

function getPlaceholderType(filePath: string): string {
  if (filePath.includes('/cars/')) return 'car';
  if (filePath.includes('/locations/')) return 'location';
  return 'background';
}

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // Rate limiting
    const ip = request.ip ?? '127.0.0.1';
    const { success } = await ratelimit.limit(ip);
    
    if (!success) {
      return new NextResponse('Too Many Requests', { status: 429 });
    }

    const filePath = params.path.join('/');
    const imagePath = path.join(process.cwd(), 'public', filePath);

    // Check if file exists
    if (!fs.existsSync(imagePath)) {
      // Log missing image for future reference
      console.warn(`Missing image: ${filePath}`);
      
      // Serve appropriate placeholder based on path
      const placeholderType = getPlaceholderType(filePath);
      const placeholderPath = path.join(process.cwd(), 'public', PLACEHOLDER_IMAGES[placeholderType]);
      
      if (fs.existsSync(placeholderPath)) {
        const fileBuffer = fs.readFileSync(placeholderPath);
        const contentType = getContentType(placeholderPath);
        
        return new NextResponse(fileBuffer, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
            'X-Placeholder': 'true',
          },
        });
      }
      
      return new NextResponse('Image not found', { status: 404 });
    }

    // Read file
    const fileBuffer = fs.readFileSync(imagePath);
    const contentType = getContentType(imagePath);

    // Return image with caching headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Image serving error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.gif':
      return 'image/gif';
    case '.svg':
      return 'image/svg+xml';
    default:
      return 'application/octet-stream';
  }
} 