import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`rounded-md px-4 py-2 text-sm font-medium transition-colors
          ${variant === 'primary' ? 'bg-primary text-white hover:bg-primary/90' : ''}
          ${variant === 'secondary' ? 'bg-secondary text-white hover:bg-secondary/80' : ''}
          ${variant === 'outline' ? 'border border-input hover:bg-accent' : ''}
          ${size === 'sm' ? 'h-9 px-3' : size === 'lg' ? 'h-11 px-8' : 'h-10 px-4'}
          ${className || ''}
        `}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };