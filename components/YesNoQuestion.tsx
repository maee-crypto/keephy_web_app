'use client';

interface YesNoQuestionProps {
  question: {
    _id: string;
    questionText: string;
    required: boolean;
  };
  value: string | number;
  onChange: (value: string) => void;
  error?: string;
}

export function YesNoQuestion({ question, value, onChange, error }: YesNoQuestionProps) {
  const selectedValue = typeof value === 'string' ? value : '';

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {question.questionText}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="flex space-x-4">
        <label className={`
          flex items-center p-3 border rounded-lg cursor-pointer transition-colors flex-1
          ${selectedValue === 'yes'
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-200 hover:border-gray-300'
          }
        `}>
          <input
            type="radio"
            name={question._id}
            value="yes"
            checked={selectedValue === 'yes'}
            onChange={(e) => onChange(e.target.value)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
          />
          <span className="ml-3 text-sm font-medium text-gray-700">Yes</span>
        </label>

        <label className={`
          flex items-center p-3 border rounded-lg cursor-pointer transition-colors flex-1
          ${selectedValue === 'no'
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-200 hover:border-gray-300'
          }
        `}>
          <input
            type="radio"
            name={question._id}
            value="no"
            checked={selectedValue === 'no'}
            onChange={(e) => onChange(e.target.value)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
          />
          <span className="ml-3 text-sm font-medium text-gray-700">No</span>
        </label>
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}