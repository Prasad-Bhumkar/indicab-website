"use client";

import { useState, useEffect } from 'react';

/**
 * A hook for safely using localStorage with Next.js, handling server-side rendering.
 *
 * @template T The type of the stored value
 * @param {string} key The localStorage key
 * @param {T} initialValue The initial value if nothing is stored
 * @returns {[T, (value: T | ((val: T) => T)) => void, boolean]}
 * The stored value, a setter function, and a boolean indicating if the hook has initialized
 *
 * @example
 * const [favorites, setFavorites, isInitialized] = useLocalStorage('favorites', []);
 */
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void, boolean] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // State to track whether we've initialized
  const [isInitialized, setIsInitialized] = useState(false);

  // State to track client-side mounting
  const [isMounted, setIsMounted] = useState(false);

  // Check if we're mounted on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize from localStorage when mounted
  useEffect(() => {
    if (!isMounted) return;

    try {
      const item = localStorage.getItem(key);
      const parsedItem: T = item ? JSON.parse(item) : initialValue;
      setStoredValue(parsedItem);
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      setStoredValue(initialValue);
    } finally {
      setIsInitialized(true);
    }
  }, [key, initialValue, isMounted]);

  // Update localStorage when the state changes
  useEffect(() => {
    // Skip during SSR and before initialization
    if (!isMounted || !isInitialized) return;

    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, storedValue, isMounted, isInitialized]);

  // Return a wrapped version of useState's setter function that
  // updates localStorage and the local state
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Save to state
      setStoredValue(valueToStore);
    } catch (error) {
      console.error(`Error setting value for localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, isInitialized];
}

export default useLocalStorage;
