"use client";

import { useEffect } from 'react';
import { initSectionTransitions, initParallaxEffect } from '@/lib/animations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/context/ThemeContext';

export default function ClientBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // Initialize animations when component mounts
  useEffect(() => {
    // Start section transitions
    const cleanup1 = initSectionTransitions();
    // Start parallax effects
    const cleanup2 = initParallaxEffect();

    // Cleanup on component unmount
    return () => {
      cleanup1?.();
      cleanup2?.();
    };
  }, []);

  return (
    <ThemeProvider>
      <div className={className}>
        <Header />
        {children}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
