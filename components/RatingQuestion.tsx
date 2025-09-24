'use client';

import { Star } from 'lucide-react';

interface RatingQuestionProps {
  question: {
    _id: string;
    questionText: string;
    required: boolean;
  };
  value: string | number;
  onChange: (value: number) => void;
  error?: string;
}

export function RatingQuestion({ question, value, onChange, error }: RatingQuestionProps) {
  const rating = typeof value === 'number' ? value : 0;
  const maxRating = 5;

  const handleRatingClick = (selectedRating: number) => {
    onChange(selectedRating);
  };

  const getStarColor = (starIndex: number) => {
    if (starIndex <= rating) {
      return 'text-yellow-400';
    }
    return 'text-gray-300';
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {question.questionText}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="flex items-center space-x-1">
        {Array.from({ length: maxRating }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleRatingClick(index + 1)}
            className={`
              transition-colors duration-200 hover:scale-110 transform
              ${getStarColor(index + 1)}
            `}
            aria-label={`Rate ${index + 1} out of ${maxRating}`}
          >
            <Star className="w-8 h-8 fill-current" />
          </button>
        ))}
      </div>

      {/* Rating Labels */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>Poor</span>
        <span>Excellent</span>
      </div>

      {/* Selected Rating Display */}
      {rating > 0 && (
        <div className="text-sm text-gray-600">
          You rated: {rating} out of {maxRating}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}