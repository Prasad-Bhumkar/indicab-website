"use client";

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const DarkModeToggle = (): JSX.Element => {
    // We can't access localStorage during SSR, so we need to initialize with 'light'
    // and then update it on the client side
    const [theme, setTheme] = useState<'dark' | 'light'>('light');
    const [mounted, setMounted] = useState(false);

    // When the component mounts, we can access localStorage
    useEffect(() => {
        setMounted(true);
        // Check if user already has a theme preference in localStorage
        const _storedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
        // Check if user has a system preference
        const _prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Set theme based on localStorage, system preference, or default to 'light'
        const initialTheme = _storedTheme || (_prefersDark ? 'dark' : 'light');
        setTheme(initialTheme);

        // Also apply the theme to the document
        document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    }, []);

    // When the theme changes, update the document element class and localStorage
    useEffect(() => {
        if (!mounted) return;

        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme, mounted]);

    const _toggleTheme = () => {
        setTheme(_prevTheme => (_prevTheme === 'dark' ? 'light' : 'dark'));
    };

    // If the component hasn't mounted yet, show a placeholder to avoid layout shift
    if (!mounted) {
        return (
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-transparent">
                <div className="animate-pulse h-5 w-5 bg-gray-300 rounded-full"></div>
            </div>
        );
    }

    return (
        <button
            onClick={_toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </button>
    );
};

export default DarkModeToggle;
