'use client';
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-lg border bg-card text-card-foreground shadow-sm
          ${variant === 'outline' ? 'border-border' : 'border-transparent'}
          ${className || ''}
        `}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export { Card };