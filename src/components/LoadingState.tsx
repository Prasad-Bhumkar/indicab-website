import React from 'react';

import { cn } from '@/utils/cn';

interface LoadingStateProps {
  isLoading: boolean;
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  isLoading,
  text = 'Loading...',
  size = 'md',
  variant = 'default',
  className
}) => {
  if (!isLoading) return null;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const variantClasses = {
    default: 'text-gray-600',
    primary: 'text-blue-600',
    secondary: 'text-gray-400'
  };

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-current border-t-transparent',
          sizeClasses[size],
          variantClasses[variant]
        )}
      />
      <span className={cn('text-sm', variantClasses[variant])}>{text}</span>
    </div>
  );
};

// Loading overlay component
interface LoadingOverlayProps extends Omit<LoadingStateProps, 'className'> {
  overlayClassName?: string;
  contentClassName?: string;
  blur?: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  text,
  size,
  variant,
  overlayClassName,
  contentClassName,
  blur = true,
  children
}) => {
  if (!isLoading) return <>{children}</>;

  return (
    <div className="relative">
      {children}
      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center',
          blur && 'backdrop-blur-sm',
          'bg-white/50 dark:bg-gray-900/50',
          overlayClassName
        )}
      >
        <div className={cn('flex flex-col items-center space-y-2', contentClassName)}>
          <LoadingState
            isLoading={true}
            text={text}
            size={size}
            variant={variant}
          />
        </div>
      </div>
    </div>
  );
};

// Loading button component
interface LoadingButtonProps extends Omit<LoadingStateProps, 'className'> {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  text,
  size,
  variant,
  onClick,
  disabled,
  className,
  children
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        'relative inline-flex items-center justify-center',
        'px-4 py-2 rounded-md',
        'transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        {
          'opacity-50 cursor-not-allowed': disabled || isLoading,
          'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500': variant === 'primary',
          'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500': variant === 'default',
          'bg-gray-100 text-gray-600 hover:bg-gray-200 focus:ring-gray-400': variant === 'secondary'
        },
        className
      )}
    >
      {isLoading ? (
        <LoadingState
          isLoading={true}
          text={text}
          size={size}
          variant={variant === 'primary' ? 'primary' : 'default'}
        />
      ) : (
        children
      )}
    </button>
  );
}; 