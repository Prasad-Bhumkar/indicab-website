/**
 * Asset Path Helper
 *
 * Utility functions to help correctly reference assets in migrated components
 */

/**
 * Legacy to Modern Asset Path Mapping
 */
const legacyToModernPaths = {
  // Images
  '/assets/app-store.png': '/assets/images/app-store.png',
  '/assets/play-store.png': '/assets/images/google-play.png',
  '/assets/logo.png': '/indicab-logo.svg',

  // Directories
  '/assets/images/': '/assets/images/',
  '/assets/icons/': '/assets/icons/',
  '/assets/avatars/': '/assets/avatars/',
  '/assets/drivers/': '/assets/drivers/',
  '/assets/cities/': '/assets/cities/',
  '/assets/cars/': '/assets/cars/',
};

/**
 * Get the correct asset path for use in Next.js components
 *
 * @param legacyPath The original path used in legacy components
 * @returns The correct path for use in Next.js components
 */
export function getAssetPath(legacyPath: string): string {
  // Check for direct mappings
  if (legacyPath in legacyToModernPaths) {
    return legacyToModernPaths[legacyPath as keyof typeof legacyToModernPaths];
  }

  // Check if the path starts with any of the directory mappings
  for (const [legacyDir, modernDir] of Object.entries(legacyToModernPaths)) {
    if (legacyPath.startsWith(legacyDir)) {
      return legacyPath.replace(legacyDir, modernDir);
    }
  }

  // If no mapping found, return the original path
  // but ensure it starts with a leading slash
  return legacyPath.startsWith('/') ? legacyPath : `/${legacyPath}`;
}

/**
 * Helper function to determine if an asset should use the Next.js Image component
 *
 * @param path The asset path
 * @returns True if the asset should use the Next.js Image component
 */
export function shouldUseNextImage(path: string): boolean {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];
  const lowercasePath = path.toLowerCase();

  return imageExtensions.some(ext => lowercasePath.endsWith(ext));
}

/**
 * Example usage for different asset types:
 *
 * 1. Images:
 * ```tsx
 * import Image from 'next/image';
 * import { getAssetPath, shouldUseNextImage } from '@/utils/asset-path-helper';
 *
 * const imagePath = getAssetPath('/assets/images/example.jpg');
 *
 * // In your component:
 * {shouldUseNextImage(imagePath) ? (
 *   <Image src={imagePath} alt="Example" width={400} height={300} />
 * ) : (
 *   <img src={imagePath} alt="Example" />
 * )}
 * ```
 *
 * 2. SVG Icons:
 * ```tsx
 * import { getAssetPath } from '@/utils/asset-path-helper';
 *
 * const iconPath = getAssetPath('/assets/icons/example.svg');
 *
 * // In your component:
 * <img src={iconPath} alt="Example Icon" className="w-6 h-6" />
 * ```
 *
 * 3. Other assets:
 * ```tsx
 * import { getAssetPath } from '@/utils/asset-path-helper';
 *
 * const pdfPath = getAssetPath('/assets/documents/example.pdf');
 *
 * // In your component:
 * <a href={pdfPath} download>Download PDF</a>
 * ```
 */
