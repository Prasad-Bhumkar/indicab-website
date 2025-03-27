import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

interface TextOverlay {
  title: string;
  subtitle?: string;
  position?: 'left' | 'center' | 'right';
}

interface HeroEnhancedProps {
  backgroundImages?: string[];
  textOverlays?: TextOverlay[];
  rotationInterval?: number;
}

const DEFAULT_BACKGROUNDS = [
  '/assets/backgrounds/hero-pattern.png',
  '/assets/images/driver-hero.jpg',
  '/assets/images/mumbai.jpg',
  '/assets/images/jaipur.jpg'
];

const HeroEnhanced: React.FC<HeroEnhancedProps> = ({
  backgroundImages = DEFAULT_BACKGROUNDS,
  textOverlays = [],
  rotationInterval = 5000
}) => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Handle image rotation
  useEffect(() => {
    if (shouldReduceMotion || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentBgIndex(prev => (prev + 1) % backgroundImages.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [backgroundImages.length, isPaused, rotationInterval, shouldReduceMotion]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      setCurrentBgIndex(prev => (prev + 1) % backgroundImages.length);
    } else if (e.key === 'ArrowLeft') {
      setCurrentBgIndex(prev => (prev - 1 + backgroundImages.length) % backgroundImages.length);
    } else if (e.key === ' ') {
      setIsPaused(prev => !prev);
    }
  };

  return (
    <section 
      className="relative h-[600px] md:h-[700px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Image carousel"
      tabIndex={0}
    >
      {/* Background image carousel */}
      {backgroundImages.map((img, index) => (
        <div
          key={`${img}-${index}`}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ 
            opacity: index === currentBgIndex ? 1 : 0,
            transitionDuration: shouldReduceMotion ? '0ms' : '1000ms'
          }}
          aria-hidden={index !== currentBgIndex}
        >
          <Image
            src={img}
            alt=""
            fill
            sizes="100vw"
            priority={index === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      {/* Content overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
            className="max-w-md ml-auto"
          >
            {textOverlays.length > 0 ? (
              <div className="space-y-6">
                {textOverlays.map((item, index) => (
                  <div 
                    key={index}
                    className={`text-white ${
                      item.position === 'left' ? 'text-left' : 
                      item.position === 'right' ? 'text-right' : 'text-center'
                    }`}
                  >
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">{item.title}</h1>
                    {item.subtitle && (
                      <p className="text-xl md:text-2xl">{item.subtitle}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-white text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Welcome to Indicab</h1>
                <p className="text-xl md:text-2xl">Your premium travel experience</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Carousel controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBgIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentBgIndex ? 'bg-white' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroEnhanced;
