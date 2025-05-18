"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

// Define the context interface
interface FavoritesContextType {
    favorites: number[];
    toggleFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
}

// Create the context with default values
const FavoritesContext = createContext<FavoritesContextType>({
    favorites: [],
    toggleFavorite: () => { },
    isFavorite: () => false,
});

// Custom hook to use the favorites context
export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<number[]>([]);

    useEffect(() => {
        // Load favorites from localStorage on mount
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const toggleFavorite = (id: number) => {
        setFavorites((prev) => {
            const newFavorites = prev.includes(id)
                ? prev.filter((favId) => favId !== id)
                : [...prev, id];
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    const isFavorite = (id: number) => favorites.includes(id);

    return (
        <FavoritesContext.Provider
            value={{ favorites, toggleFavorite, isFavorite }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}
