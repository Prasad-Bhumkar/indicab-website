"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the context interface
interface FavoritesContextType {
  favorites: number[];
  addFavorite: (routeId: number) => void;
  removeFavorite: (routeId: number) => void;
  toggleFavorite: (routeId: number) => void;
  isFavorite: (routeId: number) => boolean;
  clearAllFavorites: () => void;
  isInitialized: boolean;
}

// Create the context with default values
const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  toggleFavorite: () => {},
  isFavorite: () => false,
  clearAllFavorites: () => {},
  isInitialized: false,
});

// Custom hook to use the favorites context
export const useFavorites = () => useContext(FavoritesContext);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  // Initialize state with empty array
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    // Skip effect during SSR
    if (typeof window === 'undefined') return;

    try {
      const storedFavorites = localStorage.getItem('indicab-favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    // Skip effect during SSR and initial load
    if (typeof window === 'undefined' || !isInitialized) return;

    try {
      localStorage.setItem('indicab-favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites, isInitialized]);

  // Add a route to favorites
  const addFavorite = (routeId: number) => {
    if (!favorites.includes(routeId)) {
      setFavorites(prevFavorites => [...prevFavorites, routeId]);
    }
  };

  // Remove a route from favorites
  const removeFavorite = (routeId: number) => {
    setFavorites(prevFavorites => prevFavorites.filter(id => id !== routeId));
  };

  // Toggle a route's favorite status
  const toggleFavorite = (routeId: number) => {
    if (favorites.includes(routeId)) {
      removeFavorite(routeId);
    } else {
      addFavorite(routeId);
    }
  };

  // Check if a route is in favorites
  const isFavorite = (routeId: number) => {
    return favorites.includes(routeId);
  };

  // Clear all favorites
  const clearAllFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
      clearAllFavorites,
      isInitialized
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};
