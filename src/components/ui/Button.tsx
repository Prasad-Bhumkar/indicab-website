'use client';
import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    icon,
    iconPosition = 'left',
    children,
    disabled,
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={`inline-flex items-center justify-center rounded-md font-medium transition-all
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          disabled:opacity-50 disabled:pointer-events-none
          ${variant === 'primary' ? 'bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary' : ''}
          ${variant === 'secondary' ? 'bg-secondary text-white hover:bg-secondary/80 focus-visible:ring-secondary' : ''}
          ${variant === 'outline' ? 'border border-input hover:bg-accent focus-visible:ring-accent' : ''}
          ${variant === 'danger' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive' : ''}
          ${variant === 'success' ? 'bg-success text-success-foreground hover:bg-success/90 focus-visible:ring-success' : ''}
          ${variant === 'ghost' ? 'hover:bg-accent focus-visible:ring-accent' : ''}
          ${size === 'sm' ? 'h-8 px-3 text-xs gap-1' : ''}
          ${size === 'md' ? 'h-10 px-4 text-sm gap-2' : ''}
          ${size === 'lg' ? 'h-12 px-6 text-base gap-3' : ''}
          ${className || ''}
        `}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className="inline-flex">{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
              <span className="inline-flex">{icon}</span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };