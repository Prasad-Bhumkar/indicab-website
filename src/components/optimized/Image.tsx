'use client'

import { useState } from 'react'

import NextImage from 'next/image'

interface ImageProps {
    src: string
    alt: string
    width?: number
    height?: number
    className?: string
    priority?: boolean
}

export const Image: React.FC<ImageProps> = ({
    src,
    alt,
    width,
    height,
    className = '',
    priority = false,
}) => {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <NextImage
                src={src}
                alt={alt}
                width={width ?? 0}
                height={height ?? 0}
                priority={priority}
                className={`
                    duration-700 ease-in-out
                    ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'}
                `}
                onLoadingComplete={() => setIsLoading(false)}
            />
        </div>
    )
}
