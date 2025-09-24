'use client';

import { CheckCircle, Star, MessageCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ThankYouPageProps {
  message?: string;
  submissionId?: string | null;
}

export function ThankYouPage({ message, submissionId }: ThankYouPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>

          {/* Thank You Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Thank You!
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            {message || 'Your feedback has been submitted successfully.'}
          </p>

          {/* Submission ID */}
          {submissionId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500 mb-1">Submission ID</p>
              <p className="text-sm font-mono text-gray-700">{submissionId}</p>
            </div>
          )}

          {/* Additional Info */}
          <div className="space-y-4 text-sm text-gray-500">
            <div className="flex items-center justify-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span>Your feedback helps us improve our service</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <MessageCircle className="h-4 w-4 text-blue-400" />
              <span>We appreciate you taking the time to share your thoughts</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Submit Another Feedback
            </Link>
            
            <p className="text-xs text-gray-400">
              Powered by <span className="font-semibold text-primary-600">Keephy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}