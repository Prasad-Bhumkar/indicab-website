'use client';
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'elevated' | 'flat';
  header?: React.ReactNode;
  footer?: React.ReactNode;
  image?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', header, footer, image, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-lg transition-all
          ${variant === 'outline' ? 'border border-border bg-card' : ''}
          ${variant === 'default' ? 'border border-transparent bg-card shadow-sm' : ''}
          ${variant === 'elevated' ? 'border border-transparent bg-card shadow-md hover:shadow-lg' : ''}
          ${variant === 'flat' ? 'border-0 bg-transparent' : ''}
          ${className || ''}
        `}
        {...props}
      >
        {image && <div className="overflow-hidden rounded-t-lg">{image}</div>}
        {header && (
          <div className="border-b p-4 font-medium">
            {header}
          </div>
        )}
        <div className={`p-6 ${!header && !image ? 'rounded-t-lg' : ''} ${!footer ? 'rounded-b-lg' : ''}`}>
          {children}
        </div>
        {footer && (
          <div className="border-t p-4 bg-muted/50 rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };