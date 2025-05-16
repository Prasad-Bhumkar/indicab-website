# Image Optimization Guidelines for IndiCab

## Next.js Image Component Configuration

### Required Props
```typescript
import Image from 'next/image';

// Basic usage
<Image
  src="/path/to/image.jpg"
  width={800}
  height={600}
  alt="Descriptive text"
  priority={true} // For LCP images
/>

// With additional optimization
<Image
  src="/path/to/image.jpg"
  width={800}
  height={600}
  alt="Descriptive text"
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  loading="lazy"
/>
```

### Custom Image Component
```typescript
// components/optimized/Image.tsx
import { useState } from 'react';
import NextImage from 'next/image';
import clsx from 'clsx';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  quality?: number;
  className?: string;
  sizes?: string;
  fallback?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 75,
  className,
  sizes,
  fallback,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={clsx('relative', className)}>
      {isLoading && (
        <div 
          className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700"
          style={{ aspectRatio: width / height }}
        />
      )}
      <NextImage
        src={error && fallback ? fallback : src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        sizes={sizes}
        className={clsx(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        onLoadingComplete={() => {
          setIsLoading(false);
          onLoad?.();
        }}
        onError={() => {
          setError(true);
          onError?.();
        }}
      />
    </div>
  );
}
```

## Performance Optimization

### 1. Image Formats
- **WebP**: Default format for photographs
  ```typescript
  // next.config.mjs
  const nextConfig = {
    images: {
      formats: ['image/webp'],
    },
  };
  ```

- **AVIF**: For browsers with support
  ```typescript
  formats: ['image/avif', 'image/webp'],
  ```

- **SVG**: For logos and icons
  ```typescript
  // components/optimized/Icon.tsx
  import { SVGProps } from 'react';

  export function Icon({ src, ...props }: SVGProps<SVGSVGElement>) {
    return <svg {...props} />;
  }
  ```

### 2. Responsive Images
```typescript
// Tailwind breakpoint-based sizes
const imageSizes = {
  sm: '100vw',
  md: '50vw',
  lg: '33vw',
  xl: '25vw',
};

// Usage
<OptimizedImage
  sizes={`(max-width: 640px) ${imageSizes.sm},
          (max-width: 768px) ${imageSizes.md},
          (max-width: 1024px) ${imageSizes.lg},
          ${imageSizes.xl}`}
/>
```

### 3. Loading Strategies
```typescript
// Priority loading for LCP
<OptimizedImage priority={true} />

// Lazy loading with blur placeholder
<OptimizedImage
  placeholder="blur"
  blurDataURL={generateBlurDataURL(src)}
/>

// Progressive loading for large images
<OptimizedImage
  quality={[60, 75, 90]}
  loading="progressive"
/>
```

## Error Handling and Fallbacks

### 1. Error Boundaries
```typescript
// components/ImageErrorBoundary.tsx
class ImageErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
```

### 2. Fallback Strategies
```typescript
// Fallback image
<OptimizedImage
  fallback="/images/fallback.jpg"
  onError={() => logImageError(src)}
/>

// Skeleton loader
<div 
  className="animate-pulse bg-gray-200 dark:bg-gray-700"
  style={{ aspectRatio: '16/9' }}
/>
```

## Image Processing Pipeline

### 1. Build-time Optimization
```typescript
// scripts/optimize-images.ts
import sharp from 'sharp';
import glob from 'glob';

async function optimizeImages() {
  const images = glob.sync('public/**/*.{jpg,png}');
  
  for (const image of images) {
    await sharp(image)
      .webp({ quality: 80 })
      .toFile(image.replace(/\.(jpg|png)$/, '.webp'));
  }
}
```

### 2. Runtime Optimization
```typescript
// lib/image-processing.ts
export async function processImage(file: File) {
  const compressor = new Compressor(file, {
    quality: 0.8,
    maxWidth: 2000,
    maxHeight: 2000,
    convertSize: 1000000, // Convert to WebP if > 1MB
  });
  
  return await compressor.result;
}
```

## Monitoring and Analytics

### 1. Performance Metrics
```typescript
// lib/image-metrics.ts
export function trackImagePerformance(src: string) {
  const entry = performance.getEntriesByName(src)[0];
  
  if (entry) {
    analytics.track('Image Load', {
      src,
      loadTime: entry.duration,
      size: entry.transferSize,
    });
  }
}
```

### 2. Error Tracking
```typescript
// lib/error-tracking.ts
export function logImageError(src: string, error?: Error) {
  Sentry.captureException(error, {
    tags: {
      type: 'image_error',
      src,
    },
  });
}
```

## Best Practices

1. **Image Dimensions**
   - Always specify width and height
   - Use aspect ratio preservation
   - Implement responsive sizing

2. **Loading Priority**
   - Use priority for LCP images
   - Lazy load below-the-fold images
   - Implement progressive loading

3. **Quality and Format**
   - Use WebP with AVIF fallback
   - Optimize quality based on image type
   - Implement responsive formats

4. **Performance**
   - Implement caching strategies
   - Use CDN for delivery
   - Monitor loading performance

5. **Accessibility**
   - Provide meaningful alt text
   - Use ARIA labels when needed
   - Ensure proper contrast

6. **Error Handling**
   - Implement fallbacks
   - Log errors appropriately
   - Show loading states

## Testing

### 1. Visual Regression
```typescript
// tests/image.spec.ts
describe('OptimizedImage', () => {
  it('renders correctly', async () => {
    const image = render(<OptimizedImage />);
    await waitFor(() => {
      expect(image).toMatchImageSnapshot();
    });
  });
});
```

### 2. Performance Testing
```typescript
// tests/performance.spec.ts
describe('Image Performance', () => {
  it('loads within threshold', async () => {
    const loadTime = await measureImageLoad('/test.jpg');
    expect(loadTime).toBeLessThan(1000);
  });
});
```

## References

- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Web Vitals and Images](https://web.dev/vitals/)
- [Image CDN Best Practices](https://web.dev/image-cdns/)
- [Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
