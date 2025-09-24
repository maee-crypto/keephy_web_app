'use client';

import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  showRetry?: boolean;
  showHome?: boolean;
}

export function ErrorMessage({ 
  message, 
  onRetry, 
  showRetry = true, 
  showHome = true 
}: ErrorMessageProps) {
  return (
    <div className="error-container">
      <AlertCircle className="error-icon" />
      <h2 className="error-title">Oops! Something went wrong</h2>
      <p className="error-message">{message}</p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        {showRetry && onRetry && (
          <button onClick={onRetry} className="error-button">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        )}
        
        {showHome && (
          <Link href="/" className="error-button">
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Link>
        )}
      </div>
    </div>
  );
}