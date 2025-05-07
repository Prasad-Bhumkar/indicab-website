# Image Optimization Guidelines

## Required Props
- All images must include:
  - `width` and `height` (numeric values in pixels)
  - `alt` text (empty string `""` for decorative images)
  - `priority={true}` for above-the-fold images

## Performance Best Practices
1. Use the optimized Image component from `components/optimized/Image`
2. Provide appropriate sizes:
   ```tsx
   sizes="(max-width: 768px) 100vw, 50vw"
   ```
3. Set quality (default 75):
   ```tsx
   quality={85} // For important hero images
   ```

## Error Handling
- All images must handle errors gracefully
- Use the fallback prop for critical images:
  ```tsx
  fallback="/images/fallback.jpg"
  ```

## Loading States
- Implement loading skeletons for images that affect layout:
  ```tsx
  {isLoading && <div className="animate-pulse bg-gray-200" />}
  ```

## File Formats
- Prefer WebP for photographs
- Use SVG for logos/icons
- PNG for graphics with transparency
