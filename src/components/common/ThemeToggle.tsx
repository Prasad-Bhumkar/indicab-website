import React from "react";

"use client";

import { useTheme } from "../../context/ThemeContext";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export function ThemeToggle(): JSX.Element {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={`Toggle ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {theme === 'dark' ? (
                <SunIcon className="w-5 h-5" />
            ) : (
                <MoonIcon className="w-5 h-5" />
            )}
        </button>
    );
}
