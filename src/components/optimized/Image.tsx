'use client'

import NextImage, { ImageProps } from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string
  fallback?: string
}

export default function Image({
  src,
  alt,
  width,
  height,
  className = '',
  fallback = '/images/placeholder.jpg',
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <NextImage
      {...props}
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={`transition-opacity duration-200 ${className}`}
      onError={() => setImgSrc(fallback)}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
    />
  )
}