'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="loading-container">
      <div className="text-center">
        <div className={`${sizeClasses[size]} loading-spinner mx-auto mb-4`}></div>
        {text && (
          <p className="loading-text">{text}</p>
        )}
      </div>
    </div>
  );
}