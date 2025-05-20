"use client";

import { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, HelpCircle, X, ChevronUp } from 'lucide-react';

const _FloatingActionButton = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Set mounted state once on component initialization
    useEffect(() => {
        setMounted(true);

        // Add scroll event listener after mounting
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setShowScrollTop(scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []); // Empty dependency array means this only runs once on mount

    const _toggleMenu = () => setIsOpen(_prev => !_prev);

    // Scroll to top function
    const _scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Don't render anything during SSR to prevent hydration issues
    if (!mounted) return null;

    return (
        <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end space-y-2">
            {/* Scroll to top button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={_scrollToTop}
                        className="rounded-full bg-orange-500 p-2 text-white shadow-lg"
                        aria-label="Scroll to top"
                    >
                        <ChevronUp size={20} />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Action buttons that appear when the menu is open */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.a
                            href="tel:+919876543210"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0 }}
                            className="rounded-full bg-green-500 p-3 text-white shadow-lg flex items-center justify-center"
                            aria-label="Call us"
                        >
                            <Phone size={20} />
                        </motion.a>

                        <motion.a
                            href="/contact"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0.1 }}
                            className="rounded-full bg-blue-500 p-3 text-white shadow-lg flex items-center justify-center"
                            aria-label="Send message"
                        >
                            <MessageCircle size={20} />
                        </motion.a>

                        <motion.a
                            href="/help"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0.2 }}
                            className="rounded-full bg-purple-500 p-3 text-white shadow-lg flex items-center justify-center"
                            aria-label="Get help"
                        >
                            <HelpCircle size={20} />
                        </motion.a>
                    </>
                )}
            </AnimatePresence>

            {/* Main toggle button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={_toggleMenu}
                className={`rounded-full p-3 text-white shadow-lg ${isOpen ? 'bg-red-500' : 'bg-primary'}`}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.button>
        </div>
    );
};

export default _FloatingActionButton;
