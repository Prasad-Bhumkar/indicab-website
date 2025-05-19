import type { StaticImageData } from 'next/image';

export const PLACEHOLDER_IMAGE = '/images/placeholder/placeholder.jpg';

export interface ImageProps {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export const getImagePath = (path: string): string => {
  // If the path is already a full URL, return it
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // If the path starts with /, it's already absolute
  if (path.startsWith('/')) {
    return path;
  }

  // Otherwise, prepend /images/
  return `/images/${path}`;
};

export const getPlaceholderImage = (type: 'car' | 'location' | 'background' = 'background'): string => {
  const placeholders = {
    car: '/images/placeholder/car-placeholder.jpg',
    location: '/images/placeholder/location-placeholder.jpg',
    background: '/images/placeholder/background-placeholder.jpg',
  };
  return placeholders[type];
};

export const getCarImagePath = (carModel: string, color: string): string => {
  return `/images/cars/${carModel.toLowerCase()}/${carModel.toLowerCase()}-${color.toLowerCase()}.jpg`;
};

export const getLocationImagePath = (location: string): string => {
  return `/images/locations/${location.toLowerCase()}.jpg`;
}; 