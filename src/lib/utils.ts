import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function formatDate(_date: Date): string {
    return _date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

function generateUniqueId(_prefix: string = 'id'): string {
    return `${_prefix}_${Math.random().toString(36).substr(2, 9)}`;
}
