"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isFirstMount, setIsFirstMount] = useState(true);

  // Only animate after the first mount
  useEffect(() => {
    setIsFirstMount(false);
  }, []);

  // Animation variants for page transitions
  const variants = {
    initial: {
      opacity: 0,
      y: 8,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -8,
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={isFirstMount ? "animate" : "initial"}
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="page-content"
      >
        {children}

        {/* Optional page transition overlay effect */}
        {!isFirstMount && (
          <motion.div
            className="fixed inset-0 bg-primary/10 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0.3 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
